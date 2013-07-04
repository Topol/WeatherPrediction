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
		if (countryNo == "0") {
			// Remove all entries from State drop down
			objSelectState = document.DODSForm.selState;

			var optionLen = objSelectState.options.length;
			//alert(optionLen);

			// remove all options from dropdown and change
			for ( var i = 1; i <= optionLen; i = i + 1) {
				objSelectState.options[0] = null;
				//alert(i);
			}

			// Remove all entries from District drop down
			objSelectDistrict = document.DODSForm.selDistrict;

			var optionLen = objSelectDistrict.options.length;
			//alert(optionLen);

			// remove all options from dropdown and change
			for ( var i = 1; i <= optionLen; i = i + 1) {
				objSelectDistrict.options[0] = null;
				//alert(i);
			}

		} else {
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

//make asynchronous HTTP request using the XMLHttpRequest object 
function runCropModelHistorical() {
	setTimeout('runCropModelHistorical()', 1800000); //Set refresh time
	toggleSim = document.getElementById("toggleSim");
	//alert(toggleSim.value);
	if(toggleSim.value == 'Pause'){
		simName = document.getElementById("simulationName");
		simName.innerHTML = 'Crop Model Historical';
		
		// retrieve the values selected by the user on the form
		xmlHttp = createXmlHttpRequestObject();
		countryNo = document.DODSForm.selCountry.value;
		stateNo = document.DODSForm.selState.value;
		districtNo = document.DODSForm.selDistrict.value;
		cropNo = document.DODSForm.selCropName.value;
		generalCirculationModel = document.DODSForm.selGeneralCirculationModel.value;
		cropSeasonNo = document.DODSForm.selCropSeason.value;
		gcmSeasonNo = document.DODSForm.selGCMSeason.value;
		if (countryNo == "0" || stateNo == "0" || districtNo == "0"
				|| cropNo == "0" || generalCirculationModel == "0" 
					|| cropSeasonNo =="0" || gcmSeasonNo == "0") {
			//Do Nothing
	
		} else {
			countryObj = document.DODSForm.selCountry;
			country = countryObj.options[countryObj.selectedIndex].text; // Use this For Text value i.e India
			
			stateObj = document.DODSForm.selState;
			districtObj = document.DODSForm.selDistrict;
			cropNameObj = document.DODSForm.selCropName;
			gcmObj = document.DODSForm.selGeneralCirculationModel;
			cropSeasonObj = document.DODSForm.selCropSeason;
			gcmSeasonObj = document.DODSForm.selGCMSeason;
			
			state = stateObj.options[stateObj.selectedIndex].text;
			district = districtObj.options[districtObj.selectedIndex].text;
			cropName = cropNameObj.options[cropNameObj.selectedIndex].text;
			gcm = gcmObj.options[gcmObj.selectedIndex].text;
			cropSeason = cropSeasonObj.options[cropSeasonObj.selectedIndex].text;
			gcmSeason = gcmSeasonObj.options[gcmSeasonObj.selectedIndex].text;
			
			contextString = 'CropModel?a=status&s=CropModelHistorical&country=' + country
				+ '&state=' + state + '&district=' + district + '&crop=' + cropName
				+ '&gcm=' + gcm + '&cropseason=' + cropSeason + '&gcmseason=' + gcmSeason;
			//alert(contextString);
			xmlHttp.open('GET', contextString, true);
			
	//		xmlHttp.open("GET", "jsp/GetCropModel.jsp?cntryNo=" + countryNo
	//				+ "&stateNo=" + stateNo + "&districtNo=" + districtNo
	//				+ "&cropName=" + cropName, true);
			// define the method to handle server responses
			xmlHttp.onreadystatechange = handleModelResponse;
			// make the server request
			xmlHttp.send(null);
		}
	}
}

function handleModelResponse() {
	//alert(xmlHttp.readyState);
	if (xmlHttp.readyState == 1) {

	}
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			// extract the XML retrieved from the server
			xmlResponse = xmlHttp.responseXML;
			parseModelResponseXML(xmlResponse);
		}else{
			showSimulationOutput("");
		}
	}
}

