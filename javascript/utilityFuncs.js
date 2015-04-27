function setStorageItem(name, object) {
	console.log(name + " " + JSON.stringify(object))
	return sessionStorage.setItem(name, JSON.stringify(object));
}

function getStorageItem(name) {
	console.log(name + " " + sessionStorage.getItem(name));
	return JSON.parse(sessionStorage.getItem(name));
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