/*
 * User represents a user profile
 * Users have unique identifiers, unique usernames, 
 * friends, and friendRequests 
 *
 * Constructor takes:
 * 		ident   => unique idnetifier of the user
 * 		name    => String representing the unique username
 * 		friends => list of user ids
 *		fRequests => initial amount of friendRequests for a user
 */
function User(ident, name, friends, fRequests) {
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

	this.addFriend = function(id) {
		return new User(id, name, newFriendship(id), friendRequests);
	}

}

