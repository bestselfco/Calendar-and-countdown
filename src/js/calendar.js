/**
Front end variables
*/
var bg = chrome.extension.getBackgroundPage();

//Empty object for settings
var settings = {};
var dates = {};

var now = new Date(); //Today
var currentYear = now.getUTCFullYear(); //This year, now with more UTC
var currentMonth = now.getUTCMonth() + 1;

var normalClass = "cal_td_day"; //The class for a normal day
var selectedClass = "cal_day_chosen"; //God knows
var selectedSubClass = "cal_subday_chosen";
var dynamicClass = "cal_day_dynamic";

var yearButtonFullClass = "thisyear";
var yearButtonHalfClass = "thisyearhalf";
var yearButtonThirdClass = "thisyearthird";

var daysSelectString = "."+normalClass+",."+selectedClass+",."+selectedSubClass;
var dynamicStartStamp = false;
var dynamicDiff = false;
var lastEventDate = "";

var showFromStart = bg.settings.showFrom;

var showingFromMonth;
var showingFromYear; 

var runningMouseWheelCounter = 0;
var runningMouseWheelTimer;

var currentTodayTip;

//Init today time stamp
var todayStamp = Date.UTC(now.getFullYear(),now.getMonth(), now.getDate());

//var notesArray = getNoteArray();

/**
Bootstrap page on load
*/
$(document).ready(function() {
	
	try {
		initCalendarPageStart();	
	}
	catch(e)
	{
		handleError("Calendar, Documentready", e);
	}
	
});

function initCalendarPageStart()
{
	calStartup = jWorkflow.order(readSettingsFromStorage).andThen(readDatesFromStorage).andThen(initCalendarPage).andThen(trackCalendarStart);
	calStartup.start();		
}

function updateCalendarPageStart()
{
	calUpdate = jWorkflow.order(readSettingsFromStorage).andThen(readDatesFromStorage).andThen(updateDatesStuff);
	calUpdate.start();
}

function initCalendarPage() {
	
	//Find first month to show. Defaults to January
	var startMonth = 1;	
	if(showFromStart == 3 && settings.popup == 12) { startMonth = currentMonth }
	else if(showFromStart == 2 && settings.popup == 12) { startMonth = getStartMonthForQuarter(currentMonth);}
	
	initPopupPage(currentYear, startMonth);
	
}

function trackCalendarStart() {
	//Track a page view
	trackPageView("/calendar/"+settings.popup);
}

/**
Initialize popup
 */
function initPopupPage(year, month)
{	
	try {
		//Load CSS
		loadjscssfile("css/colors.css", "css");
	
		//Display the calendar
		showCal(year, month);
	
		//Bind all events
		bindEvents();
	
		if(settings.showBubbleOnStart)
		{
			showBubbleForToday();
		}
	}
	catch(e)
	{
		handleError("Calendar, initPopupPage", e);
	}
}

/**
Bind all relevant events to their dom elements
*/
function bindEvents()
{
	
	try {
		$("body").off().on("keydown", function() { keyPressed(window.event.keyCode);});	
		$("#ym6").off().on("click", function() { yearClicked(event); });
		$("#ym5").off().on("click", function() { yearClicked(event); });
		$("#ym4").off().on("click", function() { yearClicked(event); });
		$("#ym3").off().on("click", function() { yearClicked(event); });
		$("#ym2").off().on("click", function() { yearClicked(event); });
		$("#ym1").off().on("click", function() { yearClicked(event); });
		$("#yearLabel").off().on("click", function() { yearClicked(event); });
		$("#yp6").off().on("click", function() { yearClicked(event); });
		$("#yp5").off().on("click", function() { yearClicked(event); });
		$("#yp4").off().on("click", function() { yearClicked(event); });
		$("#yp3").off().on("click", function() { yearClicked(event); });
		$("#yp2").off().on("click", function() { yearClicked(event); });
		$("#yp1").off().on("click", function() { yearClicked(event); });
		
		//Test scroll wheel
		if (settings.popup == 12) {
			document.addEventListener("mousewheel", MouseWheelHandler, false);
		}
		
		chrome.storage.onChanged.addListener(function(changes, namespace) {
		  
		  updateCalendarPageStart(); //Run maintenance whenever storage has changed for some reason
		  logger("info", "Cal maintenance", "Run because of storage change");
		  
		});
		
	}
	catch(e)
	{
		handleError("Calendar.js bindEvents" ,e);
	}
	
}

