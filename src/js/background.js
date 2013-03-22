var maintainCycles = 0;
var iHaveStarted = false;
var bgBootTimeOut = 500;

//Set title
document.title = version.currVersion;

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
		
		//Force update at once it is released. Because!
		if(typeof(chrome.runtime.onUpdateAvailable) !== "undefined") 
		{	
			chrome.runtime.onUpdateAvailable.addListener(function(details) {
			
				trackEvent("Event upgrade", version.currVersion, "");
				chrome.runtime.reload();
			
			});
		}
		
		
	}
	catch(e)
	{
		handleError("Background addListeners", e);
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
	
		maintainChain = jWorkflow.order(readSettingsFromStorage).andThen(readDatesFromStorage).andThen([updateBadgeFromStored, updatePopupFromStored, updateIconFromStored]);
		
		maintainChain.start();
			
		logger("info", "Maintenance", "Cycle #"+maintainCycles+", " + nowNew.toLocaleString());
		
		return true;
	}
	catch(e)
	{
		handleError("Background maintain", e);
		return false;
	}
	
}

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
		handleError("Background updateIconFromStored", e);
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
		handleError("Background updatePopupFromStored",e);
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
		handleError("Background setToolTip", e);
	}
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
	var startupSequence = jWorkflow.order(addListeners).andThen(getSettingsStorage).andThen(getDateStorage).andThen(readSettingsFromStorage).andThen(readDatesFromStorage).andThen(setupMaintainLoop).andThen(maintain); 
	
	//Up, Up and Away!
	startupSequence.start();
	
	//Debug settings
	if(debug)
	{
		setToolTip("Debug "+version.currVersion);
	}
	
}

//reload, update or install
chrome.runtime.onInstalled.addListener(function(details) {
	
	doMigrationOrInstall(details);	//On reload or new install, run migration function (migrations.js)
	
});

//Log normal startup
chrome.runtime.onStartup.addListener(function() {
	
	window.setTimeout(trackStartup, 1000);
		
});

//Do the actual bootup routine
$(document).ready(function() {
	window.setTimeout(bgBoot, bgBootTimeOut);
});

function trackStartup()
{
	try {if(typeof(settings.popup) !== "undefined")
		{
			pushSettingsToGoogleTracker();
			trackPageView('/start');
		}
		else {
			logger("info", "Startup", "Retrying startup logging"); 
			window.setTimeout(trackStartup, 1000);
		}
	}
	catch (err)
	{
		handleError("trackStartup", err);
	}
}

//Perform the last restort boot.
function bgBoot()
{
	if(!iHaveStarted)
	{	
		iHaveStarted = true;
		bgInit();
	}
}
