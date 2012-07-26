var dateArray; //Holds the dates we count down to
var subDateArray;
var dateNotes; //Notes for dates

/**
Run maintenance script every minute
*/
function maintainLoop()
{
	maintain();
	var t = setTimeout(maintainLoop, 60000);
}

/**
Maintain data
*/
function maintain()
{
	log("Event", "maintain()");

	updateBadgeFromStored();
	updatePopupFromStored();
	updateIconFromStored();

	setToolTip(new Date().toLocaleDateString());

}

/**
Retrieve the dates in a JSON format
*/
function getDatesJSON(){
	return JSON.stringify(getDates());
}

/**
Get date array
*/
function getDates()
{
	dateArray = JSON.parse(getItem("dateArray"));
	return dateArray;
}

/**
Get sub dates as JSON
*/
function getSubDatesJSON(){
	return JSON.stringify(getSubDates());
}

/**
Get sub dates
*/
function getSubDates()
{
	subDateArray = JSON.parse(getItem("noCountDateArray"));
	return subDateArray;
}

/**
Toggle dates. "nocount" means secondary dates if true.
*/
function toggleDate(timestamp, noCount)
{

	if(noCount)
	{
		//Secondary dates. Store many hooray
		var idx = noCountDateArray.indexOf(timestamp);
	
		if(idx != -1)
		{
			noCountDateArray.splice(idx, 1); //Remove if found
		}
		else
		{
			//...add if not found.
			noCountDateArray.push(timestamp);
		}
		
		noCountDateArray.sort();
		setItem("noCountDateArray", JSON.stringify(noCountDateArray));
		log("Sub date array changed", noCountDateArray);
			
		
	}
	else //The main one. Store just that.
	{
		var idx = dateArray.indexOf(timestamp);
		
		if(idx != -1)
		{
			dateArray = []; // Clear out
		}
		else
		{
			dateArray = [timestamp]; //Set
		}
	
		setItem("dateArray", JSON.stringify(dateArray)); //Store it
		log("Date array changed", dateArray); //Log it	
	}
	
	maintain();
	
}


