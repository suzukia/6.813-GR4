$(document).ready(function() {
 //$('#navbar-title').text("Welcome, Erik");
 // $('#navbar-title').append($( "h2" ))
 // $('#navbar-title').text("Welcome, Erik");
 // $('#navbar-buttons').append($( "#gameInvitations" ));

 // $('#navbar-buttons').append($( "#friendRequests" ));
    $("#newGameButton").click(function(){
      $("#createModal").modal('show');
    })

    $("#chooseForMeButton").click(function(){
      window.location = 'map.html';
    })

    $("#AcceptAmyButton").click(function() {
      $(".amyRequest").hide();
    });

    $("#IgnoreAmyButton").click(function() {
      $(".amyRequest").hide();
    });

    $("#AcceptBobButton").click(function() {
      $(".bobRequest").hide();
    });

    $("#IgnoreBobButton").click(function() {
      $(".bobRequest").hide();
    });

    $("#joinElizabethButton").click(function() {
      $(".elizabethRequest").hide();
      window.location = 'map.html';
    });

    $("#ignoreElizabethButton").click(function() {
      $(".elizabethRequest").hide();
    });

    $(".join").click(function() {
      window.location = 'map.html';
    });
});

