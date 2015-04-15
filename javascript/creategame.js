$(document).ready(function() {

////////// HELPER FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // helper function to set up initial buttons
  var setUpRadioButtons = function(defaultChecked) {
    if (defaultChecked === "private") {
      uncheckedButtonId = 'publicButton';
      checkedButtonId = 'privateButton';
    }
    else {
      uncheckedButtonId = 'privateButton';
      checkedButtonId = 'publicButton';
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

  $("button").button();
  // console.log($("button"));

  var invitedFriends = {};


  window.resetFriendInviteList = function() {
    $("#friendsTable").html('');
    console.log(friends);
    invitedFriends = {};
    for (var i=0;i<friends.length;i++) {
      $("#friendsTable").append('<tr><td class="friendName">'+friends[i]+'</td><td><button id="invite'+friends[i]+'Button" class="alignRight btn btn-info btn-xs">Invite</button></td></tr>');
      $('#invite'+friends[i]+'Button').click(function() {
        if (!invitedFriends[friends[i]]) {
          invitedFriends[friends[i]] = true;
          $(this).html('Uninvite');
        }
        else {
          delete invitedFriends[friends[i]];
          $(this).html('Invite');
        }
      });
    }
  }




////////// EVENT HANDLERS //////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // click handler for radio button labels
  $('label[name=private-public-label]').click(function(e) {
    // keep track of which button is checked
    if (checkedButtonId === "publicButton") {
        checkedButtonId = 'privateButton';
        uncheckedButtonId = 'publicButton';
    }
    else {
        checkedButtonId = 'publicButton';
        uncheckedButtonId = 'privateButton';
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




  $('#startCreateButton').click(function(){
    var playersList = invitedFriends.keys();
    window.location = 'map.html'+getFriendsURL()+getPlayersURL(playerList);
  });

});