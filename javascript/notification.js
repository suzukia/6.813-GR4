var friendship = ' wants to be your friend',
	accept = 'Accept';

var gameInvite = ' Invited you to play the ',
	join = 'Join';

var ignore = 'Ignore';

var users = null;
var notifications = null;

$(document).ready(function() {

	users = formatUsers(getStorageItem("users")),

	// setup the list element for the notifications
	setupNotifications();

});

function createFR(name, notifID, notifications) {
	return $('<li />', { class : 'centerAlign'})
		.append($('<div />', { text : name + friendship}))
		.append($('<div />')
			.append($('<div />', { class : 'notif-btn'})
				.append(acceptFriendInviteBtn(name, notifications, notifID)))
			.append($('<div />', { class : 'notif-btn'})
				.append(ignoreInviteBtn(notifications, notifID))));
}

function createGI(name, game, notifID, notifications) {
	return $('<li />', { class : 'centerAlign'})
		.append($('<div />', { text : name + gameInvite + game['title']}))
		.append($('<div />')
			.append($('<div />', { class : 'notif-btn'})
				.append(acceptGameInvitation(game, notifications, notifID)))
			.append($('<div />', { class : 'notif-btn'})
				.append(ignoreInviteBtn(notifications, notifID))));
}

function acceptFriendInviteBtn(name, notifications, notifID) {
	function addFriend() {
		console.log(name);
		var friends = formatUsers(getStorageItem("friends"));

		users.forEach(function(user) {
			if (user.name() == name) {
				console.log("Accept FR");
				friends.push(user);
			}
		})
		setStorageItem("friends", friends);
		refreshChatList();
	}

	return $('<button />', { class : 'btn btn-primary btn-xs', text : accept })
			.click(function() {
				console.log("inside request");
				removeNotif(notifications, notifID);
				addFriend();
				setupNotifications();
			});
}

function acceptGameInvitation(game, notifications, notifID) {
	function directToGame() {
		setNewGame(game);
		redirectTo('map.html');
	}

	return $('<button />', { class : 'btn btn-primary btn-xs', text : join })
			.click(function() {
				removeNotif(notifications, notifID);
				directToGame();
			})
}

function removeNotif(notifications, notifID) {
	delete notifications[notifID]
	setStorageItem("notifications", notifications);
}

function ignoreInviteBtn(notifications, notifID) {

	return $('<div />', { class : 'btn btn-default btn-xs', text : ignore })
			.click(function() {
				removeNotif(notifications, notifID);
				setupNotifications();
			});
}

function setupNotifications() {
	notifications = getStorageItem("notifications");

	var notifsIcon = $('#notifications');
	notifsIcon.find('ul').remove();

	var notifsLst = $('<ul />', {
		class : 'dropdown-menu',
		role : 'menu'
	});

	var divider = $('<div />', { class : 'divider' });

	notifsLst.empty();
	for (var notifID in notifications) {
	  if (notifications.hasOwnProperty(notifID)) {
	  	var notif = notifications[notifID];
	    var type = notif['type'],
	    	name = notif['name'];

	    if (type == 'FR')
	    	notifsLst.append(createFR(name, notifID, notifications))
	    			 .append(divider);
	    if (type == 'GI')
	    	notifsLst.append(createGI(name, notif['game'], notifID, notifications))
	    			 .append(divider);
	  }
	}

	if (Object.keys(notifications).length > 0)
		notifsIcon.append(notifsLst);

	setNotifAlert(Object.keys(notifications).length)
	
}

function setNotifAlert(num_of_icons) {

	var notifImg = $('#notifs-img');
	notifImg.find('span').remove();
	
	if (num_of_icons > 0) {
		notifImg.append($('<span />', {
			class :"badge notif-badge",
			text  : num_of_icons
		}));
	}
}