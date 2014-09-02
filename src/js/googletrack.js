// Standard Google Universal Analytics code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here

/**
Push settings to Google Analytics
*/
function pushSettingsToGoogleTracker()
{
	try {
		logger("info", "Startup", "Pushing settings to Google tracker. Not active.");
        //_gaq.push(['_setCustomVar', 1, "popup", settings.popup, 2]);
        //_gaq.push(['_setCustomVar', 2, "showWeek", settings.showWeek, 2]);
        //_gaq.push(['_setCustomVar', 3, "firstDay", settings.firstDay, 2]);
        //_gaq.push(['_setCustomVar', 4, "showBubble", settings.showBubbleOnStart, 2]);
        //_gaq.push(['_setCustomVar', 5, "dataOnline", settings.storeDataOnline, 2]);
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
		ga('send', 'pageview', version.currVersion + "/" + pagetitle);
	}
	else {
		ga('send', 'pageview', "debug/" + pagetitle);
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
        console.error("Error tracking error. This is where I give up.");
    }
}

/**
Track an event view to Google Analytics
*/
function trackEvent(type, category, text)
{

	if(!debug)
	{
		ga('send', 'event', type + " (" + version.currVersion + ")", category, text);
	}
	else {
		ga('send', 'event', type + " (debug)", category, text);
		logger("info", "TrackEvent",  type + " / " + category + " / " + text);
	}
}

ga('create', 'UA-21196533-2', 'auto');
ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
ga('require', 'displayfeatures');
trackPageView("Background");