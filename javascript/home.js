/**
  * Global Variables
  */
var kltNavbar, kltFooter, username;

$(document).ready(function() {

    $(window).resize(function() {
        friendsChat.slimScroll({destroy: true});
        configChat();
    });

    username = sessionStorage.getItem("username");
    kltNavbar = $('.klt-navbar');
    kltFooter = $('.klt-footer');
    
    configNavbar();
    configChat();
    openExistingChats(openChatsOrder, chatIsOpen);
    configGameListing();
});

function configNavbar(){
    $('.content').css('margin-top', kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10));
    $('#navbar-title').text("Welcome, " + username);
}

function configChat() {
    var top = kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10),
        bottom = kltFooter.outerHeight();

    setupChatStyle(top, bottom);
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