/**
  * Global Variables
  */
var kltNavbar;

$(document).ready(function() {

    $(window).resize(function() {
        friendsChat.slimScroll({destroy: true});
        configChat();
    });

    kltNavbar = $('.klt-navbar');
    $('.content').css('margin-top', kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10));
    
    configChat();
    configGameListing();
});

function configChat() {
    var top = kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10),
        bottom = kltNavbar.outerHeight();

    setupChatStyle(top, bottom);
}

function configGameListing() {
    var listing = $('.game_info');


    for (var i = 0; i < listing.length; i++) {
        var game_info = $(listing[i]);
        game_info.addClass('glist-item'); // will not stay here with dynamic population

        var t = true;
        game_info.mouseover(function() {
            var thisDiv = $(this);
            var gMainChild = $(thisDiv.children()[0]);
            var opened = function() { return thisDiv.attr('opened'); }
            thisDiv.attr('opened', opened() == undefined || opened() == 'true' ? true : false);

            if (thisDiv.attr('opened') == 'true') {
                console.log("mouseover");
                thisDiv.attr('opened', false);
                gMainChild.show( "slide", { direction: "down" }, 400, function() {

                    setTimeout(function() {
                        gMainChild.mouseout(function() {
                            gMainChild.hide( "slide", {direction: "up" }, 200, function() {
                                thisDiv.attr('opened', true);
                            });
                        });
                    }, 400);
                });
            }
        });
    };
}