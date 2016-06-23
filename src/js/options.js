var googleAPIIsLoaded = false;

function initOptionsDo()
{
	var initOptionsChain = jWorkflow.order(readSettingsFromStorage).andThen(readDatesFromStorage).andThen(init).andThen(loadGoogleAPIClient);
	initOptionsChain.start();
}

function init()
{
	try {

		//Attach storage change listener to remove from list

		chrome.storage.onChanged.addListener(function(changes, namespace) {
			initOptionsDo();
		 	//Run maintenance whenever storage has changed for some reason
			logger("debug", "Options list reset", "Run because of storage change");

		});

		//Copyright year
		var dd = new Date();
		$(".copyyear").html(dd.getUTCFullYear());
	
		var firstDay = settings.firstDay;
		if(firstDay == "0")
		{
			$("#firstday0").prop('checked', true);
		}
		else
		{
			$("#firstday1").prop('checked', true);
		}
	
		var showFrom = settings.showFrom;
		if(showFrom == 3)
		{
			$("#firstMonth3").prop('checked', true);
			//document.getElementById("firstMonth3").checked = true;
		}
		else if(showFrom == 2)
		{
			$("#firstMonth2").prop('checked', true);
			//document.getElementById("firstMonth2").checked = true;
		}
		else if(showFrom == 1){
			$("#firstMonth1").prop('checked', true);
			//document.getElementById("firstMonth1").checked = true;
		}
	
		var showBadge = settings.showBadge;
		if(showBadge == "0")
		{
			$("#showBadge0").prop('checked', true);
			//document.getElementById("showBadge0").checked = true;
		}
		else
		{
			$("#showBadge1").prop('checked', true);
			
			//document.getElementById("showBadge1").checked = true;
		}
		
		var showWorkDays = settings.showWorkDays;
		if(showWorkDays === true)
		{
			$("#showWorkDays1").prop('checked', true);
			//document.getElementById("showWorkDays1").checked = true;
		}
		else 
		{
			$("#showWorkDays0").prop('checked', true);
			//document.getElementById("showWorkDays0").checked = true;
		}
		
		var popup = settings.popup;
		if(popup == "L")
		{
			$("#show312L").prop('checked', true);
		}
		else
		{
			$("#show31212").prop('checked', true);
		}
		
		var showweek = settings.showWeek;
		if(showweek == "0")
		{
			$("#showweek0").prop('checked', true);
			//document.getElementById("showweek0").checked = true;
		}
		else
		{
			$("#showweek1").prop('checked', true);
			//document.getElementById("showweek1").checked = true;
		}
		
		var showStartBubble = settings.showBubbleOnStart;
		if(showStartBubble === true)
		{	
			$("#showBubbleOnStart1").prop('checked', true);
			//document.getElementById("showBubbleOnStart1").checked = true;
		}
		else
		{
			$("#showBubbleOnStart0").prop('checked', true);
			//document.getElementById("showBubbleOnStart0").checked = true;
		}

		var easyRead = settings.easyRead;
		if(easyRead === 1)
		{
			$("#easyRead1").prop('checked', true);
		}
		else if(easyRead === 2)
		{
			$("#easyRead2").prop('checked', true);
		}
		else
		{
			$("#easyRead0").prop('checked', true);
		}
		
		var dateFormatShort = settings.dateFormatShort;
		if(dateFormatShort == "yy-mm-dd")
		{
			$("#dateShort2").prop('checked', true);
			//document.getElementById("dateShort2").checked = true;
		}
		else if(dateFormatShort == "mm-dd-yy")
		{
			$("#dateShort1").prop('checked', true);
			//document.getElementById("dateShort1").checked = true;
		}
		else if(dateFormatShort == "dd.mm.yy")
		{
			$("#dateShort0").prop('checked', true);
			//document.getElementById("dateShort0").checked = true;
		}
		else {
			//Set to default in case of corruption
			changeSetting("dateFormatShort", "dd.mm.yy", true);
			$("#dateShort0").prop('checked', true);
			//document.getElementById("dateShort0").checked = true;
		}
		
		var iconTextStyle = settings.iconShowText;
		if(iconTextStyle == 2)
		{
			$("#setIconText2").prop('checked', true);
			//document.getElementById("setIconText2").checked = true;
		}
		else if (iconTextStyle == 1)
		{
			$("#setIconText1").prop('checked', true);
			//document.getElementById("setIconText1").checked = true;
		}
		else
		{
			$("#setIconText0").prop('checked', true);
			
		}

		var countStringType = settings.countStringType;
		if(countStringType == 2)
		{
			$("#countDownFormat1").prop('checked', true);
		}
		else if(countStringType == 3)
		{
			$("#countDownFormat2").prop('checked', true);
		}
		else
		{
			$("#countDownFormat0").prop('checked', true);
			changeSetting("countStringType", 1, true);
		}
		
		//if(dataStoreLoc == "local") document.getElementById("sync0").checked = true;
		//if(dataStoreLoc == "sync") document.getElementById("sync1").checked = true;
				
		//Setup Icon selector Colors
		createIconPreview('#A0391B', "canvas_icon_9");
		createIconPreview('#FF0000', "canvas_icon_10");
		createIconPreview('#737373', "canvas_icon_11");
		createIconPreview('#DED210', "canvas_icon_12");
		createIconPreview('#1B8CA0', "canvas_icon_13");
		createIconPreview('#1BA032', "canvas_icon_14");
		createIconPreview('#1B4AA0', "canvas_icon_15");
		createIconPreview('#0000FF', "canvas_icon_16");
		
		//Setup badge color selector colors
		$("#badge_color_1").css("background-color", "#A0391B").attr("colorval", "#A0391B");
		$("#badge_color_2").css("background-color", "#FF0000").attr("colorval", "#FF0000");
		$("#badge_color_3").css("background-color", "#737373").attr("colorval", "#737373");
		$("#badge_color_4").css("background-color", "#DED210").attr("colorval", "#DED210");
		$("#badge_color_5").css("background-color", "#1B8CA0").attr("colorval", "#1B8CA0");
		$("#badge_color_6").css("background-color", "#1BA032").attr("colorval", "#1BA032");
		$("#badge_color_7").css("background-color", "#1B4AA0").attr("colorval", "#1B4AA0");
		$("#badge_color_8").css("background-color", "#0000FF").attr("colorval", "#0000FF");

		//Add button sets		
		$(".optionButtons").buttonset();
		
		$("#reseteverything a").button();
		$("#resettext a").button();
		
		//Bind events
		$("#sync0").off().on("click", function() { doMigrateStorageLocationToLocal(); location.reload(); });
		$("#sync1").off().on("click", function() { doMigrateStorageLocationToCloud(); location.reload(); });
		
		$("#copyLocalCloud").off().on("click", function() { doOverwriteCloudWithLocal(); });
		$("#copyCloudLocal").off().on("click", function() { doOverwriteLocalWithCloud(); });
		
		$("#show31212").off().on("click", function() { changeSetting("popup", 12, true); });
		$("#show312L").off().on("click", function() { changeSetting("popup", "L", true); });
		
		$("#firstday0").off().on("click", function() { changeSetting("firstDay", 0, true); });
		$("#firstday1").off().on("click", function() { changeSetting("firstDay", 1, true); });
		
		$("#showweek0").off().on("click", function() { changeSetting("showWeek", '0', true); });
		$("#showweek1").off().on("click", function() { changeSetting("showWeek", '1', true); });
		
		$("#showBadge0").off().on("click", function() { changeSetting("showBadge", 0, true); });
		$("#showBadge1").off().on("click", function() { changeSetting("showBadge", 1, true); });
		
		$("#showWorkDays0").off().on("click", function() { changeSetting("showWorkDays", false, true); });
		$("#showWorkDays1").off().on("click", function() { changeSetting("showWorkDays", true, true); });
		
		$("#showBubbleOnStart0").off().on("click", function() { changeSetting("showBubbleOnStart", false, true); });
		$("#showBubbleOnStart1").off().on("click", function() { changeSetting("showBubbleOnStart", true, true); });

		$("#easyRead0").off().on("click", function() { changeSetting("easyRead", 0, true); });
		$("#easyRead1").off().on("click", function() { changeSetting("easyRead", 1, true); });
		$("#easyRead2").off().on("click", function() { changeSetting("easyRead", 2, true); });
		
		$("#dateShort0").off().on("click", function() { changeSetting("dateFormatShort", "dd.mm.yy", true); });
		$("#dateShort1").off().on("click", function() { changeSetting("dateFormatShort", "mm-dd-yy", true); });
		$("#dateShort2").off().on("click", function() { changeSetting("dateFormatShort", "yy-mm-dd", true); });
		
		$("#setIconText0").off().on("click", function() { changeSetting("iconShowText", 0, true); });
		$("#setIconText1").off().on("click", function() { changeSetting("iconShowText", 1, true); });	
		$("#setIconText2").off().on("click", function() { changeSetting("iconShowText", 2, true); });
		
		$("#firstMonth1").off().on("click", function() { changeSetting("showFrom", 1, true); });
		$("#firstMonth2").off().on("click", function() { changeSetting("showFrom", 2, true); });
		$("#firstMonth3").off().on("click", function() { changeSetting("showFrom", 3, true); });

		$("#countDownFormat0").off().on("click", function() { changeSetting("countStringType", 1, true); });
		$("#countDownFormat1").off().on("click", function() { changeSetting("countStringType", 2, true); });
		$("#countDownFormat2").off().on("click", function() { changeSetting("countStringType", 3, true); });
		
		$(".badgeColorSelector").off().on("click", function () { changeBadgeColor(this); });
		
		$("#reseteverything").off().on("click", function() { resetEverything(); });
			
		$("#ccversion").html(version.currVersion);

		//Show date list
		optionsDisplayDates();
		
		trackEvent("Interaction", "Open Options", "");
		trackPageView("Options");
		
	}
	catch(e)
	{
		handleError("Options, init", e);
	}
	
}

