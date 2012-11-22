//New date and settings objects to persist to synced storage
var settings = new Object();
var dates = new Object();

//Set storage area for settings and dates. Not yet functional.
var settingsStorage = chrome.storage.local; 
var dateStorage = chrome.storage.local;

var dateArray; //Holds the dates we count down to
var subDateArray;
var newInstall; //Is this a first time install (ie: is the date array set?)
var dateNoteArray; //Notes for dates
var dateColorArray; //Colors for dates
var maintainCycles = 0;

var doTrackNormalStart = true;

var version = getVersion();

//Init today time stamp
var now = new Date();
var todayStamp = Date.UTC(now.getFullYear(),now.getMonth(), now.getDate());

/**
Initialise background page and start the extension
*/
function bginit()
{	
	
	//Set title
	document.title = "Calendar and Countdown";

	//Do migration stuff if updated
	chrome.runtime.onInstalled.addListener(function(details) {
	 	
		//Turn of normal startup tracking for new installs
		doTrackNormalStart = false;
		
		if(details.reason == "update")
	 	{
			_gaq.push(['_trackPageview', '/update/'+details.previousVersion]);
			//UTC update if update from older version than august 2012
			var prev = details.previousVersion.split(".");
			if(prev[0] < 2013 && prev[1] < 8)
			{
				doUTCUpgrade();
			}
		}
		else if(details.reason == "install")
		{
			_gaq.push(['_trackPageview', '/new']);
		}
	});
	
	//Do the actual initialisation of settings
	resetSettings();
	
	//Do first maintenance and set up loop
	maintain();
	setupMaintainLoop();
	
}