/**
Initialise settings and/or reset everything to scratch
*/ 
function resetSettings()
{
	log("Event", "resetSettings()");
	
	dateArray = getItem("dateArray");
	if(dateArray == null && getItem("countto") != null )
	{
		//Transition to new solution for storing date.
		dateArray = new Array();
		var countTo = getItem("countto");
		toggleDate(countTo);
		log("Migrating date solution", countTo);
	}
	else if(dateArray == null)
	{
		dateArray = new Array();
		setItem("dateArray", JSON.stringify(dateArray));
		log("Setting default (empty) date array", dateArray);
	}
	else
	{
		dateArray = JSON.parse(dateArray);
	}
	
	//Secondary dates
	noCountDateArray = getItem("noCountDateArray");
	if(noCountDateArray == null)
	{
		noCountDateArray = new Array();
		setItem("noCountDateArray", JSON.stringify(noCountDateArray));
	}
	else
	{
		noCountDateArray = JSON.parse(noCountDateArray);
	}
	

	var icon_topColor = getItem("icon_topColor");
	if(icon_topColor == null)
	{
		var icon_topColor = "rgba(27,140,160,1)";
		setItem("icon_topColor", icon_topColor);
		log("Setting up default icon top color", icon_topColor);
	}
	
	//Load default icon, autocreates new if not already set
	var icon = new Icon(new Object());
	icon.getDefaultValues(true);
	
	
	
	var showBadge = getItem("showBadge");
	if(showBadge == null)
	{
		var showBadge = "1";
		setItem("showBadge", showBadge);
		log("Setting up default badge display", showBadge);
	}
	
	var showMoon = getItem("showMoon");
	if(showMoon == null)
	{
		var showMoon = "1";
		setItem("showMoon", showMoon);
		log("Setting up default moon display", showMoon);
	}
	
	
	var icon_textColor = getItem("icon_textColor");
	if(icon_textColor == null)
	{
		var icon_textColor = "rgba(0,0,0,0.65)";
		setItem("icon_textColor", icon_textColor);
		log("Setting up default icon text color", icon_textColor);
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

/**
Convert stored dates to use UTC. One time conversion, but does not screw up on multiple loads. 
*/
function updateDatesToUtc()
{
	var tmpDateMain = getDates()[0];
	var tmpDateSub = getSubDates();
	
	var offsetMSec = new Date().getTimezoneOffset() * 60000;
	
	var subdateutc = new Array();
	
	var tDatetmpDateMain = new Date(tmpDateMain*1 + offsetMSec);
	
	var mainUtc = [Date.UTC(tDatetmpDateMain.getUTCFullYear(), tDatetmpDateMain.getUTCMonth(), tDatetmpDateMain.getUTCDate()).toString()];
	
	for (i = 0; i < tmpDateSub.length; i++)
	{
		
		var key = tmpDateSub[i];
		
		var DatetmpDateSub = new Date(key*1 + offsetMSec);
		
		var tmpDate = Date.UTC(DatetmpDateSub.getUTCFullYear(), DatetmpDateSub.getUTCMonth(), DatetmpDateSub.getUTCDate()).toString();
		
		subdateutc.push(tmpDate);
					
	}

/*	log("Date conversion", "From: "+new Date(tmpDateMain*1).toLocaleString());
//	log("Date conversion", "To  : "+new Date(mainUtc*1).toUTCString());

	for(i = 0; i < subdateutc.length; i++)
	{
		log("Date conversion", "From: "+new Date(tmpDateSub[i]*1).toLocaleString());
		log("Date conversion", "To  : "+new Date(subdateutc[i]*1).toUTCString());
	}
*/	
	var shouldIUpdateDates = getItem("shouldIUpdateDates");
	
	if(shouldIUpdateDates == null)
	{
		setItem("noCountDateArray", JSON.stringify(subdateutc));
		setItem("dateArray", JSON.stringify(mainUtc));
		log("Date update", "Update of dates being written");
		setItem("shouldIUpdateDates", "nope");
	}
	else
	{
		log("Date update", "Update of dates already done");
	}	

}

/**
Update the icon from the stored values
*/
function updateIconFromStored()
{
	//Setup object
	var iconSetup = new Object();
	iconSetup.textColor = getItem("icon_textColor");
	iconSetup.topColor = getItem("icon_topColor");
	iconSetup.showNumbers = getItem("icon_showtext");
	
	if(iconSetup.showNumbers == "1") iconSetup.fillText = new Date().getDate(); //Today
	else if (iconSetup.showNumbers == "2") iconSetup.fillText = getDistanceInDays(); //Countdown
	else  iconSetup.fillText = 0; //Nothing, so why bother
	
	document.getElementById("iconCanvas").getContext("2d").putImageData(new Icon(iconSetup).getImage(),0,0);
	
	//createIcon("iconCanvas", iconSetup);	
	setIcon();
	
}


/**
Set the popup page
*/
function updatePopupFromStored()
{
	var popup = getItem("popup");
	setPopup(popup);
}

/**
 Switch the popup file

 @param p The ID of the popup file
 */
function setPopup(p)
{
	var page = "popup_12.html";

	if(p == "3") page = "popup_3.html";

	chrome.browserAction.setPopup({popup:page});
}


/**
Set the icon in the browser bar
 
@param color The color of the icon. Must be matched by file in pics directory
 */
function setIcon()
{
	var canvas = document.getElementById("iconCanvas");	
	var ctx = canvas.getContext("2d");
	var iconPixelData = ctx.getImageData(0, 0, 19, 19);
	chrome.browserAction.setIcon({imageData:iconPixelData});
}

/**
Set the tooltip.
@param text Tooltip text
 */
function setToolTip(text)
{
	text = text.toString();
	chrome.browserAction.setTitle({title:text});
}


/**
Event listener for communication with the popup page
*/
chrome.extension.onRequest.addListener(
		function(request, sender, sendResponse) {
			if (request.action == "trackEvent") {

				sendResponse({response: "ok"});
				log("Google Analytics", request.event_type + ": "+request.event_details);
				_gaq.push(['_trackEvent', request.event_type, request.event_action, request.event_details]);

			}
			else if (request.action == "toggleDate") {
				//New code to toggle dates. Much more resilient to fail, MVC based
				toggleDate(request.event_details, false);
				sendResponse({datesJSON:getDatesJSON()})
				
			}
			else if (request.action == "toggleDateRightClick") {
				//New code to toggle dates. Right click.
				toggleDate(request.event_details, true);
				sendResponse({datesJSON:getSubDatesJSON()})
			}
			else if (request.action == "getDates") {

				log("Dates requested by view.");
				sendResponse({datesJSON:getDatesJSON()});
			
			}
			else if (request.action == "getSubDates") {
			
				log("Sub dates requested by view");
				sendResponse({datesJSON:getSubDatesJSON()});
			}
			else if (request.action == "killeverything") {

				//Reset everything
				clearStrg();
				resetSettings();
				maintain();
				
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

/**
*Update the badge from the stored countdown date
*/
function updateBadgeFromStored()
{

	if(dateArray.length > 0)
	{
		var count = getDistanceInDays();
	
		if(count != null)
		{
			setBadge(count);
		}
		else
		{
			chrome.browserAction.setBadgeText({text:""});
		}
		
	}
	else //We are not counting to anything, so we delete this shit.
	{
		chrome.browserAction.setBadgeText({text:""});
	}
}

/**
Set the badge to a countdown value. Also updates the color from memory.
@param text The new badge text
 */
function setBadge(text)
{
	text = text.toString();
	var color = getItem("badgeColor");
	color = HexToRGB(color);

	var showBadge = getItem("showBadge");
	
	if(showBadge == 1)
	{
		chrome.browserAction.setBadgeBackgroundColor({color:color});
		chrome.browserAction.setBadgeText({text:text});
	}
	else
	{
		//remove badge
		chrome.browserAction.setBadgeText({text:""});
	}
}

/**
Get countdown days for the badge
*/
function getDistanceInDays()
{
	//var tmpArray = JSON.parse(getItem("dateArray"));
	var countto = dateArray[0];
	
	log("Checking distance for badge", countto);
	
	if(countto !== null && countto !== undefined)
	{
		try {
			var badgeDate = new Date((countto*1)); //Stupid casting
			var diff = Math.abs(badgeDate.getDaysFromToday());

			if(badgeDate.getFullYear() > 1980 && badgeDate.getFullYear() < 2050)
			{
				return diff; //All is well;
			}
			else
			{
				return null; //Too large
			}
		}
		catch(err)
		{
			log(err);
			return null;
		}
	}
	else{
		return null;
	}
}

/**
Initialise background page and start the extension
*/
function bginit()
{
    log("Event", "BGInit");
	
	log("Event", "Updating all dates to UTC");
	
	var tDates = getDates();
	
	//If we are updating, update scores
	if(tDates !== null)
	{
		updateDatesToUtc();
	}
	
	extVersion = getVersion();
	
	if(location.hostname != googleID){
		document.title = "C&C "+extVersion + " (dev)";
	}
	else {
		document.title = "C&C "+extVersion;
	}
	
	resetSettings();
	
	maintainLoop();
}

/**
Bootstrap background on page load finished
*/
$(document).ready(function() {	
	bginit();	
});