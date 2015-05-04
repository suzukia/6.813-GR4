// must be called AFTER utilityFuncs.js

var publicGames = [];
var numGames = 20;
var gameTitles = ["we rock", "I <3 space", "Awesomest game ever", "bestestest game", "best 5th graders",
"the cool game", "we love math group", "Happiest 6th graders", "math masters", "scientists",
"blueberries", "computer wizards", "chocolate pretzels", "rock stars", "caramel ice cream",
"musicians", "high score", "red apples", "jungle wilderness", "Course 6 rocks"];

var alreadyPlaying = [];

totalUsers = getUserTotal();

for (var i=0; i<numGames; i++) {
  var map = getRandomMap();
  var gameTitle = gameTitles[ i%gameTitles.length ];
  var actualPlayers = [];

  while (actualPlayers.length === 0 && totalUsers - actualPlayers.length >= 1) { // there are still users that can be placed in a public game
    var randomPlayers = getRandomUsers(getRandomNum(3)+1); // need 1-3 other users;
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

console.log("publicGames");
console.log(publicGames);
