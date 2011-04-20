//Calendar constructor
function Calendar(year, month)
{
	log("Creating calendar", year+"-"+month);
	
	//Functions
	this.getCal = returnCalendar;
	this.genCal = calGetCal;

	//working variables
	this.year = year;
	this.month = month;
	this.workMonth = month-1;
	
	this.workDate = new Date(year,this.workMonth,1);
	this.startStamp = this.workDate.getTime();
	
	this.cacheKey = "cal_"+this.workDate.getFullYear() + "_" + this.workDate.getMonth();

	//Object to pass to template for output
	this.outVars = new Object();
	
}	

//Return cached if it exists, otherwise return calendar
function returnCalendar()
{
	var cached = getItem(this.cacheKey);
	if(cached != null){
		log("Cache", "Returning cached month");
		return cached;
	}
	else
	{
		log("Cache", "Returning generated month");
		return this.genCal();
	}
}

function addToolTipsToAllDays()
{
	//Add tool tips
	var days  = $(".cal_td_day");
	for(var i = 0; i < days.length; i++)
	{
		var id = $(days[i]).attr("id");

		addToolTip(days[i],id);
	}
}

//Return the actual calendar html
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
	var startWeekDay = this.workDate.getDay();

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

		days++;
	}

	//console.log(this.outVars);

	var thisCalOut = $.tmpl( "monthTemplate", this.outVars ) ;

	var thisCalOutHtml = $(thisCalOut).clone()[0].outerHTML;

	//Store in cache
	setItem(this.cacheKey, thisCalOutHtml);
	
	return thisCalOutHtml;
}