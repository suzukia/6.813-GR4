var kltNavbar;
var currentMap;
var currentAct;
var currentQuestion;
var mapsToScenes = {};
var scenesToImages = {};
var challengesToQuestions = {};
var sp;
// var firstMsgs = ["hey guys!","wassup", "heyy", "everyone ready, right?!"];


$(document).ready(function() {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// get current game data /////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// set up map page ///////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // set up chat names
    var chatName = username;
    for (var i=0; i< players.length; i++) {
        chatName += ", " + players[i].name();
    }

    // initialize the game
    currentSceneIndex = 0;
    currentQuestionIndex = 0;

    // setup navigation bar and dictionaries
    kltNavbar = $('.klt-navbar');
    configNavbar();

    // group chat setup
    chatbox = openChat(chatName, gameMsgSentFunc);
    //simulateInitGameConversation(chatbox, chatName);
    //openChat(chatName, gameMsgSentFunc);

    // pop up instructions
    document.getElementById('instructionContent').innerHTML = "Welcome to the " + currentMap.name + " map! Click anywhere on the map to start this challenge.";
    $('#instructionModal').modal('show');

    // to make image fill the entire body of the website
    $(".content").css("margin-top",0);
    $(".content").css("padding-left",0);
    $(".content").css("padding-right",0);
    $(".klt-navbar").css("margin-bottom",0);

    updatePage();

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////// CHALLENGE MODAL //////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////// QUESTIONS MODAL //////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#feedback').hide();
    $('#checkA').hide();
    $('#checkB').hide();
    $('#checkC').hide();
    $('#checkD').hide();

    currentQuestion = currentMap.scenes[currentSceneIndex].questions[currentQuestionIndex];

    // sketchpad
    sp = new SketchPad("canvas-test");
    


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
    setTimeout(function(){$('#questionModal').modal('toggle'); $('#check'+value).hide(); sp.;},3000);
  });


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// Helper functions //////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function configNavbar(){
        $('.content').css('margin-top', kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10));
    }

    function updatePage() {
        // set nav bar title
        $('#navbar-title').text(currentMap.name+": "+currentMap.sceneUnit+" "+(currentSceneIndex+1));

        // set background
        document.getElementById("map-image").innerHTML="<img src='"+currentMap.scenes[currentSceneIndex].image+"' alt='' height='800' width='1400'>";
    }

    // Initialize sketchpad and dynamically load all question data.
    // createTitle, questionHeader, choiceA
    function updateQuestionModal() {
        sp.init(0);
        $('#createTitle').text(currentQuestion.title);
        $('#questionHeader').text(currentQuestion.description);
        $('choiceA').text(currentQuestion.choices[0]);
        $('choiceB').text(currentQuestion.choices[1]);
        $('choiceC').text(currentQuestion.choices[2]);
        $('choiceD').text(currentQuestion.choices[3]);
    }


});


$(window).unload(function(){
    console.log("here about to remove chatbox: " + chatName);
    removeChat(chatName);
});


