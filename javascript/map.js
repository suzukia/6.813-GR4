var kltNavbar;
var currentMap;
var currentAct;
var mapsToScenes = {};
var scenesToImages = {};
var challengesToQuestions = {};
// var firstMsgs = ["hey guys!","wassup", "heyy", "everyone ready, right?!"];

$(document).ready(function() {

    // gameInfo format (passed on from previous page):
    // {"map":{"name":"Medieval","description":"Journey to your throne","icon":"../images/map/space/icon.gif"},
    //  "players":[{"_id":15,"_name":"Cinderella","_avatar":"../images/chat/avatar1.gif","_friends":[],"_friendReqs":{}}],
    //  "privateGame":true}
    var gameInfo = getStorageItem("gameInfo");
    var players = formatUsers(gameInfo.players);
    console.log(players);
    console.log(players);
    var map = gameInfo.map;

    // set up chat name
    var chatName = localStorage.getItem("username");
    for (var i=0; i< players.length; i++) {
        chatName += ", " + players[i].name();
    }


  // setup navigation bar and dictionaries
  kltNavbar = $('.klt-navbar');
  configNavbar();
  setUpDictionaries();
  console.log("after setup");
  console.log(mapsToScenes);

  // group chat setup
  //chatbox = openChat(chatName, gameMsgSentFunc);
  //simulateInitGameConversation(chatbox, chatName);
  openChat(chatName, gameMsgSentFunc);

  // loading data from local storage
  map = localStorage.getItem("map");
  if (map == null) {
  	currentMap = "Space"; // default
  } else {
  	currentMap = map.name;
  }
  currentAct = 2;       // default
  populateData();

  // document.getElementById('instructionContent').innerHTML = "Welcome to the " + currentMap + " map! Click anywhere on the map to start this challenge.";
  // $('#instructionModal').modal('show');

  console.log('../images/'+scenesToImages[currentMap][currentAct]);
  var imageFile = scenesToImages[currentMap][currentAct];
  document.getElementById("map-image").innerHTML="<img src='../images/map/"+currentMap.toLowerCase()+"/"+imageFile+"' alt='' height='800' width='1400'>";
  
  // to make image fill the entire body of the website
  $(".content").css("margin-top",0);
  $(".content").css("padding-left",0);
  $(".content").css("padding-right",0);
  $(".klt-navbar").css("margin-bottom",0);

  // sketchpad
  var sp = new SketchPad("canvas-test");
  sp.init(0);

  // console.log(challengesToQuestions.act1[0].title);
});


// helper functions

function populateData() {

}

function setUpDictionaries() {
	// We can use currentAct to index into the list of values and get the proper item
    // key (currentMap) -> value (name of scene or image)
  mapsToScenes["Medieval"] 		= ["act1", "act2", "act3"];
	mapsToScenes["Space"] 	    = ["voyage1", "voyage2", "voyage3"];
  scenesToImages["Medieval"] 	= ["act1.jpg", "act2.png", "act3.png"];
	scenesToImages["Space"]     = ["voyage1.jpg", "voyage2.jpeg", "voyage3.jpg"];

	// key (currentMap, currentAct) -> value (list of the names of questions)
	challengesToQuestions["act1"]	 = [compositionOfMatter, lifeOfPi, famousComposers];
	challengesToQuestions["act2"] 	 = [compositionOfMatter, lifeOfPi, famousComposers];
	challengesToQuestions["act3"] 	 = [compositionOfMatter, lifeOfPi, famousComposers];
	challengesToQuestions["voyage1"] = [compositionOfMatter, lifeOfPi, famousComposers];
	challengesToQuestions["voyage2"] = [compositionOfMatter, lifeOfPi, famousComposers];
	challengesToQuestions["voyage3"] = [compositionOfMatter, lifeOfPi, famousComposers];
}

function configNavbar(){
    $('.content').css('margin-top', kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10));
    $('#navbar-title').text(currentMap);
}

function Question(title, description, choices, correctAnswer) {
    this.title = title;
    this.description = description;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
    return this;
}

$('#submit').click(function(){
});

$('#questionContainer input').on('change', function() {
   alert($('input[name=radioName]:checked', '#questionTable').val());
});


var compositionOfMatter = new Question("Composition of Matter", "Which is the first element in the periodic table?", ["Li", "He", "H", "Ne"], "C");
var lifeOfPi = new Question("Life of Pi", "Rally", [""], "A");
var famousComposers = new Question("Famous Composers", "Which composer was deaf?", ["Mozart", "Beethoven", "Handel", "Bach"], "B");

$(window).unload(function(){
    console.log("here about to remove chatbox: " + chatName);
    removeChat(chatName);
});
