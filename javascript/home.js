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
    kltFooter = $('klt-footer');
    
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
    var gameInfoIndex = 2;

    for (var i = 0; i < listing.length; i++) {
        var game_info = $(listing[i]);
        game_info.addClass('glist-item'); // will not stay here with dynamic population

        var t = true;
        game_info.click(function() {
            var thisDiv = $(this);
            var gMainChild = $(thisDiv.children()[gameInfoIndex]);
            console.log(thisDiv.children());
            var opened = function() { return thisDiv.attr('opened'); }
            thisDiv.attr('opened', opened() == undefined || opened() == 'true' ? true : false);

            if (thisDiv.attr('opened') == 'true') {
                console.log("mouseover");
                thisDiv.attr('opened', false);
                gMainChild.show( "slide", { direction: "down" }, 400);
            } else {
                thisDiv.attr('opened', true);
                gMainChild.hide( "slide", {direction: "up" }, 400);
            }
        });
    };
}