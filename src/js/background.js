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
	try {
		//Set title
		document.title = "Calendar and Countdown";
		
		//Do install stuff if installed, migration stuff if updated
		chrome.runtime.onInstalled.addListener(function(details) {
			doMigrationOrInstall(details);		
		});
		
		//Start with default settings
		settings = getDefaultSettings();
		//Do the actual initialisation of settings
		getSettingsFromStorage();
		
		//Call home with the settings.
		pushSettingsToGoogleTracker();
		
		//Init the data arrays
		initDateArrays();
		
		//Do first maintenance and set up loop
		maintain();
		setupMaintainLoop();
	}
	catch(e)
	{
		handleError("bginit", e);
	}	
	
}

/**
Maintain data
*/
function maintain()
{
	try {
		maintainCycles++;
		
		var nowNew = new Date();
		todayStamp = Date.UTC(nowNew.getFullYear(),nowNew.getMonth(), nowNew.getDate());
	
		updateBadgeFromStored();
		updatePopupFromStored();
		updateIconFromStored();
	
		setToolTip(new Date().toLocaleDateString());
		
		log("Maintenance", "Cycle #"+maintainCycles+", " + nowNew.toLocaleString());
	}
	catch(e)
	{
		handleError("maintain", e);
	}
	
}

/**
Retrieve the dates in a JSON format
*/
/*
function getDatesJSON(){

	try{
		return JSON.stringify(getDates());
	}
	catch (e) {
		handleError("getDatesJSON",e);
	}	
}
*/

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
/*
function getSubDatesJSON(){
	return JSON.stringify(getSubDates());
}
*/

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
	
	iconSetup.textColor = settings.iconTextColor;
	iconSetup.topColor = settings.iconTopColor;
	iconSetup.showNumbers = settings.iconShowText;
	
	if(iconSetup.showNumbers == "1") iconSetup.fillText = new Date().getDate(); //Today
	else if (iconSetup.showNumbers == "2") iconSetup.fillText = getDistanceInDays(); //Countdown
	else  iconSetup.fillText = 0; //Nothing, so why bother
	
	document.getElementById("iconCanvas").getContext("2d").putImageData(new Icon(iconSetup).getImage(),0,0);

	setIcon();
	
}


/**
Set the popup page
*/
function updatePopupFromStored()
{
	var popup = settings.popup;
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
	initialiseSettingsOnInstall();
	initDateArrays();
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
	else //We are not counting to anything, so we delete this.
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
	var color = settings.badgeColor;
	color = HexToRGB(color);

	var showBadge = settings.showBadge;
	
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
	
	returnObject.currVersion = manifest.version;
	
	return returnObject;
}



/**
Setup alarm for maintenance
*/
function setupMaintainLoop()
{
	//d = Now, ad = next full hour.
	var d = new Date();
	var ad = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()+1, 0);
	
	//Version for tracking
	var version = getVersion();
	
	var aInfo = new Object();
	aInfo.when = ad.getTime();
	aInfo.periodInMinutes = 5;
	
	var trackAlarmInfo = new Object();
	trackAlarmInfo.delayInMinutes  = 5;
	
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
			trackPageView('/start/'+version.currVersion);
		}
	});
	
}

/**
Initialise settings and/or reset everything to scratch
*/ 
function initDateArrays()
{
	log("Event", "initDateArrays()");
	
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
	
	//Load default icon, autocreates new if not already set
	var icon = new Icon(new Object());
	icon.getDefaultValues(true);

}

/**
Set settings object to stored settings
*/
function getSettingsFromStorage()
{
	//var tmpSettings = getDefaultSettings();
	
	settingsStorage.get("settings", function(items){
	
		//Overwrite default settings with stored ones where applicable.
		for (var i in items.settings)
		{
			settings[i] = items.settings[i];
		}
		
		log("Settings", "Settings has been read");
		
		//return tmpSettings;
			
	
	});
}

/**
Persist the current settings object
*/
function persistSettingsToStorage() {
	
	if(settings.popup)
	{
		settingsStorage.set({"settings": settings}, function(items){
		
			log("Settings", "Settings has been written to storage");
	
		});
	}
}

/**
Push settings to google analytics
*/
function pushSettingsToGoogleTracker()
{
	try {
		for (var setting in settings)
		{
			_gaq.push(['_setCustomVar', 1, setting, settings[setting], 1]);
		} 
	}
	catch(e)
	{
		handleError("pushSettingsToGoogleTracker", e);
	}
}

/**
Bootstrap background on page load finished
*/
$(document).ready(function() {	
	bginit();	
});
