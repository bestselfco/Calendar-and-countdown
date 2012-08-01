/**
Front end variables
*/
var bg = chrome.extension.getBackgroundPage();

var normalClass = "cal_td_day"; //The class for a normal day
var selectedClass = "cal_day_chosen"; //God knows
var selectedSubClass = "cal_subday_chosen";
var dynamicClass = "cal_day_dynamic";
var daysSelectString = "."+normalClass+",."+selectedClass+",."+selectedSubClass;
//var datesFrontEnd = new Array();
//var subDatesFrontEnd = [];
var dynamicStartStamp = false;
var dynamicDiff = false;

/**
Bootstrap page on load
*/
$(document).ready(function() {
	initPopupPage();
	bindEvents();
});

/**
Initialize popup
 */
function initPopupPage()
{	
	//Display the calendar
	showCal(currentYear);
		
	//Date specific update trigging.
	updateDatesStuff();	
}

/**
Bind all relevant events to their dom elements
*/
function bindEvents()
{
	$("body").on("keydown", function() { keyPressed(window.event.keyCode);});
	
	$("#lastYear").on("click", function() { yearClicked(-1); });
	$("#nextYear").on("click", function() { yearClicked(1); });
	
	$("#ym6").on("click", function() { yearClicked(-6); });
	$("#ym5").on("click", function() { yearClicked(-5); });
	$("#ym4").on("click", function() { yearClicked(-4); });
	$("#ym3").on("click", function() { yearClicked(-3); });
	$("#ym2").on("click", function() { yearClicked(-2); });
	$("#ym1").on("click", function() { yearClicked(-1); });
	
	$("#yp6").on("click", function() { yearClicked(6); });
	$("#yp5").on("click", function() { yearClicked(5); });
	$("#yp4").on("click", function() { yearClicked(4); });
	$("#yp3").on("click", function() { yearClicked(3); });
	$("#yp2").on("click", function() { yearClicked(2); });
	$("#yp1").on("click", function() { yearClicked(1); });
	
}

function setMainDateFromPopup(event)
{
	console.log(event);
}

/**
Return the main date (the one we count down to)
*/
function getMainDate()
{
	var tmp = bg.getDates();
	return tmp[0];
}

/**
Return the subsidiary dates (the ones we just show)
*/
function getSubDates()
{
	return bg.getSubDates(); // AttributereaksubDatesFrontEnd;
}

/**
Set main date from time stamp and update all views
*/
function setMainDate(timestamp)
{
	
	//datesFrontEnd[0] = timestamp;
	
	//Set date in background page
	bg.toggleDate(timestamp, false);
	
	//Refresh front end with new data
	updateDatesStuff();	
	
	//highLightSelectedDates();
	
	/*
	chrome.extension.sendRequest({action: "toggleDate", event_details:timestamp}, function(response) {
		 
		 var dates = JSON.parse(response.datesJSON);
		 
		 log("Date set: ", dates);
		 
		 datesFrontEnd[0] = timestamp;
		 		 
		 updateDatesStuff();	
	
		 highLightSelectedDates();
	});
	*/
}



/**
Update date set from back end and start update of content when done
*/
function updateDatesStuff()
{
	var dates;
	var subdates;
	
	//Refresh backgroudn page
	bg.maintain();
	
	//Update link to background page
	bg = chrome.extension.getBackgroundPage();
	
	//Set subdates
	subdates = bg.getSubDates();
	
	/*
	chrome.extension.sendRequest({action: "getSubDates"}, function(response) {
 		 subdates = JSON.parse(response.datesJSON);
 		 log("Sub dates receieved", subdates);
 		 subDatesFrontEnd = subdates;
	});
	*/
	
//	dates = bg.getDates();
//	datesFrontEnd[0] = dates[0];

	/*
	chrome.extension.sendRequest({action: "getDates"}, function(response) {
 		 dates = JSON.parse(response.datesJSON);
 		 datesFrontEnd[0] = dates[0];
	 	 updateDatesStuffDo();
	});
	*/
	
		//Bind clicks - dialog on right click!
		$(daysSelectString).off().on("click", dayClicked).on("contextmenu", dayRightClickedDialog).on("mousedown", startDynamic);
	
		//Add all the tooltips
		addTippedTooltips();
	
		//Highlight today
		highLightToday();
		
		//Update the selected date
		highLightSelectedDates();
	
		bg.maintain();
	
		//chrome.extension.sendRequest({action:"refresh"});
	
		//updateDatesStuffDo();
	
}


