$(document).ready(function() {


    $("#createModal").modal('show');


////////// HELPER FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // helper function to set up initial buttons
  var setUpRadioButtons = function(defaultChecked) {
    if (defaultChecked === "private") {
      uncheckedButtonId = 'publicButton';
      checkedButtonId = 'privateButton';
      privateGame = true;
    }
    else {
      uncheckedButtonId = 'privateButton';
      checkedButtonId = 'publicButton';
      privateGame = false;

    }
    document.getElementById(checkedButtonId).checked = true;
    $('#'+checkedButtonId).attr("checked", true);
    $('#'+checkedButtonId+'Label').removeClass( "btn-default" ).addClass( "btn-primary active" );
    $('#'+uncheckedButtonId+'Label').removeClass( "btn-primary active" ).addClass( "btn-default" );
    var radioValue = $("input[name='private-public']:checked").val();
  }

///////// SET UP /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // $("#createModal").modal('show');

  // set up Radio buttons
  setUpRadioButtons("private");
  var checkedButtonId;
  var uncheckedButtonId;
  var privateGame;

  $("button").button();


  var invitedFriends = [];
  var selectedMap;
  var gameTitle;

  // helper function returning index of friend if they are already in the invitedFriends array; returns -1 if they are not in the array
  var checkIfInvited = function(friendName) {
    console.log(invitedFriends);
    for (var i=0; i<invitedFriends.length; i++) {
      if (invitedFriends[i].name() === friendName) {
        return i;
      }
    }
    return -1;
  }

  // load list of friends
  var loadCreateGameFriendList = function() {
    var friends = formatUsers(getStorageItem("friends"));
    for (var i=0; i<friends.length; i++) {
      $('#invite-friends').append('<li class="list-group-item friend_info clearfix">'+friends[i].name()+'<button class="btn btn-primary btn-xs pull-right" id="inviteButton'+friends[i].name()+'" >Invite</button></li>');
      $('#inviteButton'+friends[i].name()).click(function() {
        var name = $(this).attr("id").slice(12);

        var invitedIndex = checkIfInvited(name);
        if (invitedIndex === -1) {
          if (invitedFriends.length >= 3) {
            alert("You can only invite up to 3 friends");
          }
          else {
            invitedFriends.push(getUserByName(name));
            $(this).html("Uninvite");
          }
        }
        else {
          invitedFriends.splice(invitedIndex,1);
          $(this).html("Invite");
        }
      });
    }
  }


    var loadMapList = function() {
    var maps = getStorageItem("maps");
    for (var i=0; i<maps.length; i++) {
      $('#map-list').append('<li class="list-group-item map_info" id="select'+maps[i].name+'" style="margin-bottom:1">'+maps[i].name+'<div class="extra_map_info">'+maps[i].description+'</div></li>');
    }
    // this is to make the bottom margin visible
    $('.map_info').css("margin-bottom", 0);

    $('.map_info').click(function() {
      if (selectedMap) {
        // reset previous selection to have a grey border
        selectedMap.css("border-color","#ddd");
      }
      // new selection gets an orange border
      $(this).css("border-color","orange");
      selectedMap = $(this);
    });
  }

  $('#invite-friends').slimScroll({
    height: 0.5*$(window).height()
  });

  $('#map-list').slimScroll({
    height: 0.5*$(window).height()
  });


  loadCreateGameFriendList();
  loadMapList();


    $(window).resize(function() {
      $('#invite-friends').slimScroll({destroy: true});
      $('#map-list').slimScroll({destroy: true});
      $('#invite-friends').slimScroll({
        height: 0.5*$(window).height()
      });
      $('#map-list').slimScroll({
        height: 0.5*$(window).height()
      });
    });


////////// EVENT HANDLERS //////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // click handler for radio button labels
  $('label[name=private-public-label]').click(function(e) {
    // keep track of which button is checked
    if (checkedButtonId === "publicButton") {
        checkedButtonId = 'privateButton';
        uncheckedButtonId = 'publicButton';
        privateGame = true;
    }
    else {
        checkedButtonId = 'publicButton';
        uncheckedButtonId = 'privateButton';
        privateGame = false;
    }
    // manually change which button is checked (using JS and also jQuery)
    document.getElementById(checkedButtonId).checked = true;
    document.getElementById(uncheckedButtonId).checked = false;
    $('#'+checkedButtonId).attr("checked", true); // this is the other attribute but this doesn't get changed by clicking
    $('#'+uncheckedButtonId).attr("checked", false);

    // add and remove classes for styling
    document.getElementById(checkedButtonId+'Label').className = 'btn btn-primary active';
    document.getElementById(uncheckedButtonId+'Label').className = 'btn btn-default';
    return false;
  });


  var getUsersByNames = function(userNames) {
    var userObjectsList = [];
    for (var i=0; i<userNames.length; i++) {

    }
  }



  $('#startCreateButton').click(function(){
    // check if game title and map are selected
    gameTitle = $('#create-game-title').val().trim();
    if (gameTitle === "") {
      alert("You must enter a game title");
    }
    else if (!selectedMap) {
      alert("You must select a map");
    }
    else {
      // store in local storage the invitedFriends, selectedMap, gameTitle, public/private information
      var mapTitle = selectedMap.attr("id").slice(6);
      var map = getMapByName(mapTitle);

      var gameInfo = {
        map: map,
        players: invitedFriends, // need to get random people if # friends are invited are less than 3 and it's public
        privateGame: privateGame
      }
      // console.log(gameInfo);
      setStorageItem("gameInfo", gameInfo);
      // redirect to map page
      redirectTo("map.html");
    }
  });

});





