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
	
	//Init and default for showing week number
	var showWeek = getItem("showWeek");
	if(showWeek != "1" && showWeek != "0"){
		showWeek = 1;
		setItem("showWeek", 1);
	}
	if(showWeek == "0") $(".cal_weekblock").hide();
}

//Create 12 separate montthly calendars
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

//Add tooltip to a field
function addToolTip(id, elementid)
{
	$(id).tooltip({ 
			effect: 'slide',
			offset:	[0, 0],
			predelay: 500,
			opacity: 1,
			layout: getToolTip(elementid)
	}).dynamic({ bottom: { direction: 'down', bounce: true } }); 
}


function getToolTip(id)
{
	//Recreate date object from time stamp
	var stampTmp = id.split('_');
	var stamp = parseInt(stampTmp[2]);
	
	var date = new Date(stamp);
	
	var gmtOffset = date.getTimezoneOffset() * 60000;
	
	//Get the base variables in order
	var ndate = new Date(date.getTime() - gmtOffset);
	var moonphase = getLunarPhase(ndate);
	var day = ndate.getDay();
	var month = ndate.getMonth();
	var mDay = ndate.getDate();
	
	var dayDiffCountShow = false;
	
	//Should we count up/down to date in popup?
	if(oldId != false){

		var countDate = new Date(oldId*1); 	//Stupid casting again
 
		var dayDiffCountDate = days_between(ndate, countDate); 	//Finding diff between oldid and now
		dayDiffCountShow = true; //Show it later on
	}
	
	if(dayDiffCountDate == 0) //Then we do not want to show it
	{
		dayDiffCountShow = false;
	}
	
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
	
	var dateString = chrome.i18n.getMessage("fullDate", [ucFirst(chrome.i18n.getMessage("lday"+day)), monthName, mDay, sFix]);
	
	var out =  "<div>";
	out += "<span class='dayinfo'>"+dateString+"</span>";
	
	//Day of the year
	out += "<span class='dayinyear'>"+chrome.i18n.getMessage("dayCapital")+" "+(ndate.getDayOfYear()+1)+" / "+(ndate.getDaysLeftInYear()-1)+" "+chrome.i18n.getMessage("left")+".</span>";

	var fromToday = ndate.getDaysFromToday()+1;
	
	//Days from today
	out += "<span class='countdown'>";
	
	var suffix  = "";
	if(Math.abs(fromToday) != 1) suffix = chrome.i18n.getMessage("several_suffix"); //"s" if one
	
	if(fromToday < 0)
	{
		out += Math.abs(fromToday)+" "+chrome.i18n.getMessage("day", "test")+suffix+" "+chrome.i18n.getMessage("ago")+".";
	}
	else if(fromToday > 0)
	{
		out += fromToday+" "+chrome.i18n.getMessage("day")+suffix+" "+chrome.i18n.getMessage("leftuntil")+".";
	}
	
	out += "</span>";
	
	//"Days from countdown date"
	if( isNaN(dayDiffCountDate) == false && dayDiffCountDate != 0 && dayDiffCountDate < 5000) {
		
		var suffix  = "";
		
		if(Math.abs(dayDiffCountDate) != 1) suffix = chrome.i18n.getMessage("several_suffix"); //"s" if > one
	
		out += "<span class='countdown'>"+dayDiffCountDate+" "+chrome.i18n.getMessage("day")+suffix+" "+chrome.i18n.getMessage("frommarkeddate")+"</span>";
	
	}
	
	//Add moon image
	out += "<img class='moonicon' src='pics/phases/"+getLunarImage(moonphase)+"'>";
	out += "</div>";

	return out;
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
	
	//Start table output code
	var out = "<table class='cal'>";
	out += getHeaderRow(this.workMonth+1); //Add header row
	out += "<tr class='cal_tr_dates'>";
	
//Screw rules, hard code instead. This is Monday first.
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
	  	//out += "<td colspan=6>&nbsp;</td>";
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
		//out += "<td colspan=6>&nbsp;</td>";
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

var tmpDate = new Date(this.stamps[0]);

//The actual day adder code
for(var i = 0; i < tmpDate.getDaysInMonth(); i++)
	{
		
		var tmpDate = new Date(this.stamps[i]);
		var stamp = this.stamps[i];
		
		if(days==7)
		{	
			//log("week change", tmpDate.getWeek());
			tmpWeek = tmpDate.getWeek(1) ;
			
			//new row
			out += "</tr><tr class='cal_tr_dates'><td class='cal_td_weeknumber cal_weekblock'>"+tmpWeek+"</td>";
			days = 0;
		}
		
		var today = "";
		if(new Date().toDateString() == tmpDate.toDateString())
		{
			today = " cal_day_today";
		}
		
		out += "<td class='cal_td_day"+today+"' onclick='dayClicked("+stamp+", false)' id='cal_day_"+stamp+"' title=' '>"+(i+1)+"</td>";
		days++;
	}
	
	out += "</tr>";
	
	out += "</table>";
	
	return ""+out;
}

//Get the header row for a given month
function getHeaderRow(month)
{
	
	var monthName = ucFirst(chrome.i18n.getMessage("mon"+month)); 
	
	var out = "<tr class='cal_tr_header'><td class='cal_td_header' colspan = '8'>"+monthName+"</td></tr>"; //Month header
	
	//Day names
	out += "<tr class='cal_tr_titles'>";
	out += "<td class='cal_td_weeknames cal_weekblock'>"+chrome.i18n.getMessage("weekHeader")+"</td>"; 
	
	if(firstDayOfWeek == 0) out += "<td class='cal_td_dayname'>"+chrome.i18n.getMessage("sday0")+"</td>";
	
	out += "<td class='cal_td_dayname'>"+chrome.i18n.getMessage("sday1")+"</td>"; //Day names
	out += "<td class='cal_td_dayname'>"+chrome.i18n.getMessage("sday2")+"</td>"; //Day names
	out += "<td class='cal_td_dayname'>"+chrome.i18n.getMessage("sday3")+"</td>"; //Day names
	out += "<td class='cal_td_dayname'>"+chrome.i18n.getMessage("sday4")+"</td>"; //Day names
	out += "<td class='cal_td_dayname'>"+chrome.i18n.getMessage("sday5")+"</td>"; //Day name
	out += "<td class='cal_td_dayname'>"+chrome.i18n.getMessage("sday6")+"</td>"; //Day names
	
	if(firstDayOfWeek == 1) out += "<td class='cal_td_dayname'>"+chrome.i18n.getMessage("sday0")+"</td>";
	
	out += "</tr>"; //Day names
	
	return out;
}