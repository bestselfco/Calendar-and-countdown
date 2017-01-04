/**
Front end variables
*/

//Empty objects for settings and dates
//var settings = {};
//var dates = {};

var startupTimer;

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
var dynamicStopStamp = false;
var dynamicDiff = false;

var lastEventDate = "";

var showFromStart; 

var showingFromMonth;
var showingFromYear; 

var runningMouseWheelCounter = 0;
var runningMouseWheelTimer;

var currentTodayTip;

var startupDeferred;

//Init today time stamp
var todayStamp = Date.UTC(now.getFullYear(),now.getMonth(), now.getDate());


/**
Bootstrap page on load
*/
$(document).ready(function() {
	
	try {
		startupTimer = new timer("Calender startup");
		initCalendarPageStart();	
	}
	catch(e)
	{
		handleError("Calendar, Documentready", e);
	}
	
});

/*
* First init
*/ 
function initCalendarPageStart()
{
	
	try {	
		calStartup = jWorkflow.order(readSettingsFromStorage).andThen(readDatesFromStorage).andThen(initCalendarPage).andThen(trackCalendarStart);
		calStartup.start();		
	}
	catch (err) {
		handleError("Calendar, initCalendarPageStart", err);
	}
}


/*
* Update colors and stuff
*/ 
function updateCalendarPageStart()
{
	try {
		calUpdate = jWorkflow.order(readSettingsFromStorage).andThen(readDatesFromStorage).andThen(updateDatesStuff);
		calUpdate.start();
	}
	catch (err) {
		handleError("Calendar, updateCalendarPageStart", err);
	}
}

function initCalendarPage() {
	
	//Find first month to show. Defaults to January
	var startMonth = 1;	
	if(settings.showFrom == 3 && settings.popup == 12) { startMonth = currentMonth; }
	else if(settings.showFrom == 2 && settings.popup == 12) { startMonth = getStartMonthForQuarter(currentMonth);}
	
	initPopupPage(currentYear, startMonth);
	
}

function trackCalendarStart() {
	//Track a page view
	try {
		trackPageView("Calendar/"+settings.popup);
		trackEvent("Interaction", "Open Calendar", settings.popup);
		startupTimer.stop();
	}
	catch(e)
	{
		handleError("Calendar, trackCalendarStart", err);
	}
}

/**
Initialize popup
 */
function initPopupPage(year, month)
{	
	try {
	
		//Set page title for tracking
		document.title = version.currVersion;
	
		//Display the calendar
		showCal(year, month);
		
		//Show list if applicable
		populateListStyle();
	
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
		
			$("body").off().on("keydown", function() { keyPressed(window.event.keyCode);}); // .on("contextmenu", dayRightClicked);	

			//Make year links work
			$(".yearlink").off().on("click", function() { yearClicked(event); });

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
		
		trackEvent("Interaction", "Calendar", "Mouse wheel");
		
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
		
		var options = {};
		options.showDelay = 500;
		options.fadeIn = 300;
		options.fadeOut = 1000;
		
		currentTodayTip = Tipped.create(selectorString, function(element) {
			return getToolTip(todayStamp);
		}, options);
		
		setTimeout(doShowBubbleForToday, 200);
		
		setTimeout(hideBubbleForToday, 3700);
	}
	catch(err)
	{
		handleError("Calendar.js showBubbleForToday", err);
	}
	
}

