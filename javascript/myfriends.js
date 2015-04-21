$(document).ready(function() {

    $(window).resize(function() {
        $('#friends-chat').slimScroll({destroy: true});
        $('#friends-list').slimScroll({destroy: true});
        configFriendsList();
        configChat();
    });

    configFriendsList();
    configChat();
    refreshFriendList();
	setupAutocompleteSearch();
});

function configChat() {
    var kltNavbar = $('.klt-navbar');
    var top = kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10),
        bottom = kltNavbar.outerHeight();

    setupChatStyle(top, bottom);
}

function configFriendsList() {
    var kltNavbar = $('.klt-navbar');
    var top = kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10),
        bottom = kltNavbar.outerHeight();

    // setupFriendsListStyle(top, bottom);
}

function setupFriendsListStyle(top, bottom) {
	var chat = $('#chat-bar'),
		friends = $('#friends-list');

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


/****************** Friends Associated Code *******************/

/*
 * First letter of name must be uppercase, rest lowercase
 */
function addFriendToFriendList(name, pending) {
	var li = $('<li />', {
		class : "list-group-item clearfix flist-item",
		id    : "friend-"+name,
		text  : name
	});

	var btn = undefined;

	if (pending) {
		btn = $('<button />', {
			type  : 'button',
			class : 'btn btn-default pull-right',
			value : 'pending-' + name.toLowerCase() + '-button',
			text  : 'Pending...',
			disabled : 'disabled'
		});
	} else {
		btn = $('<button />', {
			type  : 'button',
			class : 'btn btn-primary pull-right',
			value : 'unfriend-' + name.toLowerCase() + '-button',
			text  : 'Unfriend'
		});

		btn.click(function() {
			delete friends[name];
			refreshChatAndFriendList();
		});
	}

	$('#friends-list').append(li.append(btn));
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
	// $('#friends-list').empty();
	// $('#friends-chat').empty();

	// for (var name in friends) {
	//   if (friends.hasOwnProperty(name)) {
	//     addFriendToFriendList(name, false);
	//     addFriendToChat(name, friends[name])
	//   }
	// }

	// for (var name in pendingFriendReqs) {
	// 	if (pendingFriendReqs.hasOwnProperty(name)) {
	// 		addFriendToFriendList(name, true);
	// 	}
	// }
	refreshFriendList();
	refreshChatList();
}

function refreshFriendList() {
	$('#friends-list').empty();

	for (var name in friends) {
	  if (friends.hasOwnProperty(name)) {
	    addFriendToFriendList(name, false);
	  }
	}

	for (var name in pendingFriendReqs) {
		if (pendingFriendReqs.hasOwnProperty(name)) {
			addFriendToFriendList(name, true);
		}
	}
}

function setupAutocompleteSearch() {

	var searchInput = $('#search-friends-btn');
	searchInput.val("");

	$("#search-friends-btn").autocomplete({
        source: filterNonFriends(users, friends, pendingFriendReqs),
        focus: function (event, ui) {
            return false;
        },
        select: function (event, ui) {
        	event.preventDefault();
            return false;
        }
    })
        .data("autocomplete")._renderItem = function (ul, item) {
        	var name = item.name();

        	var li = $('<li />', {
				class : "list-group-item clearfix",
				id    : "friend-"+name.toLowerCase(),
				text  : name 
			});

			var btn = $('<button />', {
				type  : 'button',
				class : 'btn-xs btn-primary pull-right',
				value : 'addfriend-' + name.toLowerCase() + '-button',
				text  : 'Add'
			});

			btn.click(function(event) {
				pendingFriendReqs[name] = setOnline();
				refreshChatAndFriendList();
				setupAutocompleteSearch();
				console.log($(this).parent().parent().parent());
				$(this).parent().parent().hide();
			});
        return li.append(btn).appendTo(ul);
    };
}

function setOnline() {
	var probOnline = .5;
	return Math.random() < probOnline;
}

function filterNonFriends(users, friends, pendingFriends) {
	var nonFriends = [];
	users.forEach(function(user) {
		var name = user.name();
		if (friends[name] == undefined && pendingFriends[name] == undefined) {
			nonFriends.push(user);
		}
	});
	return nonFriends;
}