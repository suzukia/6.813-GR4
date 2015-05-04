/**
  * Global Variables
  */
var kltNavbar, kltFooter, username;

$(document).ready(function() {

    // // you're still in a game: redirect back to map page
    // var checkGameInfo = localStorage.getItem("gameInfo");
    // if (checkGameInfo) {
    //     redirectTo("map.html");
    // }

    $(window).resize(function() {
        friendsChat.slimScroll({destroy: true});
        configChat();
    });

    username = localStorage.getItem("username");
    kltNavbar = $('.klt-navbar');
    kltFooter = $('.klt-footer');

    displayPublicGames();

    configNavbar();
    configGameListing();

    //dynamic public game list
    function displayPublicGames() {
        $('#games').html("");
        for (var i=0; i<publicGames.length; i++) {

            // construct string list of players
            var playerString = publicGames[i].players[0].name();
            for (var j=1; j<publicGames[i].players.length; j++) {
                if (j === publicGames[i].players.length-1) {
                    playerString += " and ";
                }
                else {
                    playerString += ", ";
                }
                playerString += publicGames[i].players[j].name();

            }

            var dropDownImage = $('<img />', {
                id : "dropdown-icon",
                hspace : 4,
                src : "../images/glyphicons_free/glyphicons/png/glyphicons-602-chevron-down.png"
            });

            var dropDownDiv = $('<div />', {
                id : "dropdown-icon-container"
            }).append(dropDownImage);

            var span = $('<span />', {
                id : "dropdown-helper"
            });

            var extraInfoDiv = $('<div />', {
                class : "extra_game_info",
                text: publicGames[i].map.description + " Players: " +playerString
            });

            var li = $('<li />', {
                id : "li" +"publicGame"+i,
                class: "list-group-item game_info",
                text: publicGames[i].title + " ("+ publicGames[i].map.name + ") "
            });

            li.append(span).append(dropDownDiv).append(extraInfoDiv);
            $('#games').append(li);
        }
    };

    //event handlers
    $('#create-new-game').click(function() {
        setUpCreateGameModal();
        $("#createModal").modal('show');
    });

    $('#choose-for-me').click(function() {
        var randomGame = publicGames[ getRandomNum(publicGames.length) ];
        localStorage.removeItem("gameInfo");
        setStorageItem("gameInfo", randomGame);

        // redirect to map page
        redirectTo("map.html");
    });


});

function configNavbar(){
    $('.content').css('margin-top', kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10));
    $('#navbar-title').text("Welcome, " + username);
}

function configGameListing() {
    var listing = $('.game_info');
    var gameInfoIndex = 2,
        dropdownIconIndex = 0,
        dropdownIconContainerIndex = 1;

    for (var i = 0; i < listing.length; i++) {
        var game_info = $(listing[i]);
        game_info.addClass('glist-item'); // will not stay here with dynamic population

        var t = true;
        game_info.click(function() {
            var thisDiv = $(this);
            var gMainChild = $(thisDiv.children()[gameInfoIndex]);
            var dropdownIcon = $($($(this).children()[dropdownIconContainerIndex]).children()[dropdownIconIndex]);
            console.log(dropdownIcon);
            var opened = function() { return thisDiv.attr('opened'); }
            thisDiv.attr('opened', opened() == undefined || opened() == 'false' ? false : true);
            console.log($(this).attr("opened"));

            if (thisDiv.attr('opened') == 'true') {
                thisDiv.attr('opened', false);
                gMainChild.hide( "slide", { direction: "up" }, 400);
                dropdownIcon.attr('src', '../images/glyphicons_free/glyphicons/png/glyphicons-602-chevron-down.png');
            } else {
                thisDiv.attr('opened', true);
                dropdownIcon.attr('src', '../images/glyphicons_free/glyphicons/png/glyphicons-601-chevron-up.png');
                console.log("up Icon");
                gMainChild.show( "slide", {direction: "down" }, 400);
            }
        });
    };
}