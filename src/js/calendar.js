//Calendar constructor
function Calendar(year, month)
{
	log("Creating calendar", year+"-"+month);

	//Functions
	this.getCal = calGetCal;

	//working vars
	this.stamps = [];
	this.month = month;
	this.workMonth = month-1;
	this.year = year;

	var workDate = new Date(year,this.workMonth,1);
	var workStamp = workDate.getTime();

	//Make all date stamps for a month
	for(var i = 0; i < workDate.getDaysInMonth(); i++)
	{	
		this.stamps[i] = workStamp + (i * 86400000); //new way of making stamps, no date object creation	
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

	var firstDate = new Date(this.stamps[0]);

	var startWeek = firstDate.getWeek(1);
	var startWeekDay = firstDate.getDay();

	var tabWidth = 8;

	if(!this.showWeekNumber) tabWidth = 7;

	var tmpWeek = startWeek;

	var out = "";
	
	//Start table output code
	out = "<table class='cal'>";
	
	//Add header row
	out += getHeaderRow(this.workMonth+1); //Add header row
	
	out += "<tr class='cal_tr_dates'>";

//	Screw rules, hard code instead. This is Monday first.
	if(firstDayOfWeek == 1)
	{
		switch(startWeekDay)
		{
		case 0:
			tmpWeek = tmpWeek - 1;
			if(tmpWeek == 0) tmpWeek = 52; //Will fail in some years
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			out += "<td colspan=6>&nbsp;</td>";
			days = 6;
			break;

		case 1:
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			days = 0;
			break;

		case 2:
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			out += "<td colspan=1>&nbsp;</td>";
			days = 1;
			break;

		case 3:
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			out += "<td colspan=2>&nbsp;</td>";
			days = 2;
			break;

		case 4:
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			out += "<td colspan=3>&nbsp;</td>";
			days = 3;
			break;

		case 5:
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			out += "<td colspan=4>&nbsp;</td>";
			days = 4;
			break;

		case 6:
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			out += "<td colspan=5>&nbsp;</td>";
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
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			
			days = 0;
			break;

		case 1:
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			out += "<td colspan=1>&nbsp;</td>";
			days = 1;
			break;

		case 2:
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			out += "<td colspan=2>&nbsp;</td>";
			days = 2;
			break;

		case 3:
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			out += "<td colspan=3>&nbsp;</td>";
			days = 3;
			break;

		case 4:
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			out += "<td colspan=4>&nbsp;</td>";
			days = 4;
			break;

		case 5:
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			out += "<td colspan=5>&nbsp;</td>";
			days = 5;
			break;

		case 6:
			out += "<td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			out += "<td colspan=6>&nbsp;</td>";
			days = 6;
			break;

		}
	}

	var stampStatic = this.stamps[0]; //read first day in month
	var tmpDate = new Date(stampStatic);
	
	//var stamp = this.stams[0];

//	The actual day adder code
	for(var i = 0; i < tmpDate.getDaysInMonth(); i++)
	{

		var dayStamp = stampStatic + (i * 86400000);
		var tmpDate = new Date(dayStamp);
		
		if(days==7)
		{	
			
			tmpWeek = tmpDate.getWeek(1) ;

			//new row
			out += "</tr><tr class='cal_tr_dates'><td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			days = 0;
		}

		out += "<td class='cal_td_day' onclick='dayClicked("+dayStamp+", false)' dateTimestamp='"+dayStamp+"' id='cal_day_"+dayStamp+"' title=' '>"+(i+1)+"</td>";
		days++;
	}

	out += "</tr>";

	out += "</table>";

	return ""+out;
}

//Get the header row for a given month
function getHeaderRow(month)
{

	//New version
	if(firstDayOfWeek == 0) {
		var headerTemplateVars =  [
		                           {   monthName: ucFirst(chrome.i18n.getMessage("mon"+month)),
		                        	   weekShortName: chrome.i18n.getMessage("weekHeader"), 
		                        	   day0_ShortName: chrome.i18n.getMessage("sday0"),
		                        	   day1_ShortName: chrome.i18n.getMessage("sday1"),
		                        	   day2_ShortName: chrome.i18n.getMessage("sday2"),
		                        	   day3_ShortName: chrome.i18n.getMessage("sday3"),
		                        	   day4_ShortName: chrome.i18n.getMessage("sday4"),
		                        	   day5_ShortName: chrome.i18n.getMessage("sday5"),
		                        	   day6_ShortName: chrome.i18n.getMessage("sday6")}
		                           ];
	}
	else
	{
		var headerTemplateVars =  [
		                           {   monthName: ucFirst(chrome.i18n.getMessage("mon"+month)),
		                        	   weekShortName: chrome.i18n.getMessage("weekHeader"), 
		                        	   day0_ShortName: chrome.i18n.getMessage("sday1"),
		                        	   day1_ShortName: chrome.i18n.getMessage("sday2"),
		                        	   day2_ShortName: chrome.i18n.getMessage("sday3"),
		                        	   day3_ShortName: chrome.i18n.getMessage("sday4"),
		                        	   day4_ShortName: chrome.i18n.getMessage("sday5"),
		                        	   day5_ShortName: chrome.i18n.getMessage("sday6"),
		                        	   day6_ShortName: chrome.i18n.getMessage("sday0")}
		                           ];

	}
	
	//Parse html
	var monthRow = $.tmpl( "monthNameTempate", headerTemplateVars ) ;
	var headerRow = $.tmpl( "headerRowTemplate", headerTemplateVars ) ;
	
	//Put it together
	var headerRowOut = $(monthRow).clone()[0].outerHTML + "" + $(headerRow).clone()[0].outerHTML;
	
	//...and return
	return headerRowOut;
}