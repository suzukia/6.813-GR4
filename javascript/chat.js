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
	// chat.css('top', top);
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


openChats = {};
openChatsOrder = [];
backedUpChats = [];
chatWidth = 250;

function openChat(name) {
	/*
	    now if box is not null,
	    we are toggling chat box.
	*/
	var box = openChats[name];

	if(box != undefined)
	{
		console.log(box.chatbox("option", "hidden"));
		if (!box.chatbox("option", "boxManager").open)
	    	box.chatbox("toggleContent");
	    box.chatbox("inputBox").focus();
	}
	else
	{
		if (chatBoxOffset(Object.keys(openChats).length) + chatWidth > parseInt($(window).width()) - 30) {
			if (backedUpChats.indexOf(name) < 0) {
				backedUpChats.push(name);
				updateChatBoxOverflowIcon();
			}
		}
		else {
			var chatBox = $('<div />', { id: 'chat_div_'+name });
			// $('#chat-boxes').append(chatBox);

		    box = createChatBox(chatBox, name);

		    openChats[name] = box;
		    openChatsOrder.push(name);
		    extraChatTextAreaFormatting(box.chatbox("inputBox"));
		    box.chatbox("inputBox").focus();
		}
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

function refreshChatList() {
	friendsChat.empty();

	for (var name in friends) {
	  if (friends.hasOwnProperty(name)) {
	    addFriendToChat(name, friends[name])
	  }
	}
}

function createChatBox(chatBox, name) {
	return chatBox.chatbox(
    {
        id:name,
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
        messageSent : function(id, user, msg)
        {
            $("#log").append(id + " said: " + msg + "<br/>");
            chatBox.chatbox("option", "boxManager").addMsg(id, msg);
        },
        boxClosed : function(id)
        {
        	delete openChats[id]
        	openChatsOrder.splice(openChatsOrder.indexOf(id), 1);
        	// reset positions
        	var i = 0;
        	openChatsOrder.forEach(function(name) {
        		console.log(openChats[name].chatbox('widget'));
        		console.log(openChats[name].chatbox('widget').css("right"));
        		openChats[name].chatbox('widget').css("right", chatBoxOffset(i));
        		i += 1;
        	});

        }
    });
}

function updateChatBoxOverflowIcon() {

}

function chatBoxOffset(i) {
	return (i * (chatWidth+20)) + $('#friends-chat').width() + 5
}