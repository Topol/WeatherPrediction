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
        <td>DATE</td><td>Fertilizer Material</td><td>Fertilizer Applications</td><td>Depth,cm</td><td>N, kg ha-1</td><td> P, kg ha-1</td><td> K, kg ha-1</td><td>Ca, kg ha-1 </td><td> Other Elements kg ha -1</td><td>Other Element Code</td>
    </tr><tr>
        <td><input type="text" id="paramVal1" value = 152></td><td><input type="text" id="paramVal2" value = "Ammonium Sulpahte"></td><td><input type="text" id="paramVal3" value = "Broadcast on Flooded"></td><td><input type="text" id="paramVal4" value = 10></td><td><input type="text" id="paramVal5" value = 19></td><td><input type="text" id="paramVal6" value = 0></td><td><input type="text" id="paramVal7" value = 0></td><td><input type="text" id="paramVal8" value = 0></td><td><input type="text" id="paramVal9" value = 0></td><td><input type="text" id="paramVal10" value = 0></td>    
    </tr><tr>
        <td><input type="text" id="paramVal11" value = 170></td><td><input type="text" id="paramVal12" value = "Ammonium Sulpahte"></td><td><input type="text" id="paramVal13" value = "Broadcast on Flooded"></td><td><input type="text" id="paramVal14" value = 1></td><td><input type="text" id="paramVal15" value = 19></td><td><input type="text" id="paramVal16" value = 0></td><td><input type="text" id="paramVal17" value = 0></td><td><input type="text" id="paramVal18" value = 1.00></td><td><input type="text" id="paramVal19" value = 0></td><td><input type="text" id="paramVal20" value = 0></td>
    </tr><tr> 
        <td><input type="text" id="paramVal21" value = 200></td><td><input type="text" id="paramVal22" value = "Ammonium Sulpahte"></td><td><input type="text" id="paramVal23" value = "Broadcast on Flooded"></td><td><input type="text" id="paramVal24" value = 1></td><td><input type="text" id="paramVal25" value = 19></td><td><input type="text" id="paramVal26" value = 0></td><td><input type="text" id="paramVal27" value = 0></td><td><input type="text" id="paramVal28" value = 1.00></td><td><input type="text" id="paramVal29" value = 0></td><td><input type="text" id="paramVal30" value = 0></td>
	</tr><tr>
</table>

<input type="button" value="Submit" onclick="return closeMySelf(this);"/>
<input type="button" value="Cancel" onclick="return closeMySelf(this);"/>
</body>
</html>