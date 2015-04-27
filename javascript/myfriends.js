$(document).ready(function() {

    if (getStorageItem("users") == null)
      redirectTo("login.html");

    $(window).resize(function() {
        $('#friends-chat').slimScroll({destroy: true});
        // $('#friends-list').slimScroll({destroy: true});
        // configFriendsList();
        configChat();
    });

    // configFriendsList();
    configChat();
    refreshFriendList();
	setupAutocompleteSearch();
});

var users = formatUsers(getStorageItem("users")),
	friends = formatUsers(getStorageItem("friends")),
	pendingFriendReqs = formatUsers(getStorageItem("friendReqs"));

function configChat() {
    var kltNavbar = $('.klt-navbar'),
    	kltFooter = $('.klt-footer');
    var top = kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10),
        bottom = kltFooter.height();

    setupChatStyle(top, bottom);
}

function configFriendsList() {
    var kltNavbar = $('.klt-navbar'),
    	kltFooter = $('.klt-footer'),
    	heightfromNav = 75;
    var top = kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10) + heightfromNav,
        bottom = kltFooter.height();

    setupFriendsListStyle(top, bottom);
}

// function setupFriendsListStyle(top, bottom) {
// 	var friendsCont = $('#friends-container'),
// 		friends = $('#friends-list');

// 	friendsCont.css('max-height', $(window).height()-top-bottom);
// 	friends.css('max-height', $(window).height()-top-bottom);

// 	friends.slimScroll({
//         height: $(window).height()-top-bottom-25
//     });
// }


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
			//update friends list in localStorage
			refreshChatAndFriendList();
		});
	}

	$('#friends-list').append(li.append(btn));
}

function refreshChatAndFriendList() {
	refreshFriendList();
	refreshChatList();
}

function refreshFriendList() {
	$('#friends-list').empty();

	friends.forEach(function(user) {
		addFriendToFriendList(user.name(), false);
	});

	pendingFriendReqs.forEach(function(user) {
		addFriendToFriendList(user.name(), true);
	});
}

function setupAutocompleteSearch() {

	var searchInput = $('#search-friends-btn');
	searchInput.val("");

	$("#search-friends-btn").autocomplete({
        source: function(req, responseFn) {
	        var re = $.ui.autocomplete.escapeRegex(req.term);
	        var matcher = new RegExp( "^" + re, "i" );
	        var a = $.grep( filterNonFriends(users, friends, pendingFriendReqs), function(user,index){
	            return matcher.test(user.name());
	        });
	        responseFn( a );
	    },
        focus: function (event, ui) {
            return false;
        },
        select: function (event, ui) {
        	event.preventDefault();
            return false;
        }
    })
        .data("autocomplete")._renderItem = function (ul, user) {
        	var name = user.name();

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
				//Save updated reqs to loacalstorage
				pendingFriendReqs.push(user);
				refreshChatAndFriendList();
				setupAutocompleteSearch();
				console.log($(this).parent().parent().parent());
				$(this).parent().parent().hide();
			});
        return li.append(btn).appendTo(ul);
    };
}

// function setOnline() {
// 	var probOnline = .5;
// 	return Math.random() < probOnline;
// }

function filterNonFriends(users, friends, pendingFriends) {

	var nonFriends = [];
	users.forEach(function(user) {
		var name = user.name();
		if (!inUserSet(friends, name) && !inUserSet(pendingFriends, name)) {
			nonFriends.push(user);
		}
	});
	return nonFriends;
}