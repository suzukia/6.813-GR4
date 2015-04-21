/***************************************/
/******* Must come after js file  ******/
/******* with friends var defined ******/
/***************************************/

var friendsChat;
$(document).ready(function() {
	friendsChat = $('#friends-chat');
	refreshChatList();
});

function setupChatStyle(top, bottom) {
	var chat = $('#chat-bar');

	chat.css('position', 'absolute');
	chat.css('top', top);
	chat.css('bottom', bottom);
	chat.css('right', 0);
	chat.css('padding-right', 0);
	chat.css('padding-top', 0);

	friendsChat.slimScroll({
        height: $(window).height()-top-bottom
    });
}

/*
 * First letter of name must be uppercase. rest lowercase
 * If student is currently online, online = true
 */
function addFriendToChat(name, online) {
	var status   = online ? 'online.png' : 'offline.png';
	var row_type = online ? 'online-friend-chat' : 'offline-friend-chat';
	var hspace   = online ? 4 : 5;

	var li = $('<li />', {
		class : "list-group-item clist-item",
		value : "chat-" + name.toLowerCase(),
	});

	li.click(function() {
		openChat(name);
	});

	var img = $('<img />', {
		id : row_type,
		hspace : hspace,
		src : '../images/chat/' + status
	});

	friendsChat.append(li.append(img).append(name));
}

function refreshChatList() {
	friendsChat.empty();

	for (var name in friends) {
	  if (friends.hasOwnProperty(name)) {
	    addFriendToChat(name, friends[name])
	  }
	}
}