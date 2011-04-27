var now = new Date(); //Today
var currentYear = now.getFullYear(); //This year
var firstDayOfWeek = 1; //Default value
var oldId = 0; //Get countdown value
var selectorClass = "cal_day_chosen"; //The class for the selected day
var normalClass = "cal_td_day"; //The class for a normal day
var selectedClass = "."+"cal_day_chosen"; //God knows
var googleID = "caplfhpahpkhhckglldpmdmjclabckhc"; //For turning on/off logging
var extVersion = 0; //Get extension version - for logging

/**
 * Initialize popup
 */
function init()
{	
	
	oldId = getItem("countto"); //Get the preselected date
	
	//Display the calendar
	showCal(currentYear);

	//Add all the tooltips
	addToolTipsToAllDays();

	initCssChanges();
	
	//Update the selected date
	highLightSelectedDate();
	
	//Start update loop
	updateOnTime();

	//Have forgotten what this does. 
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
 * category, action, opt_label
 */
function googleTrack(category, action, details)
{	
	log("Googletrack", category+": "+action+": "+details);
	chrome.extension.sendRequest({action: "trackEvent", event_type:category, event_action:action, event_details:details});
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
	highLightDay(oldId);
}



/**
 * Set the badge to a countdown value. Also updates the color from memory.
 * 
 * @param text The new badge text
 */
function setBadge(text)
{
	text = text.toString();
	var color = getItem("badgeColor");
	color = HexToRGB(color);

	var showBadge = getItem("showBadge");
	
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

//Hides/removes all tool tips from the DOM
function removeAllToolTips() {
	$(".tooltip").fadeOut("fast");
}

//Get countdown days
function getDistanceInDays()
{
	var countto = getItem("countto");
	if(countto != null)
	{
		try {
			var badgeDate = new Date((countto*1)+86400000); //Stupid casting
			var diff = Math.abs(badgeDate.getDaysFromToday());

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
			log(err);
			return null;
		}
	}
	else{
		return "";
	}
}

//Create a calendar
function showCal(year)
{	
	//Init and default for week start day
	var firstDay = getItem("firstDay");
	if(firstDay != "1" && firstDay != "0")
	{
		firstDay = "1";
		setItem("firstDay", firstDay);
	}

	firstDayOfWeek = firstDay;

	populateYear(year,"month"); //this year

	populateYearLinks();

	//Initialize and default for showing week number
	var showWeek = getItem("showWeek");
	if(showWeek != "1" && showWeek != "0"){
		showWeek = 1;
		setItem("showWeek", 1);
	}
	if(showWeek == "0") $(".cal_weekblock").hide();
	
	//Highlight the current day
	highLightToday();
}

//Create 12 separate monthly calendars
function populateYear(year, selectstring)
{
	//Populate
	for(var i = 1; i < 13; i++)
	{
		var selectString = "#"+selectstring;
		if(i<10) selectString += "0";
		selectString += i;
		$(selectString).html(new Calendar(year,i).getCal());
	}
}