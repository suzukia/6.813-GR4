console.log(sessionStorage.getItem("username"));
console.log(getStorageItem("users"));
console.log(getStorageItem("friends")); 
console.log(getStorageItem("friendReqs"));
console.log(getStorageItem("chatIsOpen"));
console.log(getStorageItem("openChatsOrder"));
console.log(getStorageItem("backedUpChats"));
console.log(getStorageItem("chatLogs"));

if (sessionStorage.getItem("username") == null || 
	getStorageItem("users") == null || 
	getStorageItem("friends") == null || 
	getStorageItem("friendReqs") == null ||
	getStorageItem("chatIsOpen") == null || 
	getStorageItem("openChatsOrder") == null ||
	getStorageItem("backedUpChats") == null ||
	getStorageItem("chatLogs") == null) {
	redirectTo("login.html");
}