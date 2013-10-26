<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Crop Model Genetic Algorithm Parameters</title>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="style/style.css" />
  <script>
  function closeMySelf(sender) {
		try {
	        var submitVal = sender.getAttribute("value");
	        if(submitVal == 'Submit'){
	        	handlePopupResult(submitVal);
	        }
	    }
	    catch (err) {}
	    window.close();
	    return false;
	}
  
  function handlePopupResult(result) {
	    window.opener.document.getElementById('cmgaParameterVal1').value=document.getElementById('paramVal1').value;
	    window.opener.document.getElementById('cmgaParameterVal2').value=document.getElementById('paramVal2').value;
	    window.opener.document.getElementById('cmgaParameterVal3').value=document.getElementById('paramVal3').value;
	    window.opener.document.getElementById('cmgaParameterVal4').value=document.getElementById('paramVal4').value;
	    window.opener.document.getElementById('cmgaParameterVal5').value=document.getElementById('paramVal5').value;
	    window.opener.document.getElementById('cmgaParameterVal6').value=document.getElementById('paramVal6').value;
	    window.opener.document.getElementById('cmgaParameterVal7').value=document.getElementById('paramVal7').value;
	    window.opener.document.getElementById('cmgaParameterVal8').value=document.getElementById('paramVal8').value;
	    window.opener.document.getElementById('cmgaParameterVal9').value=document.getElementById('paramVal9').value;
	    window.opener.document.getElementById('cmgaParameterVal10').value=document.getElementById('paramVal10').value;
	    }

  </script>
</head>
<body>
<table border = 1>
<tr>
	<td>Variable Name</td><td>Variable Description</td><td>Input Parameters</td>
</tr><tr>
    <td>VAR#</td><td>Identification code or number for a specific cultivar</td><td><input type="text" id="paramVal1" value = 990001></input></td>
</tr><tr>
    <td>VAR-NAME</td><td>Name of Cultivar</td><td><input type="text" id="paramVal2" value = N.AMERICAN></input></td>
</tr><tr>
	<td>EXPNO</td><td>Number of experiments used to estimate cultivar parameters</td><td><input type="text" id="paramVal3" value = IB0001></input></td>
</tr><tr>
	<td>ECO#</td><td> Ecotype code for this cultivar points to the Ecotype in the EC  file (currently not used)</td><td><input type="text" id="paramVal4" value = 220.0></input></td>
</tr><tr>
    <td>P1</td><td> Time period (expressed as growing degree days [GDD] in øC above a base temperature of 9degreeC)<br> from seedling emergence during which  the rice plant is not responsive to changes in photoperiod.<br> This  period is also referred to as the basic vegetative phase of the  plant.</td><td><input type="text" id="paramVal5" value = 35.0></input></td>
</tr><tr>
    <td>P2O</td><td> Critical photoperiod or the longest day length (in hours) at which the development occurs at a <br> maximum rate. At values higher than P2O developmental rate is slowed, hence there is delay due to <br> longer day lengths.</td><td><input type="text" id="paramVal5" value = 510.0></input></td>
</tr><tr>
	<td>P5</td><td> Time period in GDD øC) from beginning of grain filling (3 to 4 days after flowering) to <br> physiological maturity with a base temperature of 9øC.</td><td><input type="text" id="paramVal6" value = 12.0></input></td>
</tr><tr>
    <td>G1</td><td> Potential spikelet number coefficient as estimated from the  number of spikelets per g of <br> main culm dry weight (less leaf blades and sheaths plus spikes) at anthesis.</td><td><input type="text" id="paramVal7" value = 55></input></td>
</tr><tr>
    <td>G2</td><td> Single grain weight (g) under ideal growing conditions, i.e. nonlimiting light, water, nutrients,<br> and absence of pests and diseases.</td><td><input type="text" id="paramVal8" value = .0250></input></td>
</tr><tr>
	<td>G3</td><td> Tillering coefficient (scaler value) relative to IR64 cultivar  under ideal conditions. <br> A higher tillering cultivar would have  coefficient greater than 1.0.</td><td><input type="text" id="paramVal9" value = 1.00></input></td>
</tr><tr>
    <td>G4</td><td> Temperature tolerance coefficient. Usually 1.0 for varieties   grown in normal environments.<br> G4 for japonica type rice growing  in a warmer environment would be 1.0 or greater. Likewise, the G4 <br> value for indica type rice in very cool environments on season would be less than 1.0.</td><td><input type="text" id="paramVal10" value = 1.00></input></td>
</table>
<input type="button" value="Submit" onclick="return closeMySelf(this);"/>
<input type="button" value="Cancel" onclick="return closeMySelf(this);"/>
</body>
</html>