/**
Set badge color
*/
function changeBadgeColor(item)
{
	try {
		var colorValue = $(item).attr("colorval");
		changeSetting("badgeColor", colorValue, true);
	}
	catch(e)
	{
		handleError("Options, changeBadgeColor", e);
	}	
}

//Create an icon preview and bind it to the icon setup function
function createIconPreview(topColor, targetCanvas)
{

	try {
	//Setup object
	var iconSetup = {};
	iconSetup.showNumbers = "0";
	iconSetup.fillText = "0";
	iconSetup.topColor = topColor;
	iconSetup.textColor = settings.iconTextColor;
	
	//Bind event
	var selectString = "#"+targetCanvas;
	$(selectString).bind('click', function() {
		changeSetting("iconTopColor", topColor, true);
	});
	
	document.getElementById(targetCanvas).getContext("2d").putImageData(new Icon(iconSetup).getImage(),0,0);
	
	}
	catch(e)
	{
		handleError("Options, createIconPreview", e);
	}	

}


/**
Write a setting to storage and persist it if persist is true, before maintaining all views
*/
function changeSetting(key, value, persist)
{
	
	try {
		log("Setting changed", key+": "+value+ " - persist: " + persist);
		
		settings[key] = value;
		
        trackEvent("Interaction", "Setting " + key, value);
		
		if(persist)
		{
			persistSettingsToStorage(settings);
            
		}
	}
	catch(e)
	{
		handleError("Options, changeSetting", e);
	}
		
}

