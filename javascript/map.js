var kltNavbar;
var currentMap;
var currentAct;
var currentQuestion;
var mapsToScenes = {};
var scenesToImages = {};
var challengesToQuestions = {};
var chatName = "";
var sp;

$(document).ready(function() {


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// Helper functions //////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var configNavbar = function(){
        $('.content').css('margin-top', kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10));
    }

    var updateMap = function() {
        // set nav bar title
        $('#navbar-title').text(currentMap.name+": "+currentMap.sceneUnit+" "+(currentSceneIndex+1));

        // set background
        document.getElementById("map-image").innerHTML="<img src='"+currentMap.scenes[currentSceneIndex].image+"' alt='' height='800' width='1400'>";
        updateQuestionModal();
    }

    // Initialize sketchpad and dynamically load all question data.
    // createTitle, questionHeader, choiceA
    var updateQuestionModal = function() {
        //$('#feedback').hide();
        $('#checkA').hide();
        $('#checkB').hide();
        $('#checkC').hide();
        $('#checkD').hide();
        currentQuestion = currentMap.scenes[currentSceneIndex].questions[currentQuestionIndex];
        sp.init(0);
        $('#createQuestionTitle').text(currentQuestion.title);
        $('#questionHeader').text(currentQuestion.description);
        $('#Atd').text(currentQuestion.choices[0]);
        $('#Btd').text(currentQuestion.choices[1]);
        $('#Ctd').text(currentQuestion.choices[2]);
        $('#Dtd').text(currentQuestion.choices[3]);
        if (!helping) {
            $('#submit').show();
        }
        else {
            $('#submit').hide();
        }
    }

    var updateChallengeModal = function() {
        var numberOfQuestionsLeft = Object.keys(unansweredQuestionIndices).length;
        //console.log(numberOfQuestionsLeft);
        $('#createChallengeTitle').text(numberOfQuestionsLeft+"/3 Questions Left");
        $('#question1').text(currentMap.scenes[currentSceneIndex].questions[0].title);
        $('#question2').text(currentMap.scenes[currentSceneIndex].questions[1].title);
        $('#question3').text(currentMap.scenes[currentSceneIndex].questions[2].title); 

        // why is this not working
        for (var i in answeredQuestionResults) {
          var questionNumberIndex = parseInt(i)+1;
          console.log('#question'+questionNumberIndex);
          $('#question'+questionNumberIndex).removeAttr('data-toggle');  
          $('#question'+questionNumberIndex).css("text-decoration", "line-through");
        }
        
    }

    var updateMapChallengeQuestion = function() {
        updateMap();
        updateQuestionModal();
        updateChallengeModal();
    }

    // called when user completes a question
    var handleDataChange = function() {
        // move on to next question, update challenge and question modals
        if (Object.keys(unansweredQuestionIndices).length === 0) { // all Qs done for this scene
            if (currentSceneIndex === maxSceneIndex) { // you finished the last question on the last scene!
                // end game?
            }
            else { // move on to next scene!
                currentSceneIndex ++;
                currentQuestionIndex = 0;
                unansweredQuestionIndices = {}; // keep track of unanswered question indices. Use an Object so you can easily get Object.keys(unansweredQuestionIndices)
                for (var i=0; i< currentMap.scenes[currentSceneIndex].questions.length; i++) {
                    unansweredQuestionIndices[i] = false;
                }
                answeredQuestionResults = {};

                // update map, challenge modal, questions modal
                updateMapChallengeQuestion();
            }
        }
        else { // still Qs left in scene
            currentQuestionIndex = Object.keys(unansweredQuestionIndices)[0]; // get next smallest unanswered question
            // updateMapChallengeQuestion();
            updateMap();
            updateChallengeModal();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// get current game data /////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // if there's no gameInfo, you shouldn't be on this page!
    var checkGameInfo = localStorage.getItem("gameInfo");
    if (!checkGameInfo) {
        redirectTo("home.html");
    }

    // gameInfo format (passed on from previous page):
    // {"map":{"name":"Medieval","description":"Journey to your throne","icon":"../images/map/space/icon.gif", etc..... },
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

    if (players.length != 4)
        alert("need exactly 4 people to join");

    openChat(players.map(function(user) { return user.name(); }).join(','), gameMsgSentFunc);

    // initialize the game
    var currentSceneIndex = 0;
    var maxSceneIndex = currentMap.scenes.length-1;
    var currentQuestionIndex = 0;

    var helping = false; //TODO change with challengemodal

    var answeredQuestionResults = {}; // ex. {1:true, 2:false} true for correct answer

    var unansweredQuestionIndices = {}; // keep track of unanswered question indices. Use an Object so you can easily get Object.keys(unansweredQuestionIndices)
    for (var i=0; i< currentMap.scenes[currentSceneIndex].questions.length; i++) {
        unansweredQuestionIndices[i] = false;
    }

    // setup navigation bar and dictionaries
    kltNavbar = $('.klt-navbar');
    configNavbar();

    // pop up instructions
    document.getElementById('instructionContent').innerHTML = "Welcome to the " + currentMap.name + " map! Click anywhere on the map to start this challenge.";
    $('#instructionModal').modal('show');

    // to make image fill the entire body of the website
    $(".content").css("margin-top",0);
    $(".content").css("padding-left",0);
    $(".content").css("padding-right",0);
    $(".klt-navbar").css("margin-bottom",0);

    updateMapChallengeQuestion();

    // update when hiding
    $('#questionModal').on('hidden.bs.modal', function() {
        updateQuestionModal(); //show updated info
    })

    // update when showing
    $('#challengeModal').on('shown.bs.modal', function() {
        updateChallengeModal();
    })


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
    $('#question1').click(function() {
        currentQuestionIndex = 0;
        $('#questionModal').modal('show');
    })

    $('#question2').click(function() {
      currentQuestionIndex = 1;
      $('#questionModal').modal('show');
    })
    $('#question3').click(function() {
      currentQuestionIndex = 2;
      $('#questionModal').modal('show');
    })


  // console.log(challengesToQuestions.act1[0].title);
  $('#submit').click(function(){
    var value = $("input[name=multipleChoice]:checked").val();
    if (value == currentQuestion.correctAnswer) { //correct
      $('#submit').hide();
        // $('#feedback').show();
        // $('#feedback').html("&#x2713;");
        // $('.button'+currentQuestion.correctAnswer).hide();

        console.log($('#check'+value));
        $('#check'+value).html("  &#x2713;");
        $('#check'+value).show();
        // $('#check'+value).html("  &#x2713;");
        delete unansweredQuestionIndices[currentQuestionIndex];
        answeredQuestionResults[currentQuestionIndex] = true;
        var questionNumber = currentQuestionIndex+1;
        

        // insert logic to update challenge modal the number of correct questions and that this question has been completed   } else {

    } else { // incorrect
        //$('#feedback').text("Incorrect. Try again");
        $('#check'+value).show();
        $('#check'+value).html(" &#x2717;");

        answeredQuestionResults[currentQuestionIndex] = false;
    }

    setTimeout(function(){
        $('#questionModal').modal('toggle');
        $('#check'+value).hide();
        sp.stop();
        handleDataChange(); // updates map and challenge modals immediately
    },3000);
  });

});


$(window).unload(function(){
    console.log("here about to remove chatbox: " + chatName);
    removeChat(chatName);
});

$(window).on("hashchange", function(){
    console.log("here about to remove chatbox: " + chatName);
    removeChat(chatName);
    // clear gameInfo, because you're leaving the current game
    localStorage.removeItem("gameInfo");
});