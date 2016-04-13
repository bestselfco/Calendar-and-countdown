// Standard Google Universal Analytics code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here

/**
Track a page view to Google
*/
function trackPageView(pagetitle)
{

	ga('send', 'pageview', pagetitle);
	
	if(debug)
	{
		logger("debug", "TrackPageView", pagetitle);
	}
}

/**
Track  timing
*/
function trackTiming(title, time)
{
	try{
		ga('send', 'timing', title, 'Load', time);
		if(debug)
		{
			logger("debug", "TrackTiming", title + " " + time);
		}
	}
	catch(e)
	{
		trackError("background", "tracking", "trackTiming");
	}
}

/**
Track an error to Google Analytics, both immediately and in detail
*/
function trackError(where, category, text)
{
    try {
		trackEvent("Error", where + " " + category, text);

		ga('send', 'exception', {
	      'exDescription': text,
	      'exFatal': false,
	      'appName': category,
	      'appVersion': version.currVersion
	    });

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

	ga('send', 'event', type , category, text);

	if(debug)
	{
		logger("info", "TrackEvent",  type + " / " + category + " / " + text);
	}
}

function startTracking()
{
	try{
		ga('create', 'UA-21196533-2', 'auto');
		ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
		ga('require', 'displayfeatures');
		//console.log("datoer", ccDays.keys(a).length)
		trackPageView("Background", {dimension1: version.currVersion, dimension2: settings.popup, dimension3: settings.showWeek, dimension4: settings.firstDay, dimension5: settings.showBubbleOnStart });
		trackEvent("Background", "Start", version.currVersion);
	}
	catch(e)
	{
		console.log(e);
	}
}