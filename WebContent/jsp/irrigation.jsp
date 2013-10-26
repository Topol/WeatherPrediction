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
        <td>DATE</td><td>Amount of Water(mm)</td><td>Operation</td>
    </tr><tr>    
        <td><input type="text" id="paramVal1" value = 152></td><td><input type="text" id="paramVal2" value = 50></td><td><input type="text" id="paramVal3" value = "Flood Depth,mm"></td>
    </tr><tr>
    	<td><input type="text" id="paramVal4" value = 180></td><td><input type="text" id="paramVal5" value = 100></td><td><input type="text" id="paramVal6" value = "Bund Depth,mm"></td>
    </tr><tr>
    	<td><input type="text" id="paramVal7" value = 196></td><td><input type="text" id="paramVal8" value = 2></td><td><input type="text" id="paramVal9" value = "Percolation Depth,mm/day"></td>
    </tr><tr>
</table>
<input type="button" value="Submit" onclick="return closeMySelf(this);"/>
<input type="button" value="Cancel" onclick="return closeMySelf(this);"/>
</body>
</html>