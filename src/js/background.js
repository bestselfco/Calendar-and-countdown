var maintainCycles = 0;
var startupTimer;

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
			logger("info", "Maintenance", "Run because of storage change");

		});

		
		//Add listener for messages - to centralize tracking code in one place.
		chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
				if (request.action == "trackPageView")
				{
					trackPageView(request.pagetitle);
					sendResponse({state: "page ok", data: request});
				}
				if (request.action == "trackEvent")
				{
					trackEvent(request.type, request.category, request.text);
					sendResponse({state: "event ok", data: request});
				}
				if (request.action == "trackError")
				{
					trackError(request.where, request.category, request.text);
					sendResponse({state: "error ok", data: request});
				}
				if (request.action == "trackTiming")
				{
					trackTiming(request.text, request.time);
					sendResponse({state: "timing ok", data: request});
				}
			});	
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
		
		var nowNew = new Date();
		todayStamp = Date.UTC(nowNew.getFullYear(),nowNew.getMonth(), nowNew.getDate());
	
		maintainChain = jWorkflow.order(readSettingsFromStorage).andThen(readDatesFromStorage).andThen([updateBadgeFromStored, updatePopupFromStored, updateIconFromStored]);
		
		maintainChain.start();
		
		
		logger("info", "Maintenance", "Cycle #"+maintainCycles+", " + nowNew.toLocaleString());
		
		maintainCycles++;
		
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
		iconSetup.easyRead = settings.easyRead;
		
		if(iconSetup.showNumbers == "1") iconSetup.fillText = new Date().getDate(); //Today
		else if (iconSetup.showNumbers == "2"){ //Count down (or blank!)
			if(getDistanceInDays() !== null)
			{
				iconSetup.fillText = getDistanceInDays(); 
			}
			else
			{
				iconSetup.fillText = "";
			}
			
		} //Countdown
		else iconSetup.fillText = 0; //Nothing, so why bother
				
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
		
		page = "popup_12.html";
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

		var count = 0;

		if(tmpDateArray.length > 0)
		{
			var tStamp = tmpDateArray[0] * 1; //Cast to int

			var countDate = new Date(tStamp * 1);

			if(settings.showWorkDays === true)
			{	
				count  = countDate.getDistanceInWeekDaysFromToday();
			}
			else
			{
				count = countDate.getDaysFromToday();
			}

			if(count > 9999)
			{
				count = "+";
			}
			
			setBadge(count);

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
			//chrome.browserAction.setBadgeBackgroundColor({color:color});
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
	
				return diff; //All is well;
				
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

var alarmInterval;

/**
Setup alarm for maintenance
*/
function setupMaintainLoop()
{
	try{

		alarmInterval = setInterval(maintain, 6*60*1000);
	
	}
	catch(e)
	{
		handleError("setupMaintainLoop", e);
	}	
}


function handleGoogleAPIClientLoad()
{
	logger("integration", "Google API load", "Background loaded");
	//console.log("Handle client load background");
}

function doGetGoogleAPIToken()
{
	var details = {"interactive": true};
	chrome.identity.getAuthToken(details, function(token) {console.log(token);});
}

/**
Everything from here down is the initiation code
*/

function bgInit()
{
	//Use jWorkflow to ensure that we bootstrap correctly.
	var startupSequence = jWorkflow.order(addListeners).andThen(readSettingsFromStorage).andThen(readDatesFromStorage).andThen(setupMaintainLoop).andThen(loadGoogleAPIClient).andThen(startTracking).andThen(maintain).andThen(doneTimer); 
	
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

//Do the actual bootup routine
$(document).ready(function() {

	try {
		startupTimer = new timer("Background start");
		bgInit();
	}
	catch(e)
	{

	}

});


function doneTimer(baton)
{
	try 
	{
		startupTimer.stop();
	}
	catch(e)
	{

	}
}
