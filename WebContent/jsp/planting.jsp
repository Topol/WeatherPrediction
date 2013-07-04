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
NHMM Input Seed Value 1: <input type="text" id="inputSeedVal1"></input><br/>
NHMM Input Seed Value 2: <input type="text" id="inputSeedVal2"></input><br/>
<input type="button" value="Submit" onclick="return closeMySelf(this);"/>
<input type="button" value="Cancel" onclick="return closeMySelf(this);"/>
</body>
</html>