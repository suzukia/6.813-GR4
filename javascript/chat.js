/***************************************/
/******* Must come after js file  ******/
/******* with friends var defined ******/
/***************************************/

var username = localStorage.getItem("username");
var friends = formatUsers(getStorageItem("friends"));
var chatSimCount = getStorageItem("chatSimCount");
var friendsChat;

$(document).ready(function() {
	friendsChat = $('#friends-chat');
});

function setupChatStyle(top, bottom, filter) {
	console.log(top);
	console.log(bottom);
	refreshChatList(filter);

	var chat = $('#chat-bar');
	var bottomFactor = .6;
	var windowSize = parseInt($(window).height());

	chat.css('position', 'fixed');
	// chat.css('top', top);
	chat.css('bottom', bottom);
	chat.css('right', 0);
	chat.css('padding-right', 0);
	chat.css('padding-top', 0);
	chat.css('padding-bottom', 0);
	chat.css('max-height', $(window).height()-top-bottom);

	$('#friends-chat.list-group').css('margin-bottom', 0);
	// console.log("friends-chat: " + friendsChat.height());
	// console.log("window: " + (windowSize-top-bottom));
	console.log("friendsChat height: " + friendsChat.height());
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
			openChat(name, basicMsgSentFuncConv);
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

function refreshChatList(filter) {
	console.log("inside refreshChatList");
	friendsChat.empty();
	friendsChat.css('height', "");

	friends.forEach(function(user) {
		if ((filter == undefined) || (filter != undefined && filter(user.name())) )
			addFriendToChat(user.name(), true, user.avatar());
	});
}


var	openChatsOrder = getStorageItem("openChatsOrder"),
	chatIsOpen = getStorageItem("chatIsOpen"),
	queuedChats = getStorageItem("queuedChats"),
	chatLogs = getStorageItem("chatLogs");
	chatWidth = 250;

var openChats = {};

function openChat(name, msgSentFunc, state) {
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

		    box = createChatBox(chatBox, name, msgSentFunc);

		    if (state != undefined) { 
		    	openChats[name] = box;
		    	populateChatWithPreviousMsgs(box, chatLogs[name]);
		    	if (currentChatOpen(box) != state)
	    			box.chatbox("toggleContent");
	    	}

		    if (currentChatOpen(box))	// if the chat is open then focus on it
		    	box.chatbox("inputBox").focus();

		    if (state == undefined) {	// adding new chatbox
		    	chatSimCount[name] = 0;
		    	console.log("chat sim count: " + chatSimCount[name]);
		    	chatLogs[name] = [];
		    	addChat(name, box);
		    }

		    extraChatTextAreaFormatting(box.chatbox("inputBox"));
		}
	}

	return box;

}

function currentChatOpen(box) {
	return box.chatbox("option", "boxManager").open;
}