/**
Retrieve note for a given date from backend
*/
function getNoteArray()
{
	var tmpNoteArray = bg.dateNoteArray;
	var outObj = new Object;
	
	for(i = 0; i < tmpNoteArray.length; i++)
	{
		var thekey = tmpNoteArray[i].timestamp.toString();
		var note = tmpNoteArray[i].note;
		//console.log(key);
		outObj[thekey] = note;
	}
	
	return outObj;
}

/**
Get note for a specific date
*/
function getNoteForDate(timestamp)
{
	var tmpNotes = getNoteArray();
	
	//console.log(tmpNotes);
	//console.log(timestamp);
	
	if(tmpNotes[timestamp] !== undefined)
	{
		return tmpNotes[timestamp];
	}
	else {
		return null;
	}
}

/**
 Show a year
  
 @param year Which year to show
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
Start the dynamic counter
*/
function startDynamic(event)
{
	Tipped.hide(daysSelectString); //Hide all tool tips
	
	$(daysSelectString).on("mouseenter", updateDynamic); //Add mouseenter event for days
	$("*").on("mouseup", endDynamic); //Add mouseup event for all (to end on end of click, also outside specific days)
	
	dynamicStartStamp = event.target.attributes["datetimestamp"].value * 1;
}

/**
Update the dynamic counter
*/
function updateDynamic(event){
	
	//Only run if start point is set. Should not be available, but you never know!
	if(dynamicStartStamp !== false)
	{
		var currentStamp = event.target.attributes["datetimestamp"].value * 1;
	
		//Get diff
		dynamicDiff = currentStamp - dynamicStartStamp;
		
		//Find increment: minus or plus
		var increment = (dynamicDiff > 0) ? 86400000 : -86400000;
		
		//Remove dynamic class from all days
		$(daysSelectString).removeClass(dynamicClass);
		
		//Go through all points between current and start, add class
		var iterations = 0;
		for(i=dynamicStartStamp; i != (currentStamp + increment); i = i + increment)
		{
			iterations++;
			
			if(iterations>366) break; //Safeguard against misses
			
			//Add class
			var selectorString = '[dateTimestamp="'+i+'"]';
			$(selectorString).addClass(dynamicClass);
		}
		
	}
	
}

/**
End and unset the dynamic counter
*/
function endDynamic(event){
	
	Tipped.hide(daysSelectString); //Hide all tool tips
	
	//Unbind events from all events
	$("*").off("mouseup", endDynamic).off("mouseenter", updateDynamic);
	
	//Remove dynamic class from all days
	$(daysSelectString).removeClass("cal_day_dynamic");
	
	//Unset start point for dynamic counter
	dynamicStartStamp = false;
	dynamicDiff = false;
	
}

/**
Add a note to a date via the BG page and reload stuff as usual.
*/
function addNoteToDate(timestamp, note)
{
	bg.setNoteForDate(timestamp, note, false);
}

/**
Clear a note from a date
*/
function clearNoteFromDate(timestamp)
{
	bg.setNoteForDate(timestamp, "", true);
}

/**
New version when somebody has clicked a date. Uses attribute instead of passing value by function.
*/
function dayClicked(event)
{
	var timestamp = event.target.attributes["datetimestamp"].value;
	
	
	log("Day clicked", timestamp);
	
	setMainDate(timestamp);
	
	/*
		chrome.extension.sendRequest({action: "toggleDate", event_details:timestamp},	function(response) {
 		 
 		 var dates = JSON.parse(response.datesJSON);
 		 
 		 log("Date set: ", dates);
 		 
 		 setMainDate(dates[0]);
 		 
 		 updateDatesStuff();	
	
		 highLightSelectedDates();
	});
	*/
		
	return false; //Kill propagation
	
}

/**
Open dialog on right click
*/
function dayRightClickedDialog(event)
{	
	event.preventDefault();
	var timestamp = event.target.attributes["datetimestamp"].value;
//	var dialogDate = new Date(timestamp*1);
//	var title = dialogDate.toUTCString();
	
	//Set attribute for tooltip div in html page
	$("#dateRightInputDialog").attr("dialogdatetimestamp", timestamp);
			
	//Tipped.hideAll(); //Hide all tool tips
	
	//Move proxy div to right position
	var p = $(event.target).offset();	
	$("#popupProxy").css("display", "block").css("top", p.top).css("left", p.left);
	
	//Get tip for proxy
	var tempTip = Tipped.get('#popupProxy');
	
	//Show tip for proxy
	tempTip.show();
		
	return false; //Kill propagation
}

