function readFile(filePath, callback) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
	  if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
	    var txt = xmlhttp.responseText;
	    callback(txt);
	  }
	};
	xmlhttp.open("GET",filePath,true);
	xmlhttp.send();
}

$(document).ready(function() {
	
}
