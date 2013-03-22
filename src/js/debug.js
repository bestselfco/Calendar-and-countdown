var d = {};

d.checkUpdate = function() {

	chrome.runtime.requestUpdateCheck(function(res){console.log(res)});

};

d.reload = function() {
	chrome.runtime.reload();
}

d.setSyncStorage = function() {

	var tmpsettingsstorage = {"datestorage": "sync"};
	var tmpdatestorage = {"settingstorage": "sync"};
	
	chrome.storage.local.set(tmpsettingsstorage);
	chrome.storage.local.set(tmpdatestorage);	
	
}	