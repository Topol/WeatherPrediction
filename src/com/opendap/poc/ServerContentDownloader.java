package com.opendap.poc;
/**
 *
 */

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.w3c.dom.NamedNodeMap;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.DocumentHandler;
import org.xml.sax.InputSource;
import org.xml.sax.helpers.ParserFactory;


import java.io.File;
import java.util.*;
import org.w3c.dom.*;
import java.io.*;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import javax.xml.*;

//import sun.jdbc.odbc.JdbcOdbcDriver;
import java.sql.*;


import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Properties;
import java.util.Vector;
import java.lang.*;
import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.nio.channels.FileChannel;


/**
 * @author Arindam Bhattacharjee
 *
 */
public class ServerContentDownloader {


	private static String servletURLPattern_rainfall = null;
	private static String servletURLPattern_soil = null;
	private static String servletURLPattern_Tmax = null;
	private static String servletURLPattern_Tmin = null;
	private static String servletURLPattern_Coordinates = null;
	private static String servletURLPattern_GCM = null;
	private static String servletURLPattern_TmaxAvgNR = null;
	private static String servletURLPattern_TmaxAvgR = null;
	private static String servletURLPattern_TminAvgNR = null;
	private static String servletURLPattern_TminAvgR = null;
	private static String servletURLPattern_SRadNR = null;
	private static String servletURLPattern_SRadR = null;

	private boolean useProxy = false;

	private String defaultProxyHost = "10.66.184.116";

	private String defaultProxyPort = "80";

	private String proxyHost = null;

	private String proxyPort = null;

	private String folder = null;

	/**
	 * @throws IOException
	 *
	 */
	public ServerContentDownloader() throws IOException {
		Authenticator.setDefault(new MyAuthenticator());
		configure();
	}

	/**
	 * @param args
	 */
	/*public static void main(String[] args) throws IOException{
	   	Authenticator.setDefault(new MyAuthenticator());
		try {
			ServerContentDownloader serverContentDownloader =  new ServerContentDownloader();
			serverContentDownloader.createAndSaveUrl();
			DODS dds = new DODS();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}*/

	/**
	 *
	 * @throws IOException
	 */
	private void configure()  throws IOException {
		//Load the properties file
		Properties properties = new Properties();
		// Read the properties file
		//File file = new File("ServerContentDownloader.properties");
		File file = new File("ServerContentDownloader.properties");
		FileInputStream fis = new FileInputStream(file);
		properties.load(fis);

		useProxy = Boolean.parseBoolean(properties.getProperty("UseProxy"));
		if(useProxy){
			// Read the Proxy Host
			proxyHost = properties.getProperty("ProxyHost");
			System.out.println("ProxyHost : " + proxyHost);
			if(null == proxyHost || proxyHost.trim().length() < 1){
				proxyHost = defaultProxyHost;
				System.out.println("Using DefaultProxyHost : " + proxyHost);
			}
			// Read the Proxy Port
			proxyPort = properties.getProperty("ProxyPort");
			System.out.println("\nProxyPort : " + proxyPort);
			if(null == proxyPort || proxyPort.trim().length() < 1){
				proxyPort = defaultProxyPort;
				System.out.println("Using DefaultProxyPort : " + proxyPort);
			}
		}
		// Read the HTTP URL
		servletURLPattern_rainfall = properties.getProperty("servletURLPattern_rainfall");
		System.out.println("servletURLPattern : " + servletURLPattern_rainfall);
		servletURLPattern_soil = properties.getProperty("servletURLPattern_soil");
		System.out.println("servletURLPattern : " + servletURLPattern_soil);
		servletURLPattern_Tmax = properties.getProperty("servletURLPattern_Tmax");
		System.out.println("servletURLPattern : " + servletURLPattern_Tmax);
		servletURLPattern_Coordinates = properties.getProperty("servletURLPattern_Coordinates");
		System.out.println("servletURLPattern : " + servletURLPattern_Coordinates);
		servletURLPattern_Tmin = properties.getProperty("servletURLPattern_Tmin2");
		System.out.println("servletURLPattern : " + servletURLPattern_Tmin);
		servletURLPattern_GCM = properties.getProperty("servletURLPattern_GCM");
		System.out.println("servletURLPattern : " + servletURLPattern_GCM);
		servletURLPattern_TmaxAvgNR = properties.getProperty("servletURLPattern_TmaxAvgNR");
		System.out.println("servletURLPattern: " + servletURLPattern_TmaxAvgNR);
		servletURLPattern_TmaxAvgR = properties.getProperty("servletURLPattern_TmaxAvgR");
		System.out.println("servletURLPattern: " + servletURLPattern_TmaxAvgR);
		servletURLPattern_TminAvgNR = properties.getProperty("servletURLPattern_TminAvgNR");
		System.out.println("servletURLPattern: " + servletURLPattern_TminAvgNR);
		servletURLPattern_TminAvgR = properties.getProperty("servletURLPattern_TminAvgR");
		System.out.println("servletURLPattern: " + servletURLPattern_TminAvgR);
		servletURLPattern_SRadNR = properties.getProperty("servletURLPattern_SRadNR");
		System.out.println("servletURLPattern: " + servletURLPattern_SRadNR);
		servletURLPattern_SRadR = properties.getProperty("servletURLPattern_SRadR");
		System.out.println("servletURLPattern: " + servletURLPattern_SRadR);
		

		//Read folder name
		folder = properties.getProperty("folder");
		System.out.println("Folder : " + folder);


		System.out.println("\n************************************************\n");

	}


