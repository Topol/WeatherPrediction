<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Crop Model Simulation</title>
<script language="javascript" src="script/CropModel.js"></script>
  <link rel="stylesheet" href="style/jquery-ui.css" />
  <script src="script/jquery-1.10.1.min.js"></script>
  <script src="script/jquery-ui.min.js"></script>
  <link rel="stylesheet" href="style/style.css" />
  <script>
  $(function() {
    $( "#simTabs" ).tabs();
  });

  </script>
</head>
<body>
<h2></h2>
    	
<form method="post" action="CropModel" name="DODSForm">
  <ul style='list-style-type:none;margin-left: 50px;'>
  <li><label><font color="red">All fields are mandatory</font></label></li>
  <li><br/></li>
  <li><b>Country:</b><img src="images/spacer.gif" width="148px" height="1px">
  	<select onchange="updateState()" name="selCountry" id="selCountry" STYLE="font-family : verdana; font-size : 8pt"> 
		<option  value="0" selected>..Select Country..</option>
		<OPTION VALUE="1">India</OPTION>
		<OPTION VALUE="2">Brazil</OPTION>
		<OPTION VALUE="3">Uruguay</OPTION> 
	</select><br/><br/></li>
  <li><b>State:</b><img src="images/spacer.gif" width="170px" height="1px"><select onchange="updateDistrict()" id="selState" name="selState" STYLE="font-family : verdana; font-size : 8pt">
		<option value="0" selected></option> 
	</select><br/><br/></li>
  <li><b>District:</b><img src="images/spacer.gif" width="155px" height="1px"><select name="selDistrict" id="selDistrict" STYLE="font-family : verdana; font-size : 8pt">
		<option value="0" selected></option>
	</select><br/><br/></li>
  <li><b>Crop name:</b><img src="images/spacer.gif" width="132px" height="1px"><select name="selCropName" id="selCropName" style="font-family : verdana; font-size : 8pt">
			<option value="0" selected>..Select..</option> 
			<option value="1">Wheat</option>
			<option value="2">Rice</option>
			<option value="3">Maize</option>
			<option value="4">Millet</option>
			<option value="5">Barley</option>
			<option value="6">Bajra</option>
			<option value="7">Sorghum</option>
			<option value="8">Peanut</option>
			<option value="9">Sugarcane</option>
			<option value="10">Soyabean</option> 
			<option value="11">Cabbage</option>
			<option value="12">Chickpea</option>
			<option value="13">Pineapple</option>
			<option value="14">Potato</option>
			<option value="15">GreenBean</option>
			<option value="16">Cotton</option>
			<option value="17">CowPea</option>
			<option value="18">DryBean</option>
			
			</select><br/><br/></li>
 
   <li><b>Cropping Season:</b><img src="images/spacer.gif" width="100px" height="1px"><select name="selCropSeason" id="selCropSeason" style="font-family : verdana; font-size : 8pt">
			<option value="0" selected>..Select..</option> 
			<option value="1">JFMA</option>
			<option value="2">FMAM</option>
			<option value="3">MAMJ</option>
			<option value="4">AMJJ</option>
			<option value="5">MJJA</option>
			<option value="6">JJAS</option>
			<option value="7">JASO</option>
			<option value="8">ASON</option>
			<option value="9">SOND</option>
			<option value="10">ONDJ</option>
			<option value="11">NDJF</option>
			<option value="12">DJFM</option>
		</select><br/><br/></li>
		
  <li><b>General Circulation Model:</b><img src="images/spacer.gif" width="25px" height="1px"><select name="selGeneralCirculationModel" id="selGeneralCirculationModel" style="font-family : verdana; font-size : 8pt">
			<option value="0" selected>..Select..</option> 
			<option value="1">COLA-RSMAS-CCSM35</option>
			<option value="2">CPC-CMAP</option>
			<option value="3">CPC-PRECIP</option>
			<option value="4">GFDL-CM2p1</option>
			<option value="5">GHCN_CAMS</option>
			<option value="6">IRI-ECHAM4p5-AnomalyCoupled</option>
			<option value="7">IRI-ECHAM4p5-DirectCoupled</option>
			<option value="8">LSMASK</option>
			<option value="9">GHCN_CAMS</option>
			<option value="10">IRI-ECHAM4p5-AnomalyCoupled</option>
			<option value="11">IRI-ECHAM4p5-DirectCoupled</option>
			<option value="12">LSMASK</option> 
		</select><br/><br/></li>
		
 <li><b>Forecast initialization month:</b><img src="images/spacer.gif" width="100px" height="1px"><select name="selGCMSeason" id="selGCMSeason" style="font-family : verdana; font-size : 8pt">
			<option value="0" selected>..Select..</option> 
			<option value="1">Jan</option>
			<option value="2">Feb</option>
			<option value="3">Mar</option>
			<option value="4">Apr</option>
			<option value="5">May</option>
			<option value="6">Jun</option>
			<option value="7">Jul</option>
			<option value="8">Aug</option>
			<option value="9">Sep</option>
			<option value="10">Oct</option>
			<option value="11">Nov</option>
			<option value="12">Dec</option>
		</select><br/><br/>
