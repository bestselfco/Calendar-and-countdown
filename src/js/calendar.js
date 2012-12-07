/**
Front end variables
*/
var bg = chrome.extension.getBackgroundPage();

var now = new Date(); //Today
var currentYear = now.getUTCFullYear(); //This year, now with more UTC

var normalClass = "cal_td_day"; //The class for a normal day
var selectedClass = "cal_day_chosen"; //God knows
var selectedSubClass = "cal_subday_chosen";
var dynamicClass = "cal_day_dynamic";
var daysSelectString = "."+normalClass+",."+selectedClass+",."+selectedSubClass;
var dynamicStartStamp = false;
var dynamicDiff = false;
var lastEventDate = "";

var currentTodayTip;

//Init today time stamp
var todayStamp = Date.UTC(now.getFullYear(),now.getMonth(), now.getDate());

var notesArray = getNoteArray();

/**
Bootstrap page on load
*/
$(document).ready(function() {
	
	initPopupPage(currentYear);
	
});



/**
Initialize popup
 */
function initPopupPage(year)
{	
	//Display the calendar
	showCal(year);
		
	//Date specific update trigging.
	updateDatesStuff();	
	
	//Bind all events
	bindEvents();

	if(bg.settings.showBubbleOnStart)
	{
		showBubbleForToday();
	}
	//TO BE: POPUP Calendar on year links
	//addToolTipsToYearLinks();
}

/**
Bind all relevant events to their dom elements
*/
function bindEvents()
{
	$("body").off().on("keydown", function() { keyPressed(window.event.keyCode);});
	
	$("#lastYear").off().on("click", function() { yearClicked(-1); });
	$("#nextYear").off().on("click", function() { yearClicked(1); });
	
	$("#ym6").off().on("click", function() { yearClicked(-6); });
	$("#ym5").off().on("click", function() { yearClicked(-5); });
	$("#ym4").off().on("click", function() { yearClicked(-4); });
	$("#ym3").off().on("click", function() { yearClicked(-3); });
	$("#ym2").off().on("click", function() { yearClicked(-2); });
	$("#ym1").off().on("click", function() { yearClicked(-1); });
	
	$("#yp6").off().on("click", function() { yearClicked(6); });
	$("#yp5").off().on("click", function() { yearClicked(5); });
	$("#yp4").off().on("click", function() { yearClicked(4); });
	$("#yp3").off().on("click", function() { yearClicked(3); });
	$("#yp2").off().on("click", function() { yearClicked(2); });
	$("#yp1").off().on("click", function() { yearClicked(1); });
	
}

/**
Briefly show info box for today
*/
function showBubbleForToday()
{
	//todayStamp;
	
	var selectorString = '[dateTimestamp="'+todayStamp+'"]';
	
	var options = new Object();
	options.showDelay = 500;
	options.fadeIn = 300;
	options.fadeOut = 1000;
	
	currentTodayTip = Tipped.create(selectorString, function(element) {
		return getToolTip(todayStamp);
	}, options);
	
	currentTodayTip.show();
	
	setTimeout(hideBubbleForToday, bg.settings.todayBubbleShowTime);
	
}

function hideBubbleForToday(tip)
{
	currentTodayTip.hide();
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
	return bg.getSubDates();
}

/**
Set main date from time stamp and update all views
*/
function setMainDate(timestamp)
{	
	//Set date in background page	
	bg.toggleDate(timestamp, false);
	bg.maintain();
	highLightSelectedDates();		
}

/**
Set sub date from time stamp and update all views
*/
function setSubDate(timestamp)
{
	//Set date in background page	
	bg.toggleDate(timestamp, true);
	bg.maintain();
	highLightSelectedDates();
}

/**
Update date set from back end and start update of content when done
*/
function updateDatesStuff()
{
	
	//Refresh backgroudn page
	bg.maintain();
	
	//Update link to background page
	bg = chrome.extension.getBackgroundPage();
	
	notesArray = getNoteArray();
	
	//Bind clicks and mouseovers for dates - dialog on right click!
	$(daysSelectString).off().on("mouseenter", normalPopupShow).on("click", dayClicked).on("contextmenu", dayRightClickedDialog).on("mousedown", startDynamic);	

	//Highlight today
	highLightToday();
	
	//Update the selected date
	highLightSelectedDates();
	
}