function optionsDisplayDates()
{

	$("#dateList").html("");

	for (var date in ccDates) {
		var tmpD = ccDates[date];

		var tmpDate = new Date(tmpD.timestamp * 1);
		
		var cssId = "dateListDate_" + tmpD.timestamp;
		var selector  = "#"+cssId;

		var outString = "<span class='optionDateListDate' timestamp ='"+tmpD.timestamp+"' id='"+cssId+"'>";

		//outString += tmpD.timestamp;
		outString += getDateString(tmpD.timestamp*1, false);


		if(tmpD.note !== null)
		{

			outString += ": "+tmpD.note;

		}

		outString += "</span>";

		$("#dateList").append(outString);

		if(tmpD.color !== null)
		{
			$(selector).css("background-color", tmpD.color);
		}

		$(selector).on("click", deleteStoredDataFromList);

	}
}

function deleteStoredDataFromList(e)
{
	var stamp = e.target.attributes.timestamp.value;
	var date = new Date(stamp*1);

	var	dateS = getDateString(stamp*1, false);

	var r = confirm("Delete all data for " + dateS + "?");

	if (r === true) {

		//Do it!
		deleteDateInfoAll(stamp);

		trackEvent("Interaction", "Options", "Deleted date - OK");
	}
	else if (r === false)
	{
		trackEvent("Interaction", "Options", "Deleted date - Cancelled");
	}
}

/*
Reset extension
*/
function resetEverything()
{	
	try {
		trackEvent("Interaction", "Options", "Reset everything");
		
		dataStore.remove("settings");
		dataStore.remove("dates");
		
		chrome.runtime.reload();
	}
	catch(e)
	{
		handleError("Options, resetEverything", e);
	}
}

function handleGoogleAPIClientLoad()
{
	logger("integration", "Google API load", "Options loaded");
	googleAPIIsLoaded = true;

}




$(document).ready(function() {
  initOptionsDo();
});