	/**
	 * @param DistrictID 
	 *
	 *
	 */
	public void createAndSaveUrl(String Path, String DistrictID){

		/* build connection to the database */
		try	{
			//SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String folderPath = folder + "/" + Path;
			//String folderPath = folder + "/" + simpleDateFormat.format(new Date());
			File dir = new File(folderPath);
			dir.mkdirs();
			int id = 1;
			//String DistrictID ="188";
			File aFile = new File("DistrictCoordinates.txt");
			 String LatLong = "";
			double maxLat = 0.0;
			double minLat = 0.0;
			double maxLon = 0.0;
			double minLon =0.0;
 			
 			Double GCMLat = 0.0;
 			Double GCMLon = 0.0;
 			double GCMLatMin = 0.0; 
 			double GCMLatMax = 0.0;
 			double GCMLonmin = 0.0;
 			double GCMLonMax = 0.0;
 			Vector LatVec = new Vector();
				Vector LonVec = new Vector();
			try	{
				 BufferedReader input =  new BufferedReader(new FileReader(aFile));
				 String line = null; //not declared within while loop
				     while (( line = input.readLine()) != null){
				    	 StringTokenizer sta = new StringTokenizer(line.toString(),"@");
			    		 //sta.nextToken();
			    		    
				    	 if(sta.nextToken().toString().equals(DistrictID))
				          {  	
				    		    sta.nextToken();
				    		 	//System.out.println(line);
				    		    LatLong = sta.nextToken();
				    		    System.out.println(LatLong);
				    		    LatLong = LatLong.replace("MULTIPOLYGON(((", "");
								LatLong = LatLong.replace(")))", "");
								LatLong = LatLong.replace("))", ",");
								LatLong = LatLong.replace("((", "");

								//defining the area of the resterization
								
				            	StringTokenizer st = new StringTokenizer(LatLong,",");
				            	StringTokenizer stRaster = new StringTokenizer(LatLong,",");
				            	while(stRaster.hasMoreElements() ){
									String next = stRaster.nextElement().toString();
									StringTokenizer st3 = new StringTokenizer(next);
									Double Lat = Double.parseDouble(st3.nextElement().toString());
									Double Lon = Double.parseDouble(st3.nextElement().toString());
									LatVec.add(Lat);
									LonVec.add(Lon);
				    			}
								maxLat = Double.parseDouble(Collections.max(LatVec).toString());
				    			minLat = Double.parseDouble(Collections.min(LatVec).toString());
				    			maxLon = Double.parseDouble(Collections.max(LonVec).toString());
				    			minLon = Double.parseDouble(Collections.min(LonVec).toString());
				    			
				    			GCMLat = (maxLat+minLat)/2;
				    			GCMLon = (maxLon + minLon)/2;
				    			GCMLatMin = GCMLat - 5; 
				    			GCMLatMax = GCMLat + 5;
				    			GCMLonmin = GCMLon - 5;
				    			GCMLonMax = GCMLon + 5;
				    			
				          }
				     }
			}catch(Exception e){}
				     
				    	 
			/*Connection conn = null;
			Connection conn2 = null;
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/IndiaAgriculture?" +"user=root&password=root_pwd");
			conn2 = DriverManager.getConnection("jdbc:mysql://localhost/IndiaAgriculture?" +"user=root&password=root_pwd");
		    ResultSet results, results2;
		    PreparedStatement sql,sql2;
			sql = conn.prepareStatement("Select Distinct ID,ID_2 from districts_shape where ID =461");
			results = sql.executeQuery();
			String id_2 = "";
			while (results.next()){
			DistrictID = results.getString(1);
			id_2 = results.getString(2);
			//------------------------------District Locations-----------------------------------/
			String LatLong = "";
			double id2 = Double.parseDouble(id_2);
			if (id2 != 15732 && id2 != 15846 && id2 != 16302 && id2 != 16304 && id2 != 15823){
				String sqlquery = "Select AsWKT(ogc_geom) from districts_table where ID_2 = '" + id_2 +"'";
				sql2 = conn2.prepareStatement(sqlquery);
				results2 = sql2.executeQuery();
				while (results2.next()){
					LatLong = results2.getString(1);
				}
				LatLong = LatLong.replace("MULTIPOLYGON(((", "");
				LatLong = LatLong.replace(")))", "");
				LatLong = LatLong.replace("))", ",");
				LatLong = LatLong.replace("((", "");

				//defining the area of the resterization
				Vector LatVec = new Vector();
				Vector LonVec = new Vector();
            	StringTokenizer st = new StringTokenizer(LatLong,",");
            	StringTokenizer stRaster = new StringTokenizer(LatLong,",");
            	while(stRaster.hasMoreElements() ){
					String next = stRaster.nextElement().toString();
					StringTokenizer st3 = new StringTokenizer(next);
					Double Lat = Double.parseDouble(st3.nextElement().toString());
					Double Lon = Double.parseDouble(st3.nextElement().toString());
					LatVec.add(Lat);
					LonVec.add(Lon);
    			}
				Object maxLat = Collections.max(LatVec);
    			Object minLat = Collections.min(LatVec);
    			Object maxLon = Collections.max(LonVec);
    			Object minLon = Collections.min(LonVec);
    			
    			Double GCMLat = (Double.parseDouble(maxLat.toString())+Double.parseDouble(minLat.toString()))/2;
    			Double GCMLon = (Double.parseDouble(maxLon.toString())+Double.parseDouble(minLon.toString()))/2;
    			double GCMLatMin = GCMLat - 10; 
    			double GCMLatMax = GCMLat + 10;
    			double GCMLonmin = GCMLon - 10;
    			double GCMLonMax = GCMLon + 10;*/
    		/* this part should be removed later */	
    		/*	double maxLat = 73.0095;
    			double minLat = 74.5825;
    			double maxLon = 25.1084;
    			double minLon = 23.8069;
    			double GCMLatMin = maxLat - 10; 
    			double GCMLatMax = maxLat + 10;
    			double GCMLonmin = maxLon - 10;
    			double GCMLonMax = maxLon + 10;
    			DistrictID = "461";*/
    			
    		int dist = Integer.parseInt(DistrictID);
			id = dist;
			//the id in database is 1 more than the normal id
			id++;
			String folderPath2 = folderPath+"/"+DistrictID;
			File dir2 = new File(folderPath2);
			dir2.mkdirs();
			String filename = "";
			String urlString = "";
			filename = folderPath2+ "/GridCoordinates.tsv";
			 urlString = servletURLPattern_Coordinates.replace("{{minLat}}", String.valueOf(minLat))
						.replace("{{maxLat}}",String.valueOf(maxLat)).replace("{{minLon}}", String.valueOf(minLon)).
						replace("{{maxLon}}", String.valueOf(maxLon)).replace("{{id}}",String.valueOf(id));
		    System.out.println("urlString :" + urlString);
		    saveUrl(filename , urlString);

			double Lon = 0.0;
			double Lat = 0.0;
			
			/* Get the soil parameters from the Datalibrary */
			filename = folderPath2+ "/soil.cdf";
			urlString = servletURLPattern_soil.replace("{{minLat}}", String.valueOf(minLat))
						.replace("{{maxLat}}",String.valueOf(maxLat)).replace("{{minLon}}", String.valueOf(minLon)).
						replace("{{maxLon}}", String.valueOf(maxLon)).replace("{{id}}",String.valueOf(id));
		    System.out.println("urlString :" + urlString);
		    saveUrl(filename , urlString);
		    
		    /*Call the soil function to convert the soil into ID*/
		    //Soil sol = new Soil();			
			
			/*Get the rainfall co-ordinates for the dataset */
			GridCoordinates grid = new GridCoordinates();
			Vector vec = grid.Coordinates(folderPath2);
			Vector rainParameters = new Vector();
			Vector NHMMrain = new Vector();
			RainNHMM rnhmm = new RainNHMM();
			for(int i = 0; i <vec.size();i++)
			{
				Lon = Double.parseDouble(vec.get(i).toString());
				Lat = Double.parseDouble(vec.get(i+1).toString());
				String pathname = "rainfall"+"-"+Lat+"-"+Lon;
				i++;
				filename = folderPath2+"/"+pathname+".cdf";
			    urlString = servletURLPattern_rainfall.replace("{{Lat}}", String.valueOf(Lat))
							.replace("{{Lon}}",String.valueOf(Lon)).replace("{{id}}",String.valueOf(id));
			    System.out.println("urlString :" + urlString);
			    saveUrl(filename , urlString);
			    
			    /* this methods builds up the rainfall files for HMM use */				
				 rainParameters = rnhmm.WriteRain(folderPath2,pathname);
				 NHMMrain.add(rainParameters);
				
						 
				 /* this call saves the Tmax values when it rained */
				 pathname = "TmaxR"+Lat+"-"+Lon;
				 filename = folderPath2+"/"+pathname+".tsv";
				  urlString = servletURLPattern_TmaxAvgR.replace("{{Lat}}", String.valueOf(Lat))
								.replace("{{Lon}}",String.valueOf(Lon));
				    System.out.println("urlString :" + urlString);
				    saveUrl(filename , urlString);
				 /* this call saves the Tmax values when it did not rain */
				   pathname = "TmaxNR"+Lat+"-"+Lon;
				   filename = folderPath2+"/"+pathname+".tsv";
				   urlString = servletURLPattern_TmaxAvgNR.replace("{{Lat}}", String.valueOf(Lat))
									.replace("{{Lon}}",String.valueOf(Lon));
				   System.out.println("urlString :" + urlString);
				   saveUrl(filename , urlString);
				  
				   /* this call saves the Tmin values when it rained */
				   pathname = "TminR"+Lat+"-"+Lon;
				   filename = folderPath2+"/"+pathname+".tsv";
				   urlString = servletURLPattern_TminAvgR.replace("{{Lat}}", String.valueOf(Lat))
									.replace("{{Lon}}",String.valueOf(Lon));
				   System.out.println("urlString :" + urlString);
				   saveUrl(filename , urlString);
				   
				   /* this call saves the Tmin values when it not rained */
				   pathname = "TminNR"+Lat+"-"+Lon;
				   filename = folderPath2+"/"+pathname+".tsv";
				   urlString = servletURLPattern_TminAvgNR.replace("{{Lat}}", String.valueOf(Lat))
									.replace("{{Lon}}",String.valueOf(Lon));
				   System.out.println("urlString :" + urlString);
				   saveUrl(filename , urlString);
				   
				   /* this call saves the SRad values when it not rained */
				   pathname = "SRadNR"+Lat+"-"+Lon;
				   filename = folderPath2+"/"+pathname+".tsv";
				   urlString = servletURLPattern_SRadNR.replace("{{Lat}}", String.valueOf(Lat))
									.replace("{{Lon}}",String.valueOf(Lon));
				   System.out.println("urlString :" + urlString);
				   saveUrl(filename , urlString);
				   
				   /* this call saves the SRad values when it rained */
				   pathname = "SRadR"+Lat+"-"+Lon;
				   filename = folderPath2+"/"+pathname+".tsv";
				   urlString = servletURLPattern_SRadR.replace("{{Lat}}", String.valueOf(Lat))
									.replace("{{Lon}}",String.valueOf(Lon));
				   System.out.println("urlString :" + urlString);
				   saveUrl(filename , urlString);
				  
		      }
			
			rnhmm.WriteInputFiles(folderPath2, "sim_nhmm_ind_delexp_params.txt");
			rnhmm.WriteInputFiles(folderPath2, "lrn_nhmm_ind_delexp_params.txt");

			/**************Builds up the rainfall file to be read by NHMM *************************/
			File writeFile = new File(folderPath2+"/HMM_Input.txt");
			Writer output = new BufferedWriter(new FileWriter(writeFile));
				for(int k = 0; k <((Vector) NHMMrain.get(0)).size();k++)
				{
					output.write(((Vector) NHMMrain.get(0)).get(k) + "\t" +((Vector) NHMMrain.get(1)).get(k) + "\t" + ((Vector) NHMMrain.get(2)).get(k));
					output.write("\n");
				}
			/******************************************************************/
			
		    for(int iYear=1982;iYear<2010;iYear++)
		    {
			filename = folderPath2+ "/GCM_"+iYear+".txt";
			
			urlString = servletURLPattern_GCM.replace("{{year}}", String.valueOf(iYear)).replace("{{minLat}}", String.valueOf(GCMLatMin))
							.replace("{{maxLat}}",String.valueOf(GCMLatMax)).replace("{{minLon}}", String.valueOf(GCMLonmin)).
							replace("{{maxLon}}", String.valueOf(GCMLonMax));
			 System.out.println("urlString :" + urlString);
			 saveUrl(filename , urlString);
		    }
		    Vector vGCM = new Vector();
		    for(int iYear=1982;iYear<2010;iYear++)
		    {
		    	BufferedReader input =  new BufferedReader(new FileReader(folderPath2+ "/GCM_"+iYear+".txt"));
		    	
		    	String line = null; //not declared within while loop
		         while (( line = input.readLine()) != null){
		        	 System.out.println(line);
		        	 vGCM.add(line);
		         }
		    }
		    Writer outputGCM = new BufferedWriter(new FileWriter(folderPath2+ "/GCM.txt"));
		    for (int k = 0; k < vGCM.size(); k++){
		    	 outputGCM.write(vGCM.get(k).toString());
		    	 outputGCM.write("\n");
		    	 outputGCM.flush();
       		}
		    outputGCM.close();
			 /*Call the HMM simulations at this point */
			 
			 /*Once the dataset for HMM is run...call the NHMM to run at this point*/
			 System.out.println("THere");
			 ReadNHMMOutput rd = new ReadNHMMOutput();
			 
			 for(int i = 0; i <vec.size();i++)
				{
				 Lon = Double.parseDouble(vec.get(i).toString());
				 Lat = Double.parseDouble(vec.get(i+1).toString());
				 i++;
				 
				 //rd.makeCropInputFiles(folderPath2,Lat,Lon);
				/*this method calls the soil file for the coordinates */ 
				 //sol.SoilData(folderPath2,Lat,Lon);
				 //the soil file is called from inside
				}
				 	
			 
			 /*Once the NHMM is ready call the ReadNHMMOutput to build the input rainfall file*/
			 
			 /* At this point Call the 
			/* Write the input files for the crop models */
				rnhmm.WriteInputFiles(folderPath2, "DATA.CDE");
				rnhmm.WriteInputFiles(folderPath2, "DETAIL.CDE");
				rnhmm.WriteInputFiles(folderPath2, "DSMODEL.ERR");
				rnhmm.WriteInputFiles(folderPath2, "GCOEFF.CDE");
				rnhmm.WriteInputFiles(folderPath2, "GRSTAGE.CDE");
				rnhmm.WriteInputFiles(folderPath2, "JDATE.CDE");
				rnhmm.WriteInputFiles(folderPath2, "PEST.CDE");
				rnhmm.WriteInputFiles(folderPath2, "SGCER040.CUL");
				rnhmm.WriteInputFiles(folderPath2, "SGCER040.ECO");
				rnhmm.WriteInputFiles(folderPath2, "SGCER040.SPE");
				rnhmm.WriteInputFiles(folderPath2, "Simulation.cde");
				rnhmm.WriteInputFiles(folderPath2, "SOIL.CDE");
				rnhmm.WriteInputFiles(folderPath2, "WEATHER.CDE");
				rnhmm.WriteInputFiles(folderPath2, "soil.sol");
				rnhmm.WriteInputFiles(folderPath2, "GATI0301.WTH");
				//rnhmm.WriteInputFiles(folderPath2, "GCM.txt");
				//rnhmm.WriteInputFiles(folderPath2, "DSSATCSM40");
				rnhmm.WriteInputFiles(folderPath2, "1-21.WTH");

				/********Read the crop Model File into the Folder*********/
				FileChannel ic = new FileInputStream("DSSATCSM40").getChannel();
				System.out.println(folderPath2);
				FileChannel oc = new FileOutputStream(folderPath2+"/DSSATCSM40").getChannel();
				ic.transferTo(0,ic.size(),oc);
				ic.close();
				oc.close();
				
			//}
			//System.out.println(HMMInput);

			

		    filename = folderPath2+ "/Tmax.cdf";
			urlString = servletURLPattern_Tmax.replace("{{minLat}}", String.valueOf(minLat))
						.replace("{{maxLat}}",String.valueOf(maxLat)).replace("{{minLon}}", String.valueOf(minLon)).
						replace("{{maxLon}}", String.valueOf(maxLon)).replace("{{id}}",String.valueOf(id));
		    //System.out.println("urlString :" + urlString);
		    saveUrl(filename , urlString);

		    /*filename = folderPath2+ "/[X+Y]Tmin.tsv";
			urlString = servletURLPattern_Tmin.replace("{{minLat}}", String.valueOf(minLat))
						.replace("{{maxLat}}",String.valueOf(maxLat)).replace("{{minLon}}", String.valueOf(minLon)).
						replace("{{maxLon}}", String.valueOf(maxLon)).replace("{{id}}",String.valueOf(id));
		    //System.out.println("urlString :" + urlString);
		    saveUrl(filename , urlString);*/
		    
		    
		    

			//}//end of while
		//}//end of if


		}
		/*catch(ClassNotFoundException Exception)	{
			System.out.println("error occoured during loading the driver");
		}*/
		catch(Exception e){
		System.out.println("error occoured during connecting " + e);
		}



	}

