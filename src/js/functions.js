var now = new Date(); //Today
var currentYear = now.getFullYear(); //This year
var firstDayOfWeek = 1; //Default value
var daysInYear = 365; //Default value 
var oldId = getItem("countto"); //Get the preselected date
var selectorClass = "cal_day_chosen"; //The class for the selected day
var normalClass = "cal_td_day"; //The class for a normal day
var selectedClass = "."+"cal_day_chosen"; //God knows
var googleID = "caplfhpahpkhhckglldpmdmjclabckhc"; //For turning on/off logging
var extVersion = getVersion(); //Get extension version - for logging

/**
 * Initialize popup
 */
function init()
{	
	
	//Display the calendar
	showCal(currentYear);

	//Add all the tooltips
	addToolTipsToAllDays();

	//Update the selected date
	highLightSelectedDate();
		
	//Start update loop
	updateOnTime();
	
	$(".cal_td_day").bind('mouseenter mouseleave', function() {
 		 removeAllToolTips();
	});
	
	//Kill all popups. This is a stupid hack.
	var t=setTimeout("removeAllToolTips()",5);

}


/**
 * Show a year
 * 
 * @param year Which year to show
 */
function showCal(year)
{
	var showWeek = window.localStorage.getItem("showWeek");
	populateYear(year,"month"); //this year
	populateYearLinks(); //Populate year links


	$("#yearLabel").html(year);

	if(showWeek != "1" && showWeek != "0"){
		showWeek = 1;
		window.localStorage.setItem("showWeek", 1);
	}

	if(showWeek == "0") $(".cal_weekblock").hide();
}

/**
 * The update loop
 */
function updateOnTime()
{
	//In a second, run myself. 
	var t=setTimeout("updateOnTime()",1000); 
}


/**
 * Add the links to the link bar
 */
function populateYearLinks()
{
	$("#yearLabel").html(currentYear);
	$("#ym6").html(currentYear-6);
	$("#ym1").html(currentYear-1);
	$("#ym2").html(currentYear-2);
	$("#ym3").html(currentYear-3);
	$("#ym4").html(currentYear-4);
	$("#ym5").html(currentYear-5);
	$("#yp1").html(currentYear+1);
	$("#yp2").html(currentYear+2);
	$("#yp3").html(currentYear+3);
	$("#yp4").html(currentYear+4);
	$("#yp5").html(currentYear+5);
	$("#yp6").html(currentYear+6);
	
}

/**
 * The user has clicked a year link and we need to go to another year
 * 
 * @param offset Delta between clicked year and current view
 */
function yearClicked(offset){
	
	log("User event", "Year link clicked"); //Log
	currentYear = currentYear + offset; //Add offset to current year
	showCal(currentYear); //Show the new calendar
	highLightSelectedDate(); //Highlight selected date

	addToolTipsToAllDays(); //Add all tooltips. 

}

/**
 * Keyboard controls
 * 
 * @param key ID of the pressed key
 */
function keyPressed(key) {

	if(key == 37 || key == 40) { // down or right
		yearClicked(-1);
	}
	else if(key == 39 || key == 38) { // up or left
		yearClicked(1);
	}
}

/**
 * Send event to Google Analytics
 * 
 * @param event Main event description
 * @param details Any details
 */
function googleTrack(event, details)
{	
	log("Googletrack", event+": "+details);
	chrome.extension.sendRequest({action: "trackEvent", event_type:event, event_details:details});
}


/**
 * Output to log if "debug" is true
 * 
 * @param cat Logging category
 * @param text Text to log
 */
function log(cat, text)
{
	if(location.hostname != googleID) //Only if local, not if proper
	{
		var time = new Date();
		console.log(time.getHours()+":"+time.getMinutes()+":"+time.getSeconds() + " " + cat + ": " + text);
	}
}

/**
 * Highlights the chosen date, from loaded value
 */
function highLightSelectedDate(){
	highlightDay(oldId);
}

/**
 * Set the badge to a countdown value. Also updates the color
 * 
 * @param text The new badge text
 */
function setBadge(text)
{
	text = text.toString();
	var color = getItem("badgeColor");
	color = HexToRGB(color);
	chrome.browserAction.setBadgeBackgroundColor({color:color});
	chrome.browserAction.setBadgeText({text:text});

}

/**
 * Set the icon in the browser bar
 * 
 * @param color The color of the icon. Must be matched by file in pics directory
 */
function setIcon(color)
{
	var path = "pics/icon_19_"+color+".png";
	chrome.browserAction.setIcon({path:path});
}

/**
 * Set the tooltip.
 * 
 * @param text Tooltip text
 */
function setToolTip(text)
{
	text = text.toString();
	
	chrome.browserAction.setTitle({title:text});

}

/**
 * Switch the popup file
 * 
 * @param p The ID of the popup file
 */
function setPopup(p)
{
	var page = "popup_12.html";
	
	if(p == "3") page = "popup_3.html";
		
	chrome.browserAction.setPopup({popup:page});
}

//Somebody has clicked a date
function dayClicked(timestamp, force)
{
	oldId = getItem("countto");
		
	var idDate = new Date(timestamp+86400000);
	var diff = Math.abs(idDate.getDaysFromToday());
	
	if(oldId == timestamp)
	{
		//Unselect all
		removeHighLights();
		log("Same day", timestamp);
		setBadge("");
		setItem("countto", "null");
	}
	else
	{
		log("New day", timestamp);
		setItem("countto", timestamp);	
		setBadge(diff.toString());
		highlightDay(timestamp);
	}
	
	oldId = getItem("countto"); //Set the memory item as well
	
	googleTrack("Calendar event", "Day clicked");
	
	//Redo tooltips
	init();	
	
}


//Highlight a specific day, remove other hightlights
function highlightDay(timestamp)
{	
	var selectorNew = "#cal_day_"+timestamp;
	//Unselect all
	removeHighLights();
	$(selectorNew).removeClass(normalClass).addClass(selectorClass);
	
}

//Remove all highlights
function removeHighLights()
{
	$(selectedClass).addClass(normalClass).removeClass(selectorClass);
}

//Hides/removes all tool tips from the DOM
function removeAllToolTips() {
	$(".tooltip").fadeOut("fast");
	//$(".tooltip").remove(); //remove tool tips
}

//Get version of extension
function getVersion() {
    var version = 'NaN';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL('manifest.json'), false);
    xhr.send(null);
    var manifest = JSON.parse(xhr.responseText);
    var currVersion = manifest.version;
    
    // Check if the version has changed.
  	var prevVersion = getItem("version");
  	if (currVersion != prevVersion) {
    	// Check if we just installed this extension.
    	if (typeof prevVersion == 'undefined') {
      		googleTrack("New install", currVersion);
    	} else {
      		googleTrack("Update", currVersion);
   		}
   		setItem("version", currVersion);
  	}
    log("Version", currVersion);
    return currVersion;
}



