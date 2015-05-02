$(document).ready(function() {

  var fadeOutAlert = function() {
    $('#errorDiv').fadeOut(150);
  }

  var fadeInAlert = function() {
    $('#errorDiv').fadeIn(150);
  }


  $("#createModal").modal('show');
  // $('#errorDiv').alert("close");
  $('#errorDiv').hide();
  // $('#errorDiv').addClass("in");

  $('#create-game-title').click(function() {
    fadeOutAlert();
  });

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



  // load list of friends
  var loadCreateGameFriendList = function() {
    var friends = formatUsers(getStorageItem("friends"));
    for (var i=0; i<friends.length; i++) {
      $('#invite-friends').append('<li class="list-group-item friend_info clearfix">'+friends[i].name()+'<button class="btn btn-primary btn-xs pull-right" id="inviteButton'+friends[i].name()+'" >Invite</button></li>');
      $('#inviteButton'+friends[i].name()).click(function() {
        var name = $(this).attr("id").slice(12);

        var invitedIndex = checkIfInObjectArray(name, invitedFriends);
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
      console.log(maps[i].name)
      var text1 = 'this is the realj lasdkfj laskdfj lasj asldfkj lasdkfj lasdkfj laksdfj lkasdjfl kjadsflription description description description asdf  asdflkj;l  l;akjsdf ;lkj ;lakjdf ;lakjdf ;lkajd ;lkajdf lksjdf lkjadsf lkjsd lkjasldkfj alskdfj laksdjf lkasdfj lkfj lksjdflk jaslfk jlakdj';
      var text2 = 'this asdfj lkfj lksjdflk jaslfk jlakdj';
      var text3 = 'this is the realj lasdkfj laskdfj lasj asldfkj lasdkfj lasdkfj laksdfj lkasdjfl kjadsflription description descripti';
      var text;

      var image = $('<img />', {
        id : "iconFor" +maps[i].name,
        hspace : 4,
        src : "../images/chat/avatar5.gif"
      }).css({
        "vertical-align" : "middle",
        "margin" : 0,
        "height" : "50px",
        "width" : "50px"
      });
      var span1 = $('<span />', {
        class : "helper"
      });
      var span2 = $('<span />', {
        class : "helper"
      });


      var divForImage = $('<div />', {
        class : "col-md-2 divForImage",
        id : 'divForImage'+maps[i].name

      }).css({
        "padding-left" : 0,
        "padding-right" : 0,
        "vertical-align" : "middle"
      }).append(span1).append(image);

      var descriptionContent = $('<div />', {
        id : 'descriptionContent'+maps[i].name,
        text : text1
      }).css({
         "display" : "table-cell",
         "vertical-align": "middle"
      });

      var descriptionDiv = $('<div />', {
        class : "col-md-10 descriptionDiv",
        id : 'descriptionDiv'+maps[i].name,
      }).css({
         "display" : "table",
         "vertical-align": "middle",
         "padding": 0
      }).append(descriptionContent);

      // var span = $('<span />', {
      //   class : "helper"
      // });

      var anchor = $('<a />', {
        href : '#',
        class : "list-group-item map_info" ,
        id : 'select'+maps[i].name
      }).css({
        "margin-bottom" : 1
      });

      var mapRowDiv = $('<div />', {
        class : "row",
        id : 'row'+maps[i].name
      }).css({
        margin : 0
      });

      // mapRowDiv.append(span);
      mapRowDiv.append(divForImage).append(descriptionDiv);
      anchor.append(mapRowDiv);
      $('#map-list').append(anchor);


      // make all the image and texts the same height, for centering
      setTimeout(function() {
        for (var i=0; i<maps.length; i++) {
          var maxHeight = Math.max($('#descriptionDiv'+maps[i].name).height(), $('#divForImage'+maps[i].name).height());
          $('#divForImage'+maps[i].name).height(maxHeight);
          $('#descriptionDiv'+maps[i].name).height(maxHeight);
          // console.log($('#divForImage'+maps[i].name).height());
          // console.log($('#descriptionDiv'+maps[i].name).height());
        }
      }, 150);



    }

    // this is to make the bottom margin visible
    $('.map_info').css("margin-bottom", 0);

    $('.map_info').click(function() {
      fadeOutAlert();
      if (selectedMap) {
        // reset previous selection to have a grey border
        selectedMap.css("border-color","#ddd");
      }
      // new selection gets an orange border
      $(this).css("border-color","orange");
      selectedMap = $(this);
    });
  }

  var adjustHeight = function() {
    var h = $('#descriptionDivSpace').height();
    // console.log(h);
    // console.log("here");
  }





  $('#invite-friends').slimScroll({
    height: 0.5*$(window).height()
  });

  $('#map-list').slimScroll({
    height: 0.5*$(window).height()
  });


  loadCreateGameFriendList();
  loadMapList();
  adjustHeight();

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


  $('#startCreateButton').click(function(){
    var otherContent =  '<a href="#" class="close" id="closeAlert" >&times;</a><p><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><strong> Error!</strong></p>'
    var errorString = "";
    // check if game title and map are selected
    gameTitle = $('#create-game-title').val().trim();
    if (gameTitle === "" || !selectedMap) {
      if (gameTitle === "") {
        errorString += "<p>- You must enter a game title</p>"
      }
      if (!selectedMap) {
        errorString += "<p>- You must select a map</p>"
      }
      $('#errorDiv').html(otherContent+errorString);

      $('#closeAlert').click(function() {
        fadeOutAlert();
      });

      fadeInAlert();
    }
    else {
      // store in local storage the invitedFriends, selectedMap, gameTitle, public/private information
      var mapTitle = selectedMap.attr("id").slice(6);
      var map = getMapByName(mapTitle);
      players = [];


      if (!privateGame) { //add random users for public games; max number of other players is 3
        var players = getRandomUsers(3 - invitedFriends.length);
      }
      for (var i=0; i<invitedFriends.length; i++) {
        if (checkIfInObjectArray(invitedFriends[i].name, players) === -1) {
          players.push(invitedFriends[i]);
        }
      }

      var gameInfo = {
        // gameTitle
        map: map,
        players: players,
        privateGame: privateGame
      }
      setStorageItem("gameInfo", gameInfo);
      console.log(gameInfo)
      // redirect to map page
      // redirectTo("map.html");
    }
  });

});





