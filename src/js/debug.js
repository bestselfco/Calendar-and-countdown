if(debug)
{

/* START DEBUG SECTION */

var d = {};

d.showData = function(){
	console.log("Settings", settings);
	console.log("Dates", dates);
};

d.checkUpdate = function() {
	chrome.runtime.requestUpdateCheck(function(res){console.log(res);});
};

d.reload = function() {
	chrome.runtime.reload();
};

d.setSyncStorage = function() {
	var tmpsettingsstorage = {"dataStore": "sync"};
	dataStore = chrome.storage.sync;
	chrome.storage.local.set(tmpsettingsstorage);
};

d.setLocalStorage = function() {
	var tmpsettingsstorage = {"dataStore": "local"};
	dataStore = chrome.storage.local;
	chrome.storage.local.set(tmpsettingsstorage);	
};	

d.checkStorage = function() {
	
	console.log("Current dataStore", dataStore);
	
	chrome.storage.local.get("dataStore", function(data){
		console.log("Data storage",data);
	});
	
	chrome.storage.local.get("settings", function(data){
		console.log("Local settings",data);
	});
	
	chrome.storage.local.get("dates", function(data){
		console.log("Local dates",data);
	});
	
	chrome.storage.sync.get("settings", function(data){
		console.log("Synced settings",data);
	});
	
	chrome.storage.sync.get("dates", function(data){
		console.log("Synced dates",data);
	});
};

/* END DEBUG OBJECT DEFINITION */
logger("debug", "Debug object created");
}