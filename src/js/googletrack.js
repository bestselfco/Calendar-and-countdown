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
		logger("info", "Startup", "Pushing settings to Google tracker.");
        ga('set', 'dimension1', version.currVersion);
		ga('set', 'dimension2', settings.popup);
		ga('set', 'dimension3', settings.showWeek);
		ga('set', 'dimension4', settings.firstDay);
		ga('set', 'dimension5', settings.showBubbleOnStart);
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

try{
	ga('create', 'UA-21196533-2', 'auto');
	ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
	ga('require', 'displayfeatures');
	trackPageView("Background");
	trackEvent("Background", "Start", version.currVersion);
}
catch(e)
{

}