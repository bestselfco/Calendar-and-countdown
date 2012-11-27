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

/**
Migrate storage solution
*/
function doSettingsStorageMigration()
{
	log("Install/Migrate", "doSettingsStorageMigration");
	
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
	
	persistSettingsToStorage();
	
	maintain();
	
	return settings;
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