//Parse the Model response XML and  update simulation output
function parseModelResponseXML(xmlResponse) {
	document.getElementById("simulationOutput").style.display = 'none';
	document.getElementById("simulationHeader").style.display = 'none';
	simulationLoader = document.getElementById("simulationLoader");
	simulationLoader.style.display = 'block';
	simulationLoader.innerHTML = '<img src="images/loading.gif" width="300">';
	
	rootNode = xmlResponse.documentElement;
	xmlHttp = createXmlHttpRequestObject();
	var str = "";
	if (rootNode == null){
		//alert("Could not retrieve Links");
	} else {
		linkNodes = rootNode.getElementsByTagName('link');
		//alert("Number of linkNodes: " + linkNodes.length);
		if (linkNodes.length > 0) {
			str = "<ul>";
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
	showSimulationOutput(str);
}

function showSimulationOutput(data) {
	//pauseProcess(3000);
//	alert(data);
//	simStatusTime = document.getElementById("simulationStatusTime");
//	var today = new Date();
//	var UTCstring = today.toUTCString();
//	
	simulationOutput = document.getElementById("simulationOutput");
	if(data != ""){
		simulationOutput.innerHTML = data;
	//	simStatusTime.innerHTML = UTCstring;
	}
	document.getElementById("simulationOutput").style.display = 'block';
//	simulationLoader = document.getElementById("simulationLoader");
//	simulationLoader.style.display = 'none';
//	simulationLoader.innerHTML = "";
	
	document.getElementById("simulationHeader").style.display = 'block';
//	simulationOutput.style.display = 'block';
}

function toggleSimulation(){
	toggleSim = document.getElementById("toggleSim");
	if(toggleSim.value == 'Pause'){
		toggleSim.value = 'Continue';
	}else{
		toggleSim.value = 'Pause';
	}
}


function pauseProcess(millis) {
	var date = new Date();
	while ((Date.now() - date) < millis){};
}






function checkSimulationStatus(){
//	alert(document.getElementById('simId').value);
//	alert(simCode);
	if(document.getElementById('simId').value == 0){
		setTimeout('checkSimulationStatus()', 100); //Set refresh time
		// retrieve the values selected by the user on the form
		xmlHttpStatus = createXmlHttpRequestObject();
		contextString = 'CropModel?a=status&s=CropModelHistorical';
		// alert(contextString);
		xmlHttpStatus.open('GET', contextString, true);
	
		// define the method to handle server responses
		xmlHttpStatus.onreadystatechange = handleSimulationStatusResponse;
		// make the server request
		xmlHttpStatus.send(null);
	}
	
}

function handleSimulationStatusResponse() {
	//alert(xmlHttp.readyState);
	if (xmlHttpStatus.readyState == 1) {

	}
	if (xmlHttpStatus.readyState == 4) {
		if (xmlHttpStatus.status == 200) {
			// extract the XML retrieved from the server
			xmlResponse = xmlHttpStatus.responseXML;
			//alert(xmlResponse);
			parseSimulationStatusResponseXML(xmlResponse);
		}else{
			showSimulationOutput("");
		}
	}
}

//Parse the Simulation response XML and  update simulation output
function parseSimulationStatusResponseXML(xmlResponse) {
	document.getElementById("simulationOutput").style.display = 'none';
//	document.getElementById("simulationHeader").style.display = 'none';
//	simulationLoader = document.getElementById("simulationLoader");
//	simulationLoader.style.display = 'block';
//	simulationLoader.innerHTML = '<img src="images/loading.gif" width="300">';
	var str = "";
	if (xmlResponse == null || xmlResponse.documentElement == null){
		//alert("Could not retrieve Links");
	} else {
		rootNode = xmlResponse.documentElement;
//		xmlHttp = createXmlHttpRequestObject();
		status = rootNode.getElementsByTagName('status')[0].firstChild.nodeValue;
		//alert(status);
		statusMessage = rootNode.getElementsByTagName('statusMessage')[0].firstChild.nodeValue;
		//alert(statusMessage);
		if(status == 'Completed'){
			document.getElementById('simId').value = -1;
		}
		str = str + "<b>Status:<font color='green'>" + status + "</font></b><br/>" + statusMessage + "</b></br></br>";
		linkNodes = rootNode.getElementsByTagName('links')[0].getElementsByTagName('link');
		//alert("Number of linkNodes: " + linkNodes.length);
		if (linkNodes.length > 0) {
			str = "<ul>";
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
	showSimulationOutput(str);
}



//make asynchronous HTTP request using the XMLHttpRequest object 
function runSimulation() {
		simListObj = document.getElementsByName("simList");
		var found = 0;
		for (var i = 0; i < simListObj.length; i++) {       
		    if (simListObj[i].checked) {
		        //alert(simListObj[i].value);
		        simCode = simListObj[i].value;
		        simName = document.getElementById(simCode).innerHTML;
		        //alert(simName);
	        	found = 1;
		        break;
		    }
		}
	   if(found == 0) {
	     alert("Please Select a Simulation to run");
	   }else{
		    document.getElementById('simId').value = 0;
		    setTimeout('checkSimulationStatus()', 100); //Set refresh time
			//alert(simName);
		   	simNameObj = document.getElementById("simulationName");
			simNameObj.innerHTML = simName;
			
			// retrieve the values selected by the user on the form
			xmlHttp = createXmlHttpRequestObject();
			countryNo = document.DODSForm.selCountry.value;
			stateNo = document.DODSForm.selState.value;
			districtNo = document.DODSForm.selDistrict.value;
			cropNo = document.DODSForm.selCropName.value;
			generalCirculationModel = document.DODSForm.selGeneralCirculationModel.value;
			cropSeasonNo = document.DODSForm.selCropSeason.value;
			gcmSeasonNo = document.DODSForm.selGCMSeason.value;
			if (countryNo == "0" || stateNo == "0" || districtNo == "0"
					|| cropNo == "0" || generalCirculationModel == "0" 
						|| cropSeasonNo =="0" || gcmSeasonNo == "0") {
				//Do Nothing
		
			} else {
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
				district = districtObj.options[districtObj.selectedIndex].text;
				cropName = cropNameObj.options[cropNameObj.selectedIndex].text;
				gcm = gcmObj.options[gcmObj.selectedIndex].text;
				cropSeason = cropSeasonObj.options[cropSeasonObj.selectedIndex].text;
				gcmSeason = gcmSeasonObj.options[gcmSeasonObj.selectedIndex].text;
				
				contextString = 'CropModel?a=run&s=' + simCode + '&country=' + country
					+ '&state=' + state + '&district=' + district + '&crop=' + cropName
					+ '&gcm=' + gcm + '&cropseason=' + cropSeason + '&gcmseason=' + gcmSeason;
				//alert(contextString);
				xmlHttp.open('GET', contextString, true);
				
		//		xmlHttp.open("GET", "jsp/GetCropModel.jsp?cntryNo=" + countryNo
		//				+ "&stateNo=" + stateNo + "&districtNo=" + districtNo
		//				+ "&cropName=" + cropName, true);
				// define the method to handle server responses
				xmlHttp.onreadystatechange = handleSimulationResponse;
				// make the server request
				xmlHttp.send(null);
			}
	   }    

}

function handleSimulationResponse() {
	//alert(xmlHttp.readyState);
	if (xmlHttp.readyState == 1) {

	}
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			// extract the XML retrieved from the server
			xmlResponse = xmlHttp.responseXML;
			//alert(xmlResponse);
			parseSimulationResponseXML(xmlResponse);
		}else{
			showSimulationOutput("");
		}
	}
}

//Parse the Simulation response XML and  update simulation output
function parseSimulationResponseXML(xmlResponse) {
	document.getElementById("simulationOutput").style.display = 'none';
//	document.getElementById("simulationHeader").style.display = 'none';
//	simulationLoader = document.getElementById("simulationLoader");
//	simulationLoader.style.display = 'block';
//	simulationLoader.innerHTML = '<img src="images/loading.gif" width="300">';
	
	rootNode = xmlResponse.documentElement;
//	xmlHttp = createXmlHttpRequestObject();
	var str = "";
	if (rootNode == null){
		//alert("Could not retrieve Links");
	} else {
		status = rootNode.getElementsByTagName('status')[0].firstChild.nodeValue;
		//alert(status);
		statusMessage = rootNode.getElementsByTagName('statusMessage')[0].firstChild.nodeValue;
		//alert(statusMessage);
		if(status == 'Completed'){
			document.getElementById('simId').value = -1;
		}
		//alert(document.getElementById('simId').value);
		str = str + "<b>Status:<font color='green'>" + status + "</font></b><br/>" + statusMessage + "</b>";
		linkNodes = rootNode.getElementsByTagName('links')[0].getElementsByTagName('link');
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
	showSimulationOutput(str);
}