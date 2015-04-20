function setupChatStyle(top, bottom) {
	var chat = $('#chat-bar'),
		friends = $('#friends');

	chat.css('position', 'absolute');
	chat.css('top', top);
	chat.css('bottom', bottom);
	chat.css('right', 0);
	chat.css('padding-right', 0);
	chat.css('padding-top', 0);

	friends.slimScroll({
        height: $(window).height()-top-bottom
    });
}