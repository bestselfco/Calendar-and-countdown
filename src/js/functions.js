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
        
        default: 
            if(debug) console.log(time.toLocaleTimeString(), "(old)  ", cat, ":", text);
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