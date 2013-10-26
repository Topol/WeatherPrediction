package com.weatherprediction.servlet;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CropModel extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5655090058815084878L;
	
	private static Map<Long, SimDetailsVO> simDetailsMap = new LinkedHashMap<Long, SimDetailsVO>();

	private static long simId = 1;
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		/*
		 * a-> Action i.e. 1) status- To get current simulation status
		 * 
		 * s-> Simulation Code i.e. chm -> CropModelHistorical, rmnhmm -> RainFallModelNHMM,
		 * cmnhmm -> CropModelNHMM
		 */
		 System.out.println("a: " + request.getParameter("a"));
		 System.out.println("s: " + request.getParameter("s"));
		 System.out.println("i: " + request.getParameter("i"));
		if (request.getParameter("a") != null) {
			if (request.getParameter("a").equalsIgnoreCase("run") && request.getParameter("s") != null) {
				runSimulation(request.getParameter("s"),
						request, response);
			}else if (request.getParameter("a").equalsIgnoreCase("status") && request.getParameter("i") != null) {
				returnCurrentSimulationStatus(Long.parseLong(request.getParameter("i")),
						request, response);
			}
		}
	}
	
	private void returnCurrentSimulationStatus(long simId,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		PrintWriter out = response.getWriter();
		StringBuilder responseVal = new StringBuilder();
		SimDetailsVO simDetailsVO = getSimDetailsMap().get(simId);
		if(simDetailsVO != null){// && !simDetailsVO.getStatus().equalsIgnoreCase("Completed")){
		//if (simulation.equalsIgnoreCase("CropModelHistorical")) {
			StringBuilder sb = new StringBuilder(
					"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><simulation>");
			sb.append("<status>" + simDetailsVO.getStatus() + "</status>");
			sb.append("<statusMessage>" + simDetailsVO.getStatusMessage().toString() + "</statusMessage>");
			sb.append("<links>");
			
			Set<Entry<String, String>> linksEntrySet = simDetailsVO.getLinks().entrySet();
			for(Entry<String, String> linkEntry : linksEntrySet){
				sb.append("<link><linkUrl>").append(linkEntry.getKey()).append("</linkUrl><linkText>").append(linkEntry.getValue()).append("</linkText></link>");
				
			}
			
//			sb.append("<link><linkUrl>http://iridl.ldeo.columbia.edu/expert/%28/beluga/data/arindam/CropModelOutput/188/hist_cropmodel_Sorghum.nc%29readCDF/.CropOutput/figviewer.html?map.url=soil+year+fig-+colors+-fig%26my.help=more+options</linkUrl><linkText>Historical Crop Yield per grid point</linkText></link>");
//			sb.append("<link><linkUrl>http://iridl.ldeo.columbia.edu/expert/%28/beluga/data/arindam/CropModelOutput/187/hist_cropmodel_Sorghum.nc%29readCDF/.CropOutput/figviewer.html?map.url=X+Y+fig-+colors+coasts+lakes+-fig%26my.help=more+options</linkUrl><linkText>Historical Crop Yield per grid point per soil</linkText></link>");
//			sb.append("<link><linkUrl>http://iridl.ldeo.columbia.edu/expert/%28/beluga/data/arindam/CropModelOutput/187/sim_cropmodel_Sorghum.nc%29readCDF/.CropOutput/figviewer.html</linkUrl><linkText>Rainfall Simulation Output from machine Learning</linkText></link>");
//			sb.append("<link><linkUrl>http://iridl.ldeo.columbia.edu/expert/SOURCES/.NOAA/.NCDC/.ERSST/.version3b/.sst/T/%28Jun%201951%29%28Sep%202009%29RANGE/T/4/runningAverage/T/12/STEP/%28/beluga/data/arindam/CropModelOutput/187/hist_cropmodel_Sorghum.nc%29readCDF/.CropOutput/T/1/shiftGRID/X/72.5/VALUE/Y/22.5/VALUE/X/removeGRID/Y/removeGRID/exch%5BT%5Dcorrelate/X+Y+fig-+colors+coasts+-fig+//soil/3676./plotvalue//XOVY+null+psdef//plotborder+72+psdef//plotaxislength+432+psdef/figviewer.html?my.help=%26map.soil.plotvalue=3676.%26map.Y.units=degree_north%26map.Y.plotlast=89N%26map.url=+%26map.domain=+%7B+%2Fsoil+3858.+plotvalue+X+-30+330+plotrange+%7D%26map.domainparam=+%2Fplotaxislength+432+psdef+%2Fplotborder+72+psdef+%2FXOVY+null+psdef%26map.zoom=Zoom%26map.Y.plotfirst=89S%26map.X.plotfirst=30W%26map.X.units=degree_east%26map.X.modulus=360%26map.X.plotlast=30W%26map.correlation.plotfirst=-0.9960159%26map.correlation.units=unitless%26map.correlation.plotlast=0.9960159%26map.plotaxislength=432%26map.plotborder=72%26map.fnt=Helvetica%26map.fntsze=12%26map.color_smoothing=1%26map.XOVY=auto%26map.iftime=25%26map.mftime=25%26map.fftime=200</linkUrl><linkText>Corellation of Crop with SSTs per soil</linkText></link>");
//			sb.append("<link><linkUrl>http://iridl.ldeo.columbia.edu/expert/SOURCES/.IMD/.NCC1-2005/.v2p0/.rf/T/%28Jun%201971%29%28Sep%202009%29RANGE/T/monthlyAverage/T/4/runningAverage/T/12/STEP/%28/beluga/data/arindam/CropModelOutput/187/hist_cropmodel_Sorghum.nc%29readCDF/.CropOutput/T/1/shiftGRID/X/73.5/VALUE/Y/22.5/VALUE/X/removeGRID/Y/removeGRID/exch%5BT%5Dcorrelate/figviewer.html?map.url=X+Y+fig-+colors+coasts+lakes+-fig%26my.help=more+options</linkUrl><linkText>Corellation of Crop Output with rainfall per soil</linkText></link>");
//			sb.append("<link><linkUrl>http://iridl.ldeo.columbia.edu/expert/SOURCES/.NOAA/.ESRL/.PSD/.rean20thcent/.V2/.six-hourly/.monolevel/.sig995/.uwnd/time//T/renameGRID/T/monthlyAverage/T/%28Jun%201951%29%28Sep%202009%29RANGE/T/4/runningAverage/T/12/STEP/%28/beluga/data/arindam/CropModelOutput/187/hist_cropmodel_Sorghum.nc%29readCDF/.CropOutput/T/1/shiftGRID/X/72.5/VALUE/Y/22.5/VALUE/X/removeGRID/Y/removeGRID/exch%5BT%5Dcorrelate/figviewer.html?my.help=more+options%26map.soil.plotvalue=3858.%26map.lat.units=degree_north%26map.lat.plotlast=90N%26map.url=lon+lat+fig-+colors+coasts+lakes+-fig%26map.domain=+%7B+%2Fsoil+3676.+plotvalue+lat+-90.+90.+plotrange+%7D%26map.domainparam=+%2Fplotaxislength+432+psdef+%2Fplotborder+72+psdef%26map.zoom=Zoom%26map.lat.plotfirst=90S%26map.lon.plotfirst=1W%26map.lon.units=degree_east%26map.lon.modulus=360%26map.lon.plotlast=1W%26map.correlation.plotfirst=-0.9960159%26map.correlation.units=unitless%26map.correlation.plotlast=0.9960159%26map.newurl.grid0=lon%26map.newurl.grid1=lat%26map.newurl.land=draw+coasts%26map.newurl.plot=colors%26map.plotaxislength=432%26map.plotborder=72%26map.fnt=Helvetica%26map.fntsze=12%26map.XOVY=auto%26map.color_smoothing=1%26map.framelbl=framelabelstart%26map.framelabeltext=%26map.iftime=25%26map.mftime=25%26map.fftime=200</linkUrl><linkText>Corellation of Crop with u-wind per soil</linkText></link>");
//			sb.append("<link><linkUrl>http://iridl.ldeo.columbia.edu/expert/SOURCES/.NOAA/.ESRL/.PSD/.rean20thcent/.V2/.six-hourly/.monolevel/.sig995/.vwnd/time//T/renameGRID/T/monthlyAverage/T/%28Jun%201951%29%28Sep%202009%29RANGE/T/4/runningAverage/T/12/STEP/%28/beluga/data/arindam/CropModelOutput/187/hist_cropmodel_Sorghum.nc%29readCDF/.CropOutput/T/1/shiftGRID/X/72.5/VALUE/Y/22.5/VALUE/X/removeGRID/Y/removeGRID/exch%5BT%5Dcorrelate/lon/lat/fig-/colors/coasts/-fig//soil/3858./plotvalue/lat/-90/90/plotrange//XOVY/null/psdef//plotborder/72/psdef//plotaxislength/432/psdef/figviewer.html?map.here.x=250%26map.here.y=119%26map.url=+%26map.domain=+%7B+%2Fsoil+3676.+plotvalue+%7D%26map.domainparam=+%2Fplotaxislength+432+psdef+%2Fplotborder+72+psdef+%2FXOVY+null+psdef%26map.lon.width=360.%26map.lat.width=180.%26map.plotaxislength=432%26map.plotborder=72%26map.fnt=Helvetica%26map.fntsze=12%26map.color_smoothing=1%26map.XOVY=auto%26map.iftime=25%26map.mftime=25%26map.fftime=200</linkUrl><linkText>Corellation of crop model with v-wind per soil</linkText></link>");
//			sb.append("<link><linkUrl>http://iridl.ldeo.columbia.edu/expert/%28/beluga/data/arindam/CropModelOutput/187/hist_cropmodel_Sorghum.nc%29readCDF/.CropOutput/soil/3858/VALUE/X/72.5/VALUE/Y/22.5/VALUE/%28/beluga/data/arindam/CropModelOutput/187/hist_cropmodel_Sorghum.nc%29readCDF/.CropOutput/soil/3858/VALUE/X/73.5/VALUE/Y/22.5/VALUE/%28/beluga/data/arindam/CropModelOutput/187/hist_cropmodel_Sorghum.nc%29readCDF/.CropOutput/soil/3858/VALUE/X/73.5/VALUE/Y/23.5/VALUE/T/fig-/green/line/red/line/blue/line/-fig//rf/1.043575/13.73149/plotrange//rf/1.043575/13.73149/plotrange//plotaxislength/432/psdef//XOVY/null/psdef//plotborder/72/psdef/</linkUrl><linkText>Crop Response to soil on historical data</linkText></link>");
			sb.append("</links></simulation>");
			responseVal = sb;
		}
		//System.out.println(responseVal.toString());
		//out.println(responseVal);
	}

	private void runSimulation(String simCode,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		PrintWriter out = response.getWriter();
		
		WeatherPredictionVO objWeather = setSimulationParameters(request);
		long id = simId++;
		SimDetailsVO simDetailsVO = new SimDetailsVO();
		getSimDetailsMap().put(id, simDetailsVO);
		
		runSimulation(objWeather, id, simCode);
		
		StringBuilder responseVal = new StringBuilder(
				"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><simulation>");
		responseVal.append("<simId>" + id + "</simId>");
		responseVal.append("</simulation>");
		System.out.println(responseVal.toString());
		
		//out.println(responseVal);
	}

	private WeatherPredictionVO setSimulationParameters(HttpServletRequest request) {
		// reading the user input
		long countryNo = Long.parseLong(request.getParameter("countryNo"));
		String country = request.getParameter("country");
		String state = request.getParameter("state");
		String district = request.getParameter("district");
		String crop = request.getParameter("crop");
		String gcm = request.getParameter("gcm");
		String cropSeason = request.getParameter("cropseason");
		String gcmSeason = request.getParameter("gcmseason");

		WeatherPredictionVO objWeather = new WeatherPredictionVO();
		objWeather.setCountryNo(countryNo);
		objWeather.setCountry(country);
		objWeather.setState(state);
		objWeather.setDistrict(district);
		objWeather.setCrop(crop);
		objWeather.setCropSeason(cropSeason);
		objWeather.setGcm(gcm);
		objWeather.setGcmSeason(gcmSeason);
		
		System.out.println("country No :" + countryNo);
		System.out.println("country :" + country);
		System.out.println("state :" + state);
		System.out.println("district :" + district);
		System.out.println("crop :" + crop);
		System.out.println("gcm :" + gcm);
		System.out.println("cropSeason :" + cropSeason);
		System.out.println("gcmSeason :" + gcmSeason);
		
		return objWeather;
	}

	private void runSimulation(
			final WeatherPredictionVO objWeather, final long id, final String simCode) {
		Runnable r = new CallDODS(objWeather, id, simCode);
		new Thread(r).start();
	}

	/**
	 * @return the simDetailsMap
	 */
	public static Map<Long, SimDetailsVO> getSimDetailsMap() {
		return simDetailsMap;
	}

	/**
	 * @param simDetailsMap the simDetailsMap to set
	 */
	public static void setSimDetailsMap(Map<Long, SimDetailsVO> simDetailsMap) {
		CropModel.simDetailsMap = simDetailsMap;
	}
	
}