function normalPopupShow(event)
{
	
	Tipped.create(event.originalEvent.target, function(element) {
		var timestamp = $(element).attr("datetimestamp");
		return getToolTip(timestamp);
	}, { skin: 'kvasbo', showDelay: '450'});
	
}

/**
Open dialog on right click
*/
function dayRightClickedDialog(event)
{	

	event.preventDefault();
		
	var timestamp = event.originalEvent.target.attributes["datetimestamp"].value;
	var target = event.originalEvent.target.id;
		
	lastEventDate = timestamp;
	
	var tip = Tipped.create("#popupProxy", document.getElementById("dateRightInputDialog"), { skin: 'kvasboRight', target: target, showDelay: '0', hideOthers: true, hideOn: 'click-outside', closeButton: true, showOn: false, onShow: updateRightClickToolTipMenu, onHide: resetRightClickToolTipMenu});
	
	tip.show();

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
		var nota = tmpNoteArray[i].note;

		outObj[thekey] = nota;
	}

	return outObj;
}

/**
Get note for a specific date
*/
function getNoteForDate(timestampNote)
{
	var tmpNotes = getNoteArray();
	var output = "";
	
	console.log("checking note for "+timestampNote);
	
	if(tmpNotes[timestampNote] != undefined)
	{
		console.log("Note found "+timestampNote);
		output = tmpNotes[timestampNote];
	}
	else {
		console.log("Note not found" + timestampNote);
		output = "";
	}
	
	return output;
	
}

/**
Return date as a localised string
*/
function getDateString(timestamp, long)
{

	date = new Date(timestamp*1);
	
	var day = date.getUTCDay();
	var month = date.getUTCMonth();
	var mDay = date.getUTCDate();
	var year = date.getUTCFullYear();

	//Get correct suffix
	lDay = (mDay%10);
	switch(lDay)
	{
	case 1:
		if(mDay > 20 || mDay < 10) sFix = chrome.i18n.getMessage("numberSt");
		else sFix = chrome.i18n.getMessage("numberTh");
		break;
	case 2:
		if(mDay > 20 || mDay < 10) sFix = chrome.i18n.getMessage("numberNd");
		else sFix = chrome.i18n.getMessage("numberTh");
		break;
	case 3:
		if(mDay > 20 || mDay < 10) sFix = chrome.i18n.getMessage("numberRd");
		else sFix = chrome.i18n.getMessage("numberTh");
		break;
	default:
		sFix = chrome.i18n.getMessage("numberTh");
	}

	var monthName = chrome.i18n.getMessage("mon"+(month+1)); 

	var dateString = "";

	if(long)
	{
		dateString = chrome.i18n.getMessage("fullDate", [ucFirst(chrome.i18n.getMessage("lday"+day)), monthName, mDay, sFix]);
	}
	else {
		
		var dateTemplate = bg.settings.dateFormatShort;
		dateString = dateTemplate.replace("mm",month+1);
		dateString = dateString.replace("yy",year);
		dateString = dateString.replace("dd",mDay);
		//var dateString = chrome.i18n.getMessage("shortDate", [month+1, mDay, year]);
		//var dateString = date.toLocaleDateString()
	}

	return dateString;

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
	
	setMainDate(timestamp);
		
	return false; //Kill propagation	
}


/**
The user has clicked a year link and we need to go to another year

@param offset Delta between clicked year and current view
 */
function yearClicked(offset){

	log("User event", "Year link clicked"); //Log
	currentYear = currentYear + offset; //Add offset to current year

	initPopupPage(currentYear);
	
}

/**
Highlight today
*/
function highLightToday()
{
	highLightDay(todayStamp, 'cal_day_today');
}

