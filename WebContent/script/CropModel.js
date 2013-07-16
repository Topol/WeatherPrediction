/*
   Provide the XMLHttpRequest constructor for IE 5.x-6.x:
   Other browsers (including IE 7.x-8.x) do not redefine
   XMLHttpRequest if it already exists.
 
   This example is based on findings at:
   http://blogs.msdn.com/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx
 */

// stores the reference to the XMLHttpRequest object
var xmlHttp = createXmlHttpRequestObject();

// creates an XMLHttpRequest instance
function createXmlHttpRequestObject() {
	// will store the reference to the XMLHttpRequest object
	var xmlHttp = null;
	// this should work for all browsers except IE6 and older
	try {
		// try to create XMLHttpRequest object
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		// assume IE6 or older
		var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0",
				"MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0",
				"MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP");
		// try every prog id until one works
		for ( var i = 0; i < XmlHttpVersions.length && !xmlHttp; i++) {
			try {
				// try to create XMLHttpRequest object
				xmlHttp = new ActiveXObject(XmlHttpVersions[i]);
			} catch (e) {
			}
		}
	}
	// return the created object or display an error message
	if (!xmlHttp)
		alert("Error creating the XMLHttpRequest object.");
	else
		return xmlHttp;
}

// retrieves the XMLHttpRequest object
function createXmlHttpRequestObject_small() {
	// will store the reference to the XMLHttpRequest object
	var xmlHttp;
	// if running Internet Explorer
	if (window.ActiveXObject) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			xmlHttp = false;
		}
	}
	// if running Mozilla or other browsers
	else {
		try {
			xmlHttp = new XMLHttpRequest();
		} catch (e) {
			xmlHttp = false;
		}
	}
	// return the created object or display an error message
	if (!xmlHttp) {
		alert("Error creating the XMLHttpRequest object.");
	} else {
		return xmlHttp;
	}
}

// make asynchronous HTTP request using the XMLHttpRequest object 
function updateState() {
	xmlHttp = createXmlHttpRequestObject();

	// proceed only if the xmlHttp object isn't busy
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
		// retrieve the Country  selected by the user on the form
		countryNo = document.DODSForm.selCountry.value;
//		alert(countryNo);
		// Remove all entries from State drop down
		objSelectState = document.DODSForm.selState;

		optionLen = objSelectState.options.length;
///		alert(optionLen);

		// remove all options from dropdown and change
		for ( var i = 1; i <= optionLen; i = i + 1) {
			objSelectState.options[0] = null;
			//alert(i);
		}

		// Remove all entries from District drop down
		objSelectDistrict = document.DODSForm.selDistrict;

		optionLen = objSelectDistrict.options.length;
		//alert(optionLen);

		// remove all options from dropdown and change
		for ( var i = 1; i <= optionLen; i = i + 1) {
			objSelectDistrict.options[0] = null;
			//alert(i);
		}

		if (countryNo != "0"){
			// execute the GetState.jsp page from the server
			xmlHttp.open("GET", "jsp/GetState.jsp?cntryNo=" + countryNo, true);
			// define the method to handle server responses
			xmlHttp.onreadystatechange = handleStateResponse;
			// make the server request
			xmlHttp.send(null);
		}
	} else
		// if the connection is busy, try again after one second  
		setTimeout('updateState()', 1000);
}