/**
Maintain data
*/
function maintain()
{
	maintainCycles++;
	
	var nowNew = new Date();
	todayStamp = Date.UTC(nowNew.getFullYear(),nowNew.getMonth(), nowNew.getDate());

	updateBadgeFromStored();
	updatePopupFromStored();
	updateIconFromStored();

	setToolTip(new Date().toLocaleDateString());
	
	log("Maintenance", "Cycle #"+maintainCycles+", " + nowNew.toLocaleString());
	
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
Add or remove a note for a date. If "remove" is true, it is deleted no matter what the note. Otherwise, it is added or replaced based on whether or not the timestamp already has a note
*/
function setNoteForDate(timestamp, note, remove)
{
	//Create new object
	var tmp = {};
	tmp.timestamp = timestamp;
	tmp.note = note;
	
	var newArray = [];
	
	//First, remove any references to the date, because we are either deleting or replacing
	for(i=0; i<dateNoteArray.length; i++)
	{
		var tempR = dateNoteArray[i];
		
		if(tempR.timestamp.toString() !== timestamp.toString())
		{
			newArray.push(tempR); //If not to be removed, add to next array.
		}	
	}
	
	dateNoteArray = newArray; //dateNoteArray is now cleaned

	
	//Then, if not remove, add current
	if(!remove)
	{
		dateNoteArray.push(tmp);
	}
	
	setItem("dateNoteArray", JSON.stringify(dateNoteArray));
	
}

/**
Add or remove a color mark for a date
*/
function setColorForDate(timestamp, color, remove)
{
		//Create new object
		var tmp = {};
		tmp.timestamp = timestamp;
		tmp.color = color;
		
		var newArray = [];
		
		//First, remove any references to the date, because we are either deleting or replacing
		for(i=0; i<dateColorArray.length; i++)
		{
			var tempR = dateColorArray[i];
			
			if(tempR.timestamp.toString() !== timestamp.toString())
			{
				newArray.push(tempR); //If not to be removed, add to next array.
			}	
		}
		
		dateColorArray = newArray; //dateNoteArray is now cleaned
	
		
		//Then, if not remove, add current
		if(!remove)
		{
			dateColorArray.push(tmp);
		}
		
		setItem("dateColorArray", JSON.stringify(dateColorArray));
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
 
@param color The color of the icon.
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
Reset extension
*/
function killEmAll()
{
	clearStrg();
	resetSettings();
	maintain();
	
	return true;
}

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
	var countto = dateArray[0];
	
	if(countto !== null && countto !== undefined)
	{
		try {
			var badgeDate = new Date((countto*1)); //Stupid casting
			//var diff = Math.abs(badgeDate.getDaysFromToday());
			
			var diff = Math.abs(badgeDate.getDistanceInDays(todayStamp));

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
Get version of extension. 
*/
function getVersion() {

	var manifest = chrome.runtime.getManifest();
	var version = manifest.version;
	
	//Create and set up object for returning
	var returnObject = new Object();
	returnObject.newInstall = false;
	returnObject.upgrade = false;
	
	returnObject.currVersion = manifest.version;
	
	returnObject.prevVersion = getItem("version");
		
	if (returnObject.currVersion != returnObject.prevVersion) {
		// Check if we just installed this extension.
		if (returnObject.prevVersion === null) {
			returnObject.newInstall = true;
		} else {
			returnObject.upgrade = true;
		}
		//Set version
		setItem("version", version);
	}
	log("Version", version);
	return returnObject;
}



/**
Setup alarm for maintenance
*/
function setupMaintainLoop()
{
	//d = Now, ad = next full hour.
	var d = new Date();
	var ad = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()+1, 0, 0);
	
	//Version for tracking
	var version = getVersion();
	
	var aInfo = new Object();
	aInfo.when = ad.getTime();
	aInfo.periodInMinutes = 60;
	
	var trackAlarmInfo = new Object();
	trackAlarmInfo.delayInMinutes  = 1;
	
	chrome.alarms.create("MaintainAlarm", aInfo);
	chrome.alarms.create("TrackingAlarm", trackAlarmInfo);
	
	log("Startup", "Maintenance alarm added");
	
	chrome.alarms.onAlarm.addListener(function(alarm){
		if(alarm.name == "MaintainAlarm")
		{
			maintain();
		}
		else if(alarm.name == "TrackingAlarm" && doTrackNormalStart == true) //Track normal startup after one minute only if it is not an update or a new install. This is meaningless and only because it is fun to watch the live updates of the tracker.
		{
			_gaq.push(['_trackPageview', '/start/'+version.currVersion]);
		}
	});
	
}

/**
Initialise settings and/or reset everything to scratch
*/ 
function resetSettings()
{
	log("Event", "resetSettings()");
	
	dateArray = getItem("dateArray");
	if(dateArray === null && getItem("countto") != null )
	{
		//Transition to new solution for storing date.
		dateArray = new Array();
		var countTo = getItem("countto");
		toggleDate(countTo);
		log("Migrating date solution", countTo);
	}
	else if(dateArray === null)
	{
		dateArray = new Array();
		setItem("dateArray", JSON.stringify(dateArray));
		log("Setting default (empty) date array", dateArray);
	}
	else
	{
		dateArray = JSON.parse(dateArray);
	}
	
	
	//Init date note array
	dateNoteArray = getItem("dateNoteArray");
	if(dateNoteArray == null)
	{
		dateNoteArray = new Array();
		setItem("dateNoteArray", JSON.stringify(dateNoteArray));
		//log("Debug", "Setting default (empty) note array");
	}
	else {
		dateNoteArray = JSON.parse(dateNoteArray);
	}
	
	
	//Init date color array
	dateColorArray = getItem("dateColorArray");
	if(dateColorArray == null)
	{
		dateColorArray = new Array();
		setItem("dateColorArray", JSON.stringify(dateColorArray));
	}
	else {
		dateColorArray = JSON.parse(dateColorArray);
	}
	
	//Secondary dates
	noCountDateArray = getItem("noCountDateArray");
	if(noCountDateArray === null)
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
Read old settings and convert them to the new version
*/
function convertSettingsToObject()
{
	tmpSettings = new Object();
	
	tmpSettings.iconTopColor = getItem("icon_topColor");
	tmpSettings.iconTextColor = getItem("icon_textColor");
	tmpSettings.iconShowText = getItem("icon_showtext");
	tmpSettings.iconColor = getItem("iconColor");
	
	tmpSettings.showBadge = getItem("showBadge");
	tmpSettings.badgeColor = getItem("badgeColor");
	tmpSettings.popup = getItem("popup");
	tmpSettings.showWeek = getItem("showWeek");
	tmpSettings.firstDay = getItem("firstDay");
	
	settings = tmpSettings;
	
	persistSettingsToStorage();
	
	return true;
	
}

/**
Return the default set of settings
*/
function getDefaultSettings()
{
	tmpSettings = new Object();
	
	tmpSettings.iconTopColor = "rgba(27,140,160,1)";
	tmpSettings.iconTextColor = "rgba(0,0,0,0.65)";
	tmpSettings.iconShowText = "0";
	tmpSettings.iconColor = "red";
	tmpSettings.showBadge = "1";
	tmpSettings.badgeColor = "#18CD32";
	tmpSettings.popup = "12";
	tmpSettings.showWeek = "1";
	tmpSettings.firstDay = "1";
	
	return tmpSettings;
}

/*
function getSettingsFromStorage()
{
	var tmpSettings = new Object();
	settingsStorage.get("settings", function(items){
	
		console.log("Settings has been read");
		settings = items;
	
	});
	
}
*/

function persistSettingsToStorage() {
	settingsStorage.set({"settings": settings}, function(items){
	
		log("Conversion", "Settings has been written");
	
	});
	
}


/**
Bootstrap background on page load finished
*/
$(document).ready(function() {	
	bginit();	
});
