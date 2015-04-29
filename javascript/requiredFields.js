console.log(sessionStorage.getItem("username"));
console.log(getStorageItem("users"));
console.log(getStorageItem("friends")); 
console.log(getStorageItem("friendReqs"));
console.log(getStorageItem("chatIsOpen"));
console.log(getStorageItem("openChatsOrder"));
console.log(getStorageItem("backedUpChats"));

if (sessionStorage.getItem("username") == null || 
	getStorageItem("users") == null || 
	getStorageItem("friends") == null || 
	getStorageItem("friendReqs") == null ||
	getStorageItem("chatIsOpen") == null || 
	getStorageItem("openChatsOrder") == null ||
	getStorageItem("backedUpChats") == null) {
	redirectTo("login.html");
}