// executed automatically when a message is received from the server fetching State List
function handleStateResponse() {
	objSelectState = document.DODSForm.selState;

	// http post call is made
	if (xmlHttp.readyState == 1) {
		// remove all options from dropdown and change 
		// value to "Loading..."

		var optionLen = objSelectState.options.length;
		//alert(optionLen);

		// remove all options from dropdown and change
		for ( var i = 1; i <= optionLen; i = i + 1) {
			objSelectState.options[0] = null;
			//alert(i);
		}

		var option = document.createElement("OPTION");
		objSelectState.options.add(option);
		option.innerHTML = "Loading...";

		// Remove all entries from District drop down
		objSelectDistrict = document.DODSForm.selDistrict;

		var optionLen = objSelectDistrict.options.length;
		//alert(optionLen);

		// remove all options from dropdown and change
		for ( var i = 1; i <= optionLen; i = i + 1) {
			objSelectDistrict.options[0] = null;
			//alert(i);
		}
	}

	// move forward only if the transaction has completed
	if (xmlHttp.readyState == 4) {

		// status of 200 indicates the transaction completed successfully
		if (xmlHttp.status == 200) {
			var optionLen = objSelectState.options.length;
			//alert(optionLen);

			// remove all options from dropdown and change
			for ( var i = 1; i <= optionLen; i = i + 1) {
				objSelectState.options[0] = null;
				//alert(i);
			}

			// extract the XML retrieved from the server
			xmlResponse = xmlHttp.responseXML;
			// alert(xmlResponse);

			parseStateResponseXML(xmlResponse);
		}
		// a HTTP status different than 200 signals an error
		else {
			alert("There was a problem accessing the server: "
					+ xmlHttp.statusText);
		}
	}
}

// Parse the State response XML and add State dropdown options
function parseStateResponseXML(xmlResponse) {
	rootNode = xmlResponse.documentElement;
	if (rootNode == null)
		alert("Could not retrieve States");
	else {
		objSelectState = document.DODSForm.selState;
		StateNodes = rootNode.getElementsByTagName('State');
		if (StateNodes.length > 0) {
			var option = document.createElement("OPTION");
			objSelectState.options.add(option);
			option.innerHTML = "..Select State..";
			option.value = "0";

			for ( var i = 0; i < StateNodes.length; i++) {
				State = StateNodes[i];
				var StateId = State.getElementsByTagName('id')[0].firstChild.nodeValue;
				var StateName = State.getElementsByTagName('name')[0].firstChild.nodeValue;
				var option = document.createElement("OPTION");
				objSelectState.options.add(option);
				option.value = StateId;
				option.innerHTML = StateName;
			}
		}
	}
}

//make asynchronous HTTP request using the XMLHttpRequest object 
function updateDistrict() {
	xmlHttp = createXmlHttpRequestObject();
	// proceed only if the xmlHttp object isn't busy
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
		// retrieve the Country  selected by the user on the form
		countryNo = document.DODSForm.selCountry.value;
		stateNo = document.DODSForm.selState.value;
		if (stateNo == "0") {
			objSelectDistrict = document.DODSForm.selDistrict;
			var optionLen = objSelectDistrict.options.length;
			//alert(optionLen);
			// remove all options from dropdown and change
			for ( var i = 1; i <= optionLen; i = i + 1) {
				objSelectDistrict.options[0] = null;
				//alert(i);
			}

		} else {

			// execute the GetDistrict.jsp page from the server
			xmlHttp.open("GET", "jsp/GetDistrict.jsp?cntryNo=" + countryNo
					+ "&stateNo=" + stateNo, true);
			// define the method to handle server responses
			xmlHttp.onreadystatechange = handleDistrictResponse;
			// make the server request
			xmlHttp.send(null);
		}
	} else
		// if the connection is busy, try again after one second  
		setTimeout('updateDistrict()', 1000);
}

// executed automatically when a message is received from the server fetching District List
function handleDistrictResponse() {
	objSelectDistrict = document.DODSForm.selDistrict;

	// http post call is made
	if (xmlHttp.readyState == 1) {
		// remove all options from dropdown and change 
		// value to "Loading..."

		var optionLen = objSelectDistrict.options.length;
		//alert(optionLen);

		// remove all options from dropdown and change
		for ( var i = 1; i <= optionLen; i = i + 1) {
			objSelectDistrict.options[0] = null;
			//alert(i);
		}

		var option = document.createElement("OPTION");
		objSelectDistrict.options.add(option);
		option.innerHTML = "Loading...";

	}

	// move forward only if the transaction has completed
	if (xmlHttp.readyState == 4) {

		// status of 200 indicates the transaction completed successfully
		if (xmlHttp.status == 200) {
			var optionLen = objSelectDistrict.options.length;
			//alert(optionLen);

			// remove all options from dropdown and change
			for ( var i = 1; i <= optionLen; i = i + 1) {
				objSelectDistrict.options[0] = null;
				//alert(i);
			}

			// extract the XML retrieved from the server
			xmlResponse = xmlHttp.responseXML;
			// alert(xmlResponse);

			parseDistrictResponseXML(xmlResponse);
		}
		// a HTTP status different than 200 signals an error
		else {
			alert("There was a problem accessing the server: "
					+ xmlHttp.statusText);
		}
	}
}

