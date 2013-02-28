/**
FUNCTIONS RELATED TO INSTALLATION AND SETTINGS MIGRATION
*/

function doMigrationOrInstall(details)
{
	try{
		if(details.reason == "update" && details.previousVersion != version.currVersion)
	 	{	
			trackEvent("Update", version.currVersion, details.previousVersion);
			
			//var prev = details.previousVersion.split(".");
			
			//UTC update if update from older version than august 2012	
			try {
				if(compareVersions(details.previousVersion, "2012.7") == -1)
				{	
					trackEvent("Migration", "UTC" , details.previousVersion);
					updateDatesToUtc();
				}
			}
			catch(err)
			{
				handleError("doMigrationOrInstall utc", err);
			}
			
			//Do settings storage migration if version is 2012.11.22.5 or below
			try {
				if(compareVersions(details.previousVersion, "2012.11.22.5") == -1)
				{
					trackEvent("Migration", "Settings storage" , details.previousVersion);
					settings = doSettingsStorageMigration();
				}
			}
			catch (err)
			{
				handleError("doMigrationOrInstall settings storage", err);
			}
			
			//Do icon color migration from rgb to hex
			try {
				if(compareVersions(details.previousVersion, "2012.11.28") == -1) //prev[0] < 2013 && prev[1] < 12 && prev[2] < 29)
				{
					trackEvent("Migration", "Icon colors" , details.previousVersion);
					doIconColorMigration();
				}
			}
			catch (err) 
			{
				handleError("doMigrationOrInstall icon color", err);
			}
			
			try {
				//Switch date storage to new soluion
				if(compareVersions(details.previousVersion, "2013.2.8.1") == -1)
				{
					trackEvent("Migration", "Date storage" , details.previousVersion);
					doMigrateDatesToNewStorageAPI();
				}
			}
			catch (err) 
			{
				handleError("doMigrationOrInstall date storage", err);
			}
			
			bgInit();
			
		}
		else if(details.reason == "install")
		{
			trackPageView('/new');
			trackEvent("New install", version.currVersion, "");	
			initialiseSettingsOnInstall();
			bgInit();
			
		}
		else if(details.previousVersion === version.currVersion)
		{
			trackPageView('/reload/'+version.currVersion);
			trackEvent("Reloaded", version.currVersion, "");
			bgInit();
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
		
		//Setup dates object
		var dateObject= {mainDateArray: [], subDateArray: [],dateNoteArray: [], dateColorArray: []};
		persistDatesToStorage(dateObject);
		
		//Re-do init.
		//maintain();
	}
	catch(e)
	{
		handleError("initialiseSettingsOnInstall", e);
	}
	
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
		
		var subdateutc = [];
		
		var tDatetmpDateMain = new Date(tmpDateMain*1 + offsetMSec);
		
		var mainUtc = [Date.UTC(tDatetmpDateMain.getUTCFullYear(), tDatetmpDateMain.getUTCMonth(), tDatetmpDateMain.getUTCDate()).toString()];
		
		for (i = 0; i < tmpDateSub.length; i++)
		{
			
			var key = tmpDateSub[i];
			
			var DatetmpDateSub = new Date(key*1 + offsetMSec);
			
			var tmpDate = Date.UTC(DatetmpDateSub.getUTCFullYear(), DatetmpDateSub.getUTCMonth(), DatetmpDateSub.getUTCDate()).toString();
			
			subdateutc.push(tmpDate);
						
		}
			setItem("noCountDateArray", JSON.stringify(subdateutc));
			setItem("dateArray", JSON.stringify(mainUtc));
			log("Date update", "Update of dates being written");	
	}
	catch(e)
	{
		handleError("updateDatesToUtc", e);
	}
}

/**
Migrate dates to new storage solution. Write empty values if not.
*/
function doMigrateDatesToNewStorageAPI()
{
	try {
		var tmpMainDateArray = JSON.parse(getItem("dateArray"));
		var tmpSubDateArray = JSON.parse(getItem("noCountDateArray"));
		var tmpDateNoteArray = JSON.parse(getItem("dateNoteArray"));
		var tmpDateColorArray = JSON.parse(getItem("dateColorArray"));
		
		//Init object with empty data
		var dateObject= {mainDateArray: [], subDateArray: [],dateNoteArray: [], dateColorArray: []};
		
		if(tmpMainDateArray !== null) dateObject.mainDateArray = tmpMainDateArray;
		if(tmpSubDateArray !== null) dateObject.subDateArray = tmpSubDateArray;
		if(tmpDateNoteArray !== null) dateObject.dateNoteArray = tmpDateNoteArray;
		if(tmpDateColorArray !== null) dateObject.dateColorArray = tmpDateColorArray;
	
		persistDatesToStorage(dateObject);
	}
	catch (err)
	{
		var errDateObject = {mainDateArray: [], subDateArray: [],dateNoteArray: [], dateColorArray: []};
		persistDatesToStorage(dateObject);
		handleError("doMigrateDatesToNewStorageAPI", e);
	}
	
}