/**
Handle mouse wheel for scrolling
*/
function MouseWheelHandler(e)
{
	try {
		//Move threshold
		var threshold = 300;
		
		//Remove existing timeout
		clearTimeout(runningMouseWheelTimer);
		
		//Add new timeout
		runningMouseWheelTimer = window.setTimeout(mouseWheelReset, 400);
		
		//Get delta for this event
		var delta = e.wheelDelta;
		var isNegative = (delta < 0) ? true : false;
	
		//Add delta to current value
		runningMouseWheelCounter += delta;
		
		if(Math.abs(runningMouseWheelCounter) > threshold)
		{
			runningMouseWheelCounter = 0; //Reset
			
			if(!isNegative)
			{
				shiftCalendarByMonths(-4);
			}
			else {
				shiftCalendarByMonths(4);
			}
		}
		
		//log("Mousewheel", delta + " " + runningMouseWheelCounter);
		
		return false;
	
	}
	catch(err)
	{
		handleError("Calendar.js MouseWheelHandler", err);
	}
	
}

/**
Reset mouse wheel counter
*/
function mouseWheelReset()
{
	//log("Mousewheel", "Resetting counter");
	runningMouseWheelCounter = 0;
}

/**
Briefly show info box for today
*/
function showBubbleForToday()
{
		try {
		var selectorString = '[dateTimestamp="'+todayStamp+'"]';
		
		var options = new Object();
		options.showDelay = 500;
		options.fadeIn = 300;
		options.fadeOut = 1000;
		
		currentTodayTip = Tipped.create(selectorString, function(element) {
			return getToolTip(todayStamp);
		}, options);
		
		currentTodayTip.show();
		
		setTimeout(hideBubbleForToday, 3200);
	}
	catch(err)
	{
		handleError("Calendar.js showBubbleForToday", err);
	}
	
}

function getStartMonthForQuarter(month)
{
	if(month < 5)
	{
		return 1;
	}
	else if(month < 9)
	{
		return 5;
	}
	else {
		return 9;
	}
}

function hideBubbleForToday(tip)
{
	try {
		currentTodayTip.hide();
	}
	catch(err)
	{
		handleError("Calendar.js hideBubbleForToday", err);
	}
}

/**
Return the main date (the one we count down to)
*/
function getMainDate()
{
	try {
		
		if(dates.mainDateArray[0]) return dates.mainDateArray[0];
		else return 0;

	}
	catch(err)
	{
		handleError("Calendar.js getMainDate", err);
	}
}

/**
Return the subsidiary dates (the ones we just show)
*/
function getSubDates()
{
	try {
		return dates.subDateArray;
	}
	catch(err)
	{
		handleError("Calendar.js getSubDates", err);
	}
}

/**
Set main date from time stamp and update all views
*/
function setMainDate(timestamp)
{	
	try 
	{
		//Set date in background page	
		bg.toggleDate(timestamp, false);
		bg.maintain();
		//highLightSelectedDates();	

		//updateCalendarPageStart();
			
	}
	catch(err)
	{
	    handleError("Calendar.js setMainDate", err);
	}	
}	

/**
Set sub date from time stamp and update all views
*/
function setSubDate(timestamp)
{
	//Set date in background page	
	try {
		bg.toggleDate(timestamp, true);
		bg.maintain();
		
		//updateCalendarPageStart();
		//highLightSelectedDates();
	}
	catch(e)
	{
		handleError("Calendar.js setSubDate", e);
	}
}