/**
Highlight a specific day, remove other hightlights
*/
function highLightDay(timestamp, highlightClass)
{	
	var selectorString = '[dateTimestamp="'+timestamp+'"]';
	$(selectorString).addClass(highlightClass); //.removeClass(normalClass);
	log("Hightlight day", highlightClass + " : " +selectorString);
}

/**
Highlights the chosen dates, from loaded value 
*/
function highLightSelectedDates(){
	
	//Remove all highlighted days
	removeHighLights();

	var subdates = getSubDates()
	
	//Sub days
	$.each(subdates, function(key, value){
		
		//log("Labelling sub day", value);
		highLightDay(value, selectedSubClass);
		
	});
	
	// custom colors
	customColors = bg.dateColorArray;
	for(i=0;i<customColors.length;i++)
	{
		var timestamp = customColors[i].timestamp;
		var color = customColors[i].color;
		log(timestamp,color);
		var selectorString = '[dateTimestamp="'+timestamp+'"]';
		$(selectorString).css("background-color", color);
	}
	
	//Main date (last, to be the most important!
	var mainDate = getMainDate();
	highLightDay(mainDate, selectedClass);
		
}

/**
Remove all highlights
*/
function removeHighLights()
{
	//Remove all modifications made by jQuery
	$(daysSelectString).removeClass(selectedSubClass).removeClass(selectedClass).css("background-color", "");

	log("Css change", "Removed highlights");
}

/**
Highlights the chosen dates, from loaded value 
*/
function Calendar(year, month)
{
//	log("Creating calendar", year+"-"+month);
	
	//Functions
	this.getCal = calGetCal;
	//this.genCal = calGetCal;

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
//function returnCalendar()
//{
//	return this.genCal();
//}

/**
Return the actual calendar html
*/
function calGetCal(template)
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

	var thisCalOutHtml = template;

	//New home made str_replace version
	var replaceString;
	
	$.each(this.outVars, function(key, value){
		
		replaceString = "${"+key+"}";
		
		thisCalOutHtml = thisCalOutHtml.replace(replaceString,value);
		
	});
		
	myregexp = new RegExp(/\${[a-zA-Z0-9_-]*}/gi);
	
	thisCalOutHtml = thisCalOutHtml.replace(myregexp, "");
	
	return thisCalOutHtml;
}

/**
Create a calendar
*/
function showCal(year)
{	
	//Init and default for week start day
	var firstDay = bg.settings.firstDay; //getItem("firstDay");
	if(firstDay != "1" && firstDay != "0")
	{
		firstDay = "1";
		bg.settings.firstDay = firstDay; 
		bg.persistSettingsToStorage();
	}

	firstDayOfWeek = firstDay;

	populate12MonthsFrom(year, 1, "month", monthTemplate); //this year from january

	populateYearLinks();

	//Initialize and default for showing week number
	var showWeek = bg.settings.showWeek; //getItem("showWeek");
	if(showWeek != "1" && showWeek != "0"){
		showWeek = "1";
		bg.settings.showWeek = showWeek; //setItem("showWeek", 1);
		bg.persistSettingsToStorage();
	}
	if(showWeek == "0") $(".cal_weekblock").hide();
	
	//Highlight the current day
	highLightToday();
}

/**
Create 12 separate monthly calendars //monthTemplate
*/
/*
function populateYear(year, selectstring, template)
{
	//Populate
	for(var i = 1; i < 13; i++)
	{
		var selectString = "#"+selectstring;
		if(i<10) selectString += "0";
		selectString += i;
		$(selectString).html(new Calendar(year,i).getCal(template));
	}
}
*/

function populate12MonthsFrom(year, month, selectstring, template)
{
	for(var i = 1; i < 13; i++)
	{
		var selectString = "#"+selectstring;
		if(i<10) selectString += "0";
		selectString += i;
		
		var tmpDate = new Date(year, month-2+i, 1);
		
		var tyear = tmpDate.getFullYear();
		var tmonth = tmpDate.getMonth()+1;
		
		$(selectString).html(new Calendar(tyear,tmonth).getCal(template));
		
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