function openExistingChats(chats, chatStates) {
	chats.forEach(function(chatName) {
		openChat(chatName, basicMsgSentFunc, chatStates[chatName]);
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

function addMsgToChatLog(boxName, sender, msg) {
	chatLogs[boxName].push([sender, msg]);
	updateChatInfo();
	console.log(chatLogs);
}

function addMsgToChatbox(chatBox, name, msg) {
	chatBox.chatbox("option", "boxManager").addMsg(name, msg);
}

function populateChatWithPreviousMsgs(chatBox, msgs) {
	msgs.forEach(function(msg) {
		addMsgToChatbox(chatBox, msg[0], msg[1]);
	});
}

function addQueuedChat() {
	if (queuedChats.length > 0)
		dequeChat();
}

function updateChatSimCount(name) {
	chatSimCount[name] = parseInt(chatSimCount[name]) + 1;
	setStorageItem("chatSimCount", chatSimCount);
}

function updateChatInfo() {
	setStorageItem("chatIsOpen", chatIsOpen);
	setStorageItem("openChatsOrder", openChatsOrder);
	setStorageItem("queuedChats", queuedChats);
	setStorageItem("chatLogs", chatLogs);
}

function createChatBox(chatBox, name, msgSentFunc) {
	console.log("chatbox offset: " + chatBoxOffset(Object.keys(openChats).length));
	chatIsOpen[name] = true;
	return chatBox.chatbox(
    {
        id:username,
        chatboxID: name,
        user:
        {
            key : "value"
        },
        title : name,
        offset: chatBoxOffset(Object.keys(openChats).length),
        width: chatWidth,
        /*
            messageSend as name suggest,
            this will called when message sent.
            and for demo we have appended sent message to our log div.
        */
        messageSent : msgSentFunc(chatBox, name),
        updateChatState : function(chatboxID, state) {
        	updateChatState(chatboxID, state);
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

function basicMsgSentFunc(chatBox, name) {
    //$("#log").append(id + " said: " + msg + "<br/>");
    return function(id, user, msg) {
	    chatBox.chatbox("option", "boxManager").addMsg(id, msg);

	    addMsgToChatLog(name, id, msg);
	    
	    if (chatSimCount[name] == 0)
	    	simulateInitConversation(chatBox, name);
	    if (chatSimCount[name] == 1)
	    	simulateSecondConversation(chatBox, name);
	    updateChatSimCount(name);
	    console.log(getStorageItem("chatSimCount"));
	}
}

function gameMsgSentFunc(chatBox, name) {
	return function(id, user, msg) {
	    chatBox.chatbox("option", "boxManager").addMsg(id, msg);

	    addMsgToChatLog(name, id, msg);
	    
	    if (chatSimCount[name] == 0)
	    	simulateSecondGameConversation(chatBox, name);
	    	// simulateInitGameConversation(chatBox, name);
	    // if (chatSimCount[name] == 1)
	    // 	simulateSecondGameConversation(chatBox, name);
	    updateChatSimCount(name);
	    console.log(getStorageItem("chatSimCount"));
	}
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

function toggleTypingIndicator(chatBox) {
	chatBox.chatbox("toggleTypingIndicator");
}


/********************************************************/
/******************** Chat Simulation *******************/
/********************************************************/

function simulateInitConversation(chatBox, name) {
	var firstMsgTime = 2500,
		firstMsg = "hey " + username,
		secondMsgTime = 5500,
		secondMsg = "Ooo Let's play a game! I'll send you an invitation",
		thirdMsgTime = 8000,
		thirdMsg = "Got it?!",
		resetTime = 100;

	setTimeout(function() {
		chatBox.chatbox("toggleTypingIndicator");
	}, firstMsgTime - 1500);

	setTimeout(function() {
		addMsgToChatbox(chatBox, name, firstMsg);
		addMsgToChatLog(name, name, firstMsg);
	}, firstMsgTime);

	setTimeout(function() {
		chatBox.chatbox("toggleTypingIndicator");
	}, firstMsgTime - resetTime);

	setTimeout(function() {
		chatBox.chatbox("toggleTypingIndicator");
	}, secondMsgTime - 2000);

	setTimeout(function() {
		addMsgToChatbox(chatBox, name, secondMsg);
		addMsgToChatLog(name, name, secondMsg);
	}, secondMsgTime);

	setTimeout(function() {
		chatBox.chatbox("toggleTypingIndicator");
	}, secondMsgTime - resetTime);

	setTimeout(function() {
		chatBox.chatbox("toggleTypingIndicator");
	}, thirdMsgTime - 1000);

	setTimeout(function() {
		addMsgToChatbox(chatBox, name, thirdMsg);
		addMsgToChatLog(name, name, thirdMsg);
	}, thirdMsgTime);

	setTimeout(function() {
		chatBox.chatbox("toggleTypingIndicator");
	}, thirdMsgTime - resetTime);
	
}

function simulateSecondConversation(chatBox, name) {
	var firstMsgTime = 2500,
		firstMsg = "Cool! See you in the Game!",
		resetTime = 100;

	setTimeout(function() {
		chatBox.chatbox("toggleTypingIndicator");
	}, firstMsgTime - 1500);

	setTimeout(function() {
		addMsgToChatbox(chatBox, name, firstMsg);
		addMsgToChatLog(name, name, firstMsg);
	}, firstMsgTime);

	setTimeout(function() {
		chatBox.chatbox("toggleTypingIndicator");
	}, firstMsgTime - resetTime);
}

/************************************************************/
/******************** Game Chat Simulation ******************/
/************************************************************/
//var gamePlayers = ["User1", "User2", "User3", "User4"];
function simulateInitGameConversation(chatBox, boxName) {
	var gamePlayers = boxName.split(',').sort(function() {return 0.5 - Math.random()}),
		firstMsgTime = 2500,
		firstMsgs = ["hey guys!","wassup", "heyy", "everyone ready, right?!"].sort(function() {return 0.5 - Math.random()}),
		secondMsgs = ["sure am!", "let's do this!", "my other friends said they learned some really cool things on this map so let's do it"];
		resetTime = 100,
		playerToSpeak = 0,
		msgID = 0;


	setTimeout(function() {
		chatBox.chatbox("toggleTypingIndicator");
	}, firstMsgTime - 1500);

	setTimeout(function() {
		var firstPerson = gamePlayers[playerToSpeak];
		addMsgToChatbox(chatBox, firstPerson, firstMsgs[msgID]);
		addMsgToChatLog(boxName, firstPerson, firstMsgs[msgID]);
	}, firstMsgTime);

	gamePlayers.forEach(function(playerName) {

	});
}
