$(document).ready(function() {
	$('#chat-bar').css('height',$(window).height());
	$('#friends').css('max-height',$(window).height()-120);
	$('#friends').css('overflow-y', 'scroll');
});