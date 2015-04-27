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
  // var selectedMapTitle;
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



  var loadCreateGameFriendList = function() {
    // var users = formatUsers(getStorageItem("users")),
    var friends = formatUsers(getStorageItem("friends"));

    // var friendNames = Object.keys(friends);
    for (var i=0; i<friends.length; i++) {
      $('#invite-friends').append('<li class="list-group-item friend_info clearfix">'+friends[i].name()+'<button class="btn btn-primary btn-xs pull-right" id="inviteButton'+friends[i].name()+'" >Invite</button></li>');
      $('#inviteButton'+friends[i].name()).click(function() {
        var name = $(this).attr("id").slice(12);
        console.log("here is the name");
        console.log(name);

        var invitedIndex = checkIfInvited(name);
        if (invitedIndex === -1) {
          if (invitedFriends.length >= 3) {
            alert("You can only invite up to 3 friends");
          }
          else {
            invitedFriends.push(getUserByName(name));
            // console.log("clicked");
            // console.log(invitedFriends);
            $(this).html("Uninvite");
          }
        }
        else {
          invitedFriends.splice(invitedIndex,1);
          console.log(invitedFriends);
          // delete invitedFriends[name];
          // console.log("clicked");
          console.log(invitedFriends);
          $(this).html("Invite");
        }
      });
    }
  }


    var loadMapList = function() {
    // var maps = ['Space', 'Medieval'];
    var maps = getStorageItem("maps");
    // console.log(maps);
    for (var i=0; i<maps.length; i++) {
      $('#map-list').append('<li class="list-group-item map_info" id="select'+maps[i].name+'" style="margin-bottom:1">'+maps[i].name+'<div class="extra_map_info">'+maps[i].description+'</div></li>');
      // $('#inviteButton'+friendNames[i]).click(function() {
      //   var name = $(this).attr("id").slice(12);
      //   if (!invitedFriends[name]) {
      //     if (Object.keys(invitedFriends).length >= 3) {
      //       alert("You can only invite up to 3 friends");
      //     }
      //     else {
      //       invitedFriends[name] = true;
      //       // console.log("clicked");
      //       // console.log(invitedFriends);
      //       $(this).html("Uninvite");
      //     }
      //   }
      //   else {
      //     delete invitedFriends[name];
      //     // console.log("clicked");
      //     // console.log(invitedFriends);
      //     $(this).html("Invite");
      //   }
      // });
      // $('#select'+maps[i]).click(function() {
      //     .css("border-width",1)
      // }
      // console.log($('#select'+maps[i]));
      // console.log($('#select'+maps[i]).css("border", "20px"));

    }
    // this is to make the bottom margin visible
    $('.map_info').css("margin-bottom", 0);


    $('.map_info').click(function() {
      // if (currentMap !== )
      console.log($(this));
      // console.log((selectedMap !== $(this)));
      // if (selectedMap !== $(this)) { // user selected a different map
        if (selectedMap) {
          // reset previous selection to have a grey border
          selectedMap.css("border-color","#ddd");
        }
        // new selection gets an orange border
        $(this).css("border-color","orange");
        selectedMap = $(this);
      //     $('#'+currentMap).css("border-width",'');
      //     $('#'+currentMap).css("border-color",'');
      //   }
        // var
        // $(this).css("border-width",1);

      // }
      // $(this).removeClass('')
      // $(this).addClass('selectedMap');
      // }
    });

    // $('#invite-friends').height(0.5*$(window).height());
    // $('#invite-friends').css("overflow-y", "auto");

    // $('#map-list').height(0.5*$(window).height());
    // $('#map-list').css("overflow-y", "auto");


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





  // console.log($("button"));

  // var invitedFriends = {};


  // window.resetFriendInviteList = function() {
  //   $("#friendsTable").html('');
  //   console.log(friends);
  //   invitedFriends = {};
  //   for (var i=0;i<friends.length;i++) {
  //     $("#friendsTable").append('<tr><td class="friendName">'+friends[i]+'</td><td><button id="invite'+friends[i]+'Button" class="alignRight btn btn-info btn-xs">Invite</button></td></tr>');
  //     $('#invite'+friends[i]+'Button').click(function() {
  //       if (!invitedFriends[friends[i]]) {
  //         invitedFriends[friends[i]] = true;
  //         $(this).html('Uninvite');
  //       }
  //       else {
  //         delete invitedFriends[friends[i]];
  //         $(this).html('Invite');
  //       }
  //     });
  //   }
  // }




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

    // var radioValue = $("input[name='private-public']:checked").val();
    // console.log("the one that is checked now");
    // console.log(radioValue);
    return false;
  });




  var getUsersByNames = function(userNames) {
    var userObjectsList = [];
    for (var i=0; i<userNames.length; i++) {

    }
  }



  $('#startCreateButton').click(function(){
    // alert(Object.keys(invitedFriends))
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
      console.log(gameInfo);
      setStorageItem("gameInfo", gameInfo);
      // redirect to map page
      // redirectTo("map.html");
    }
  });

});





