$(document).ready(function() {
    // universal.js must be run first to get URL parameters

    friends.sort();

    var resetChatList = function() {
      $("#chatList").html('');
      for (var i=0;i<friends.length;i++) {
        $('.'+friends[i].toLowerCase()+'FriendRequest').hide();
        if (i < friends.length/2) { // list online friends first
          $("#chatList").append('<li class="list-group-item"><img style="height:auto; width:auto; max-width:15px; max-height:15px;" hspace="2" src="images/chat/online.png">'+friends[i]+'</li>');
        }
        else { //offline friend
          $("#chatList").append('<li class="list-group-item"><img style="height:auto; width:auto; max-width:15px; max-height:15px;" hspace="2" src="images/chat/offline.png">'+friends[i]+'</li>');
        }
      }
    }

    resetChatList();


    var addNewestFriendToChat = function(friend) {
      $("#chatList").append('<li id="'+friend+'Chat" class="list-group-item"><img style="height:auto; width:auto; max-width:15px; max-height:15px;" hspace="2" src="images/chat/offline.png">'+friend+'</li>');
    }

    $("#noGameInvitation").hide();


    if (friends.indexOf('Elizabeth') === -1) {
      $(".elizabethGameInvitation").hide();
      $("#noGameInvitation").show();
    }



 //$('#navbar-title').text("Welcome, Erik");
 // $('#navbar-title').append($( "h2" ))
 // $('#navbar-title').text("Welcome, Erik");
 // $('#navbar-buttons').append($( "#gameInvitations" ));

 // $('#navbar-buttons').append($( "#friendRequests" ));
    $("#newGameButton").click(function(){
      $("#createModal").modal('show');
      resetFriendInviteList();
    })

    $("#chooseForMeButton").click(function(){
      window.location = 'map.html'+getFriendsURL()+getPlayersURL( (getRandomPlayers(3)) );
    })

    $("#AcceptAmyFriendButton").click(function() {
      $(".amyFriendRequest").hide();
      friends.push("Amy");
      // addNewestFriendToChat("Amy");
      resetChatList();
    });

    $("#IgnoreAmyFriendButton").click(function() {
      $(".amyFriendRequest").hide();
    });

    $("#AcceptBobFriendButton").click(function() {
      $(".bobFriendRequest").hide();
      friends.push("Bob");
      // addNewestFriendToChat("Bob");
      resetChatList();
    });

    $("#IgnoreBobFriendButton").click(function() {
      $(".bobFriendRequest").hide();
    });

    $("#joinElizabethButton").click(function() {
      $(".elizabethGameInvitation").hide();
      $("#noGameInvitation").show();
      window.location = 'map.html'+getFriendsURL()+getPlayersURL( ['Elizabeth'].concat(getRandomPlayers(2)) );
    });

    $("#ignoreElizabethButton").click(function() {
      $(".elizabethGameInvitation").hide();
      $("#noGameInvitation").show();
    });

    $(".join").click(function() {
      var x = Math.random();
      if (x<0.5) {
        window.location = 'map.html'+getFriendsURL()+getPlayersURL( (getRandomPlayers(3)) );
      }
      else {
        window.location = 'map.html'+getFriendsURL()+getPlayersURL( (getRandomPlayers(2)) );
      }
    });

    $("#toMyFriends").click(function() {
      $(this).attr("href","myfriends.html"+getFriendsURL());
      // window.location = 'myfriends.html'+getFriendsURL();
    });


});

