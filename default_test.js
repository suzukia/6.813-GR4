function readFile(filePath, callback) {
  var xmlhttp;
  var txt;
  if (window.XMLHttpRequest) { xmlhttp = new XMLHttpRequest(); }
  else { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }

  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
      txt = xmlhttp.responseText;
      callback(txt);
    }
  };
  xmlhttp.open("GET",filePath,true);
  xmlhttp.send();
}

function appendToDiv(htmlFile, divId) {
  readFile(htmlFile, function(html) {
    $('#'+divId).append(html)
  });
}

$(document).ready(function() {
  appendToDiv('templates/header.html', 'header');
  appendToDiv('templates/footerchat.html', 'footer');
});