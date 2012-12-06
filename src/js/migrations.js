/**
FUNCTIONS RELATED TO INSTALLATION AND SETTINGS MIGRATION
*/

function doMigrationOrInstall(details)
{
	//Turn of normal startup tracking for new installs
		doTrackNormalStart = false;
		
		if(details.reason == "update" && details.previousVersion != version.currVersion)
	 	{
			trackPageView('/update/'+details.previousVersion+'/'+version.currVersion);
			
			//UTC update if update from older version than august 2012
			var prev = details.previousVersion.split(".");
			if(prev[0] < 2013 && prev[1] < 8)
			{
				doUTCUpgrade();
			}
			//Do settings storage migration if version is 2012.11.22.5 or below
			if(prev[0] < 2013 && prev[1] < 12 && prev[2] < 23 && prev[3] < 6)
			{
				settings = doSettingsStorageMigration();
			}
			if(prev[0] < 2013 && prev[1] < 12 && prev[2] < 29)
			{
				doIconColorMigration();
			}
			
		}
		else if(details.reason == "install")
		{
			trackPageView('/new');
			initialiseSettingsOnInstall();			
			//window.location.reload();
		}
		else if(details.previousVersion === version.currVersion)
		{
			trackPageView('/reload/'+version.currVersion);
		}
}



/**
Initialise default settings and store them
*/
function initialiseSettingsOnInstall()
{
	log("Install/Migrate", "initialiseSettings");

	//Read default settings
	settings = getDefaultSettings();
	
	//Store them
	persistSettingsToStorage();
	
	//Re-do init.
	maintain();
	
}

/**
Return the default set of settings
*/
function getDefaultSettings()
{
	tmpSettings = new Object();
	
	tmpSettings.iconTopColor = "#1B8CA0";
	tmpSettings.iconTextColor = "#323232";
	tmpSettings.iconShowText = 0;
	
	tmpSettings.showBadge = "1";
	tmpSettings.badgeColor = "#18CD32";
	tmpSettings.popup = "12";
	tmpSettings.showWeek = "1";
	tmpSettings.firstDay = "1";
	tmpSettings.dateFormatShort = "dd.mm.yy"; //Also look for d/m/y due to my stupidity
	tmpSettings.showBubbleOnStart = false;
	tmpSettings.todayBubbleShowTime = 2000;
	
	return tmpSettings;
}

/**
Migrate storage solution
*/
function doSettingsStorageMigration()
{
	log("Install/Migrate", "doSettingsStorageMigration");
	
	tmpSettings = getDefaultSettings(); new Object();
	
	if(getItem("icon_topColor") !== null) tmpSettings.iconTopColor = getItem("icon_topColor");
	if(getItem("icon_textColor") !== null) tmpSettings.iconTextColor = getItem("icon_textColor");
	if(getItem("icon_showtext") !== null) tmpSettings.iconShowText = getItem("icon_showtext");
	if(getItem("iconColor") !== null) tmpSettings.iconColor = getItem("iconColor");
	
	if(getItem("showBadge") !== null) tmpSettings.showBadge = getItem("showBadge");
	if(getItem("badgeColor") !== null) tmpSettings.badgeColor = getItem("badgeColor");
	if(getItem("popup") !== null) tmpSettings.popup = getItem("popup");
	if(getItem("showWeek") !== null) tmpSettings.showWeek = getItem("showWeek");
	if(getItem("firstDay") !== null) tmpSettings.firstDay = getItem("firstDay");
	
	settings = tmpSettings;
	
	//Clean up old storage elements
	removeItem("icon_topColor");
	removeItem("icon_textColor");
	removeItem("icon_showtext");
	removeItem("iconColor");
	removeItem("showBadge");
	removeItem("badgeColor");
	removeItem("popup");
	removeItem("showWeek");
	removeItem("firstDay");
	removeItem("version");
	removeItem("shouldIUpdateDates");
	removeItem("showMoon");
	
	persistSettingsToStorage();
	
	maintain();
	
	return settings;
}

function doIconColorMigration()
{
	settings.iconTopColor = colorToHex(settings.iconTopColor);
	settings.iconTextColor = "#323232";
	persistSettingsToStorage();
	maintain();
}

/**
Check if there is a need to upgrade dates to UTC format
*/
function doUTCUpgrade()
{
	//Stupid checking code to see if we have already updated to UTC. 
	var tDates = getDates();
	
	//If we are updating, update scores
	if(tDates !== null)
	{ 
		log("Update to UTC", "Checking times to see if update done");
		
		//Check if stored date has UTC time of "0", update if not. 
		var checkUpdateDate = new Date(tDates[0] * 1);
		var updateTime = checkUpdateDate.getUTCHours() * 1;

		if(updateTime != 0)
		{
			updateDatesToUtc();
		}
		else {
			log("Install/Migrate", "Already UTC");
		}
		
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