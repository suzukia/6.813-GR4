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
