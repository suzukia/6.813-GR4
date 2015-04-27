
// returns map object from list of maps
function getMapByName(name) {
  var maps = getStorageItem("maps");
  for (var i=0; i<maps.length; i++) {
    if (maps[i].name === name) {

      return maps[i];
    }
  }
}

// returns map object from list of maps
function getUserByName(name) {
  var users = formatUsers(getStorageItem("users"))
  for (var i=0; i<users.length; i++) {
    if (users[i].name() === name) {
      return users[i];
    }
  }
}

$(document).ready(function() { // must be loaded AFTER utilityFuncs.js

  var maps = [
    {name:"Space",
    description: "Explore the solar system!"
    },
    {name:"Medieval",
    description: "Journey to your throne"
    }
  ]
  setStorageItem("maps", maps);

});


