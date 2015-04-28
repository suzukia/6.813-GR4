/***************************************/
/******* Must come after js file  ******/
/******* with friends var defined ******/
/***************************************/

var friends = formatUsers(getStorageItem("friends"));
var friendsChat;

$(document).ready(function() {
	friendsChat = $('#friends-chat');
});

function setupChatStyle(top, bottom) {
	console.log(top);
	console.log(bottom);
	refreshChatList();

	var chat = $('#chat-bar');
	var bottomFactor = .6;
	var windowSize = parseInt($(window).height());

	chat.css('position', 'fixed');
	// chat.css('top', top);
	chat.css('bottom', bottom);
	chat.css('right', 0);
	chat.css('padding-right', 0);
	chat.css('padding-top', 0);
	chat.css('max-height', $(window).height()-top-bottom);

	$('#friends-chat.list-group').css('margin-bottom', 0);
	// console.log("friends-chat: " + friendsChat.height());
	// console.log("window: " + (windowSize-top-bottom));

	friendsChat.slimScroll({
        height: Math.min(friendsChat.height(), $(window).height()-top-bottom)
    });
}

/*
 * First letter of name must be uppercase. rest lowercase
 * If student is currently online, online = true
 */
function addFriendToChat(name, online, avatar) {
	var status   = online ? 'online.png' : 'offline.png';
	var row_type = online ? 'online-friend-chat' : 'offline-friend-chat';
	var hspace   = online ? 4 : 5;

	if (online) {
		var li = $('<li />', {
			class : "list-group-item clist-item",
			value : "chat-" + name.toLowerCase(),
		});

		li.hover(function() {
			$(this).css('background-color', '#E7E7E7');
		}, function() {
			$(this).css('background-color', '');
		});

		li.click(function() {
			openChat(name);
		});

		var img;

		if (avatar != undefined) {
			img = $('<img />', {
				id : row_type,
				hspace : hspace,
				src : avatar
			});
		} else {
			img = $('<img />', {
				id : row_type,
				hspace : hspace,
				src : '../images/chat/' + status
			});
		}

		friendsChat.append(li.append(img).append(name));
	}
}

function refreshChatList() {
	friendsChat.empty();
	friendsChat.css('height', "");

	friends.forEach(function(user) {
		addFriendToChat(user.name(), true, user.avatar());
	});
}


var	openChatsOrder = getStorageItem("openChatsOrder"),
	chatIsOpen = getStorageItem("chatIsOpen"),
	backedUpChats = getStorageItem("backedUpChats"),
	chatWidth = 250;

var openChats = {}
openExistingChats(openChatsOrder, chatIsOpen);

function openChat(name) {
	/*
	    now if box is not null,
	    we are toggling chat box.
	*/
	var box = openChats[name];

	if(box != undefined)
	{
		if (!currentChatOpen(box))
	    	box.chatbox("toggleContent");
	    box.chatbox("inputBox").focus();
	}
	else
	{
		if (chatBoxOffset(Object.keys(openChats).length) + chatWidth > parseInt($(window).width()) - 30) {
			if (backedUpChats.indexOf(name) < 0) {
				queueChat(name);
				updateChatBoxOverflowIcon();
			}
		}
		else {
			var chatBox = $('<div />', { id: 'chat_div_'+name });

		    box = createChatBox(chatBox, name);

		    addChat(name, box);
		    extraChatTextAreaFormatting(box.chatbox("inputBox"));

		    if (state != undefined) {
		    	if (currentChatOpen(box) != state)
		    		box.chatbox("toggleContent");
		    }

		    if (currentChatOpen(box))
		    	box.chatbox("inputBox").focus();
		}
	}

}

function currentChatOpen(box) {
	return box.chatbox("option", "boxManager").open;
}

function openExistingChats(openChats, chatStates) {
	var i = 0;
	openChats.forEach(function(chatName) {
		openChat(chatName, chatStates[i]);
		i += 1;
	});
}

function addChat(name, box) {
	openChats[name] = box;
	openChatsOrder.push(name);
	updateChatInfo();
}

function removeChat(name) {
	delete openChats[chatboxID]
    openChatsOrder.splice(openChatsOrder.indexOf(chatboxID), 1);
    updateChatInfo();
}

function queueChat(name) {
	backedUpChats.push(name);
	updateChatInfo();
}

function dequeChat() {
	openChat(backedUpChats.splice(0, 1));
	updateChatInfo();
}

function updateChatState(name, state) {
	chatIsOpen[name] = state;
	updateChatInfo();
}

function updateChatInfo() {
	setStorageItem("chatIsOpen", chatIsOpen);
	setStorageItem("openChatsOrder", openChatsOrder);
	setStorageItem("backedUpChats", backedUpChats);
}

function createChatBox(chatBox, name) {
	return chatBox.chatbox(
    {
        id:'Eirik',
        chatboxID: name,
        user:
        {
            key : "value"
        },
        title : name,
        offset: chatBoxOffset(Object.keys(openChats).length),
        width: chatWidth,
        updateChatState : function(chatboxID, state) {
        	updateChatState(chatboxID, state);
        },
        /*
            messageSend as name suggest,
            this will called when message sent.
            and for demo we have appended sent message to our log div.
        */
        messageSent : function(id, user, msg)
        {
            $("#log").append(id + " said: " + msg + "<br/>");
            chatBox.chatbox("option", "boxManager").addMsg(id, msg);
        },
        boxClosed : function(chatboxID)
        {
        	removeChat(chatboxID)

        	// reset positions
        	var i = 0;
        	openChatsOrder.forEach(function(name) {
        		openChats[name].chatbox('widget').css("right", chatBoxOffset(i));
        		i += 1;
        	});

        }
    });
}

function extraChatTextAreaFormatting(textArea) {
	var hiddenDiv = $(document.createElement('div')),
    	content = null;

	textArea.addClass('chatTextArea common');
	textArea.css('height', 25);

	hiddenDiv.addClass('hiddendiv common');
	hiddenDiv.css('width', textArea.css('width'));

	$('body').append(hiddenDiv);

	textArea.on('keyup', function () {

	    content = $(this).val();

	    content = content.replace(/\n/g, '<br>');
	    hiddenDiv.html(content + '<br class="lbr">');

	    $(this).css('height', hiddenDiv.height());
	});
}

function updateChatBoxOverflowIcon() {

}

function chatBoxOffset(i) {
	return (i * (chatWidth+20)) + $('#friends-chat').width() + 5
}