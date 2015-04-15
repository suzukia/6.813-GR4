friends = {"Amy" : true, "Bob" : false}; // friend dict representing friends and online status

/*
 * First letter of name must be uppercase, rest lowercase
 */
function addFriendToFriendList(name) {
	// $('#friends-list').append('<li class="list-group-item clearfix">' + name +
	//     '<button type="button" class="btn btn-primary pull-right" value="unfriend-' + name.toLowerCase() + 
	//     '">Unfriend</button></li>');
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
	$('#friends-chat').append('<li class="list-group-item" value="chat-' + name.toLowerCase() + '">' +
        '<img id="' + row_type + '" hspace="' + hspace + '" src="images/chat/' + status + '">' + name + '</li>');
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

$(document).ready(function() {
	refreshChatAndFriendList();
})