/**
Update date set from back end and start update of content when done
*/
function updateDatesStuff()
{
	try {
		//Refresh backgroudn page
	    //bg.maintain();
		
		//Update link to background page
		bg = chrome.extension.getBackgroundPage();
		
		//notesArray = getNoteArray();
		
		//Bind clicks and mouseovers for dates - dialog on right click!
		$(daysSelectString).off().on("mouseenter", normalPopupShow).on("click", dayClicked).on("contextmenu", dayRightClickedDialog).on("mousedown", startDynamic);	
	
		//Highlight today
		highLightToday();
		
		//Update the selected date
		highLightSelectedDates();
	}
	catch(e)
	{
		handleError("Calendar.js updateDatesStuff", e);
	}
	
}

function normalPopupShow(event)
{
	try {
		Tipped.create(event.originalEvent.target, function(element) {
			var timestamp = $(element).attr("datetimestamp");
			return getToolTip(timestamp);
		}, { skin: 'kvasbo', showDelay: '450'});
	}
	catch(e)
	{
		handleError("Calendar.js normalPopupShow", e);
	}
	
}

/**
Open dialog on right click
*/
function dayRightClickedDialog(event)
{	
	try {
		event.preventDefault();
			
		var timestamp = event.originalEvent.target.attributes["datetimestamp"].value;
		var target = event.originalEvent.target.id;
			
		lastEventDate = timestamp;
		
		var tip = Tipped.create("#popupProxy", document.getElementById("dateRightInputDialog"), { skin: 'kvasboRight', target: target, showDelay: '0', hideOthers: true, hideOn: 'click-outside', closeButton: true, showOn: false, onShow: updateRightClickToolTipMenu, onHide: resetRightClickToolTipMenu});
		
		tip.show();
	}
	catch(e)
	{
		handleError("Calendar.js dayRightClickedDialog", e);
	}

}

/**
Retrieve note for a given date from backend
*/
function getNoteArray()
{
	try {
	
		var tmpNoteArray = dates.dateNoteArray;
		var outObj = {};
		
		for(i = 0; i < tmpNoteArray.length; i++)
		{
			var thekey = tmpNoteArray[i].timestamp.toString();
			var nota = tmpNoteArray[i].note;
	
			outObj[thekey] = nota;
		}
	
		return outObj;
	}
	catch(e)
	{
		handleError("Calendar.js getNoteArray", e);
	}
}


/**
Get note for a specific date
*/
function getNoteForDate(timestampNote)
{
	try{
	
		var tmpNotes = getNoteArray();
		var output = "";
		
		if(tmpNotes[timestampNote] != undefined)
		{
			//console.log("Note found "+timestampNote);
			output = tmpNotes[timestampNote];
		}
		else {
			//console.log("Note not found" + timestampNote);
			output = "";
		}
		
		return output;
	
	}
	catch(e)
	{
		handleError("Calendar.js getNoteForDate", e);
	}
	
}

/**
Return date as a localised string
*/
function getDateString(timestamp, long)
{
	try {

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
			//dateString = dateTemplate.replace("mm", (month+1 < 10) ? " " + month+1 : month+1).trim();
			
			var padding = true;
			
			month++;
			if(month < 10 && padding) month = "0" + month;
			if(mDay < 10 && padding) mDay = "0" + mDay;
			
			dateString = dateTemplate.replace("mm", month);
			
			dateString = dateString.replace("yy", year);
			dateString = dateString.replace("dd", mDay);
		}
	
		return dateString;
		
	}
	catch(e)
	{
		handleError("Calendar.js getDateString", e);
	}
}

/**
Start the dynamic counter
*/
function startDynamic(event)
{
	try {
		Tipped.hide(daysSelectString); //Hide all tool tips
		
		$(daysSelectString).on("mouseenter", updateDynamic); //Add mouseenter event for days
		$("*").on("mouseup", endDynamic); //Add mouseup event for all (to end on end of click, also outside specific days)
		
		dynamicStartStamp = event.target.attributes["datetimestamp"].value * 1;
	}
	catch(e)
	{
		handleError("Calendar.js startDynamic", e);
	}
}

