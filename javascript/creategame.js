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


  var invitedFriends = {};
  var currentMap;

  var loadFriendsList = function() {
    var friendNames = Object.keys(friends);
    for (var i=0; i<friendNames.length; i++) {
      $('#invite-friends').append('<li class="list-group-item friend_info clearfix">'+friendNames[i]+'<button class="btn btn-primary btn-xs pull-right" id="inviteButton'+friendNames[i]+'" >Invite</button></li>');
      $('#inviteButton'+friendNames[i]).click(function() {
        var name = $(this).attr("id").slice(12);
        if (!invitedFriends[name]) {
          if (Object.keys(invitedFriends).length >= 3) {
            alert("You can only invite up to 3 friends");
          }
          else {
            invitedFriends[name] = true;
            // console.log("clicked");
            // console.log(invitedFriends);
            $(this).html("Uninvite");
          }
        }
        else {
          delete invitedFriends[name];
          // console.log("clicked");
          // console.log(invitedFriends);
          $(this).html("Invite");
        }
      });
    }
  }


    var loadMapList = function() {
    var maps = ['Space', 'Medieval'];
    for (var i=0; i<maps.length; i++) {
      $('#map-list').append('<li class="list-group-item map_info" id="'+maps[i]+' ">'+maps[i]+'<div class="extra_map_info"> Map extra info </div></li>');
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
    }
    $('.map_info').click(function() {
      // if (currentMap !== $(this).attr("id")) {
      //   if (currentMap) {
      //     $('#'+currentMap).css("border-width",'');
      //     $('#'+currentMap).css("border-color",'');
      //   }
      //   $(this).css("border-width",2);
      //   $(this).css("border-color","orange");
      // }
      $(this).addClass('selectedMap');
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


  loadFriendsList();
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
    alert(invitedFriends.keys())
  });

});





