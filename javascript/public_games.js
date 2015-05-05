// must be called AFTER utilityFuncs.js

var publicGames = [];
var numGames = 20;
var gameTitles = ["we rock", "I <3 space", "Awesomest game ever", "bestestest game", "best 5th graders",
"the cool game", "we love math group", "Happiest 6th graders", "math masters", "scientists",
"blueberries", "computer wizards", "chocolate pretzels", "rock stars", "caramel ice cream",
"musicians", "high score", "red apples", "jungle wilderness", "Course 6 rocks"];

totalUsers = getUserTotal();

for (var i=0; i<numGames; i++) {
  var map = getRandomMap();
  var gameTitle = gameTitles[ i%gameTitles.length ];
  var requiredNumPlayers = 4;

  var game = {
    title: gameTitle,
    map: map,
    players: getRandomUsers(requiredNumPlayers),
    privateGame: false
  }

  publicGames.push(game);
  
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