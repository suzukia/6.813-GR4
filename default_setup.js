// function readFile(filePath, callback) {
// 	var xmlhttp = new XMLHttpRequest();
// 	xmlhttp.onreadystatechange = function(){
// 	  if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
// 	    var txt = xmlhttp.responseText;
// 	    callback(txt);
// 	  }
// 	};
// 	xmlhttp.open("GET",filePath,true);
// 	xmlhttp.send();
// }

// function appendToDiv(htmlFile, divId) {
// 	readFile(htmlFile, function(html) {
// 		$('#'+divId).append(html)
// 	});
// }

var appendStringToDiv = function (stringhtml, divId) {
	$('#'+divId).append(stringhtml);
}

// var headerString = '<div id="navbar-header"><div id="navbar-title"></div><div id="navbar-button-one"></div><div id="navbar-button-two"></div></div>';
var headerString = '<div id="navbar-header"><div id="navbar-title"></div><div id="navbar-buttons"></div>';

var footerString = '<div id="navbar-footer"><div id="chatbox"></div><div id="chattabs"></div></div>';



$(document).ready(function() {
	// appendToDiv('templates/header.html', 'header');
	// appendToDiv('templates/footerchat.html', 'footer');
	appendStringToDiv(headerString, 'header');
	appendStringToDiv(footerString, 'footer');
});
