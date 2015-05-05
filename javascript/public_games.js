// must be called AFTER utilityFuncs.js

var maxNumPlayers = 4;
var publicGames = [];
var numGames = 15;
var gameTitles = ["we rock", "I <3 space", "Awesomest game ever", "bestestest game", "best 5th graders",
"the cool game", "we love math group", "Happiest 6th graders", "math masters", "scientists",
"blueberries", "computer wizards", "chocolate pretzels", "rock stars", "caramel ice cream",
"musicians", "high score", "red apples", "jungle wilderness", "Course 6 rocks"];

totalUsers = getUserTotal();

var alreadyPlaying = [];

for (var i=0; i<numGames; i++) {
  var map = getRandomMap();
  var gameTitle = gameTitles[ i%gameTitles.length ];
  var actualPlayers = [];

  while (actualPlayers.length === 0 && totalUsers - actualPlayers.length >= 1) { // there are still users that can be placed in a public game
    var randomPlayers = getRandomUsers(maxNumPlayers-1); // need 1-3 other users;
    for (var j=0; j<randomPlayers.length; j++) { // check that each player does not overlap with other games' players
      if (checkIfInObjectArray(randomPlayers[j].name(), alreadyPlaying) === -1) {
        alreadyPlaying.push(randomPlayers[j]);
        actualPlayers.push(randomPlayers[j]);
      }
    }
  }

  if (actualPlayers.length > 0) {
    var game = {
      title: gameTitle,
      map: map,
      players: actualPlayers,
      privateGame: false
    }
    publicGames.push(game);
  }
}


$(document).ready(function() {
  displayPublicGames();
});

//dynamic public game list
function displayPublicGames() {
    $('#games').html("");
    for (var i=0; i<publicGames.length; i++) {

        // construct string list of players
        var playerString = publicGames[i].players[0].name();
        for (var j=1; j<publicGames[i].players.length; j++) {
            if (j === publicGames[i].players.length-1) {
                playerString += " and ";
            }
            else {
                playerString += ", ";
            }
            playerString += publicGames[i].players[j].name();

        }

        var dropDownImage = $('<img />', {
            id : "dropdown-icon",
            hspace : 4,
            src : "../images/glyphicons_free/glyphicons/png/glyphicons-602-chevron-down.png"
        });

        var dropDownDiv = $('<div />', {
            id : "dropdown-icon-container"
        }).append(dropDownImage);

        var span = $('<span />', {
            id : "dropdown-helper"
        });

        var extraInfoDiv = $('<div />', {
            class : "extra_game_info",
            text: publicGames[i].map.description + " Players: " +playerString
        });

        var li = $('<li />', {
            id : "li" +"publicGame"+i,
            class: "list-group-item game_info noIBar",
            text: publicGames[i].title + " ("+ publicGames[i].map.name + ") "
        });

        li.append(span).append(dropDownDiv).append(extraInfoDiv);
        $('#games').append(li);
    }
};