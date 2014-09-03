/**
Decide whether to use "normal" or "Dynamic" tool tip.
*/
function getToolTip(timestamp)
{
	try {
		if(dynamicStartStamp === false && dynamicDiff === false){
			trackEvent("Interaction", "Calendar", "Popup shown");
			return getToolTipNormal(timestamp);
		}
		else {
			trackEvent("Interaction", "Calendar", "Dynamic date count");
			return getToolTipDynamic(dynamicStartStamp, dynamicStopStamp);
		}
	}
	catch (e)
	{
		handleError("tooltips_tipped.js getToolTip", e);
	}
}

/**
Bindings and stuff for right click menu once it is available
*/
function updateRightClickToolTipMenu(content, event)
{

	try {

		var timestamp = lastEventDate; //$("#dateRightInputDialog").attr("dialogdatetimestamp");
		var currNote = getNoteForDate(timestamp);
	
		$("#popupTableHeaderCell").html(getDateString(timestamp,true));
	
		$("#dayNoteInput").val(currNote);
	
		$("#dayNoteInput").on("change", function(event){
			addNoteToDate(timestamp, event.target.value);
			trackEvent("Interaction", "Popup - right", "Note created");
		});
		
		$("#resetNoteButton").on("click", function(event){
			$("#dayNoteInput").val("");
			clearNoteFromDate(timestamp);	
			trackEvent("Interaction", "Popup - right", "Clear note");
		});
		
		$(".colorButton").on("click", function(event){
			var col = $(event.target).css("background-color");
			setColorForDate(timestamp, col, false);
			trackEvent("Interaction", "Popup - right", "Color set");
			//highLightSelectedDates();
		});
		
		$("#resetColorButton").on("click", function(event){
			setColorForDate(timestamp, "", true);
			trackEvent("Interaction", "Popup - right", "Color reset");
			//highLightSelectedDates();
		});
		
		$("#popupButtonSetMain").on("click", function(event){
			setMainDate(timestamp);
			$("#popupButtonSetMain").toggleClass("popupButtonSelected");
			trackEvent("Interaction", "Popup - right", "Main date set");
		});
		
		$("#popupButtonSetSecondary").on("click", function(event){
			setSubDate(timestamp);
			$("#popupButtonSetSecondary").toggleClass("popupButtonSelected");
			trackEvent("Interaction", "Popup - right", "Secondary date set");
		});
	
		//Is selected day main date?	
		var isMainDate = false; 
		if(getMainDate() == timestamp) isMainDate = true;
			
		//Is selected day sub date?
		var isSubDate = false;
		var subDates = getSubDates();
		
		for(i=0; i<subDates.length; i++)
		{
			if(timestamp == subDates[i])
			{
				isSubDate = true;
			}
		} 
		
		if(isMainDate) $("#popupButtonSetMain").addClass("popupButtonSelected");
		if(isSubDate) $("#popupButtonSetSecondary").addClass("popupButtonSelected");
	}
	catch (e)
	{
		handleError("tooltips_tipped.js updateRightClickToolTipMenu", e);
	}
}

/** 
Reset tooltip menu
*/
function resetRightClickToolTipMenu(content, event)
{

	$("#dateRightInputDialog").attr("datetimestamp", "");
	$("#dayNoteInput").off("change");
	$(".colorButton").off("click");
	$("#resetNoteButton").off("click");
	$("#resetColorButton").off("click");
	$("#popupButtonSetMain").off("click");
	$("#popupButtonSetSecondary").off("click");
	$("#popupButtonSetMain").removeClass("popupButtonSelected");
	$("#popupButtonSetSecondary").removeClass("popupButtonSelected");
	
	Tipped.remove(daysSelectString);
	
	//updateCalendarPageStart();
	
}


/**
Get the dynamic tool tip
*/
function getToolTipDynamic(fromStamp, toStamp)
{
	try {
		var output = "";

		var from = new Date(fromStamp);
		var to = new Date(toStamp);

		var days = Math.abs(to.getDistanceInDays(from)) + 1;
		var wDays = Math.abs(from.getDistanceInWeekDays(to)); 
	
		//(Day/day_s_)
		var suffix = "";
		if(days === 0 || days > 1) suffix = chrome.i18n.getMessage("several_suffix");
		var daysword = chrome.i18n.getMessage("day");
	
		output += days;
		
		//add work days
		if(settings.showWorkDays)
		{
			output += " (" + wDays + ")";
		}
		
		output += " " + daysword + suffix + " " + chrome.i18n.getMessage("selected");
	
		return output;
	}
	catch (e) {
		handleError("tooltips_tipped.js getToolTipDynamic", e);
	}
}