	/**
	 *
	 * @param filename
	 * @param urlString
	 */
	private void saveUrl(String filename, String urlString){
		BufferedInputStream in = null;
		FileOutputStream fout = null;
		try
		{
			try {
				HttpURLConnection conn = null;
				if(useProxy){
					System.getProperties().put("http.proxyHost", proxyHost);
					System.getProperties().put("http.proxyPort", proxyPort);
				}
				URL url = new URL(urlString);
				conn = (HttpURLConnection) url.openConnection();
				boolean isConnected = (conn.getContentLength() > 0);
				System.out.println("isConnected: " + isConnected);
				in = new BufferedInputStream(conn.getInputStream());

				fout = new FileOutputStream(filename);
				System.out.println("filename: " + filename);
				byte data[] = new byte[1024];
				int count;
				while ((count = in.read(data, 0, 1024)) != -1)
				{
					fout.write(data, 0, count);
				}
			} catch (MalformedURLException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		finally
		{
			if (in != null)
				try {
					in.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			if (fout != null)
				try {
					fout.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
	}
	   //static final String kuser = "kjensen"; // your account name
	   //static final String kpass = "7o29tkhc"; // your password for the account
	   
	   static final String kuser = "ab3466"; // your account name
	   static final String kpass = "fqqlwe"; // your password for the account

		static class MyAuthenticator extends Authenticator {
		public PasswordAuthentication getPasswordAuthentication() {
		System.err.println("Feeding username and password for " + getRequestingScheme());
		return (new PasswordAuthentication(kuser, kpass.toCharArray()));
	}
}

}