/**
TEMP! Set sub dates on right click.
*/
/*
function dayRightClicked(event)
{
	
	event.preventDefault();

	var timestamp = event.target.attributes["datetimestamp"].value;
	
	log("Day clicked (right)", timestamp);
	
	chrome.extension.sendRequest({action: "toggleDateRightClick", event_details:timestamp}, function(response) {
 		 log("Sub dates set");
	});
	
	updateDatesStuff();
	highLightSelectedDates();
		
	return false; //Kill propagation
}

*/

/**
The user has clicked a year link and we need to go to another year

@param offset Delta between clicked year and current view
 */
function yearClicked(offset){

	log("User event", "Year link clicked"); //Log
	currentYear = currentYear + offset; //Add offset to current year
	showCal(currentYear); //Show the new calendar
	updateDatesStuff();
	
}

/**
Highlight today
*/
function highLightToday()
{
	var today = new Date();
	today.setUTCSeconds(0, 0);
	today.setUTCMinutes(0);
	today.setUTCHours(0);
	
	//var todayUtc = CCDateToday();
	
	var selectorString = '[dateTimestamp="'+today.getTime()+'"]';
	$(selectorString).addClass("cal_day_today");
}

/**
Highlight a specific day, remove other hightlights
*/
function highLightDay(timestamp, highlightClass)
{	

	var selectorString = '[dateTimestamp="'+timestamp+'"]';
	
	$(selectorString).addClass(highlightClass); //.removeClass(normalClass);

	log("Css change", highlightClass + " " +selectorString);

}

/**
Highlights the chosen dates, from loaded value 
*/
function highLightSelectedDates(){
	
	//Remove all highlighted days
	removeHighLights();
	
	var mainDate = getMainDate();
	
	highLightDay(mainDate, selectedClass);
	
	var subdates = getSubDates()
	
	//Sub days
	$.each(subdates, function(key, value){
		
		//log("Labelling sub day", value);
		highLightDay(value, selectedSubClass);
		
	});
	
	//Set custom colors
	customColors = bg.dateColorArray;
	for(i=0;i<customColors.length;i++)
	{
		var timestamp = customColors[i].timestamp;
		var color = customColors[i].color;
		log(timestamp,color);
		var selectorString = '[dateTimestamp="'+timestamp+'"]';
		$(selectorString).css("background-color", color);
	}
		
}

/**
Remove all highlights
*/
function removeHighLights()
{
//	var selectorStringSub = "."+selectedSubClass;
//	var selectorStringMain = "."+selectedClass;
	
//	$(selectorStringSub).removeClass(selectedSubClass);
//	$(selectorStringMain).removeClass(selectedClass);

	$(daysSelectString).removeClass(selectedSubClass).removeClass(selectedClass).css("background-color", "");

	log("Css change", "Removed highlights");
}

/**
Highlights the chosen dates, from loaded value 
*/
function Calendar(year, month)
{
	log("Creating calendar", year+"-"+month);
	
	//Functions
	this.getCal = calGetCal;
	this.genCal = calGetCal;

	//working variables
	this.year = year;
	this.month = month;
	this.workMonth = month-1;
	
	this.workDate = new Date(Date.UTC(year,this.workMonth,1));
	
	this.startStamp = Date.UTC(year,this.workMonth,1);
	
	this.offSet = this.workDate.getTimezoneOffset();
	
	this.outVars = new Object();
	
}	

/**
Return cached if it exists, otherwise return calendar
*/
function returnCalendar()
{
	return this.genCal();
}

