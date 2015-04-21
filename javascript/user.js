/*
 * User represents a user profile
 * Users have unique identifiers, unique usernames, 
 * friends, and friendRequests 
 *
 * Constructor takes:
 * 		id      => unique idnetifier of the user
 * 		name    => String representing the unique username
 * 		friends => list of user ids
 *		fRequests => initial amount of friendRequests for a user
 */
function User(id, name, friends, fRequests) {
	var friends = typeof friends !== 'undefined' ? friends : [];
	var friendRequests = typeof fRequests !== 'undefined' ? fRequests : {};

	function arrToDict(arr) {
		var a = {}
		arr.forEach(function(e) {
			a[e] = true;
		});
		return a;
	}

	function dictToArr(dict) {
		var d = [];

		for (var key in dict) {
		  if (dict.hasOwnProperty(key)) {
		    d.push(key);
		  }
		}

		return d;
	}

	function uniqueArr(arr) {
		return dictToArr(arrToDict(arr));
	}

	function addFRequest(requester) {
		var friendReqs = {}

		for (var key in friendRequests) {
		  if (friendRequests.hasOwnProperty(key)) {
		    friendReqs[key] = friendRequests[key]
		  }
		}

		friendReqs[requester.id] = requester.name;
		return friendReqs;
	}

	function newFriendship(id) {
		var newFriends = arrToDict(friends.slice(0));
		newFriends[id] = true;
		return dictToArr(newFriends)
	}

	/*
	 * Returns user with newly added friend request
	 * requester => FriendRequest object representing friend request
	 */
	this.addFriendRequest = function(requester) {
		return new User(id, name, friends, addFRequest(requester));
	}

	/*
	 * Returns user with newly added friend
	 * id => user identifier
	 */
	this.addFriend = function(id) {
		return new User(id, name, newFriendship(id), friendRequests);
	}

	/*
	 * Returns user's friends
	 */
	this.friends = function() {
		return uniqueArr(friends);
	}

	/*
	 * Returns user's friend requests
	 */
	this.friendRequests = function() {
		return jQuery.extend(true, {}, friendRequests)
	}

	/* 
	 * Returns user's name
	 */
	this.name = function() {
		return name;
	}

	/*
	 * Returns user's id
	 */
	this.id = function() {
		return id;
	}

	this.toString = function() {
		var fs = friends.length == 0 ? "No Friends" : friends;

		return "id: " + id + ", name: " + name + ", friends: " + 
				fs + ", friendRequests: " + JSON.stringify(friendRequests);
	}
}

/******************** Test Seeded Data *****************/

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
	var id = -1,
		lst = [];
	names.forEach(function(name) {
		id += 1;
		lst.push(new User(id, name));
	});
	return lst;
}

function populateFriends(users) {
	var friends = {};
	users.forEach(function(user) {
		if (Math.random() < .5 || user.name() == 'Amy' || user.name() == 'Bob')
			friends[user.name()] = Math.random() < .5;
	});
	return friends;
}

var users = populateUsers(names);

var friends = populateFriends(users);
var pendingFriendReqs = {};