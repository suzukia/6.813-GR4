$(document).ready(function() {
	var h = $(window).height();

	$('img').css('height', parseInt(h)-60);

	var usernameText = $('#username-input');
	usernameText.val("");

	usernameText.focus();

	usernameText.keypress(function(event) {
		if (event.which == 13) {
			localStorage.setItem("username", usernameText.val());
			redirectTo("home.html");
		}
	});

	$('#username-btn').click(function() {
		localStorage.setItem("username", usernameText.val());
		redirectTo("home.html");
	});

	var requiredFields = ["username", "users", "friends", "friendReqs",
					  "chatIsOpen", "openChatsOrder", "queuedChats",
					  "chatLogs", "maxNameLength", "notifications"];

	setStorageItem("requiredFields", requiredFields);
	
  // // you're still in a game: redirect back to map
  // var checkGameInfo = localStorage.getItem("gameInfo");
  // if (checkGameInfo) {
  //     redirectTo("map.html");
  // }

});

