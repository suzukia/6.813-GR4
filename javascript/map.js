var kltNavbar;
var currentMap;		
var currentAct;	
var currentQuestion;		
var mapsToScenes = {};
var scenesToImages = {};
var challengesToQuestions = {};
var chatName = "User1,User2,User3,User4";
// var firstMsgs = ["hey guys!","wassup", "heyy", "everyone ready, right?!"];

$(document).ready(function() {
  // setup navigation bar and dictionaries
  kltNavbar = $('.klt-navbar');
  configNavbar();
  setUpDictionaries();
  
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
  $('#feedback').hide();
  $('#checkA').hide();
  $('#checkB').hide();
  $('#checkC').hide();
  $('#checkD').hide();
  currentAct = 0;       // default
  currentChallenge = mapsToScenes[currentMap][currentAct];
  currentQuestion = challengesToQuestions[currentChallenge][currentAct];
  populateData();
  
  document.getElementById('instructionContent').innerHTML = "Welcome to the " + currentMap + " map! Click anywhere on the map to start this challenge.";
  $('#instructionModal').modal('show');

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
  $('#submit').click(function(){
    console.log(currentQuestion.correctAnswer);
    if (document.getElementById(currentQuestion.correctAnswer).checked) {
      $('#submit').hide();
      // $('#feedback').show();
      // $('#feedback').html("&#x2713;");
      // $('.button'+currentQuestion.correctAnswer).hide();
      $('#check'+currentQuestion.correctAnswer).show();
      $('#check'+currentQuestion.correctAnswer).html(" &#x2713;");
      
      // insert logic to update challenge modal the number of correct questions and that this question has been completed   } else {
    } else {
      $('#feedback').text("Incorrect. Try again");
    }

  });

  $('#multipleChoice input').on('change', function() {
     alert($('input[name=radioName]:checked', '#questionTable').val()); 
  });

});


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


var compositionOfMatter = new Question("Composition of Matter", "Which is the first element in the periodic table?", ["Li", "He", "H", "Ne"], "C");
var lifeOfPi = new Question("Life of Pi", "Rally", [""], "A");
var famousComposers = new Question("Famous Composers", "Which composer was deaf?", ["Mozart", "Beethoven", "Handel", "Bach"], "B");

$(window).unload(function(){
    console.log("here about to remove chatbox: " + chatName);
    removeChat(chatName);
});
