var kltNavbar;
var currentMap;
var currentAct;
var currentQuestion;
var mapsToScenes = {};
var scenesToImages = {};
var challengesToQuestions = {};
// var firstMsgs = ["hey guys!","wassup", "heyy", "everyone ready, right?!"];

$(document).ready(function() {

    // if not logged in, redirect to login
    var username = localStorage.getItem("username");
    if (!username) {
        redirectTo("login.html");
    }

    // if there's no gameInfo, you shouldn't be on this page!
    var checkGameInfo = localStorage.getItem("gameInfo");
    if (!checkGameInfo) {
        redirectTo("home.html");
    }


    // gameInfo format (passed on from previous page):
    // {"map":{"name":"Medieval","description":"Journey to your throne","icon":"../images/map/space/icon.gif"},
    //  "players":[{"_id":15,"_name":"Cinderella","_avatar":"../images/chat/avatar1.gif","_friends":[],"_friendReqs":{}}],
    //  "privateGame":true}
    var gameInfo = getStorageItem("gameInfo");
    var players = formatUsers(gameInfo.players);
    var currentMap = gameInfo.map;

    // set up chat name
    var chatName = username;
    for (var i=0; i< players.length; i++) {
        chatName += ", " + players[i].name();
    }
    var gameInfo = getStorageItem("gameInfo");
    var players = formatUsers(gameInfo.players);
    console.log(players);
    var map = gameInfo.map;

    // set up chat name
    var chatName = localStorage.getItem("username");
    for (var i=0; i< players.length; i++) {
        chatName += ", " + players[i].name();
    }

    // initialize the game
    currentSceneIndex = 0;
    currentQuestionIndex = 0;


  // setup navigation bar and dictionaries
  kltNavbar = $('.klt-navbar');
  configNavbar();
  // setUpDictionaries();

  // group chat setup
  chatbox = openChat(chatName, gameMsgSentFunc);
  //simulateInitGameConversation(chatbox, chatName);
  //openChat(chatName, gameMsgSentFunc);

  // loading data from local storage
// <<<<<<< HEAD
  // map = localStorage.getItem("map");
  // if (map == null) {
  // 	currentMap = "Space"; // default
  // } else {
  // 	currentMap = map.name;
  // }
  // currentAct = 2;       // default
// =======
//   map = localStorage.getItem("map");
//   if (map == null) {
//   	currentMap = "Space"; // default
//   } else {
//   	currentMap = map.name;
//   }

  $('#feedback').hide();
  $('#checkA').hide();
  $('#checkB').hide();
  $('#checkC').hide();
  $('#checkD').hide();
  // currentAct = 0;       // default
  // currentChallenge = mapsToScenes[currentMap][currentAct];
  // currentQuestion = challengesToQuestions[currentChallenge][currentAct];
  currentQuestion = currentMap.scenes[currentSceneIndex].questions[currentQuestionIndex];
// >>>>>>> 0d27d55ebc7aca05a80994de4bd35d2023a8cd5b
  populateData();


  document.getElementById('instructionContent').innerHTML = "Welcome to the " + currentMap.name + " map! Click anywhere on the map to start this challenge.";
  $('#instructionModal').modal('show');

  // console.log('../images/'+scenesToImages[currentMap][currentAct]);
  // var imageFile = scenesToImages[currentMap][currentAct];
  document.getElementById("map-image").innerHTML="<img src='"+currentMap.scenes[currentSceneIndex].image+"' alt='' height='800' width='1400'>";

  // to make image fill the entire body of the website
  $(".content").css("margin-top",0);
  $(".content").css("padding-left",0);
  $(".content").css("padding-right",0);
  $(".klt-navbar").css("margin-bottom",0);

  // sketchpad
  var sp = new SketchPad("canvas-test");
  sp.init(0);


    function configNavbar(){
        $('.content').css('margin-top', kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10));
        $('#navbar-title').text(currentMap.name+": "+currentMap.sceneUnit+" "+(currentSceneIndex+1));
    }



  // console.log(challengesToQuestions.act1[0].title);
  $('#submit').click(function(){
    var value = $("input[name=multipleChoice]:checked").val();
    if (value == currentQuestion.correctAnswer) {
      $('#submit').hide();
      // $('#feedback').show();
      // $('#feedback').html("&#x2713;");
      // $('.button'+currentQuestion.correctAnswer).hide();
      $('#check'+value).show();
      $('#check'+value).html("  &#x2713;");

      // insert logic to update challenge modal the number of correct questions and that this question has been completed   } else {
    } else {
      //$('#feedback').text("Incorrect. Try again");
      $('#check'+value).show();
      $('#check'+value).html(" &#x2717;");
    }
    setTimeout(function(){$('#questionModal').modal('toggle'); $('#check'+value).hide();},3000);
  });

});


// helper functions

function populateData() {

}

// function setUpDictionaries() {
// 	// We can use currentAct to index into the list of values and get the proper item
//     // key (currentMap) -> value (name of scene or image)
//   mapsToScenes["Medieval"] 		= ["act1", "act2", "act3"];
// 	mapsToScenes["Space"] 	    = ["voyage1", "voyage2", "voyage3"];
//   scenesToImages["Medieval"] 	= ["act1.jpg", "act2.png", "act3.png"];
// 	scenesToImages["Space"]     = ["voyage1.jpg", "voyage2.jpeg", "voyage3.jpg"];

// 	// key (currentMap, currentAct) -> value (list of the names of questions)
// 	challengesToQuestions["act1"]	 = [compositionOfMatter, lifeOfPi, famousComposers];
// 	challengesToQuestions["act2"] 	 = [compositionOfMatter, lifeOfPi, famousComposers];
// 	challengesToQuestions["act3"] 	 = [compositionOfMatter, lifeOfPi, famousComposers];
// 	challengesToQuestions["voyage1"] = [compositionOfMatter, lifeOfPi, famousComposers];
// 	challengesToQuestions["voyage2"] = [compositionOfMatter, lifeOfPi, famousComposers];
// 	challengesToQuestions["voyage3"] = [compositionOfMatter, lifeOfPi, famousComposers];
// }



function Question(title, description, choices, correctAnswer) {
    this.title = title;
    this.description = description;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
    return this;
}

var compositionOfMatter = new Question("Composition of Matter", "Which is the first element in the periodic table?", ["Li", "He", "H", "Ne"], "C");
var lifeOfPi = new Question("Life of Pi", "Rally", [""], "A");
var famousComposers = new Question("Famous Composers", "Which composer was deaf?", ["Mozart", "Beethoven", "Handel", "Bach"], "B");

$(window).unload(function(){
    console.log("here about to remove chatbox: " + chatName);
    removeChat(chatName);
});
