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
	queuedChats = getStorageItem("queuedChats"),
	chatWidth = 250;

var openChats = {};

function openChat(name, state) {
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
			if (queuedChats.indexOf(name) < 0) {
				queueChat(name);
				updateChatBoxOverflowIcon();
			}
		}
		else {
			var chatBox = $('<div />', { id: 'chat_div_'+name });

		    box = createChatBox(chatBox, name);

		    if (state != undefined) { 
		    	openChats[name] = box;
		    	if (currentChatOpen(box) != state)
	    			box.chatbox("toggleContent");
	    	}

		    if (currentChatOpen(box))
		    	box.chatbox("inputBox").focus();

		    if (state == undefined) {
		    	console.log("adding new chatBox");
		    	addChat(name, box);
		    }

		    extraChatTextAreaFormatting(box.chatbox("inputBox"));
		}
	}

}

function currentChatOpen(box) {
	return box.chatbox("option", "boxManager").open;
}

function openExistingChats(chats, chatStates) {
	chats.forEach(function(chatName) {
		openChat(chatName, chatStates[chatName]);
	});
}

function addChat(name, box) {
	console.log("adding chatbox: " + name);
	openChats[name] = box;
	openChatsOrder.push(name);
	updateChatInfo();
}

function removeChat(name) {
	delete openChats[name]
	console.log(openChatsOrder);
    openChatsOrder.splice(openChatsOrder.indexOf(name), 1);
    console.log(openChatsOrder);
    updateChatInfo();
}

function queueChat(name) {
	queuedChats.push(name);
	updateChatInfo();
}

function dequeChat() {
	openChat(queuedChats.splice(0, 1));
	updateChatInfo();
}

function updateChatState(name, state) {
	chatIsOpen[name] = state;
	updateChatInfo();
}

function updateChatInfo() {
	setStorageItem("chatIsOpen", chatIsOpen);
	setStorageItem("openChatsOrder", openChatsOrder);
	setStorageItem("queuedChats", queuedChats);
}

function createChatBox(chatBox, name) {
	console.log("chatbox offset: " + chatBoxOffset(Object.keys(openChats).length));
	chatIsOpen[name] = true;
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

        	addQueuedChat();

        	// reset positions
        	var i = 0;
        	openChatsOrder.forEach(function(chatName) {
        		console.log(chatName);
        		openChats[chatName].chatbox('widget').css("right", chatBoxOffset(i));
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

function addQueuedChat() {
	if (queuedChats.length > 0)
		dequeChat();
}

function chatBoxOffset(i) {
	console.log($('#friends-chat').width());
	console.log("ith chatbox: " + i);
	return (i * (chatWidth+20)) + $('#friends-chat').width() + 5
}