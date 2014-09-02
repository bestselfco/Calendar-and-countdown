//function trackEvent(type, category, text)
//function trackError(where, category, text)
//function trackPageView(pagetitle)

function trackPageView(pagetitle)
{
	var tmp = {};
	tmp.action = "trackPageView";
	tmp.pagetitle = pagetitle;
	
	console.log(tmp);
	
	chrome.runtime.sendMessage(tmp, function(response) {
		console.log(response);
	});
	
}

function trackEvent(type, category, text)
{
	var tmp = {};
	tmp.action = "trackEvent";
	tmp.type = type;
	tmp.category = category;
	tmp.text = text;
	
	console.log(tmp);
	
	chrome.runtime.sendMessage(tmp, function(response) {
		console.log(response);
	});
	
}

function trackError(where, category, text)
{
	var tmp = {};
	tmp.action = "trackError";
	tmp.where = where;
	tmp.category = category;
	tmp.text = text;
	
	console.log(tmp);
	
	chrome.runtime.sendMessage(tmp, function(response) {
		console.log(response);
	});
	
}