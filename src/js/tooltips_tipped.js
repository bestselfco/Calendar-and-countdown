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
/**
function updateRightClickToolTipMenu(content, event)
{

	try {

		
		var timestamp = lastEventDate; //$("#dateRightInputDialog").attr("dialogdatetimestamp");
		var currNote = getNoteForDate(timestamp);
	
		//$("#popupTableHeaderCell").html(getDateString(timestamp,true));
	
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
}*/

/** 
Reset tooltip menu
*/
/**
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
	
}
*/


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

			if(dates.mainDateArray.length !== 0)
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
								
		}
			
		
		//Show distance between this date and main date, if main date is set and not selected date.				
		if(showFromMarkedDate && timestamp != getMainDate() && dates.mainDateArray.length !== 0)
		{
			outArray.push(getCountDownDiffString(date, getMainDate()));
		}
		
		var subDates = getSubDates();
		var numberOfSubdates = subDates.length;		
		
		if(showSubDates && dates.subDateArray.length !== 0)
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

/*
* Parse remaining time to a more readable string.
typeOfString: 
0: no change
1: add " days"
2: parse to _y_w_d format.
*/
function parseDayCountToString(numberOfDays, typeOfString)
{
	var theRest = numberOfDays;
	var outString = "";
	var years;
	var weeks;

	if(typeOfString == 3)
	{
		
		if(theRest > 365)
		{
			years = Math.floor(theRest/365);
			outString = outString + years + "y ";
			theRest = theRest % 365;
		}
		outString = outString + theRest + "d";

		return outString;
	}
	if(typeOfString == 2)
	{
	
		if(theRest > 365)
		{
			years = Math.floor(theRest/365);
			outString = outString + years + "y ";
			theRest = theRest % 365;
		}
		if(theRest > 7)
		{
			weeks = Math.floor(theRest/7);
			outString = outString + weeks + "w ";
			theRest = theRest % 7;
		}

		outString = outString + theRest + "d";

		return outString;
	}
	else //Default to " x days"
	{
		var suffix = "";
		if(numberOfDays != 1)
		{
			suffix = "s";
		}
		return numberOfDays + " day" + suffix; 
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
			var daysString = parseDayCountToString(dayDiffCountDate, settings.countStringType);
	
			outputString = daysString + " " + localNote;
			
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

/**
Returns an interavtive tooltip. This used to be done in a very embarrasing way. Still some mess, but mostly because of legacy stuff. 
*/
function getInteractiveTooltip(t)
{

	//console.log(t);

	//Shell
	var out = document.createElement("div");
	$(out).addClass("dateRightInputDialog");

	//Header
	var hDiv = document.createElement("div");
	$(hDiv).attr("class", "popupDiv popupDiv10 popupDivHeader");
	var hDivSpan = document.createElement("span");
	$(hDivSpan).html(getDateString(t.timeStamp,true));
	$(hDiv).append(hDivSpan);
	$(out).append(hDiv);

	//Label "Countdown as"
	$(out).append("<div class='popupDiv popupDiv4'>Countdown as:</div>");

	//Countdown selector buttons
	var countButtons = document.createElement("div");
	$(countButtons).addClass("popupDiv popupDiv6");
	
	var mainButton = document.createElement("span");
	$(mainButton).addClass("popupButtonDate").html("Primary").on("click", {timeStamp: t.timeStamp}, function(event){
		setMainDate(event.data.timeStamp);
	});
	var secondButton = document.createElement("span");
	$(secondButton).addClass("popupButtonDate").html("Secondary").on("click", {timeStamp: t.timeStamp}, function(event){
		setSubDate(event.data.timeStamp);
		trackEvent("Interaction", "Popup - right", "Secondary date set");
	});

	$(countButtons).append(mainButton).append("&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;").append(secondButton);
	$(out).append(countButtons);

	//Note label
	$(out).append("<div class='popupDiv popupDiv2'><span class='dayNoteLabel'>Note:</span></div>");

	//Note field
	var noteDiv = document.createElement("div");
	$(noteDiv).addClass("popupDiv popupDiv7");
	var noteField = document.createElement("input");
	$(noteField).attr("type", "text").addClass("dayNoteInput").val(getNoteForDate(t.timeStamp)).on("change", {timeStamp: t.timeStamp}, function(event){
		addNoteToDate(event.data.timeStamp, event.target.value);
		trackEvent("Interaction", "Popup - right", "Note created");
	});

	var noteResetDiv = document.createElement("div");
	$(noteResetDiv).addClass("popupDiv popupDiv1");
	var noteReset = document.createElement("img");
	$(noteReset).attr("src", "pics/reset.png").addClass("resetNoteButton").on("click", {timeStamp: t.timeStamp}, function(event){
		$(noteField).val("");
		clearNoteFromDate(event.data.timeStamp);	
		trackEvent("Interaction", "Popup - right", "Clear note");
	});

	$(noteResetDiv).append(noteReset)

	$(noteDiv).append(noteField);

	$(out).append(noteDiv).append(noteResetDiv);

	$(out).append("<div class='popupDiv popupDiv2'><span class='dayColorLabel'>Color:</span></div>");

	//Colors!
	function createColorDiv(color)
	{
		var tmpD = document.createElement("div");
		$(tmpD).addClass("popupDiv PopupDiv1 popupDivColor");
		var tmpS = document.createElement("span");
		$(tmpS).addClass("colorButton").attr("style", "background-color: "+color).on("click",{timeStamp: t.timeStamp, color: color}, function(event){
			setColorForDate(event.data.timeStamp, event.data.color, false);
			trackEvent("Interaction", "Popup - right", "Color set");
		});
		$(tmpD).append(tmpS);

		return tmpD;
	}

	$(out).append(createColorDiv("#FFF700")).append(createColorDiv("#FFA500")).append(createColorDiv("#FF8373")).append(createColorDiv("#60B9CE")).append(createColorDiv("#58E000")).append(createColorDiv("#B764D4")).append(createColorDiv("#D4B764"));

	var colorResetDiv = document.createElement("div");
	$(colorResetDiv).addClass("popupDiv PopupDiv1");
	var colorReset = document.createElement("img");
	$(colorReset).attr("src", "pics/reset.png").addClass("resetColorButton").on("click", {timeStamp: t.timeStamp}, function(event){
			setColorForDate(event.data.timeStamp, "", true);
			trackEvent("Interaction", "Popup - right", "Color reset");
	});

	$(colorResetDiv).append(colorReset);

	$(out).append(colorResetDiv);

	return out;

}





