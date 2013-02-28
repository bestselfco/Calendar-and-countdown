//New date and settings objects to persist to synced storage
var settings = {}; //new Object();
var dates = {}; //new Object();

//var dateArray = []; //Holds the dates we count down to
//var subDateArray = [];
//var newInstall; //Is this a first time install (ie: is the date array set?)

//var dateNoteArray; //Notes for dates
//var dateColorArray; //Colors for dates

var maintainCycles = 0;

var iHaveStarted = false;
var lastResortBootTimeout = 1000;

//Set title
document.title = "CC " + version.currVersion;

//Init today time stamp
var now = new Date();
var todayStamp = Date.UTC(now.getFullYear(),now.getMonth(), now.getDate());

/**
Add event listeners 
*/
function addListeners()
{	
	try {
		//Do install stuff if installed, migration stuff if updated
		
		chrome.storage.onChanged.addListener(function(changes, namespace) {
		  
		  maintain(); //Run maintenance whenever storage has changed for some reason
		  logger("debug", "Maintenance", "Run because of storage change");
		  
		});
		
		chrome.alarms.onAlarm.addListener(function(alarm){
			if(alarm.name == "MaintainAlarm")
			{
				maintain(); //Add maintain function to loop'
			}
		});
		
	}
	catch(e)
	{
		handleError("migrate", e);
	}		
}

/**
Do a call to Google Analytics whenever exension has finished loading. 
*/
function trackExtensionStart()
{
	trackPageView('/start/'+version.currVersion);
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
	
		//setToolTip(new Date().toLocaleDateString());
		
		logger("info", "Maintenance", "Cycle #"+maintainCycles+", " + nowNew.toLocaleString());
	}
	catch(e)
	{
		handleError("maintain", e);
	}
	
}

function refresh()
{
	try {
		if(iHaveStarted)
		{
			refresher = jWorkflow.order(readSettingsFromStorage).andThen(readDatesFromStorage).andThen(maintain);
			refresher.start();
		}
	}
	catch (err) 
	{
		handleError("Background Refresh", err); 
	}
}


/**
Get date array
*/



/**
Update the icon from the stored values
*/
function updateIconFromStored()
{
	
	try {
		//Setup object
		var iconSetup = {}; //new Object();
		
		iconSetup.textColor = settings.iconTextColor;
		iconSetup.topColor = settings.iconTopColor;
		iconSetup.showNumbers = settings.iconShowText;
		
		if(iconSetup.showNumbers == "1") iconSetup.fillText = new Date().getDate(); //Today
		else if (iconSetup.showNumbers == "2") iconSetup.fillText = getDistanceInDays(); //Countdown
	    else  iconSetup.fillText = 0; //Nothing, so why bother
		
	    var tmpIconCanvas = document.createElement("canvas");
	    
	    tmpIconCanvas.getContext("2d").putImageData(new Icon(iconSetup).getImage(),0,0);
	    
	    var ctx = tmpIconCanvas.getContext("2d");
		var iconPixelData = ctx.getImageData(0, 0, 19, 19);
		chrome.browserAction.setIcon({imageData:iconPixelData});

	}
	catch(e)
	{
		handleError("updateIconFromStored", e);
	}
	
}


/**
Set the popup page
*/
function updatePopupFromStored()
{
	try {
		var popup = settings.popup;
		
		var page = "popup_12.html";
		
		if(popup == "3") page = "popup_3.html";
		
		chrome.browserAction.setPopup({popup:page});
	}
	catch(e)
	{
		handleError("updatePopupFromStored",e);
	}
}

/**
Set the tooltip.
@param text Tooltip text
 */
function setToolTip(text)
{
	try{
		text = text.toString();
		chrome.browserAction.setTitle({title:text});
	}
	catch(e)
	{
		handleError("setToolTip", e);
	}
}

/**
Reset extension
*/
function killEmAll()
{
	trackEvent("Full reset", version.currVersion, "");
	
	//Old, to be removed
	clearStrg();
	
	initialiseSettingsOnInstall();
	
	//Old, to be removed
	initDateArrays();
	
	//NEW
	initialiseSettingsOnInstall()
	
	//Old, to be removed
	maintain();
	
	return true;
}

/**
*Update the badge from the stored countdown date
*/
function updateBadgeFromStored()
{
	try{
		var tmpDateArray = getDates();
		if(tmpDateArray.length > 0)
		{
			var count = getDistanceInDays();
		
			if(count !== null)
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
	catch(e)
	{
		handleError("updateBadgeFromStored", e);
	}
}

/**
Set the badge to a countdown value. Also updates the color from memory.
@param text The new badge text
 */
function setBadge(text)
{
	try{
		
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
	catch(e)
	{
		handleError("setBadge", e);
	}
}

/**
Get countdown days for the badge
*/
function getDistanceInDays()
{
	
	try {
	
		var countto = getDates()[0];
		
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
				handleError("getDistanceInDays inner", err);
				return null;
			}
		}
		else{
			return null;
		}
	}
	catch(e)
	{
		handleError("getDistanceInDays", e);
	}
}




/**
Setup alarm for maintenance
*/
function setupMaintainLoop()
{
	try{
		
		var d = new Date();
		var ad = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()+5, 0);
		
		var aInfo = {}; //new Object();
		aInfo.when = ad.getTime();
		aInfo.periodInMinutes = 5;
				
		chrome.alarms.create("MaintainAlarm", aInfo);
		
		logger("info", "Startup", "Maintenance alarm added");
	
	}
	catch(e)
	{
		handleError("setupMaintainLoop", e);
	}	
}