// Parse the District response XML and add District dropdown options
function parseDistrictResponseXML(xmlResponse) {
	rootNode = xmlResponse.documentElement;
	if (rootNode == null)
		alert("Could not retrieve Regions");
	else {
		objSelectDistrict = document.DODSForm.selDistrict;
		DistrictNodes = rootNode.getElementsByTagName('Region');
		if (DistrictNodes.length > 0) {
			var option = document.createElement("OPTION");

			objSelectDistrict.options.add(option);
			option.innerHTML = "..Select..";
			option.value = "0";

			for ( var i = 0; i < DistrictNodes.length; i++) {
				District = DistrictNodes[i];
				var DistrictId = District.getElementsByTagName('id')[0].firstChild.nodeValue;
				var RegionName = District.getElementsByTagName('name')[0].firstChild.nodeValue;
				var option = document.createElement("OPTION");
				objSelectDistrict.options.add(option);
				option.value = DistrictId;
				option.innerHTML = RegionName;
			}
		}
	}
}







//make asynchronous HTTP request to Start Simulation using the XMLHttpRequest object 
function runSimulation(simCode) {
//	alert(simCode);
//	alert(document.DODSForm.nhmmInputSeedVal1.value);
//	alert(document.DODSForm.nhmmInputSeedVal2.value);
//	alert(document.DODSForm.cmgaParameterVal1.value);
//	alert(document.DODSForm.cmgaParameterVal2.value);

	
	countryNo = document.DODSForm.selCountry.value;
	stateNo = document.DODSForm.selState.value;
	districtNo = document.DODSForm.selDistrict.text;
	//districtID = document.DODSForm.selDistrict.ID;
	cropNo = document.DODSForm.selCropName.value;
	generalCirculationModel = document.DODSForm.selGeneralCirculationModel.value;
	cropSeasonNo = document.DODSForm.selCropSeason.value;
	gcmSeasonNo = document.DODSForm.selGCMSeason.value;
	nhmmInputSeedVal1 = document.DODSForm.nhmmInputSeedVal1.value;
	nhmmInputSeedVal2 = document.DODSForm.nhmmInputSeedVal2.value;
	cmgaParameterVal1 = document.DODSForm.cmgaParameterVal1.value;
	cmgaParameterVal2 = document.DODSForm.cmgaParameterVal2.value;
	
	if (countryNo == "0" || stateNo == "0" || districtNo == "0"
			|| cropNo == "0" || generalCirculationModel == "0"
			|| cropSeasonNo == "0" || gcmSeasonNo == "0"
			|| nhmmInputSeedVal1 == "0" || nhmmInputSeedVal2 == "0"
			|| cmgaParameterVal1 == "0" || cmgaParameterVal1=="0"
			|| nhmmInputSeedVal1 == "" || nhmmInputSeedVal2 == ""
			|| cmgaParameterVal1 == "" || cmgaParameterVal1=="") {
		alert("Please select all fields and then try!!");
	} else {
		// retrieve the values selected by the user on the form
		countryObj = document.DODSForm.selCountry;
		country = countryObj.options[countryObj.selectedIndex].text;
		// Use this For Text value i.e India

		stateObj = document.DODSForm.selState;
		districtObj = document.DODSForm.selDistrict;
		cropNameObj = document.DODSForm.selCropName;
		gcmObj = document.DODSForm.selGeneralCirculationModel;
		cropSeasonObj = document.DODSForm.selCropSeason;
		gcmSeasonObj = document.DODSForm.selGCMSeason;

		state = stateObj.options[stateObj.selectedIndex].text;
		district = districtObj.options[districtObj.selectedIndex].value;
		cropName = cropNameObj.options[cropNameObj.selectedIndex].text;
		gcm = gcmObj.options[gcmObj.selectedIndex].text;
		cropSeason = cropSeasonObj.options[cropSeasonObj.selectedIndex].text;
		gcmSeason = gcmSeasonObj.options[gcmSeasonObj.selectedIndex].text;

		contextString = 'CropModel?a=run&s=' + simCode + '&countryNo=' + countryNo 
				+ '&country=' + country + '&state=' + state + '&district=' 
				+ district + '&crop=' + cropName + '&gcm=' + gcm 
				+ '&cropseason=' + cropSeason + '&gcmseason=' + gcmSeason
				+ '&nhmmInputSeedVal1=' + nhmmInputSeedVal1 + '&nhmmInputSeedVal2=' + nhmmInputSeedVal2
				+ '&cmgaParamVal1=' + cmgaParameterVal1 + '&cmgaParamVal2=' + cmgaParameterVal2;
//		alert(contextString);

		document.getElementById(simCode + 'SimId').value = 0;
		document.getElementById(simCode + 'SimStatus').value = 0;
		document.getElementById(simCode + 'Btn').disabled = true;
		simParams = 'Country=' + country + ', State=' + state + ', District=' 
					+ district + ', Crop Name=' + cropName + ', Cropping Season=' 
					+ cropSeason + ',  <br/> General Circulation Model=' + gcm 
					+ ', Forecast initialization month=' + gcmSeason;
		
		simParamObj = document.getElementById(simCode + 'SimParams');
		simParamObj.innerHTML = simParams;
		document.getElementById(simCode + 'SimHeader').style.display = 'block';
		simParamObj.style.display = 'block';
		
		simulationLoader = document.getElementById(simCode + 'SimLoader');
		simulationLoader.style.display = 'block';
		simulationLoader.innerHTML = '<img src="images/loading.gif" width="150">';

		xmlHttpSim = createXmlHttpRequestObject();

		xmlHttpSim.open('GET', contextString, true);

		// define the method to handle server responses
		xmlHttpSim.onreadystatechange = function() {
			//alert("simCode: " + simCode);
			//alert(xmlHttpSim.readyState);
			if (xmlHttpSim.readyState == 4) {
				if (xmlHttpSim.status == 200) {
					// extract the XML retrieved from the server
					xmlResponse = xmlHttpSim.responseXML;
					//alert(xmlResponse);
					parseSimulationResponseXML(xmlResponse, simCode);
				}else{
					handleSimErrorResponse(simCode);			
				}
			}
		};

		// make the server request
		xmlHttpSim.send(null);
	}
}