/**
Return normal tool tip
*/
function getToolTipNormal(timestamp){
	
	try {
	
		var output = "";
		var outArray = [];
		var notes = getNoteArray();
		
		//Stupid casting
		timestamp = timestamp * 1;
		
		var date = new Date(timestamp);
		
		var day = date.getUTCDay();
		var month = date.getUTCMonth();
		var mDay = date.getUTCDate();
		
		var showDate = true;
		var showNote = true;
		var showDayInYear = true;
		var showFromToday = true;
		var showFromMarkedDate = true;
		var showSubDates = true;
		
		
			
		if(showDate)
		{
			str_showDate =  getDateString(timestamp, true);
			outArray.push("<div class='popup popup_date'>"+str_showDate+"</div>");
		}
		
		if(showNote && notes[timestamp] !== undefined)
		{
			outArray.push("<div class='popup note'>"+notes[timestamp]+"</div>");
		}
		
		if(showDayInYear)
		{
			//Day of the year
			str_showDayInYear = chrome.i18n.getMessage("dayCapital")+" "+(date.getDayOfYear())+" / "+(date.getDaysLeftInYear())+" "+chrome.i18n.getMessage("left");
			outArray.push("<div class='popup'>"+str_showDayInYear+"</div>");
		}
		
		if(showFromToday)
		{
			var fromToday = date.getDistanceInDays(todayStamp);
			
			var suffix  = "";
			
			if(Math.abs(fromToday) != 1)
			{
				suffix = chrome.i18n.getMessage("several_suffix"); //"s" if one
			}
	
			var countDown;
			if(fromToday < 0)
				{
					countDown = Math.abs(fromToday)+" "+chrome.i18n.getMessage("day", "test")+suffix+" "+chrome.i18n.getMessage("ago");	
					outArray.push("<div class='popup'>"+countDown+"</div>");
				}
				else if(fromToday > 0)
				{
					countDown = fromToday+" "+chrome.i18n.getMessage("day")+suffix+" "+chrome.i18n.getMessage("leftuntil")+".";
					outArray.push("<div class='popup'>"+countDown+"</div>");
				}
								
		}
			
		
				
		if(showFromMarkedDate && timestamp != getMainDate())
		{
			outArray.push(getCountDownDiffString(date, getMainDate()));
		}
		
		var subDates = getSubDates();
		var numberOfSubdates = subDates.length;
				
		if(showSubDates)
		{	
			for(k = 0; k < Math.min(numberOfSubdates, settings.maxNumberOfSecondaryDaysInPopup); k++)
			{	
				if(timestamp.toString() !== subDates[k].toString())
				{
					var outString = "";
					outString = getCountDownDiffString(new Date(timestamp), subDates[k]*1);
					outArray.push(outString);
				}
			}
			//Add ... to end
			if(numberOfSubdates > settings.maxNumberOfSecondaryDaysInPopup)
			{
				outArray.push("...");
			}
			
		}
		
		//Clean out "null" and return result
		outArray = outArray.clean("null");	
		return outArray.join("");
	}
	catch(e)
	{
		handleError("tooltips_tipped.js getToolTipNormal", e);
	}
		
}



/**
Show countdown for date
*/
function getCountDownDiffString(ndate, countToDate)
{
	try {
	
		var outputString = "";
		
		var countDownDate = countToDate;
		
		var customNote = null;
		
		var notes = getNoteArray();
		
		var dayDiffCountDate;
		
		if(notes[countToDate] !== undefined)
		{
			customNote = notes[countToDate];
		}
		
		//Should we count up/down to date in popup?
		if(countDownDate !== false){
	
			var countDate = new Date(countDownDate*1);	//Stupid casting again
	
			dayDiffCountDate = days_between(ndate, countDate);	//Finding diff between oldid and now
		}
				
		var agountil = chrome.i18n.getMessage("until");
		
		if(ndate > countDownDate) agountil = chrome.i18n.getMessage("since");
		
		if(customNote !== null)
		{ 
			localNote = agountil + " "  + customNote; 
		}
		else {
			localNote = agountil + " " + getDateString(countToDate, false);
		}
		
		//"Days from countdown date"
		if( isNaN(dayDiffCountDate) === false && dayDiffCountDate !== 0) {
	
			var suffix  = "";
	
			if(Math.abs(dayDiffCountDate) != 1) suffix = chrome.i18n.getMessage("several_suffix"); //"s" if > one
	
			outputString = dayDiffCountDate+" "+chrome.i18n.getMessage("day")+suffix+" "+localNote;
			return "<div class='popup'>"+outputString+"</div>";
		}
		else
		{
			return "null";
		}
	}
	catch(e)
	{
		handleError("tooltips_tipped.js getCountDownDiffString", e);
	}
	
}