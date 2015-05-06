//http://www.freemake.com/blog/best-funny-nicknames-for-chatting-online-gaming-and-other-occasions/
var names = ['Awesomeusername','Beef_steak','Popcorn','CltrAltDelicious','Seashells','Pineapple', 'Dancing_King',
 			 'Rumpelstiltskin','Optimus Prime','Autobot','PrettyPotato','HandsomeBanana','Pringles','French_Fries',
 			 'Kat','Breadquanda','LittleMermaid','Cinderella','SleуpingBeauty','CaptainAwesome','Chocolate_pudding',
 			 'CoolKid','Mr.Magnificent','Mr.Fabulous','Mr.Wonderful','Mr.Sir','PrinceCharming','Banana_cake', 'Gorilla',
 			 'Mr.Incredibly_Incredible','','QueenKong','MrS','Blue_Skype','Asleep','Basketball', 'MVP', 'Potato_chips',
 			 'Happy_Math','About_30_ninjas','Spicy_Pizza','Hello_World','Carbon_Dioxide','Potato_Ghost', 'Delicious_mango',
 			 'Bad_Karma','Angry_Groceries','Apple_Pie','Amy','Bob','Frank','Elizabeth']
names.sort();

function populateUsers(names) {
	var id = 0,
		lst = [],
		numOfAvatars = 13;
	names.forEach(function(name) {
		if ()
		var avatar = "../images/chat/avatar" + Math.round(Math.random()*numOfAvatars) + ".gif";
		lst.push(new User(id, name, avatar));
		id += 1;
	});
	return lst;
}

function populateFriends(users) {
	var friends = [];
	users.forEach(function(user) {
		if ((Math.random() < .5 && user.name() != 'Amy' && user.name() != 'Bob') || user.name() == 'Elizabeth') {
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

/********** Populate Data **********/
localStorage.maxNameLength = 25;

var users = populateUsers(names);
// console.log("Users: " + users);
setStorageItem("users", users);
// console.log(getStorageItem("users"));

var friends = populateFriends(users);
setStorageItem("friends", friends);
// console.log(JSON.parse(sessionStorage.getItem("friends")));

var numOfReqs = 3;
setStorageItem("friendReqs", populateFriendReqs(users, friends, numOfReqs));

var chatIsOpen = {};
setStorageItem("chatIsOpen", chatIsOpen);

var openChatsOrder = [];
setStorageItem("openChatsOrder", openChatsOrder);

var queuedChats = [];
setStorageItem("queuedChats", queuedChats);

var chatLogs = {};
setStorageItem("chatLogs", chatLogs);

var chatSimCount = {};
setStorageItem("chatSimCount", chatSimCount);

var requiredNumPlayers = 4;
var notifications = {
	0 : {
		'type' : 'FR',
		'name' : 'Amy'
	},
	1 : {
		'type' : 'GI',
		'name' : 'Elizabeth',
		'game' : {
		    title: 'Space Eploration',
		    map: getMapByName('Space'),
		    players: getRandomUsers(requiredNumPlayers),
		    privateGame: true
		  }
	},
	2 : {
		'type' : 'FR',
		'name' : 'Bob'
	}
}
setStorageItem("notifications", notifications);