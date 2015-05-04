console.log(localStorage.getItem("username"));
console.log(getStorageItem("users"));
console.log(getStorageItem("friends")); 
console.log(getStorageItem("friendReqs"));
console.log(getStorageItem("chatIsOpen"));
console.log(getStorageItem("openChatsOrder"));
console.log(getStorageItem("queuedChats"));
console.log(getStorageItem("chatLogs"));

if (localStorage.getItem("username") == null || 
	getStorageItem("users") == null || 
	getStorageItem("friends") == null || 
	getStorageItem("friendReqs") == null ||
	getStorageItem("chatIsOpen") == null || 
	getStorageItem("openChatsOrder") == null ||
	getStorageItem("queuedChats") == null ||
	getStorageItem("chatLogs") == null ||
	localStorage.getItem("maxNameLength") == null) {
	redirectTo("login.html");
}