/**
Update the dynamic counter
*/
function updateDynamic(event){
	
	try {
		
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
	catch(e)
	{
		handleError("Calendar.js updateDynamic", e);
	}
}

/**
End and unset the dynamic counter
*/
function endDynamic(event){
	
	try {
	
		Tipped.hide(daysSelectString); //Hide all tool tips
		
		//Unbind events from all events
		$("*").off("mouseup", endDynamic).off("mouseenter", updateDynamic);
		
		//Remove dynamic class from all days
		$(daysSelectString).removeClass("cal_day_dynamic");
		
		//Unset start point for dynamic counter
		dynamicStartStamp = false;
		dynamicDiff = false;
	}
	catch(e)
	{
		handleError("Calendar.js endDynamic", e);
	}
	
}

/**
Add a note to a date via the BG page and reload stuff as usual.
*/
function addNoteToDate(timestamp, note)
{
	bg.setNoteForDate(timestamp, note, false);
	//updateCalendarPageStart();
}

/**
Clear a note from a date
*/
function clearNoteFromDate(timestamp)
{
	bg.setNoteForDate(timestamp, "", true);
	//updateCalendarPageStart();
}

/**
Add or remove a color mark for a date
*/
function setColorForDate(timestamp, color, remove)
{
		try {
			
			var dateColorArray = dates.dateColorArray;
			
			//Create new object
			var tmp = {};
			tmp.timestamp = timestamp;
			tmp.color = color;
			
			var newArray = [];
			
			//First, remove any references to the date, because we are either deleting or replacing
			for(i=0; i<dateColorArray.length; i++)
			{
				var tempR = dateColorArray[i];
				
				if(tempR.timestamp.toString() !== timestamp.toString())
				{
					newArray.push(tempR); //If not to be removed, add to next array.
				}	
			}
			
			dateColorArray = newArray; //dateNoteArray is now cleaned
		
			//Then, if not remove, add current
			if(!remove)
			{
				dateColorArray.push(tmp);
			}
			
			//This is the new solution!
			dates.dateColorArray = dateColorArray;
			persistDatesToStorage(dates);
			
			
			
			//Old, to be removed
			//setItem("dateColorArray", JSON.stringify(dateColorArray));
			
		}
		catch(e)
		{
			handleError("setColorForDate", e);
		}
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
function yearClicked(event){

	try {
		var year = $(event.target).attr("year");
	
		logger("info", "User event", "Year link clicked " + year); //Log
		
		currentYear = year*1; //Add offset to current year
	
		//initPopupPage(currentYear, 1);
		showCal(currentYear, 1);
	}
	catch(e)
	{
		handleError("Calendar.js yearClicked", e);
	}
	
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
	logger("info", "Hightlight day", highlightClass + " : " +selectorString);
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
		
		highLightDay(value, selectedSubClass);
		
	});
	
	// custom colors
	customColors = dates.dateColorArray;
	
	for(i=0;i<customColors.length;i++)
	{
		var timestamp = customColors[i].timestamp;
		var color = customColors[i].color;
	//	log(timestamp,color);
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

	//log("Css change", "Removed highlights");
}

/**
Highlights the chosen dates, from loaded value 
*/
function Calendar(year, month)
{

	try {	
		//Functions
		this.getCal = calGetCal;
	
		//working variables
		this.year = year;
		this.month = month;
		this.workMonth = month-1;
		
		this.workDate = new Date(Date.UTC(year,this.workMonth,1));
		
		this.startStamp = Date.UTC(year,this.workMonth,1);
		
		this.offSet = this.workDate.getTimezoneOffset();
		
		this.outVars = new Object();
	
	}
	catch(e)
	{
		handleError("Calendar.js Calendar", e);
	}
	
}	

/**
Return the actual calendar html
*/
function calGetCal(template)
{
	try {
		//Set month name
		this.outVars.monthName = ucFirst(chrome.i18n.getMessage("mon"+this.month));
		
		this.outVars.year = this.year; //.toString().substring(2,4);
	
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
	catch(e)
	{
		handleError("Calendar.js calgetCal", e);
	}
}

/**
Shift calendar by N months
*/
function shiftCalendarByMonths(deltaMonths)
{
	var tmpDate = new Date(showingFromYear, showingFromMonth-1+deltaMonths, 1);
	
	showCal(tmpDate.getFullYear(), tmpDate.getMonth()+1);
}

/**
Create a calendar
*/
function showCal(year, month)
{	
	try {
		//Remove all tipped 
		Tipped.hideAll();
	
		//Init and default for week start day
		var firstDay = bg.settings.firstDay; //getItem("firstDay");
		if(firstDay != "1" && firstDay != "0")
		{
			firstDay = "1";
			bg.settings.firstDay = firstDay; 
			bg.persistSettingsToStorage();
		}
	
		firstDayOfWeek = firstDay;
	
		populate12MonthsFrom(year, month, "month", monthTemplate); //this year from january
	
		populateYearLinks();
	
		//Initialize and default for showing week number
		var showWeek = bg.settings.showWeek; //getItem("showWeek");
		if(showWeek != "1" && showWeek != "0"){
			showWeek = "1";
			bg.settings.showWeek = showWeek; //setItem("showWeek", 1);
			bg.persistSettingsToStorage();
		}
		if(showWeek == "0") $(".cal_weekblock").hide();
	
		updateDatesStuff();
	}
	catch(e)
	{
		handleError("Calendar.js showCal", e);
	}

}

function populate12MonthsFrom(year, month, selectstring, template)
{
	
	try {
	
	showingFromMonth = month;
	showingFromYear = year;

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
	catch(e)
	{
		handleError("Calendar.js populate12MonthsFrom", e);
	}	

}


/**
Add the links to the link bar
 */
function populateYearLinks()
{
	try {
		//Remove markings
		$(".yearlink").removeClass(yearButtonFullClass).removeClass(yearButtonHalfClass).removeClass(yearButtonThirdClass);
		
		//We are showing a full year
		if(showingFromMonth == 1)
		{
			baseYear = showingFromYear;
			$("#yearLabel").addClass(yearButtonFullClass);
			
		}
		else if(showingFromMonth < 7)
		{
			baseYear = showingFromYear;
			$("#yearLabel").addClass(yearButtonHalfClass);
			$("#yp1").addClass(yearButtonThirdClass);
			
		}
		else {
			baseYear = showingFromYear + 1;
			$("#yearLabel").addClass(yearButtonHalfClass);
			$("#ym1").addClass(yearButtonThirdClass);
		}
		
		$("#ym6").html(baseYear-6).attr("year", baseYear-6);
		$("#ym1").html(baseYear-1).attr("year", baseYear-1);
		$("#ym2").html(baseYear-2).attr("year", baseYear-2);
		$("#ym3").html(baseYear-3).attr("year", baseYear-3);
		$("#ym4").html(baseYear-4).attr("year", baseYear-4);
		$("#ym5").html(baseYear-5).attr("year", baseYear-5);
		$("#yearLabel").html(baseYear).attr("year", baseYear);
		$("#yp1").html(baseYear+1).attr("year", baseYear+1);
		$("#yp2").html(baseYear+2).attr("year", baseYear+2);
		$("#yp3").html(baseYear+3).attr("year", baseYear+3);
		$("#yp4").html(baseYear+4).attr("year", baseYear+4);
		$("#yp5").html(baseYear+5).attr("year", baseYear+5);
		$("#yp6").html(baseYear+6).attr("year", baseYear+6);
	}
	catch(e)
	{
		handleError("Calendar.js populateYearLinks", e);
	}
}

/**
Keyboard controls

@param key ID of the pressed key
*/
function keyPressed(key) {

	try {
		//Check if we are in 3 or 12 month calendar
		var shifting = (bg.settings.popup == 12) ? true : false;
			
		//3 months and 
		if(key == 37 || (key == 40 && !shifting)) { // down or right
			
			shiftCalendarByMonths(-12);
		}
		else if(key == 39 || (key == 38 && !shifting)) { // up or left
			shiftCalendarByMonths(12);
		}
		else if(key == 38)
		{
			shiftCalendarByMonths(-4);
		}
		else if(key == 40)
		{
			shiftCalendarByMonths(4);
		}
	}
	catch(e)
	{
		handleError("Calendar.js keyPressed", e);
	}
}