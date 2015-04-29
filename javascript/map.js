var kltNavbar, map, currentAct;

$(document).ready(function() {
	map = sessionStorage.getItem("map");
    kltNavbar = $('.klt-navbar');
    
    configNavbar();

    var toggle = function(currentMap, currentAct) {
		if (map = "space") {
			// space stuff
		} else {
			// medieval stuff
		}
		var sp = new SketchPad("canvas-test");
        var sp2 = new SketchPad("canvas-test-2");
        sp.init(0);
        sp2.init(0);
        var box = $("#chatbox").chatbox({id:"Eirik", 
          user:{key : "value"}, 
          title : "Elizabeth, Frank", 
          
          messageSent : function(id, user, msg) { 
          $("#log").append(id + " said: " + msg + "<br/>"); 
          $("#chatbox").chatbox("option", "boxManager").addMsg(id, msg); 
          }}); 

        $(".ui-chatbox") 
            .draggable() 
            .resizable();

	}
});

function configNavbar(){
    $('.content').css('margin-top', kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10));
    $('#navbar-title').text(map);
}
	