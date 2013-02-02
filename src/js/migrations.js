/**
FUNCTIONS RELATED TO INSTALLATION AND SETTINGS MIGRATION
*/

function doMigrationOrInstall(details)
{
	try{
		//Turn of normal startup tracking for new installs
		doTrackNormalStart = false;
		
		if(details.reason == "update" && details.previousVersion != version.currVersion)
	 	{
			//trackPageView('/update/'+details.previousVersion+'/'+version.currVersion);
			
			trackEvent("Update", version.currVersion, details.previousVersion);
			
			//UTC update if update from older version than august 2012
			var prev = details.previousVersion.split(".");
			if(prev[0] < 2013 && prev[1] < 8)
			{	
				trackEvent("Migration", "UTC" , details.previousVersion);
				
				updateDatesToUtc();
			}
			//Do settings storage migration if version is 2012.11.22.5 or below
			if(prev[0] < 2013 && prev[1] < 12 && prev[2] < 23 && prev[3] < 6)
			{
				trackEvent("Migration", "Settings storage" , details.previousVersion);
				settings = doSettingsStorageMigration();
			}
			if(prev[0] < 2013 && prev[1] < 12 && prev[2] < 29)
			{
				trackEvent("Migration", "Icon colors" , details.previousVersion);
				doIconColorMigration();
			}
			
		}
		else if(details.reason == "install")
		{
			trackPageView('/new');
			trackEvent("New install", version.currVersion, "");	
			initialiseSettingsOnInstall();	
			
		}
		else if(details.previousVersion === version.currVersion)
		{
			trackPageView('/reload/'+version.currVersion);
			trackEvent("Reloaded", version.currVersion, "");
		}
	}
	catch(e)
	{
		handleError("doMigrationOrInstall", e);
	}
}



/**
Initialise default settings and store them
*/
function initialiseSettingsOnInstall()
{
	try{
		log("Install/Migrate", "initialiseSettings");
	
		//Read default settings
		settings = getDefaultSettings();
		
		//Store them
		persistSettingsToStorage();
		
		//Re-do init.
		maintain();
	}
	catch(e)
	{
		handleError("initialiseSettingsOnInstall", e);
	}
	
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
	
	tmpSettings.showFrom = 1; //1 = current, 2 = current third, 3 = current month
	
	return tmpSettings;
}

/**
Migrate storage solution
*/
function doSettingsStorageMigration()
{
	log("Install/Migrate", "doSettingsStorageMigration");
	
	try{
	
		tmpSettings = getDefaultSettings();
		
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
	catch(e)
	{
		handleError("doSettingsStorageMigration", e);
		return getDefaultSettings();
	}
}

function doIconColorMigration()
{
	try 
	{
		settings.iconTopColor = colorToHex(settings.iconTopColor);
		settings.iconTextColor = "#323232";
		persistSettingsToStorage();
		maintain();
	}
	catch(e)
	{
		handleError("doIconColorMigration", e);
	}
}

/**
Convert stored dates to use UTC. One time conversion, but does not screw up on multiple loads. 
*/
function updateDatesToUtc()
{
	try{

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
	
		//var shouldIUpdateDates = getItem("shouldIUpdateDates");

			setItem("noCountDateArray", JSON.stringify(subdateutc));
			setItem("dateArray", JSON.stringify(mainUtc));
			log("Date update", "Update of dates being written");
		//	setItem("shouldIUpdateDates", "nope");
	
	}
	catch(e)
	{
		handleError("updateDatesToUtc", e);
	}
}