function handleSimErrorResponse(simCode){
	simulationLoader = document.getElementById(simCode + 'SimLoader');
	simulationLoader.style.display = 'none';
	simulationLoader.innerHTML = "";
	
	simulationOutput = document.getElementById(simCode + 'SimOutput');
	simulationOutput.innerHTML = '<Font color="red" size="+1">Error during Simulation run. Please try again!!</font>';
	simulationOutput.style.display = 'block';
	
	document.getElementById(simCode + 'SimId').value = 0;
	document.getElementById(simCode + 'SimStatus').value = 0;
	document.getElementById(simCode + 'Btn').disabled = false;
}

//Parse the Simulation response XML and  update simulation output
function parseSimulationResponseXML(xmlResponse, simCode) {
	//alert(simCode);
	//alert(xmlResponse);
	rootNode = xmlResponse.documentElement;
	if (rootNode == null){
		//alert("Could not retrieve Id");
		handleSimErrorResponse(simCode);
	} else {
		simId = rootNode.getElementsByTagName('simId')[0].firstChild.nodeValue;
		//alert(simId);
		document.getElementById(simCode + 'SimId').value = simId;
		document.getElementById(simCode + 'SimStatus').value = 1;
		
		simulationLoader = document.getElementById(simCode + 'SimLoader');
		simulationLoader.style.display = 'none';
		simulationLoader.innerHTML = "";
		
		checkSimulationStatus(simCode);
	}
}

