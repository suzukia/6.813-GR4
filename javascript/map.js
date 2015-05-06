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
        if (currentMap.name == "Medieval") {
          $('#navbar-title').text(currentMap.name+" Adventure: "+currentMap.sceneUnit+" "+(currentSceneIndex+1));

        } else {
          $('#navbar-title').text(currentMap.name+" Expedition: "+currentMap.sceneUnit+" "+(currentSceneIndex+1));

        }
        
        // set background
        document.getElementById("map-image").innerHTML="<img src='"+currentMap.scenes[currentSceneIndex].image+"' alt='' height='100%' width='100%'>";
        // updateQuestionModal();
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
        $('#Atd').text('(A) ' + currentQuestion.choices[0]);
        $('#Btd').text('(B) ' + currentQuestion.choices[1]);
        $('#Ctd').text('(C) ' + currentQuestion.choices[2]);
        $('#Dtd').text('(D) ' + currentQuestion.choices[3]);
        if (!helping) {
            $('#submit').show();
            $('#helpYourFriend').hide();
        }
        else {
            $('#submit').hide();
            $('#helpYourFriend').show();
            var userHelping = sp.help();
            if (userHelping == true) {
              myVar = setTimeout(friendAnswersQuestion, 10000);
              

              thisVar = setTimeout(function(){
                  $('#questionModal').modal('hide');
                  $('#check'+currentQuestion.correctAnswer).hide();
                  sp.stop();
                  // handleDataChange(); // updates map and challenge modals immediately
                                if (Object.keys(unansweredQuestionIndices).length === 0) { // all Qs done for this scene
                if (currentSceneIndex === maxSceneIndex) { // you finished the last question on the last scene!
                    updateChallengeModal();
                    strikeThroughCompletedQuestions();
                    $('#finishedMapModal').modal('show');
                    setTimeout("leave()", 5000);

                }
                else { // move on to next scene!
                    currentSceneIndex ++;
                    // currentQuestionIndex = 0;
                    unansweredQuestionIndices = {}; // keep track of unanswered question indices. Use an Object so you can easily get Object.keys(unansweredQuestionIndices)
                    for (var i=0; i< currentMap.scenes[currentSceneIndex].questions.length; i++) {
                        unansweredQuestionIndices[i] = false;
                    }
                    answeredQuestionResults = {};

                    // update map, challenge modal, questions modal
                    updateMap();
                    updateChallengeModal();
                    clearStrikeThrough();
                    TotalSeconds = 180;
                    // UpdateTimer();
                }
              }
              else { // still Qs left in scene
                  // currentQuestionIndex = Object.keys(unansweredQuestionIndices)[0]; // get next smallest unanswered question
                  // updateMapChallengeQuestion();
                  updateMap();
                  updateChallengeModal();
                  strikeThroughCompletedQuestions();
              } 
              },13000);
            }
            helping = false;

        }
    }

    var friendAnswersQuestion = function() {
      $("#"+currentQuestion.correctAnswer).prop("checked", true);
      $("#check"+currentQuestion.correctAnswer).show();
      $("#check"+currentQuestion.correctAnswer).html("  &#x2713;");
      delete unansweredQuestionIndices[currentQuestionIndex];
      answeredQuestionResults[currentQuestionIndex] = true;
      var questionNumber = currentQuestionIndex+1;
      //strikeThroughCompletedQuestions();

      console.log('unanswered questions' + Object.keys(unansweredQuestionIndices));
    }

    var updateChallengeModal = function() {
        var numberOfQuestionsLeft = Object.keys(unansweredQuestionIndices).length;
        //console.log(numberOfQuestionsLeft);
        $('#createChallengeTitle').text(numberOfQuestionsLeft+"/5 Questions Left");
        $('#question1').text(currentMap.scenes[currentSceneIndex].questions[0].title);
        $('#question2').text(currentMap.scenes[currentSceneIndex].questions[1].title);
        // console.log(currentMap.scenes[currentSceneIndex].questions);
        $('#question3').text(currentMap.scenes[currentSceneIndex].questions[2].title);
        $('#question4').text(currentMap.scenes[currentSceneIndex].questions[3].title);
        $('#question5').text(currentMap.scenes[currentSceneIndex].questions[4].title); 
    }

    var updateMapChallengeQuestion = function() {
        updateMap();
        updateQuestionModal();
        updateChallengeModal();
        strikeThroughCompletedQuestions();
    }

    var strikeThroughCompletedQuestions = function() {
        for (var i in answeredQuestionResults) {
          if (answeredQuestionResults[i] == true) {
            var questionNumberIndex = parseInt(i)+1;
            //console.log("strikethrough #question" +questionNumberIndex);
            $('#question'+questionNumberIndex).removeAttr('data-toggle');
            $('#question'+questionNumberIndex).css('text-decoration', 'line-through');
          }
        }
    }

    var clearStrikeThrough = function() {
      for (var i=1; i<6; i++) {
        $('#question'+i).css('text-decoration', 'none');
      }
    }

    // called when user completes a question
    var handleDataChange = function() {
        // move on to next question, update challenge and question modals
        // console.log('handleDataChange' + Object.keys(unansweredQuestionIndices));
        if (Object.keys(unansweredQuestionIndices).length === 0) { // all Qs done for this scene
            if (currentSceneIndex === maxSceneIndex) { // you finished the last question on the last scene!
                updateChallengeModal();
                strikeThroughCompletedQuestions();
                $('#finishedMapModal').modal('show');
                setTimeout("leave()", 5000);

            }
            else { // move on to next scene!
                currentSceneIndex ++;
                // currentQuestionIndex = 0;
                unansweredQuestionIndices = {}; // keep track of unanswered question indices. Use an Object so you can easily get Object.keys(unansweredQuestionIndices)
                for (var i=0; i< currentMap.scenes[currentSceneIndex].questions.length; i++) {
                    unansweredQuestionIndices[i] = false;
                }
                answeredQuestionResults = {};

                // update map, challenge modal, questions modal
                updateMapChallengeQuestion();
                clearStrikeThrough();
                CreateTimer("timer", 180);
            }
        }
        else { // still Qs left in scene
            // currentQuestionIndex = Object.keys(unansweredQuestionIndices)[0]; // get next smallest unanswered question
            // updateMapChallengeQuestion();
            updateMap();
            updateChallengeModal();
            strikeThroughCompletedQuestions();
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
    if (currentMap.name == "Medieval") {
      $("#title").text(currentMap.name + " Adventure");
    } else {
      $("#title").text(currentMap.name + " Expedition");
    }
    


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// set up map page ///////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // sketchpad
    sp = new SketchPad("canvas-test");
    // sp.init(0);

    if (players.length >= 1) { // only open chat box if there are other players
        openChat(players.map(function(user) { return user.name(); }).join(','), gameMsgSentFunc);
    }

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
    var instructionText = "";
    if (currentMap.name == "Medieval") {
      instructionText = "Lords and Ladies of SELF and Most Honored and Distinguished Guests! Pray, follow me on my castle tour! My lady, the Countess of Warwick, says I am doing very well with my lessons, but there is so much to learn - come along, if you wish to learn too! Click anywhere on the map to start.";
      document.getElementById('instructionContent').style.fontFamily = "lucida calligraphy";

    } else { // space
      instructionText = "Greetings, Earthlings! Today we will take a short tour of the incredible solar system. The Universe is a vast place beyond imagining, and what we will try to do is help you understand a little more about it. Ready for lift off? Click anywhere on the map to start!";
      document.getElementById('instructionContent').style.fontFamily = "letter gothic std";
    }
    document.getElementById('instructionContent').innerHTML = instructionText;
    document.getElementById('instructionContent').style.fontSize = "large";
    $('#instructionModal').modal('show');

    // finished game text
    document.getElementById('finishedMapContent').innerHTML = "Congratulations! You finished the " + currentMap.name + " map!";

    // game over text
    document.getElementById('gameOverContent').innerHTML = "Oh no, looks like you ran out of time! Try again another time.";

    // to make image fill the entire body of the website
    $(".content").css("margin-top",0);
    $(".content").css("padding-left",0);
    $(".content").css("padding-right",0);
    $(".klt-navbar").css("margin-bottom",0);

    updateMapChallengeQuestion();

    // update when hiding
    $('#questionModal').on('hidden.bs.modal', function() {
        updateQuestionModal(); //show updated info
        sp.stop();
    })

    // update sketchpad on show
    $('#questionModal').on('shown.bs.modal', function() {
        // sp.init();
        updateQuestionModal();
    })

    // update when showing
    $('#challengeModal').on('shown.bs.modal', function() {
        updateChallengeModal();
        CreateTimer("timer", 180);
        
    })

    var Timer;
    var TotalSeconds;


    function CreateTimer(TimerID, Time) {
        Timer = document.getElementById(TimerID);
        TotalSeconds = Time;

        UpdateTimer()
        setTimeout(Tick, 1000);
    }

    function Tick() {
        if (TotalSeconds <= 0) {
            $('#gameOverModal').modal('show');
            setTimeout("leave()", 5000);
        }

        TotalSeconds -= 1;
        UpdateTimer()
        setTimeout(Tick, 1000);
    }


    function UpdateTimer() {
        var Seconds = TotalSeconds;

        var Days = Math.floor(Seconds / 86400);
        Seconds -= Days * 86400;

        var Hours = Math.floor(Seconds / 3600);
        Seconds -= Hours * (3600);

        var Minutes = Math.floor(Seconds / 60);
        Seconds -= Minutes * (60);


        var TimeStr = ((Days > 0) ? Days + " days " : "") + LeadingZero(Hours) + ":" + LeadingZero(Minutes) + ":" + LeadingZero(Seconds)


        Timer.innerHTML = "      Time Left: " + TimeStr;
    }


    function LeadingZero(Time) {

        return (Time < 10) ? "0" + Time : + Time;

    }


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
    //////////////////////////////// CHALLENGE MODAL EVENT HANDLERS//////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////// QUESTIONS MODAL //////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#question1').click(function() {
        currentQuestionIndex = 0;
        helping = false;
        $('#questionModal').modal('show');
    })

    $('#question2').click(function() {
      currentQuestionIndex = 1;
      helping = false;
      $('#questionModal').modal('show');
    })
    $('#question3').click(function() {
      currentQuestionIndex = 2;
      helping = false;
      $('#questionModal').modal('show');
    })
    $('#question4').click(function() {
      currentQuestionIndex = 3;
      helping = true;
      $('#questionModal').modal('show');
    })

    $('#question5').click(function() {
      currentQuestionIndex = 4;
      helping = true;
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
    },1500);
  });

});

// used for automatic redirect
var leave = function() {
  $('#finishedMapModal').modal('toggle');
  $('#challengeModal').modal('toggle');
  window.location.replace("home.html");
}


$(window).unload(function(){
    // console.log("here about to remove chatbox: " + chatName);
    removeChat(chatName);
});

$(window).on("hashchange", function(){
    // console.log("here about to remove chatbox: " + chatName);
    removeChat(chatName);
    // clear gameInfo, because you're leaving the current game
    localStorage.removeItem("gameInfo");
});