var setUpCreateGameModal = function() {


  var maxNumberPlayers = 3;

  var fadeOutAlert = function() {
    $('#errorDiv').fadeOut(150);
  }

  var fadeInAlert = function() {
    $('#errorDiv').fadeIn(150);
  }


  $("#createModal").modal('show');
  $('#errorDiv').hide();

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

  // set up Radio buttons
  setUpRadioButtons("private");
  var checkedButtonId;
  var uncheckedButtonId;
  var privateGame;

  $("#privateButton").button();
  $("#publicButton").button();

  var invitedFriends = [];
  var selectedMap;
  var gameTitle;


  var disableAllUnselectedCheckboxes = function() {
    $('.inviteCheckbox').not(':checked').attr("disabled", true);
  }

  var enableAllCheckboxes = function() { // code snippet from: http://stackoverflow.com/questions/13471820/get-all-disabled-checkboxes
    $('.inviteCheckbox:disabled').removeAttr("disabled");
  }

  var clearInviteFriendsList = function() {
    $('#invite-friends').html("");
  }

  var clearMapsList = function() {
    $('#map-list').html("");
  }

  // load list of friends
  var loadCreateGameFriendList = function() {
    clearInviteFriendsList();
    var friends = formatUsers(getStorageItem("friends"));
    for (var i=0; i<friends.length; i++) {

      $('#invite-friends').append('<li id="inviteListItem'+friends[i].name()+'" class="list-group-item friend_info clearfix">'+friends[i].name()+'<label class="pull-right" ><input type="checkbox" class="inviteCheckbox" value="" id="inviteCheckbox'+friends[i].name()+'"></label></li>');

      // if a user clicks the list item (but not the checkbox), make it trigger a click on the checkbox
      $('#inviteListItem'+friends[i].name()).click(function(e) {
         if( e.target === this ) {
          var name = $(this).attr("id").slice(14);
          $('#inviteCheckbox'+name).trigger("click");
         }
      });

      // when checkbox values change, update invited friends list and make sure max 3 can be selected
      $('#inviteCheckbox'+friends[i].name()).change(function() {
        var name = $(this).attr("id").slice(14);
        var invitedIndex = checkIfInObjectArray(name, invitedFriends);

        if (invitedIndex === -1) { // this friend was not invited before
          if (invitedFriends.length === maxNumberPlayers-1) { // adding 3rd friend
            invitedFriends.push(getUserByName(name));
            disableAllUnselectedCheckboxes();
          }
          else if (invitedFriends.length <maxNumberPlayers-1) { // 1st or second friend inviting
            invitedFriends.push(getUserByName(name));
          }
          else { // more than 3 friends (you should never get here!)
            alert("You can only invite up to three friends");
          }
        }
        else { //this friend was invited before, so uninvite
          invitedFriends.splice(invitedIndex,1);
          enableAllCheckboxes();
        }
      });
    }
  }

  var loadMapList = function() {
    clearMapsList();
    var maps = getStorageItem("maps");
    for (var i=0; i<maps.length; i++) {
      var mapText = maps[i].description;

      var image = $('<img />', {
        id : "iconFor" +maps[i].name,
        hspace : 4,
        src : maps[i].icon
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
        text : mapText
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

      mapRowDiv.append(divForImage).append(descriptionDiv);
      anchor.append(mapRowDiv);
      $('#map-list').append(anchor);

      // make all the image and texts the same height, for centering
      setTimeout(function() {
        for (var i=0; i<maps.length; i++) {
          var maxHeight = Math.max($('#descriptionDiv'+maps[i].name).height(), $('#divForImage'+maps[i].name).height());
          $('#divForImage'+maps[i].name).height(maxHeight);
          $('#descriptionDiv'+maps[i].name).height(maxHeight);
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
      // console.log(gameInfo)
      // redirect to map page
      redirectTo("map.html");
    }
  });
}