function checkSimulationStatus(simCode){
	//alert("checkSimulationStatus: " + simCode);
	simId = document.getElementById(simCode + 'SimId').value;
	//alert("checkSimulationStatus: " + simId);
	simStatus = document.getElementById(simCode + 'SimStatus').value;
	//alert("checkSimulationStatus: " + simStatus);
	if(simId > 0 && simStatus == 1){
		setTimeout('checkSimulationStatus("' + simCode + '")', 1000); //Set refresh time in millisec
		// retrieve the values selected by the user on the form
		xmlHttpStatus = createXmlHttpRequestObject();
		contextString = 'CropModel?a=status&i=' + simId;
		//alert(contextString);
		xmlHttpStatus.open('GET', contextString, true);
	
		// define the method to handle server responses
		xmlHttpStatus.onreadystatechange = function(){
			if (xmlHttpStatus.readyState == 4) {
				if (xmlHttpStatus.status == 200) {
					// extract the XML retrieved from the server
					xmlResponse = xmlHttpStatus.responseXML;
					//alert(xmlResponse);
					parseSimulationStatusResponseXML(simCode, xmlResponse);
				}else{
					showSimulationOutput(simCode, "");
				}
			}
		};
		// make the server request
		xmlHttpStatus.send(null);
	}
	
}


//Parse the Simulation response XML and  update simulation output
function parseSimulationStatusResponseXML(simCode, xmlResponse) {
	var str = "";
	if (xmlResponse == null || xmlResponse.documentElement == null){
		//alert("Could not retrieve Links");
	} else {
		rootNode = xmlResponse.documentElement;
		status = rootNode.getElementsByTagName('status')[0].firstChild.nodeValue;
		//alert(status);
		statusMessage = rootNode.getElementsByTagName('statusMessage')[0].firstChild.nodeValue;
		//alert(statusMessage);
		if(status == 'Completed'){
			document.getElementById(simCode + 'SimStatus').value = 0;
			document.getElementById(simCode + 'Btn').disabled = false;
		}
		var today = new Date();
		var UTCstring = today.toUTCString();
		str = str + "<b>At " + UTCstring + "</b></br></br>";
		linkNodes = rootNode.getElementsByTagName('links')[0].getElementsByTagName('link');
		str = str + "<b>Status:<font color='green'>" + status + "</font></b><br/>" + statusMessage + "</b></br></br>";
		//alert("Number of linkNodes: " + linkNodes.length);
		if (linkNodes.length > 0) {
			str = str + "<ul>";
			var linkUrl;
			var linkText;
			for ( var i = 0; i < linkNodes.length; i++) {
				link = linkNodes[i];
				linkUrl = link.getElementsByTagName('linkUrl')[0].firstChild.nodeValue;
				linkText = link.getElementsByTagName('linkText')[0].firstChild.nodeValue;
				str = str + "<li><a href='" + linkUrl + "' target='_blank'>" + linkText + "</a></li>";
			}
			str = str + "</ul>";
		}
	}
	//alert(str);
	showSimulationOutput(simCode, str);
}



function showSimulationOutput(simCode, data) {
	//pause(3000);
//	alert(data);
	simulationOutput = document.getElementById(simCode + "SimOutput");
	if(data != ""){
		simulationOutput.innerHTML = data;
	}
}

function pause(millis) {
	var date = new Date();
	while ((Date.now() - date) < millis){};
}




/* Popup functions */
function openWin(url, name){
	window.open(url, name,"fullscreen=no,toolbar=yes, location=yes, directories=no, status=no, menubar=no, scrollbars=yes, resizable=0, copyhistory=yes, width=500, height=500");
}



