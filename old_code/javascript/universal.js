$(document).ready(function() {
    //default start with no friends, unless passed as URL parameter:
    window.friends = [];

    window.randomUsers = ["Chris", "Tom", "Kate", "Harry", "Ellie"];

    // code snippet from http://ziemecki.net/content/javascript-parsing-url-parameters
    // return parameters from URL as {param:valueList}
    function getParams ()
    {
      d = {};
      var params = location.search.substr(location.search.indexOf("?")+1);
      var sval = "";
      params = params.split("&");
        // split param and value into individual pieces
        for (var i=0; i<params.length; i++)
           {
             temp = params[i].split("=");
             // if ( [temp[0]] == sname ) { sval = temp[1]; }
             if (temp[1]) {
                d[temp[0]]= temp[1].split("%");

             }
           }
      // console.log(sval);
      // return sval;
      console.log(d);
      return d;
    }

    var urlParams = getParams();
    if (urlParams.friends) {
        friends = friends.concat(urlParams.friends);
    }
    console.log(friends);

    //get all friends to pass onto next page
    window.getFriendsURL = function() {
        var paramstring = "?friends=";
        // for (var i=1; i<friends.length; i++) {
        //     paramstring += friends[i]
        // }
        paramstring += friends.join("%");
        return paramstring;
    }

    //get URL string for players part
    window.getPlayersURL = function(playersList) {
        var paramstring = "&players=";
        paramstring += playersList.join("%");
        return paramstring;
    }

    // function to get you a list of random non-friend users
    // number is the max # people
    // if number is -1, return all random players
    window.getRandomPlayers = function(number) {
        if (number === -1) {
            return randomUsers;
        }
        else {
            var temp = randomUsers.slice();
            var list = [];
            for (var i=0; i<number; i++){
                if (temp.length>0) {
                    var n = Math.floor(Math.random() * temp.length);
                    var y = temp[n];
                    list.push(y);
                    temp.splice(n, 1);;
                }
            }
            return list;
        }
    }
});
