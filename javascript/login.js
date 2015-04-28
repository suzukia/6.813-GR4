$(document).ready(function() {
	var h = $(window).height();

	$('img').css('height', parseInt(h)-60);

	var usernameText = $('#username-input');
	usernameText.val("");

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

	/********** Populate Data **********/
	var users = populateUsers(names);
	// console.log("Users: " + users);
	setStorageItem("users", users);

	var friends = populateFriends(users);
	setStorageItem("friends", friends);
	// console.log(JSON.parse(sessionStorage.getItem("friends")));

	var numOfReqs = 3;
	setStorageItem("friendReqs", populateFriendReqs(users, friends, numOfReqs));

	var chatIsOpen = {};
	setStorageItem("chatIsOpen", chatIsOpen);

	var openChatsOrder = [];
	setStorageItem("openChatsOrder", openChatsOrder);

	var backedUpChats = [];
	setStorageItem("backedUpChats", backedUpChats);
});


//http://www.freemake.com/blog/best-funny-nicknames-for-chatting-online-gaming-and-other-occasions/
var names = ['Awesomeusername','Beef_sister','Pork_brother','CltrAltDelicious','Broseidon_Ruler_of_the_Brocean',
 			 'Willy_ Foo_Foo','Rumpelstiltskin','Optimus Prime','Autobot','PrettyPotato','HandsomeBanana','Pringles',
 			 'Keish-Keish','Breadquanda','LittleMermaid','Cinderella','SleуpingBeauty','CaptainAwesome',
 			 'Baron_Von_Awesome','Mr.Magnificent','Mr.Fabulous','Mr.Wonderful','Mr.Sir','PrinceCharming',
 			 'Floyd_Pincus','Lovemakingfriend','QueenKong','MrGooglehead','Blue_Skype','Asleep','Kiss-my-Axe', 
 			 'Chief-Choke-a-ho','About_30_ninjas','Toastoftheundead','Yourself','Gigantic_Wang','Potato_Ghost',
 			 'Bad_Karma','Angry_Groceries','Brosef_Stalin Game_over','Amy','Bob','Frank','Elizabeth']
names.sort();

function populateUsers(names) {
	var id = 0,
		lst = [],
		numOfAvatars = 13;
	names.forEach(function(name) {
		var avatar = "../images/chat/avatar" + Math.round(Math.random()*numOfAvatars) + ".gif";
		lst.push(new User(id, name, avatar));
		id += 1;
	});
	return lst;
}

function populateFriends(users) {
	var friends = [];
	users.forEach(function(user) {
		if (Math.random() < .5 || user.name() == 'Amy' || user.name() == 'Bob') {
			friends.push(user);
		}
	});
	return friends;
}

function populateFriendReqs(users, friends, numOfReqs) {
	var reqs = [];

	for (var i = 0; i < numOfReqs; i++) {
		var pos = getRandomNum(users.length);
		while( inUserSet(friends, users[pos].name())) {
			pos = getRandomNum(users.length);
		}
		reqs.push(users[pos]);
	};

	return reqs;
}

function getRandomNum(maxNum) {
	return Math.round( Math.random() * maxNum-1);
}