//var settings = {};
//var dates = {};

function initOptionsDo()
{
	var initOptionsChain = jWorkflow.order(getStorageLocation).andThen(readSettingsFromStorage).andThen(init);
	initOptionsChain.start();
}

function init()
{
	try {
		//Copyright year
		var dd = new Date();
		$(".copyyear").html(dd.getUTCFullYear());
	
		var firstDay = settings.firstDay;
		if(firstDay == "0")
		{
			document.getElementById("firstday0").checked = true;
		}
		else
		{
			document.getElementById("firstday1").checked = true;
		}
	
		var showFrom = settings.showFrom;
		if(showFrom == 3)
		{
			document.getElementById("firstMonth3").checked = true;
		}
		else if(showFrom == 2)
		{
			document.getElementById("firstMonth2").checked = true;
		}
		else if(showFrom == 1){
			document.getElementById("firstMonth1").checked = true;
		}
	
		var showBadge = settings.showBadge;
		if(showBadge == "0")
		{
			document.getElementById("showBadge0").checked = true;
		}
		else
		{
			document.getElementById("showBadge1").checked = true;
		}
		
		var showWorkDays = settings.showWorkDays;
		if(showWorkDays == true)
		{
			document.getElementById("showWorkDays1").checked = true;
		}
		else 
		{
			document.getElementById("showWorkDays0").checked = true;
		}
		
		var popup = settings.popup;
		if(popup == "3")
		{
			document.getElementById("show31203").checked = true;
		}
		else
		{
			document.getElementById("show31212").checked = true;
		}
		
		
	
		var showweek = settings.showWeek;
		if(showweek == "0")
		{
			document.getElementById("showweek0").checked = true;
		}
		else
		{
			document.getElementById("showweek1").checked = true;
		}
		
		var showStartBubble = settings.showBubbleOnStart;
		if(showStartBubble === true)
		{	
			document.getElementById("showBubbleOnStart1").checked = true;
		}
		else
		{
			document.getElementById("showBubbleOnStart0").checked = true;
		}
		
		var dateFormatShort = settings.dateFormatShort;
		if(dateFormatShort == "yy-mm-dd")
		{
			document.getElementById("dateShort2").checked = true;
		}
		else if(dateFormatShort == "mm-dd-yy")
		{
			document.getElementById("dateShort1").checked = true;
		}
		else if(dateFormatShort == "dd.mm.yy")
		{
			document.getElementById("dateShort0").checked = true;
		}
		else {
			//Set to default in case of corruption
			changeSetting("dateFormatShort", "dd.mm.yy", true);
			document.getElementById("dateShort0").checked = true;
		}
		
		var iconTextStyle = settings.iconShowText;
		if(iconTextStyle == 2)
		{
			document.getElementById("setIconText2").checked = true;
		}
		else if (iconTextStyle == 1)
		{
			document.getElementById("setIconText1").checked = true;
		}
		else if (iconTextStyle == 0) 
		{
			document.getElementById("setIconText0").checked = true;
		}
		
		if(dataStoreLoc == "local") document.getElementById("sync0").checked = true;
		if(dataStoreLoc == "sync") document.getElementById("sync1").checked = true;
				
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
		
		$("#show31203").off().on("click", function() { changeSetting("popup", 3, true); });
		$("#show31212").off().on("click", function() { changeSetting("popup", 12, true); });
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
		
		$("#dateShort0").off().on("click", function() { changeSetting("dateFormatShort", "dd.mm.yy", true); });
		$("#dateShort1").off().on("click", function() { changeSetting("dateFormatShort", "mm-dd-yy", true); });
		$("#dateShort2").off().on("click", function() { changeSetting("dateFormatShort", "yy-mm-dd", true); });
		
		$("#setIconText0").off().on("click", function() { changeSetting("iconShowText", 0, true); });
		$("#setIconText1").off().on("click", function() { changeSetting("iconShowText", 1, true); });	
		$("#setIconText2").off().on("click", function() { changeSetting("iconShowText", 2, true); });
		
		
		$("#firstMonth1").off().on("click", function() { changeSetting("showFrom", 1, true); });
		$("#firstMonth2").off().on("click", function() { changeSetting("showFrom", 2, true); });
		$("#firstMonth3").off().on("click", function() { changeSetting("showFrom", 3, true); });
		
		$(".badgeColorSelector").off().on("click", function () { changeBadgeColor(this); });
		
		$("#reseteverything").off().on("click", function() { resetEverything(); });
			
		$("#ccversion").html(version.currVersion);
		
		
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
	var iconSetup = new Object();
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
		
        trackEvent("Setting change", key, value);
		
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

/*
Reset extension
*/
function resetEverything()
{	
	try {
		trackEvent("Full reset", version.currVersion, "");
		
		dataStore.remove("settings");
		dataStore.remove("dates");
		
		chrome.runtime.reload();
	}
	catch(e)
	{
		handleError("Options, resetEverything", e);
	}
}


$(document).ready(function() {
  initOptionsDo();
});

