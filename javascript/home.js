$(document).ready(function() {

    $(window).resize(function() {
        $('#friends').slimScroll({destroy: true});
        configChat();
    });

    configChat();
    configGameListing();
});

function configChat() {
    var kltNavbar = $('.klt-navbar');
    var top = kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10),
        bottom = kltNavbar.outerHeight();

    setupChatStyle(top, bottom);
}

function configGameListing() {
    var listing = $('.game_info');

    for (var i = 0; i < listing.length; i++) {
        var game_info = $(listing[i]);

        // game_info.mouseout(function() {
        //     var gChildren = $($(this).children()[0]);
        //     gChildren.hide( "slide", { direction: "up" }, "fast" );
        // });

        game_info.mouseover(function() {
            var gChildren = $($(this).children()[0]);
            game_info.mouseover = undefined;
            gChildren.show( "slide", { direction: "down" }, function() {
                gChildren.mouseout(function() {
                    gChildren.hide( "slide", { direction: "up" } );
                });
            });
        });
    };
}