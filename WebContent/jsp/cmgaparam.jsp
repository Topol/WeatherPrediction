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
	}

  </script>
</head>
<body>
Crop Model Genetic Algorithm Parameter Value 1: <input type="text" id="paramVal1" value = 10></input><br/>
Crop Model Genetic Algorithm Parameter Value 2: <input type="text" id="paramVal2" value = 10></input><br/>
<input type="button" value="Submit" onclick="return closeMySelf(this);"/>
<input type="button" value="Cancel" onclick="return closeMySelf(this);"/>
</body>
</html>