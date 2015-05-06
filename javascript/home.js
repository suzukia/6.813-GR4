/**
  * Global Variables
  */
var kltNavbar, kltFooter, username;

$(document).ready(function() {

    if (localStorage.getItem("username") == null)
        redirectTo("login.html")
    if (parseInt(localStorage.getItem("loggedIn")) == 0) {
        init_user();
        init_map();
        localStorage.setItem("loggedIn", 1);
    } 

    checkRequiredFields();
    
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

    configNavbar();
    configGameListing();

    //event handlers
    $('#create-new-game').click(function() {
        setUpCreateGameModal();
        $("#createModal").modal('show');
    });

    $('#choose-for-me').click(function() {
        var randomGame = publicGames[ getRandomNum(publicGames.length) ];
        setNewGame(randomGame);
        
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