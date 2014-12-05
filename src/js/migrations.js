/**
FUNCTIONS RELATED TO INSTALLATION AND SETTINGS MIGRATION
*/

function doMigrationOrInstall(details)
{
	try{
	
		//Fail safe reason check that still manages to fail
		var reason = "undefined";
		if(typeof(details) !== 'undefined' && typeof(details.reason) !== 'undefined') 
		{	
			reason = details.reason;
		}
	
		if(reason === "update" && details.previousVersion !== version.currVersion)
		{	
			trackEvent("Update", version.currVersion, details.previousVersion);
			//trackPageView('/update/'+details.previousVersion);			
						
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
					doSettingsStorageMigration();
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
				if(compareVersions(details.previousVersion, "2013.2.28.3") == -1)
				{
					trackEvent("Migration", "Date storage" , details.previousVersion);
					doMigrateDatesToNewStorageAPI();
				}
			}
			catch (err) 
			{
				handleError("doMigrationOrInstall date storage", err);
			}
			
			try {
				//Default to online storage if not set
				if(compareVersions(details.previousVersion, "2014.12.5.1") == -1)
				{
					trackEvent("Migration", "Storage location" , details.previousVersion);
					var settingsTimeout = setTimeout(doMigrateSettingsToCloud, 3000);
					var storageTimeout = setTimeout(doMigrateStorageToCloud, 3000);

				}
			}
			catch (err) 
			{
				handleError("doMigrationOrInstall storage location", err);
			}
			

		}
		else if(reason === "install")
		{
			//trackPageView('/new');
			trackEvent("Install", version.currVersion, "");	
			initialiseSettingsOnInstall();
		}
		else if(details.previousVersion === version.currVersion)
		{
			//trackPageView('/reload/'+version.currVersion);
			trackEvent("Reload", version.currVersion, "");
		}
		else if(reason === "undefined")
		{
			throw new Error("details.reason undefined");
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
	
		//Set storage location
		//doMigrateStorageLocation();
	
		//Read default settings
		settings = getDefaultSettings();
		
		//Store them
		persistSettingsToStorage(settings);
		
		//Setup dates object
		var dateObject= {mainDateArray: [], subDateArray: [],dateNoteArray: [], dateColorArray: []};
		persistDatesToStorage(dateObject);
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
		
		persistSettingsToStorage(settings);
	}
	catch(e)
	{
		handleError("doSettingsStorageMigration", e);
	}
}

/**
Migrate icon colors to hex
*/
function doIconColorMigration()
{
	try 
	{
		settings.iconTopColor = colorToHex(settings.iconTopColor);
		settings.iconTextColor = "#323232";
		persistSettingsToStorage(settings);
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
		var dateObject= {mainDateArray: [], subDateArray: [], dateNoteArray: [], dateColorArray: []};
		
		if(tmpMainDateArray !== null) dateObject.mainDateArray = tmpMainDateArray;
		if(tmpSubDateArray !== null) dateObject.subDateArray = tmpSubDateArray;
		if(tmpDateNoteArray !== null) dateObject.dateNoteArray = tmpDateNoteArray;
		if(tmpDateColorArray !== null) dateObject.dateColorArray = tmpDateColorArray;
	
		persistDatesToStorage(dateObject);
	}
	catch (err)
	{
		var errDateObject = {mainDateArray: [], subDateArray: [], dateNoteArray: [], dateColorArray: []};
		persistDatesToStorage(dateObject);
		handleError("doMigrateDatesToNewStorageAPI", e);
	}
	
}


function doMigrateSettingsToCloud()
{
	chrome.storage.local.get("settings", function(data){
		if(typeof(data.settings) !== "undefined")
		{
			chrome.storage.sync.set({"settings": data.settings}, function(){
				logger("debug", "Copied settings", "Local to cloud");
				chrome.storage.local.remove("settings");
			});
		}
		else
		{
				logger("debug", "Failed settings copy", "Local to cloud");
		}
	});
}

function doMigrateStorageToCloud()
{	
	logger("debug", "Overwriting storage", "Local to cloud");
	
	var newObject = {};
	newObject.dates = {};
	var colTransfer = {};
	var noteTransfer = {};

	chrome.storage.local.get("dates", function(data){
		
		//console.log("Local", data.dates);
		//console.log("Cloud", dates);

		if(typeof(data.dates) !== "undefined")
		{
			$.each(data.dates, function( index, value ) {
			  
			  if(index === "mainDateArray")
			  {

			  	if(dates.mainDateArray.length === 0) //It's empty, let's write
			  	{
			  		dates.mainDateArray[0] = data.dates.mainDateArray[0];
			  	}
			  	else
			  	{
			  		//Something there, lets's add the later ones as sub.
			  		dates.subDateArray.push(data.dates.mainDateArray[0]);
			  	}
			  	
			  }
			  if(index === "subDateArray")
			  {
			  		dates.subDateArray = dates.subDateArray.concat(data.dates.subDateArray); 
			  }
			  if(index === "dateNoteArray")
			  {
			  		$.each(dates.dateNoteArray, function(colIn, colVal)
					{
						noteTransfer[colVal.timestamp] = colVal.note; // = colVal.color;
					});	

					$.each(value, function(colIn, colVal)
					{

						if(typeof(noteTransfer[colVal.timestamp]) !== "undefined") {

							noteTransfer[colVal.timestamp] += " / " + colVal.note;
						}
						else
						{
							noteTransfer[colVal.timestamp] = colVal.note;
						}
					});

					dates.dateNoteArray = [];
					$.each(noteTransfer, function(colTK, colTV)
					{
						dates.dateNoteArray.push({"timestamp":colTK,"note":colTV});
					});

			  }
			  if(index === "dateColorArray") //Colors
			  {
					$.each(dates.dateColorArray, function(colIn, colVal)
					{
						colTransfer[colVal.timestamp] = colVal.color; // = colVal.color;
					});		

					$.each(value, function(colIn, colVal)
					{
						colTransfer[colVal.timestamp] = colVal.color;
					});

					dates.dateColorArray = [];

					$.each(colTransfer, function(colTK, colTV)
					{
						dates.dateColorArray.push({"timestamp":colTK,"color":colTV});
					}
					);	  	
			  }

			});

			dates.subDateArray = ArrNoDupe(dates.subDateArray);

			persistDatesToStorage(dates);

			chrome.storage.local.remove("dates");

			console.log("Ferdig konvertert", dates);

		}
		else
		{
			logger("debug", "Failed date copy", "Local to cloud");
		}
	});
	
}

function clearLocalStorage()
{
	chrome.storage.local.remove(["dates", "settings"], function(){logger("debug", "Local storage cleared");});
}

function clearCloudStorage()
{
	chrome.storage.sync.remove(["dates", "settings"], function(){logger("debug", "Synced storage cleared");});
}

