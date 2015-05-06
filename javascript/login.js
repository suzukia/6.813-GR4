$(document).ready(function() {

	$(window).resize(function() {
		setImages();
	});

	setImages();
	
	var usernameText = $('#username-input');
	var passwordText = $('#password-input');
	usernameText.val("");
	passwordText.val("");

	// set the user as not being logged in
	localStorage.setItem("loggedIn", 0);

	usernameText.focus();

	function handleSubmit() {
		if (passwordText.val() === "" || usernameText.val() === "") {
			$('#error').text("Please enter a username and a password");
			passwordText.addClass("redBorder");
		}
		else if (passwordText.val() !== "learning") {
			$('#error').text("Incorrect username or password");
			passwordText.addClass("redBorder");
		}
		else {
			localStorage.setItem("username", usernameText.val());
			redirectTo("home.html");
		}
	}

	usernameText.keypress(function(event) {
		if (event.which == 13) {
			handleSubmit();
		}
	});

	passwordText.keypress(function(event) {
		if (event.which == 13) {
			handleSubmit();
		}
	});

	$('#username-btn').click(function() {
		// localStorage.setItem("username", usernameText.val());
		// redirectTo("initialize.html");
		handleSubmit();
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

function setImages() {
	var h = $(window).height();
	$('img').css('height', parseInt(h)-120);
}

