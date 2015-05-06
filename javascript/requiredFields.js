function checkRequiredFields() {
	var requiredFields = getStorageItem("requiredFields");
	console.log("requiredFields");
	console.log(requiredFields);

	requiredFields.forEach(function(field) {
		if (localStorage.getItem(field) == null)
			redirectTo("login.html");
	});
}