</li>
 <li><a href="javascript:openWin('jsp/NHMMInputSeeds.jsp', 'NHMM Input Seeds');">NHMM Input seeds</a> 
 <input id="nhmmInputSeedVal1" type="hidden" value="10"/>
 <input id="nhmmInputSeedVal2" type="hidden" value="10"/>
 </li>

 <li><a href="javascript:openWin('jsp/cmgaparam.jsp', 'Crop Model Genetic Parameters');"> Crop Model Genetic Parameters</a>
 <input id="cmgaParameterVal1" type="hidden" value="10"/>
 <input id="cmgaParameterVal2" type="hidden" value="10"/>
 </li>

 <li><a href="javascript:openWin('jsp/planting.jsp', 'Planting Details');"> Planting Details</a>
 <input id="cmgaParameterVal1" type="hidden" value="10"/>
 <input id="cmgaParameterVal2" type="hidden" value="10"/>
 </li>

 <li><a href="javascript:openWin('jsp/irrigation.jsp', 'Planting Details');"> Irrigation Details</a>
 <input id="cmgaParameterVal1" type="hidden" value="10"/>
 <input id="cmgaParameterVal2" type="hidden" value="10"/>
 </li>

 <li><a href="javascript:openWin('jsp/fertilizer.jsp', 'Fertilizer Details');"> Fertilizer Details</a>
 <input id="cmgaParameterVal1" type="hidden" value="10"/>
 <input id="cmgaParameterVal2" type="hidden" value="10"/>
 </li>
 
 <li>
  <input type="button" id="cmhBtn" value="Run CropModel(Historical Yield) Simulation" onClick="runSimulation('cmh')"/>&nbsp;&nbsp;&nbsp;&nbsp;
  <input type="button" id="cmnhmmBtn" value="Run CropModel(NHMM Predictions) Simulation" onClick="runSimulation('cmnhmm')"/>&nbsp;&nbsp;&nbsp;&nbsp;
  <input type="button" id="rmnhmmBtn" value="Run NHMM on rainfall Simulation" onClick="runSimulation('rmnhmm')"/>&nbsp;&nbsp;&nbsp;&nbsp;
 </li>
  </ul>
 </form>
 
 <div id="simTabs">
  <ul id="simTabsHeader">
    <li><a href="#cmh">Crop Model(Historical Yield)</a></li>
    <li><a href="#cmnhmm">Crop Model NHMM</a></li>
    <li><a href="#rmnhmm">RainFall Model NHMM</a></li>
  </ul>
  <div id="cmh">
    <h2>Simulation Status</h2>
	 <input id="cmhSimId" type="hidden" value="0"/>
	 
	 <!--  1 denotes In Progress, 0 denotes Not Executed or Completed with either Success or Failure. Status will be checked only if Status is 1 -->
	 <input id="cmhSimStatus" type="hidden" value="0"/> 

	 <div id="cmhSimHeader" style="display:none">
	 <h3><font color="red">Simulation Parameters: </font></h3><label id='cmhSimParams'></label>
	 </div>
	 <div><br/></div>
	 <div id="cmhSimLoader" style="display:none"></div>
	 <div id="cmhSimOutput" style="display:block"></div>
  </div>
  <div id="cmnhmm">
    <h2>Simulation Status</h2>
	 <input id="cmnhmmSimId" type="hidden" value="0"/>

	 <!--  1 denotes In Progress, 0 denotes Not Executed or Completed with either Success or Failure. Status will be checked only if Status is 1 -->
	 <input id="cmnhmmSimStatus" type="hidden" value="0"/> 

	 <div id="cmnhmmSimHeader" style="display:none">
	 <h3><font color="red">Simulation Parameters: </font></h3><label id='cmnhmmSimParams'></label>
	 </div>
	 <div><br/></div>
	 <div id="cmnhmmSimLoader" style="display:none"></div>
	 <div id="cmnhmmSimOutput" style="display:block"></div>
  </div>
  <div id="rmnhmm">
    <h2>Simulation Status</h2>
	 <input id="rmnhmmSimId" type="hidden" value="0"/>
	 
	 <!--  1 denotes In Progress, 0 denotes Not Executed or Completed with either Success or Failure. Status will be checked only if Status is 1 -->
	 <input id="rmnhmmSimStatus" type="hidden" value="0"/> 

	 <div id="rmnhmmSimHeader" style="display:none">
	 <h3><font color="red">Simulation Parameters: </font></h3><label id='rmnhmmSimParams'></label>
	 </div>
	 <div><br/></div>
	 <div id="rmnhmmSimLoader" style="display:none"></div>
	 <div id="rmnhmmSimOutput" style="display:block"></div>
  </div>
</div>
 
</body>
</html>