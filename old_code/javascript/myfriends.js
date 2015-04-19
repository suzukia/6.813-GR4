friends = {"Amy" : true, "Bob" : false}; // friend dict representing friends and online status

/*
 * First letter of name must be uppercase, rest lowercase
 */
function addFriendToFriendList(name) {
	var li = $('<li />', {
		class : "list-group-item clearfix",
		id    : "friend-amy",
		text  : name
	});

	var btn = $('<button />', {
		type  : 'button',
		class : 'btn btn-primary pull-right',
		value : 'unfriend-' + name.toLowerCase() + '-button',
		text  : 'Unfriend'
	});

	btn.click(function(event) {
		// $(this).parent().remove();
		// removeFriendFromChat()
		delete friends[name];
		refreshChatAndFriendList();
	});

	$('#friends-list').append(li.append(btn));
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
		class : "list-group-item",
		value : "chat-" + name.toLowerCase(),
	});

	li.click(function() {
		openChat(name);
	});

	var img = $('<img />', {
		id : row_type,
		hspace : hspace,
		src : 'images/chat/' + status
	});

	$('#friends-chat').append(li.append(img).append(name));
	// $('#friends-chat').append('<li class="list-group-item" value="chat-' + name.toLowerCase() + '">' +
 //        '<img id="' + row_type + '" hspace="' + hspace + '" src="images/chat/' + status + '">' + name + '</li>');
}

openChats = {};

function openChat(name) {
	/*
	    now if box is not null,
	    we are toggling chat box.
	*/
	var box = openChat[name];

	if(box != undefined)
	{
	    box.chatbox("option", "boxManager").toggleBox();
	}
	else
	{
		var chatBox = $('<div />', { id: 'chat_div_'+name });
		$('#chat-boxes').append(chatBox);

	    box = chatBox.chatbox(
	    {
	        id:name,
	        user:
	        {
	            key : "value"
	        },
	        title : name,
	        /*
	            messageSend as name suggest,
	            this will called when message sent.
	            and for demo we have appended sent message to our log div.
	        */
	        messageSent : function(id, user, msg)
	        {
	            $("#log").append(id + " said: " + msg + "<br/>");
	            chatBox.chatbox("option", "boxManager").addMsg(id, msg);
	        }
	    });
	}
}

function refreshChatAndFriendList() {
	$('#friends-list').empty();
	$('#friends-chat').empty();

	for (var name in friends) {
	  if (friends.hasOwnProperty(name)) {
	    addFriendToFriendList(name);
	    addFriendToChat(name, friends[name])
	  }
	}
}

function setupAutocompleteSearch() {
	var availableUser = [];
	users.forEach(function(user) {
		var name = user.name();
		if (!friends[name] && name != "Eirik") {
			availableUser.push(name);
		}
	});

	$('#search-input').autocomplete({
		source : availableUser
	});
}

$(document).ready(function() {
	refreshChatAndFriendList();
	setupAutocompleteSearch();
})