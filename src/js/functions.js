/**
COMMON FUNCTIONS AND VARIABLES FOR ALL PARTS OF THE APPLICATION. 
*/



//Set storage area for settings and dates. Not yet functional.
var settingsStorage = chrome.storage.local;
var dateStorage = chrome.storage.local;

//Debug object. If true, we are in debug mode. Checks if ID is the official Google ID or not.
var debug = (location.hostname == "caplfhpahpkhhckglldpmdmjclabckhc") ? false : true;
var version = getVersion();

/**
 * Output to log if "debug" is true
 * 
 * @param cat Logging category
 * @param text Text to log
 */
function log(cat, text)
{
    logger("old", cat, text);
}

function logger(type, cat, text)
{
    var time = new Date();
    
    switch(type)
    {
        case "debug":
            if(debug) console.log(time.toLocaleTimeString(), "(debug)", cat, ":", text);
        break;
        
        case "info":
            if(debug) console.log(time.toLocaleTimeString(),"(info) ", cat, ":", text);
        break;
        
        case "old": 
        	if(debug) console.log(time.toLocaleTimeString(),"(old)  ", cat, ":", text);
        break;
        
        default: 
            if(debug) console.log(time.toLocaleTimeString(), "(?)    ", cat, ":", text);
        break;
    }
    
}

function handleError(where, e)
{
    var time = new Date();
    console.error(time.toLocaleTimeString(), where, e.name, e.message);
	trackError(where, e.name, e.message);
}


/**
Get version of extension. 
*/
function getVersion() {

    try {
		var manifest = chrome.runtime.getManifest();
		var version = manifest.version;
		
		//Create and set up object for returning
		var returnObject = {}; //new Object();
		
		returnObject.currVersion = manifest.version;
		
		var intVer = version.replace(/\./g,'');
		
		returnObject.intVer = intVer;
		
		return returnObject;
	}
	catch(e)
	{
		handleError("getVersion", e);
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
    tmpSettings.storeDataOnline = false;
	
	tmpSettings.showFrom = 1; //1 = current, 2 = current third, 3 = current month
	
	return tmpSettings;
}

/**
Persist the given settings object
*/
function persistSettingsToStorage(tmpSettings) {
	
	try {
		if(tmpSettings.popup)
		{
			settingsStorage.set({"settings": tmpSettings}, function(items){
			
				logger("info", "Settings", "Settings has been written to storage");
		
			});
		}
	}
	catch(e)
	{
		handleError("persistSettingsToStorage", e);
	}
}

/**
Persist the given dates object
*/
function persistDatesToStorage(dateSet) {
	
	try {
		if(dateSet.mainDateArray && dateSet.subDateArray && dateSet.dateNoteArray && dateSet.dateColorArray)
		{
			dateStorage.set({"dates": dateSet}, function(items){
				logger("info", "Stored dates", dateSet);
			});
		}
		else
		{
			throw new Error("Date object malformed");
		}
	}
	catch(e)
	{
		handleError("persistDatesToStorage", e);
	}
}

/**
Get settings from storage. Assumes a "settings" object and jWorkorder already exists on page. 
*/
function readSettingsFromStorage(previous, baton)
{

	var tmpSettings = getDefaultSettings();
		
		baton.take();
		
		settingsStorage.get("settings", function(items){
		
			//Overwrite default settings with stored ones where applicable.
			for (var i in items.settings)
			{
				tmpSettings[i] = items.settings[i];
			}
			
			settings = tmpSettings; 
			
			logger("info", "Settings", "Settings has been read");
			
			baton.pass(); //OK, pass the baton along
		   				
		});

}

/**
Get dates from storage. Assumes a "dates" object and jWorkorder already exists on page. 
*/
function readDatesFromStorage(previous, baton)
{
	//var tmpDates = {mainDateArray: [], subDateArray: [],dateNoteArray: [], dateColorArray: []}; 
			
		baton.take();
		
		dateStorage.get("dates", function(items){
		
			//Overwrite default settings with stored ones where applicable.
			for (var i in items.dates)
			{
				//console.log(i);
				dates[i] = items.dates[i];
				
			}
			
			logger("info", "Dates", "Dates has been read");
			
			baton.pass(); //OK, pass the baton along
		   				
		});
}

/**
Persist the given settings object
*/
function persistSettingsToStorage(tmpSettings) {
	
	try {
		if(tmpSettings.popup)
		{
			settingsStorage.set({"settings": tmpSettings}, function(items){
			
				logger("info", "Settings", "Settings has been written to storage");
		
			});
		}
	}
	catch(e)
	{
		handleError("persistSettingsToStorage", e);
	}
}

/**
Persist the given dates object
*/
function persistDatesToStorage(dateSet) {
	
	try {
		if(dateSet.mainDateArray && dateSet.subDateArray && dateSet.dateNoteArray && dateSet.dateColorArray)
		{
			dateStorage.set({"dates": dateSet}, function(items){
				logger("storage", "Stored dates", dateSet);
			});
		}
		else
		{
			throw new Error("Date object malformed");
		}
	}
	catch(e)
	{
		handleError("persistDatesToStorage", e);
	}
}