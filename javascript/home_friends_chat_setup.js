$(document).ready(function() {
    friendsChat = $('#friends-chat');
    kltNavbar  = $('.klt-navbar');
    kltFooter  = $('.klt-footer');

    configChat();
    configChatSearch();
    openExistingChats(openChatsOrder, chatIsOpen);
});

function configChat(filter) {
    var top = kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10),
        bottom = kltFooter.height();

    setupChatStyle(top, bottom, filter);
}

function configChatSearch() {
    var chatSearch = $('#search-chat-btn');

    chatSearch.val("");

    chatSearch.keyup(function(e) {
        console.log(e);
        console.log($(this).val());

        friendsChat.slimScroll({destroy: true});
        var srchText = $(this).val();
        configChat(function(name) {
            var lName = name.toLowerCase();
            return lName.substring(0, srchText.length) == srchText;
        });
    });
}