function doShowBubbleForToday()
{
	currentTodayTip.show();
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
		toggleDate(timestamp*1, false);
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
		toggleDate(timestamp*1, true);
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
			
		//Bind clicks and mouseovers for dates - dialog on right click!
		$(daysSelectString).off().on("mouseenter", normalPopupShow).on("click", dayClickedDialog).on("mousedown", startDynamic); //.on("contextmenu", dayRightClicked); //.	
	
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
function dayClickedDialog(event)
{	
	try {
		//event.preventDefault();
			
		var timestamp = $(event.originalEvent.target).attr("datetimestamp");
		var target = event.originalEvent.target.id;
			
		var tipData = {};
		tipData.timeStamp = timestamp;

		var tip = Tipped.create("#popupProxy", getInteractiveTooltip(tipData), { skin: 'kvasboRight', target: target, showDelay: '0', hideOthers: true, hideOn: false, closeButton: true, showOn: false});

		tip.show();
		
		trackEvent("Interaction", "Calendar", "Interactive popup");
		
	}
	catch(e)
	{
		handleError("Calendar.js dayRightClickedDialog", e);
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
		
		dynamicStartStamp = $(event.target).attr("datetimestamp") * 1;
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
			var currentStamp = $(event.target).attr("datetimestamp") * 1;
		
			dynamicStopStamp = currentStamp;
		
			//var currentDate = new Date(currentStamp);
			//var otherDate = new Date(dynamicStartStamp);
		
			//Get diff
			dynamicDiff = currentStamp - dynamicStartStamp;
			//dynamic
			
			
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
		dynamicStopStamp = false;
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
	setNoteForDate(timestamp, note, false);
}

/**
Clear a note from a date
*/
function clearNoteFromDate(timestamp)
{
	setNoteForDate(timestamp, "", true);
}

/**
Add or remove a note for a date. If "remove" is true, it is deleted no matter what the note. Otherwise, it is added or replaced based on whether or not the timestamp already has a note
*/
function setNoteForDate(timestamp, note, remove)
{
	
	try {
		
		//Create new object
		var tmp = {};
		tmp.timestamp = timestamp;
		tmp.note = note;
		
		var newArray = [];
		
		//First, remove any references to the date, because we are either deleting or replacing
		for(i=0; i < dates.dateNoteArray.length; i++)
		{
			var tempR = dates.dateNoteArray[i];
			
			if(tempR.timestamp.toString() !== timestamp.toString())
			{
				newArray.push(tempR); //If not to be removed, add to next array.
			}	
		}
		
		dateNoteArray = newArray; //dateNoteArray is now cleaned
	
		
		//Then, if not remove, add current
		if(!remove)
		{
			dateNoteArray.push(tmp);
		}
		
		//This is the new solution!
		dates.dateNoteArray = dateNoteArray;
		persistDatesToStorage(dates);
		
	
	}
	catch(e)
	{
		handleError("Calendar.js setNoteForDate",e);
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
		
		if(tmpNotes[timestampNote] !== undefined)
		{
			output = tmpNotes[timestampNote];
		}
		else {
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
			
			trackEvent("Interaction", "Calendar", "Color change");
			
						
		}
		catch(e)
		{
			handleError("Calendar.js setColorForDate", e);
		}
}


/**
New version when somebody has clicked a date. Uses attribute instead of passing value by function.
*/
function dayRightClicked(event)
{
	
	event.preventDefault();
	return false;
	
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
	
		showCal(currentYear, 1);
		
		trackEvent("Interaction", "Calendar", "Year selection");
		
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
	$(selectorString).addClass(highlightClass);
	logger("info", "Hightlight day", highlightClass + " : " +selectorString);
}

/**
Highlights the chosen dates, from loaded value 
*/
function highLightSelectedDates(){
	
	//Remove all highlighted days
	removeHighLights();

	for (var dt in ccDates)
	{
		var d = ccDates[dt];
		var selectorString = '[dateTimestamp="'+d.timestamp+'"]';

		//Secondary dates
		if(d.isSecondary) { highLightDay(d.timestamp, selectedSubClass); }
		
		//Custom colors
		if(d.color !== null) {$(selectorString).css("background-color", d.color);}
		
		if(d.isPrimary) {highLightDay(d.timestamp, selectedClass);}
	}
		
}

/**
Populate the list style view
*/
function populateListStyle()
{
	if($("#dateList").length > 0)
	{
		
		for (var dt in ccDates)
		{
			var d = ccDates[dt];
			var data = {};
			
			
			
			var dagen = new Date(dt);
			
			data.title = "title";
			data.date = dagen.toUTCString();
			
			var out = Mustache.render(listItemTemplate, data);
			$("#dateList").append(out);
		}
	}
}

/**
Remove all highlights
*/
function removeHighLights()
{
	//Remove all modifications made by jQuery
	$(daysSelectString).removeClass(selectedSubClass).removeClass(selectedClass).css("background-color", "");

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
		
		this.outVars = {};
	
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
		
		this.outVars.year = this.year.toString().substring(0,4);
	
		//Set week header value
		this.outVars.weekShortName = chrome.i18n.getMessage("weekHeader");
	
		//Set day names
		if(firstDayOfWeek === 0) {
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
	
		var startWeekDay = this.workDate.getUTCDay();
		
		var tabWidth = 8;
		if(this.showWeekNumber === 0) tabWidth = 7;

		var templateOffsetDays = 0;
	
		//	Screw rules, hard code instead. This is Sunday first.
		if(firstDayOfWeek === 0)
		{
			templateOffsetDays = startWeekDay;
		}
		else //Monday
		{
			if(startWeekDay === 0)
			{
				templateOffsetDays = 6;
			}
			else
			{
				templateOffsetDays = startWeekDay - 1;
			}
		}

		var tmpDate;
		var currentTemplateDay = templateOffsetDays;
		var currentWeek = 0;

		//	The actual day adder code
		for(var i = 0; i < this.workDate.getDaysInMonth(); i++)
		{
			var dayStamp = this.startStamp + (i * 86400000);
			tmpDate = new Date(dayStamp);

			currentWeek = Math.floor((i+templateOffsetDays)/7);
			
			if(i === 0)
			{
				this.outVars["w_"+currentWeek] = tmpDate.getWeek();
			}
			else if(tmpDate.getUTCDay() === 4)
			{
				this.outVars["w_"+currentWeek] = tmpDate.getWeek();
			}
			else if(tmpDate.getDate() > (this.workDate.getDaysInMonth()-4))
			{
				this.outVars["w_"+currentWeek] = tmpDate.getWeek();
			}
	
			this.outVars["d_stamp_"+(i+templateOffsetDays)] = dayStamp;
			this.outVars["d_content_"+(i+templateOffsetDays)] = tmpDate.getUTCDate();
			this.outVars["d_class_"+(i+templateOffsetDays)] = "cal_td_day";
			this.outVars["d_id_"+(i+templateOffsetDays)] = dayStamp;

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
		var firstDay = settings.firstDay; //getItem("firstDay");
		if(firstDay != "1" && firstDay != "0")
		{
			settings.firstDay = "1";
			firstDay = 1;
		}
	
		firstDayOfWeek = firstDay;
	
		populate12MonthsFrom(year, month, "month", monthTemplate); //this year from january
	
		populateYearLinks();
	
		//Initialize and default for showing week number
		var showWeek = settings.showWeek; //getItem("showWeek");
		if(showWeek != "1" && showWeek != "0"){
			
			showWeek = "1";
			settings.showWeek = showWeek; //setItem("showWeek", 1);
			
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
		var shifting = (settings.popup == 12) ? true : false;
			
		//3 months and 
		if(key == 37 || (key == 40 && !shifting)) { // down or right
			
			shiftCalendarByMonths(-12);
			trackEvent("Interaction", "Keypress", "Year back");
		}
		else if(key == 39 || (key == 38 && !shifting)) { // up or left
			shiftCalendarByMonths(12);
			trackEvent("Interaction", "Keypress", "Year forward");
		}
		else if(key == 38)
		{
			shiftCalendarByMonths(-4);
			trackEvent("Interaction", "Keypress", "4m back");
		}
		else if(key == 40)
		{
			shiftCalendarByMonths(4);
			trackEvent("Interaction", "Keypress", "4m forward");
		}
		
	}
	catch(e)
	{
		handleError("Calendar.js keyPressed", e);
	}
}

