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
		log("TrackPageview", pagetitle);
	}
}

/**
Track an error to Google Analytics, both immediately and in detail
*/
function trackError(where, category, text)
{
	if(!debug)
	{
		_gaq.push(['_trackEvent', 'Error', where, category + " " + text]);
		trackPageView("/error/" + where + "/" + category);
	}
	else {
		log("TrackError", where + " / " + category + " / " + text);
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
		log("TrackEvent",  type + " / " + category + " / " + text);
	}
}

