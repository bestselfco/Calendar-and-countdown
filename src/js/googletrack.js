/**
Google tracking for all pages that include functions.js
*/
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-21196533-2']);

/**
Create Google Analytics object on page.
*/
(function() {
  var ga = document.createElement('script'); 
  ga.type = 'text/javascript'; 
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; 
  s.parentNode.insertBefore(ga, s);
})();

/**
Push settings to Google Analytics
*/
function pushSettingsToGoogleTracker()
{
	try {
		logger("info", "Startup", "Pushing settings to Google tracker");
        _gaq.push(['_setCustomVar', 1, "popup", settings.popup, 2]);
        _gaq.push(['_setCustomVar', 2, "showWeek", settings.showWeek, 2]);
        _gaq.push(['_setCustomVar', 3, "firstDay", settings.firstDay, 2]);
        _gaq.push(['_setCustomVar', 4, "showBubble", settings.showBubbleOnStart, 2]);
        _gaq.push(['_setCustomVar', 5, "dataOnline", settings.storeDataOnline, 2]);
	}
	catch(e)
	{
		handleError("pushSettingsToGoogleTracker", e);
	}
}

/**
Track a page view to Google
*/
function trackPageView(pagetitle)
{
	if(!debug)
	{
		//_gaq.push(['_trackPageview', pagetitle]);
	}
	else {
		logger("debug", "TrackPageView", pagetitle);
	}
}

/**
Track an error to Google Analytics, both immediately and in detail
*/
function trackError(where, category, text)
{
    try {
		trackEvent("Error", where + " " + category, text);
    }
    catch (err)
    {
        console.error("Error tracking error. Goddamnit.")   
    }
}

/**
Track an event view to Google Analytics
*/
function trackEvent(type, category, text)
{
	if(!debug)
	{
		_gaq.push(['_trackEvent', type + " (" + version.currVersion + ")" , category, text]);
	}
	else {
		logger("info", "TrackEvent",  type + " / " + category + " / " + text);
	}
}

