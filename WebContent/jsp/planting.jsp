<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>NHMM Input Seeds</title>
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
	    window.opener.document.getElementById('nhmmInputSeedVal1').value=document.getElementById('inputSeedVal1').value;
	    window.opener.document.getElementById('nhmmInputSeedVal2').value=document.getElementById('inputSeedVal2').value;
	}

  </script>
</head>
<body>
<table border = 1>
    <tr>
        <td>Level</td><td>Description</td><td>Cultivar</td><td>Field</td><td>Soil. Anal.</td><td>Init. Cond.</td><td>Plant</td><td>Irrigat</td><td>Fertil</td><td>Resid</td><td>Chem. App</td><td>Tillage</td><td>Env.Mod</td><td>Harv</td><td>Sim Controller</td>
    </tr><tr>
        <td><input type="text" id="paramVal1" value = 1></td><td><input type="text" id="paramVal2" value = "0-0-0 NPK"></td><td><input type="text" id="paramVal3" value = 1></td><td><input type="text" id="paramVal4" value = 1></td><td><input type="text" id="paramVal5" value = 1></td><td><input type="text" id="paramVal6" value = 1></td><td><input type="text" id="paramVal7" value = 0></td><td><input type="text" id="paramVal8" value = 1></td><td><input type="text" id="paramVal9" value = 1></td><td><input type="text" id="paramVal10" value = 1></td><td><input type="text" id="paramVal11" value = 0></td><td><input type="text" id="paramVal12" value = 0></td><td><input type="text" id="paramVal13" value = 0></td><td><input type="text" id="paramVal14" value = 0></td><td><input type="text" id="paramVal15" value = 1></td>    
    </tr><tr>
        <td><input type="text" id="paramVal16" value = 2></td><td><input type="text" id="paramVal17" value = "38 kg ha -1 of appl"></td><td><input type="text" id="paramVal18" value = 1></td><td><input type="text" id="paramVal19" value = 1></td><td><input type="text" id="paramVal20" value = 1></td><td><input type="text" id="paramVal21" value = 1></td><td><input type="text" id="paramVal22" value = 1></td><td><input type="text" id="paramVal23" value = 1></td><td><input type="text" id="paramVal24" value = 1></td><td><input type="text" id="paramVal25" value = 1></td><td><input type="text" id="paramVal26" value = 0></td><td><input type="text" id="paramVal27" value = 0></td><td><input type="text" id="paramVal28" value = 0></td><td><input type="text" id="paramVal29" value = 0></td><td><input type="text" id="paramVal30" value = 1></td>
    </tr><tr> 
        <td><input type="text" id="paramVal31" value = 3></td><td><input type="text" id="paramVal32" value = "75 kg ha -1 of appl"></td><td><input type="text" id="paramVal33" value = 1></td><td><input type="text" id="paramVal34" value = 1></td><td><input type="text" id="paramVal35" value = 1></td><td><input type="text" id="paramVal36" value = 1></td><td><input type="text" id="paramVal37" value = 1></td><td><input type="text" id="paramVal38" value = 1></td><td><input type="text" id="paramVal39" value = 1></td><td><input type="text" id="paramVal40" value = 1></td><td><input type="text" id="paramVal41" value = 0></td><td><input type="text" id="paramVal42" value = 0></td><td><input type="text" id="paramVal43" value = 0></td><td><input type="text" id="paramVal44" value = 0></td><td><input type="text" id="paramVal45" value = 1></td>
	</tr><tr>
	<td><input type="text" id="paramVa46" value = 4></td><td><input type="text" id="paramVal47" value = "113 kg ha -1 of appl"></td><td><input type="text" id="paramVal48" value = 1></td><td><input type="text" id="paramVal49" value = 1></td><td><input type="text" id="paramVal50" value = 1></td><td><input type="text" id="paramVal51" value = 1></td><td><input type="text" id="paramVal52" value = 1></td><td><input type="text" id="paramVal53" value = 1></td><td><input type="text" id="paramVal54" value = 1></td><td><input type="text" id="paramVal55" value = 1></td><td><input type="text" id="paramVal56" value = 0></td><td><input type="text" id="paramVal57" value = 0></td><td><input type="text" id="paramVal58" value = 0></td><td><input type="text" id="paramVal59" value = 0></td><td><input type="text" id="paramVal60" value = 1></td>    
    </tr><tr>
        <td><input type="text" id="paramVal61" value = 5></td><td><input type="text" id="paramVal62" value = "150 kg ha -1 of appl"></td><td><input type="text" id="paramVal63" value = 1></td><td><input type="text" id="paramVal64" value = 1></td><td><input type="text" id="paramVal65" value = 1></td><td><input type="text" id="paramVal66" value = 1></td><td><input type="text" id="paramVal67" value = 1></td><td><input type="text" id="paramVal68" value = 1></td><td><input type="text" id="paramVal69" value = 1></td><td><input type="text" id="paramVal70" value = 1></td><td><input type="text" id="paramVal71" value = 0></td><td><input type="text" id="paramVal72" value = 0></td><td><input type="text" id="paramVal73" value = 0></td><td><input type="text" id="paramVal74" value = 0></td><td><input type="text" id="paramVal75" value = 1></td>
    </tr><tr> 
        <td><input type="text" id="paramVal76" value = 6></td><td><input type="text" id="paramVal77" value = "188 kg ha -1 of appl"></td><td><input type="text" id="paramVal78" value = 1></td><td><input type="text" id="paramVal79" value = 1></td><td><input type="text" id="paramVal80" value = 1></td><td><input type="text" id="paramVal81" value = 0></td><td><input type="text" id="paramVal82" value = 1></td><td><input type="text" id="paramVal83" value = 1></td><td><input type="text" id="paramVal84" value = 1></td><td><input type="text" id="paramVal85" value = 1></td><td><input type="text" id="paramVal86" value = 0></td><td><input type="text" id="paramVal87" value = 0></td><td><input type="text" id="paramVal88" value = 0></td><td><input type="text" id="paramVal89" value = 0></td><td><input type="text" id="paramVal90" value = 1></td>
	</tr><tr>
</table>
<input type="button" value="Submit" onclick="return closeMySelf(this);"/>
<input type="button" value="Cancel" onclick="return closeMySelf(this);"/>
</body>
</html>