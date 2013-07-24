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
Track a page view to Google
*/
function trackPageView(pagetitle)
{
	if(!debug)
	{
		_gaq.push(['_trackPageview', pagetitle]);
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
		trackEvent("Error " + version.currVersion, where, category + " - " + text);
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
		_gaq.push(['_trackEvent', type, category, text]);
	}
	else {
		logger("info", "TrackEvent",  type + " / " + category + " / " + text);
	}
}

