var kltNavbar;
var currentMap;		
var currentAct;			
var mapsToScenes = {};
var scenesToImages = {};
var challengesToQuestions = {};
var chatName = "User1,User2,User3,User4";
// var firstMsgs = ["hey guys!","wassup", "heyy", "everyone ready, right?!"];

$(document).ready(function() {
  openChat(chatName, gameMsgSentFunc);

	map = localStorage.getItem("map");
	if (map == null) {
		currentMap = "Space"; // default
	} else {
		currentMap = map.name;
	}
    kltNavbar = $('.klt-navbar');
    
    currentAct = 0;				// default
    configNavbar();
    setUpDictionaries();

    var sp = new SketchPad("canvas-test");
    sp.init(0);

    populateData();

    console.log(challengesToQuestions.act1[0].title);
  });

function populateData() {

}

function setUpDictionaries() {
	// We can use currentAct to index into the list of values and get the proper item
    // key (currentMap) -> value (name of scene or image)
    mapsToScenes["Space"] 		= ["act1", "act2", "act3"];
	mapsToScenes["Medieval"] 	= ["voyage1", "voyage2", "voyage3"];
    scenesToImages["Space"] 	= ["act1.jpg", "act2.png", "act3.png"];
	scenesToImages["Medieval"]  = ["voyage1.jpg", "voyage2.jpeg", "voyage3.jpg"];

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

$('#questionTable input').on('change', function() {
   alert($('input[name=radioName]:checked', '#questionTable').val()); 
});


var compositionOfMatter = new Question("Composition of Matter", "Which is the first element in the periodic table?", ["Li", "He", "H", "Ne"], "C");
var lifeOfPi = new Question("Life of Pi", "Rally", [""], "A");
var famousComposers = new Question("Famous Composers", "Which composer was deaf?", ["Mozart", "Beethoven", "Handel", "Bach"], "B");

$(window).unload(function(){
    console.log("here about to remove chatbox: " + chatName);
    removeChat(chatName);
});
