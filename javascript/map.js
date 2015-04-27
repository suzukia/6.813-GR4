$(document).ready(function() {
	var currentMap = "space";
	var currentAct = 0;

	var toggle = function(currentMap, currentAct) {
		if (currentMap = "space") {
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

})