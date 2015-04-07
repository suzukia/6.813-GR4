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

function appendToBody(htmlFile) {
	readFile(htmlFile, function(html) { 
		$('body').append(html) 
	});
}

$(document).ready(function() {
	appendToBody('templates/header.html');
	appendToBody('templates/footerchat.html');
});
