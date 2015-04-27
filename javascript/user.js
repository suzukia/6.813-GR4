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
function User(id, name, avatar, friends, fRequests) {
	var friends = typeof friends !== 'undefined' ? friends : [];
	var friendRequests = typeof fRequests !== 'undefined' ? fRequests : {};

	this._id = id;
	this._name = name;
	this._avatar = avatar;
	this._friends = friends;
	this._friendReqs = friendRequests;
}

User.prototype = {
  id: function() {
		return this._id;
  },

  name: function(){
    return this._name;
  },

  avatar: function() {
  	return this._avatar;
  },

  friends: function() {
  	return this._friends;
  }, 

  friendReqs: function() {
  	this._friendReqs;
  }
};