/**
* New function for reading dates from the storage
*/
function getDatesFromStorage(previous, baton)
{
		try{
	
			baton.take(); // Block further progress until we pass the baton
			
			var tmpDates = {mainDateArray: [], subDateArray: [],dateNoteArray: [], dateColorArray: []}; //Empty date object
			
			dateStorage.get("dates", function(items){
			
				//Overwrite default dates with stored ones where applicable.
				for (var i in items.dates)
				{
					tmpDates[i] = items.dates[i];
				}
				
				dates = tmpDates;
				
				logger("info", "Startup", "Dates has been read");
				
				baton.pass(); //OK, pass the baton along
           				
		});
	}
	catch(e)
	{
		handleError("getSettingsFromStorage", e);
	}
}

function debugNewDates()
{
	dateStorage.get("dates", function(items){
		console.log(items.dates);
	});
}

/**
Initialise settings and/or reset everything to scratch from the old system.
*/ 

function initDateArrays()
{
/*
	try {
		
		tmpDates = {}; //Stupid thing for new soluton
		dateArray = getItem("dateArray");
		if(dateArray === null && getItem("countto") != null )
		{
			//Transition to new solution for storing date.
			dateArray = [];
			var countTo = getItem("countto");
			toggleDate(countTo);
			log("Migrating date solution", countTo);
			
			//New solution
			tmpDates.mainDateArray = [];
		}
		else if(dateArray === null)
		{
			dateArray = []; //new Array();
			setItem("dateArray", JSON.stringify(dateArray));
			
			//New solution
			tmpDates.mainDateArray = [];
			
			log("Setting default (empty) date array", dateArray);
		}
		else
		{
			dateArray = JSON.parse(dateArray);
			
			//New solution
			tmpDates.mainDateArray = dateArray;
			
		}
		
		
		//Init date note array
		dateNoteArray = getItem("dateNoteArray");
		if(dateNoteArray === null)
		{
			dateNoteArray = [] //new Array();
			setItem("dateNoteArray", JSON.stringify(dateNoteArray));
			
			//New solution
			tmpDates.dateNoteArray = [];
		}
		else {
		
			dateNoteArray = JSON.parse(dateNoteArray);
			
			//New solution
			tmpDates.dateNoteArray = dateNoteArray;
			
		}
		
		//Init date color array
		dateColorArray = getItem("dateColorArray");
		if(dateColorArray === null)
		{
			dateColorArray = []; // new Array();
			setItem("dateColorArray", JSON.stringify(dateColorArray));
			
			//New solution
			tmpDates.dateColorArray = [];
			
		}
		else {
			dateColorArray = JSON.parse(dateColorArray);
			
			//New solution
			tmpDates.dateColorArray = dateColorArray;
			
		}
		
		//Secondary dates
		noCountDateArray = getItem("noCountDateArray");
		if(noCountDateArray === null)
		{
			noCountDateArray = []; //new Array();
			setItem("noCountDateArray", JSON.stringify(noCountDateArray));
			
			//New solution
			tmpDates.subDateArray = [];
			
		}
		else
		{
			noCountDateArray = JSON.parse(noCountDateArray);
			
			//New solution
			tmpDates.subDateArray = noCountDateArray;
			
		}
	}
	catch(e)
	{
		handleError("initDateArrays", e);
	}
*/
}


/**
Set settings object to stored settings
*/
function getSettingsFromStorage(previous, baton)
{
	try{
	
		baton.take(); // Block further progress until we pass the baton
		
        settings = getDefaultSettings();
        
		settingsStorage.get("settings", function(items){
		
			//Overwrite default settings with stored ones where applicable.
			for (var i in items.settings)
			{
				settings[i] = items.settings[i];
			}
			
			logger("info", "Startup", "Settings has been read");
			
			baton.pass(); //OK, pass the baton along
           				
		});
	}
	catch(e)
	{
		handleError("getSettingsFromStorage", e);
	}
		
}

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
Everything from here down is the initiation code
*/

function bgInit()
{
	//Use jWorkflow to ensure that we bootstrap correctly. God I love this library.
	var startupSequence = jWorkflow.order(addListeners).andThen(getSettingsFromStorage).andThen(getDatesFromStorage).andThen(setupMaintainLoop).andThen(maintain).andThen(pushSettingsToGoogleTracker).andThen(trackExtensionStart);
	
	//Up, Up and Away!
	startupSequence.start();
}

//reload, update or install
chrome.runtime.onInstalled.addListener(function(details) {
	iHaveStarted = true;
	doMigrationOrInstall(details);	//On reload or new install, run migration function (migrations.js)
});

//normal startup
chrome.runtime.onStartup.addListener(function() {
	iHaveStarted = true;
	bgInit();
});

//Last resort startup
$(document).ready(function() {
	window.setTimeout(lastRestortBoot, lastResortBootTimeout);
});

//Perform the last restort boot.
function lastRestortBoot()
{
	if(!iHaveStarted)
	{	
		trackEvent("Emergency boot", version.currVersion, "");
		iHaveStarted = true;
		bgInit();
	}
}
