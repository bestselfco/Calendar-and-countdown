//function trackEvent(type, category, text)
//function trackError(where, category, text)
//function trackPageView(pagetitle)

function trackPageView(pagetitle)
{
	var tmp = {};
	tmp.action = "trackPageView";
	tmp.pagetitle = pagetitle;
	
	
	
	chrome.runtime.sendMessage(tmp, function(response) {
		
	});
	
}

function trackEvent(type, category, text)
{
	var tmp = {};
	tmp.action = "trackEvent";
	tmp.type = type;
	tmp.category = category;
	tmp.text = text;
	
	
	
	chrome.runtime.sendMessage(tmp, function(response) {
		
	});
	
}

function trackError(where, category, text)
{
	var tmp = {};
	tmp.action = "trackError";
	tmp.where = where;
	tmp.category = category;
	tmp.text = text;
	
	
	
	chrome.runtime.sendMessage(tmp, function(response) {
		
	});
	
}