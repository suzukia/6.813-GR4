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
    //////////////////////////////////////// Helper functions //////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var configNavbar = function(){
        $('.content').css('margin-top', kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10));
    }

    var updatePage = function() {
        // set nav bar title
        $('#navbar-title').text(currentMap.name+": "+currentMap.sceneUnit+" "+(currentSceneIndex+1));

        // set background
        document.getElementById("map-image").innerHTML="<img src='"+currentMap.scenes[currentSceneIndex].image+"' alt='' height='800' width='1400'>";
        updateQuestionModal();
    }

    // Initialize sketchpad and dynamically load all question data.
    // createTitle, questionHeader, choiceA
    var updateQuestionModal = function() {
        currentQuestion = currentMap.scenes[currentSceneIndex].questions[currentQuestionIndex];
        console.log(currentQuestion);
        // console.log("sp");
        // console.log(sp);
        sp.init(0);
        $('#createTitle').text(currentQuestion.title);
        $('#questionHeader').text(currentQuestion.description);
        $('#Atd').text(currentQuestion.choices[0]);
        $('#Btd').text(currentQuestion.choices[1]);
        $('#Ctd').text(currentQuestion.choices[2]);
        $('#Dtd').text(currentQuestion.choices[3]);
    }

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
    console.log("currentMap")
    console.log(currentMap);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// set up map page ///////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // sketchpad
    sp = new SketchPad("canvas-test");
    // sp.init(0);


    // set up chat names
    var chatName = username;
    for (var i=0; i< players.length; i++) {
        chatName += "," + players[i].name();
    }

    // initialize the game
    currentSceneIndex = 0;
    currentQuestionIndex = 1;

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
    //////////////////////////////// event handlers ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#homeAnchor').click(function() {
        a = confirm("Are you sure you want to exit this game?");
        if (a) {
            removeChat(chatName);
            // clear gameInfo, because you're leaving the current game
            localStorage.removeItem("gameInfo");
            redirectTo("home.html");
        }
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////// CHALLENGE MODAL //////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////// QUESTIONS MODAL //////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#feedback').hide();
    $('#checkA').hide();
    $('#checkB').hide();
    // $('#checkC').hide();
    $('#checkD').hide();


  // console.log(challengesToQuestions.act1[0].title);
  $('#submit').click(function(){
    var value = $("input[name=multipleChoice]:checked").val();
    console.log("currentQ");
    console.log(currentQuestion);
    console.log(value);
    if (value == currentQuestion.correctAnswer) {
        console.log("correct");
      $('#submit').hide();
      // $('#feedback').show();
      // $('#feedback').html("&#x2713;");
      // $('.button'+currentQuestion.correctAnswer).hide();

      console.log($('#check'+value));
      $('#check'+value).html("  &#x2713;");
      $('#check'+value).show();
      // $('#check'+value).html("  &#x2713;");

      // insert logic to update challenge modal the number of correct questions and that this question has been completed   } else {

    } else {

        console.log($('#check'+value));
      //$('#feedback').text("Incorrect. Try again");
      $('#check'+value).show();
      $('#check'+value).html(" &#x2717;");
    }
    setTimeout(function(){
        $('#questionModal').modal('toggle');
        $('#check'+value).hide();
        sp.stop();
    },3000);

  });

});


$(window).unload(function(){
    console.log("here about to remove chatbox: " + chatName);
    removeChat(chatName);
    // clear gameInfo, because you're leaving the current game
    localStorage.removeItem("gameInfo");
});