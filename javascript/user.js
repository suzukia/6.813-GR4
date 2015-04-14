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
var Amy   = new User(0, "Amy");
var Bob   = new User(1, "Bob");
var Frank = new User(2, "Frank");
var Elizabeth = new User(3, "Elizabeth");
console.log({ "Amy" : Amy.id(), "Bob" : Bob.id() });
var Eirik = new User(4, "Eirik", [Elizabeth.id(), Frank.id()], { "Amy" : Amy.id(), "Bob" : Bob.id() } );


console.log(Eirik.toString());

