function setStorageItem(name, object) {
	// console.log(name + " " + JSON.stringify(object))
	return localStorage.setItem(name, JSON.stringify(object));
}

function getStorageItem(name) {
	// console.log(name + " " + sessionStorage.getItem(name));
	return JSON.parse(localStorage.getItem(name));
}

function redirectTo(page) {
	window.location.href = page;
}

function inUserSet(userSet, name) {
	var found = false;
	userSet.forEach(function(user) {
		if (user.name() == name)
			found = true;
	});

	return found;
}

function formatUsers(users) {
	users.forEach(function(user) {
		user.__proto__ = User.prototype;
	});

	return users;
}

function getRandomNum(maxNum) {
	return Math.round( Math.random() * (maxNum-1));
}

function getRandomUsers(number) {
	var users = formatUsers(getStorageItem("users"));
	var totalUsers = users.length;
	var randomIndices = {};
	var howManyToGet = Math.min(number, totalUsers);
	var randomUsers = [];
	while (Object.keys(randomIndices).length < howManyToGet) {
		var randomNumber = getRandomNum(totalUsers);
		if (!randomIndices[randomNumber]) {
			randomIndices[randomNumber] = true;
			randomUsers.push(users[randomNumber]);
		}
	}
	return randomUsers;
}

// check if someone with name is in an array of user objects; return the index
function checkIfInObjectArray(name, object) {
  for (var i=0; i<object.length; i++) {
    if (object[i].name() === name) {
      return i;
    }
  }
  return -1;
}

// returns map object from list of maps
function getMapByName(name) {
  var maps = getStorageItem("maps");
  for (var i=0; i<maps.length; i++) {
    if (maps[i].name === name) {

      return maps[i];
    }
  }
}

// returns user object from list of users
function getUserByName(name) {
  var users = formatUsers(getStorageItem("users"))
  for (var i=0; i<users.length; i++) {
    if (users[i].name() === name) {
      return users[i];
    }
  }
}

function getRandomMap() {
  var maps = getStorageItem("maps");
  var randomNumber = getRandomNum(maps.length);
  return maps[randomNumber];
}

function getUserTotal() {
  var users = formatUsers(getStorageItem("users"));
  return users.length;
}
