$(document).ready(function() {
	var h = $(window).height();

	$('img').css('height', parseInt(h)-60);

	var usernameText = $('#username-input');
	usernameText.val("");

	usernameText.focus();
	
	usernameText.keypress(function(event) {
		if (event.which == 13) {
			sessionStorage.setItem("username", usernameText.val());
			redirectTo("home.html");
		}
	});

	$('#username-btn').click(function() {
		sessionStorage.setItem("username", usernameText.val());
		redirectTo("home.html");
	});

});

