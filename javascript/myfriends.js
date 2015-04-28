/**
 * Global Variables
 */
 var kltNavbar, kltFooter, friendsLst;

$(document).ready(function() {

    if (getStorageItem("users") == null)
      redirectTo("login.html");

    $(window).resize(function() {
    	$('#friends-chat').slimScroll({destroy: true});	
        // $('#friends-list').slimScroll({destroy: true});
        // configFriendsList();
        console.log("window resize");
        configChat();
    });

    kltNavbar  = $('.klt-navbar');
    kltFooter  = $('.klt-footer');
    friendsLst = $('#friends-list');

    $('.content').css('margin-top', kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10));
    // configFriendsList();
    configChat();
    refreshFriendList();
	setupAutocompleteSearch();
});

var users = formatUsers(getStorageItem("users")),
	friends = formatUsers(getStorageItem("friends")),
	pendingFriendReqs = formatUsers(getStorageItem("friendReqs"));

function configChat() {
    var top = kltNavbar.outerHeight() + parseInt(kltNavbar.css('margin-bottom'), 10),
        bottom = parseInt(kltFooter.height());

    setupChatStyle(top, bottom);
}

function configFriendsList() {
    var heightfromNav = 75;
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
			class : 'btn btn-danger pull-right',
			value : 'pending-' + name.toLowerCase() + '-button',
			text  : 'Cancel'
		});

		btn.click(function() {
			removeFriendReq(name);
			refreshChatAndFriendList();
			setupAutocompleteSearch();
		});		
	} else {
		btn = $('<button />', {
			type  : 'button',
			class : 'btn btn-primary pull-right',
			value : 'unfriend-' + name.toLowerCase() + '-button',
			text  : 'Unfriend'
		});

		btn.click(function() {
			removeFriend(name);
			refreshChatAndFriendList();
			setupAutocompleteSearch();
		});
	}

	friendsLst.append(li.append(btn));
}

function refreshChatAndFriendList() {
	refreshFriendList();
	refreshChatList();
}

function compareUserBy(f) {
	return function(a,b) {
		return f(a).localeCompare(f(b));
	}
}

function usersName(user) { 
	return user.name(); 
}

function refreshFriendList() {
	friendsLst.empty();

	friends.sort(compareUserBy(usersName)).forEach(function(user) {
		addFriendToFriendList(user.name(), false);
	});

	pendingFriendReqs.sort(compareUserBy(usersName)).forEach(function(user) {
		addFriendToFriendList(user.name(), true);
	});
}

function setupAutocompleteSearch() {

	var searchInput = $('#search-friends-btn');
	searchInput.val("");

	$('#search-friends-btn').keydown(function(event){
	    if(event.keyCode == 13) {
	      event.preventDefault();
	      return false;
	  }
	});

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
        },
        keydown: function(event, ui) {
		    if(event.keyCode == 13) {
		      event.preventDefault();
		      return false;
		    }
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
				addFriendReq(user);
				refreshChatAndFriendList();
				setupAutocompleteSearch();
				console.log($(this).parent().parent().parent());
				$(this).parent().parent().hide();
			});
        return li.append(btn).appendTo(ul);
    };
}

function addFriendReq(user) {
	pendingFriendReqs.push(user);
	setStorageItem("friendReqs", pendingFriendReqs);
}

function removeFriendReq(username) {
	var userIndex = -1,
		i = 0;
	pendingFriendReqs.forEach(function(user) {
		if(usersName(user) == username)
			userIndex = i;
		i += 1;
	});

	if (userIndex != -1)
		pendingFriendReqs.splice(userIndex,1);
	setStorageItem("friendReqs", pendingFriendReqs);
}

function removeFriend(username) {
	var userIndex = -1,
		i = 0;
	friends.forEach(function(user) {
		if(usersName(user) == username)
			userIndex = i;
		i += 1;
	});

	if (userIndex != -1)
		friends.splice(userIndex,1);
	setStorageItem("friends", friends);
}

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