/**
Return the actual calendar html
*/
function calGetCal()
{
	
	//Set month name
	this.outVars.monthName = ucFirst(chrome.i18n.getMessage("mon"+this.month));

	//Set week header value
	this.outVars.weekShortName = chrome.i18n.getMessage("weekHeader");

	//Set day names
	if(firstDayOfWeek == 0) {
		this.outVars.day0_ShortName = chrome.i18n.getMessage("sday0");
		this.outVars.day1_ShortName = chrome.i18n.getMessage("sday1");
		this.outVars.day2_ShortName = chrome.i18n.getMessage("sday2");
		this.outVars.day3_ShortName = chrome.i18n.getMessage("sday3");
		this.outVars.day4_ShortName = chrome.i18n.getMessage("sday4");
		this.outVars.day5_ShortName = chrome.i18n.getMessage("sday5");
		this.outVars.day6_ShortName = chrome.i18n.getMessage("sday6");
	}
	else {
		this.outVars.day0_ShortName = chrome.i18n.getMessage("sday1");
		this.outVars.day1_ShortName = chrome.i18n.getMessage("sday2");
		this.outVars.day2_ShortName = chrome.i18n.getMessage("sday3");
		this.outVars.day3_ShortName = chrome.i18n.getMessage("sday4");
		this.outVars.day4_ShortName = chrome.i18n.getMessage("sday5");
		this.outVars.day5_ShortName = chrome.i18n.getMessage("sday6");
		this.outVars.day6_ShortName = chrome.i18n.getMessage("sday0");
	}

	var startWeek = this.workDate.getWeek(1);
	var startWeekDay = this.workDate.getUTCDay();

	//log("Workdate: ", this.workDate)
	
	var tabWidth = 8;

	if(!this.showWeekNumber) tabWidth = 7;

	var tmpWeek = startWeek;
	var currentWeek = 0;

	//	Screw rules, hard code instead. This is Monday first.
	if(firstDayOfWeek == 1)
	{
		switch(startWeekDay)
		{
		case 0:
			tmpWeek = tmpWeek - 1;
			if(tmpWeek == 0) tmpWeek = 52; //Will fail in some years
			days = 6;
			break;

		case 1:
			days = 0;
			break;

		case 2:
			days = 1;
			break;

		case 3:
			days = 2;
			break;

		case 4:
			days = 3;
			break;

		case 5:
			days = 4;
			break;

		case 6:
			days = 5;
			break;

		}
	}
	else //Start on sunday.
	{
		switch(startWeekDay)
		{
		case 0:
			tmpWeek = tmpWeek - 1;
			if(tmpWeek == 0) tmpWeek = 52; //Will fail in some years
			days = 0;
			break;

		case 1:
			days = 1;
			break;

		case 2:
			days = 2;
			break;

		case 3:
			days = 3;
			break;

		case 4:
			days = 4;
			break;

		case 5:
			days = 5;
			break;

		case 6:
			days = 6;
			break;

		}
	}

	//First week shown for month
	this.outVars.w_0 = tmpWeek;

	//	The actual day adder code
	for(var i = 0; i < this.workDate.getDaysInMonth(); i++)
	{
		var dayStamp = this.startStamp + (i * 86400000);
		var tmpDate = new Date(dayStamp);

		if(days==7)
		{	
			currentWeek++;
			this.outVars["w_"+currentWeek] = tmpDate.getWeek(1);
			days = 0;
		}

		this.outVars["d_stamp_"+currentWeek+"_"+days] = dayStamp;
		this.outVars["d_content_"+currentWeek+"_"+days] = i+1;
		this.outVars["d_class_"+currentWeek+"_"+days] = "cal_td_day";
		this.outVars["d_id_"+currentWeek+"_"+days] = dayStamp;

		days++;
	}

	//console.log(this.outVars);

	// Old template solution
	//var thisCalOut = $.tmpl( "monthTemplate", this.outVars ) ;

	var thisCalOutHtml = monthTemplate;

	//New home made str_replace version
	//log("OutVars", this.outVars);
	var replaceString;
	
	$.each(this.outVars, function(key, value){
		
		replaceString = "${"+key+"}";
		
		thisCalOutHtml = thisCalOutHtml.replace(replaceString,value);
		
		//log(replaceString, value);
	});
	
	//   /\${[a-zA-Z0-9_-]*}/gi
	
	myregexp = new RegExp(/\${[a-zA-Z0-9_-]*}/gi);
	
	thisCalOutHtml = thisCalOutHtml.replace(myregexp, "");
	
	
	
	//var thisCalOutHtml = $(thisCalOut).clone()[0].outerHTML;
	
	
	
	return thisCalOutHtml;
}

/**
Create a calendar
*/
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

/**
Create 12 separate monthly calendars
*/
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



/**
Add the links to the link bar
 */
function populateYearLinks()
{
	$("#ym6").html(currentYear-6);
	$("#ym1").html(currentYear-1);
	$("#ym2").html(currentYear-2);
	$("#ym3").html(currentYear-3);
	$("#ym4").html(currentYear-4);
	$("#ym5").html(currentYear-5);
	$("#yearLabel").html(currentYear);
	$("#yp1").html(currentYear+1);
	$("#yp2").html(currentYear+2);
	$("#yp3").html(currentYear+3);
	$("#yp4").html(currentYear+4);
	$("#yp5").html(currentYear+5);
	$("#yp6").html(currentYear+6);

}

/**
Keyboard controls

@param key ID of the pressed key
*/
function keyPressed(key) {

	if(key == 37 || key == 40) { // down or right
		yearClicked(-1);
	}
	else if(key == 39 || key == 38) { // up or left
		yearClicked(1);
	}
}
