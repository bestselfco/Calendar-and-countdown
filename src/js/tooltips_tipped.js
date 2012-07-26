/**

*/
var gmtOffset = 0;

//Bind tooltips to all dates

/**

*/
function addTippedTooltips(){

	Tipped.create('.cal_td_day, .cal_day_chosen, .cal_subday_chosen', function(element) {
		var timestamp = $(element).attr("datetimestamp");
		return getToolTip(timestamp);
	}, { skin: 'kvasbo', showDelay: '450', });

}

/**

*/
function getToolTip(timestamp)
{
	if(dynamicStartStamp === false && dynamicDiff === false){
		return getToolTipNormal(timestamp);
	}
	else {
		return getToolTipDynamic();
	}
}

/**

*/
function getToolTipDynamic()
{
	var output = "";

	var days = Math.abs(dynamicDiff / 86400000) + 1;  

	//(Day/day_s_)
	var suffix = "";
	if(days == 0 || days > 1) suffix = chrome.i18n.getMessage("several_suffix");
	var daysword = chrome.i18n.getMessage("day");

	output += days + " " + daysword + suffix + " " + chrome.i18n.getMessage("selected");

	return output;
}

//Return actual tool tip

/**

*/
function getToolTipNormal(timestamp){
	
	var output = "";
	var outArray = [];
	
	timestamp = timestamp * 1;
	
	var date = new Date(timestamp);

	//Get the base variables in order	
	var gmtOffset = date.getTimezoneOffset() * 60000;
	var ndate = new Date(date.getTime() - gmtOffset);
	
	var day = date.getUTCDay();
	var month = date.getUTCMonth();
	var mDay = date.getUTCDate();
	
	var showDate = true;
	var showDayInYear = true;
	var showFromToday = true;
	var showFromMarkedDate = true;
	var showSubDates = true;
	
	//outArray.push("<div id='editButton' style='position: absolute; top: 0px; right: 4px'>e</div>");
	
	if(showDate)
	{
		str_showDate = showDateString = getDateString(mDay, month, day);
		outArray.push(str_showDate);
	}
	
	if(showDayInYear)
	{
			//Day of the year
		str_showDayInYear = chrome.i18n.getMessage("dayCapital")+" "+(ndate.getDayOfYear()+1)+" / "+(ndate.getDaysLeftInYear()-1)+" "+chrome.i18n.getMessage("left")+".";
		outArray.push("<div class='popup'>"+str_showDayInYear+"</div>");
	}
	
	if(showFromToday)
	{
		fromToday = ndate.getDaysFromToday()+1;
		var suffix  = "";
		if(Math.abs(fromToday) != 1) suffix = chrome.i18n.getMessage("several_suffix"); //"s" if one

		if(fromToday < 0)
			{
				var countDown = Math.abs(fromToday)+" "+chrome.i18n.getMessage("day", "test")+suffix+" "+chrome.i18n.getMessage("ago")+".";	
				outArray.push("<div class='popup'>"+countDown+"</div>");
			}
			else if(fromToday > 0)
			{
				var countDown = fromToday+" "+chrome.i18n.getMessage("day")+suffix+" "+chrome.i18n.getMessage("leftuntil")+".";
				outArray.push("<div class='popup'>"+countDown+"</div>");
			}
							
		}
			
	if(showFromMarkedDate)
	{
		outArray.push(getCountDownDiffString(ndate));
	}
	
	if(showSubDates)
	{
		var subDates = getSubDates();
		
		for(i=0; i<subDates.length; i++)
		{
			if(timestamp != subDates[i])
			{
			outArray.push("<div class='popup'>"+getSubDateCountdownString(timestamp, subDates[i])+"</div>");
			}
			
		}
	}
	
	outArray = outArray.clean("null");
	
	
	
	return outArray.join("");
		
}

/**
Return date as a string
*/
function getDateString(mDay, month, day)
{
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

	return "<div class='popup popup_date'>"+dateString+"</div>";

}

/**

*/
function getCountDownDiffString(ndate)
{
	var outputString = "";
	
	var countDownDate = getMainDate();

	//Should we count up/down to date in popup?
	if(countDownDate != false){

		var countDate = new Date(countDownDate*1); 	//Stupid casting again

		var dayDiffCountDate = days_between(ndate, countDate); 	//Finding diff between oldid and now
		
	}
	
	//"Days from countdown date"
	if( isNaN(dayDiffCountDate) == false && dayDiffCountDate != 0 && dayDiffCountDate < 5000) {

		var suffix  = "";

		if(Math.abs(dayDiffCountDate) != 1) suffix = chrome.i18n.getMessage("several_suffix"); //"s" if > one

		outputString = dayDiffCountDate+" "+chrome.i18n.getMessage("day")+suffix+" "+chrome.i18n.getMessage("frommarkeddate");
		return "<div class='popup'>"+outputString+"</div>";
	}
	else
	{
		return "null";
	}
	
}

/**

*/
//Count down to all the small silly dates (subdates)
function getSubDateCountdownString(timestampSub, timestampPop)
{
	var output;
	
	var ndate = new Date((timestampPop*1) - gmtOffset);
	
	var dateString = chrome.i18n.getMessage("shortDate", [ndate.getMonth()+1,ndate.getDate(),ndate.getFullYear()]);
	
	var diff = days_between_timestamps(timestampSub,timestampPop);
	
	var severalsuffix = "";
	if(diff > 1) severalsuffix = chrome.i18n.getMessage("several_suffix");
	
	if(timestampSub > timestampPop)
	{
		var fromto = chrome.i18n.getMessage("day") + severalsuffix + " " + chrome.i18n.getMessage("since");
		
		return diff + " " + fromto + " " + dateString;
	}
	else if(timestampSub < timestampPop)
	{
		var fromto = chrome.i18n.getMessage("day") + severalsuffix + " " + chrome.i18n.getMessage("until");
		return diff + " " + fromto + " " + dateString;
	}
	else
	{
		return "null";
	}
}