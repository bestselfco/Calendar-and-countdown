var d = {};

d.checkUpdate = function() {

	chrome.runtime.requestUpdateCheck(function(res){console.log(res)});

};

d.reload = function() {
	chrome.runtime.reload();
}