function bginit()
{
	log("Event", "BGInit");
	
	extVersion = getVersion();
	
	resetSettings();
	
	maintainLoop();
	
	googleTrack("Extension", "Initialized", extVersion);
	
}

//Run maintenance script every minute
function maintainLoop()
{
	maintain();
	var t = setTimeout("maintainLoop()", 60000);
}

//Maintain data
function maintain()
{
	log("Event", "maintain()");

	updateBadgeFromStored();
	updatePopupFromStored();
	updateIconFromStored();

	setToolTip(new Date().toLocaleDateString());

}

//Fill the cache
function generate2NYearsOfData(years)
{
	var thisYear = new Date().getFullYear();;
	
	for(var i = (thisYear - years); i< (thisYear + years); i++) {
		
		for(var j = 1; j < 13; j++)
		{
			log("Generating",i+"_"+j);
			new Calendar(i,j).getCal();
		}
	}
	
}

//Kill the cache
function killCachedCalendars()
{
	var storage = window.localStorage;
	
	log("Storage length",storage.length);
	
	for(var prop in storage){ 
		
		if(prop.substring(0,4) == "cal_")
		{
			log("Storage delete",prop);
			removeItem(prop);
		}
	}
	
	log("Storage length",storage.length);
	
}

function resetSettings()
{
	log("Event", "resetSettings()");

	var icon_topColor = getItem("icon_topColor");
	if(icon_topColor == null)
	{
		var icon_topColor = "rgba(27,140,160,1)";
		setItem("icon_topColor", icon_topColor);
		log("setting up default icon top color");
	}
	
	var showBadge = getItem("showBadge");
	if(showBadge == null)
	{
		var showBadge = "1";
		setItem("showBadge", showBadge);
		log("setting up badge display");
	}
	
	
	var icon_textColor = getItem("icon_textColor");
	if(icon_textColor == null)
	{
		var icon_textColor = "rgba(0,0,0,0.65)";
		setItem("icon_textColor", icon_textColor);
		log("setting up default icon text color");
	}

	var icon_showtext = getItem("icon_showtext");
	if(icon_showtext == null)
	{
		var icon_showtext = "0";
		setItem("icon_showtext", icon_showtext);
		log("setting up icon text");
	}
	
	var badgeColor = getItem("badgeColor");
	if(badgeColor == null) {
		var color = "#18CD32";
		setItem("badgeColor", color);
		log("setting up default badge color");
	}

	var popup = getItem("popup");
	if(popup == null) {
		var popup = "12";
		setItem("popup", popup);
		log("setting up default popup");
	}

	var iconColor = getItem("iconColor");
	if(iconColor == null) {
		var popup = "red";
		setItem("iconColor", popup);
		log("setting default icon color");
	}

}


//Update the icon from the stored values
function updateIconFromStored()
{
	
	var textColor = getItem("icon_textColor");
	var topColor = getItem("icon_topColor");
	var showText = getItem("icon_showtext");
	
	log("Loading icon from storage", textColor + " " + topColor + " " + showText);
	
	if(showText == "1") var date = new Date().getDate(); //Today
	else if (showText == "2") var date = getDistanceInDays(); //Countdown
	else var date = 0; //Nothing, so why bother
	
	createIcon(showText, date, topColor, textColor, "iconCanvas");	
	setIcon();
	
}

//Update the badge from the stored countdown date
function updateBadgeFromStored()
{
	var count = getDistanceInDays();
	
	if(count != null)
		{
			setBadge(count);
		}
}

function updatePopupFromStored()
{
	var popup = getItem("popup");
	setPopup(popup);
}




/**
 * Set the icon in the browser bar
 * 
 * @param color The color of the icon. Must be matched by file in pics directory
 */
function setIcon()
{
	var canvas = document.getElementById("iconCanvas");	
	var ctx = canvas.getContext("2d");
	var iconPixelData = ctx.getImageData(0, 0, 19, 19);
	chrome.browserAction.setIcon({imageData:iconPixelData});
}

/**
 * Set the tooltip.
 * 
 * @param text Tooltip text
 */
function setToolTip(text)
{
	text = text.toString();
	chrome.browserAction.setTitle({title:text});
}

/**
 * Switch the popup file
 * 
 * @param p The ID of the popup file
 */
function setPopup(p)
{
	var page = "popup_12.html";

	if(p == "3") page = "popup_3.html";

	chrome.browserAction.setPopup({popup:page});
}

//Listen for external stuff
//chrome.extension.sendRequest({action: "trackEvent", event_type:category, event_action:action, event_details:details});
chrome.extension.onRequest.addListener(
		function(request, sender, sendResponse) {
			if (request.action == "trackEvent") {

				sendResponse({response: "ok"});
				log("Google Analytics", request.event_type + ": "+request.event_details);
				_gaq.push(['_trackEvent', request.event_type, request.event_action, request.event_details]);

			}
			else if (request.action == "killcache") {

				killCachedCalendars();
				generate2NYearsOfData(5);
				
				sendResponse({response: "ok"});
				
				log("Options event", "Killing cache");

			}
			else if (request.action == "killeverything") {

				//Reset everything
				clearStrg();
				resetSettings();
				maintain();
				generate2NYearsOfData(5);
				
				sendResponse({response: "ok"});
				
				log("Options event", "Killing everything");

			}		
			else if (request.action == "refresh") {

				sendResponse({response: "ok"});

				log("Options event", "Refreshing settings");

				maintain();

			}
			else
				sendResponse({}); // snub them.
		});


