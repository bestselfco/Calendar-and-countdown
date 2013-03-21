//var settings = {};
//var dates = {};

function initOptionsDo()
{
	var initOptionsChain = jWorkflow.order(readSettingsFromStorage).andThen(init).andThen(checkOnlineStorageContent);
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
	
		
		$("#div_show312").buttonset();
		$("#divOptionWeek").buttonset();
		$("#divOptionWeekNumbers").buttonset();
		$("#divOptionMoonPhase").buttonset();
		$("#optionsShowBadge").buttonset();
		$("#divShowBubbleOnStart").buttonset();
		$("#optionsDateFormatShort").buttonset();
		$("#optionsDateFormatLong").buttonset();
		$("#div_firstMonth").buttonset();
		$("#divSetIconTest").buttonset();
		
		$("#reseteverything a").button();
		$("#resettext a").button();
		
		//Bind events
		$("#show31203").on("click", function() { changeSetting("popup", 3, true); });
		$("#show31212").on("click", function() { changeSetting("popup", 12, true); });
		$("#firstday0").on("click", function() { changeSetting("firstDay", 0, true); });
		$("#firstday1").on("click", function() { changeSetting("firstDay", 1, true); });
		$("#showweek0").on("click", function() { changeSetting("showWeek", '0', true); });
		$("#showweek1").on("click", function() { changeSetting("showWeek", '1', true); });
		$("#showBadge0").on("click", function() { changeSetting("showBadge", 0, true); });
		$("#showBadge1").on("click", function() { changeSetting("showBadge", 1, true); });
		$("#showBubbleOnStart0").on("click", function() { changeSetting("showBubbleOnStart", false, true); });
		$("#showBubbleOnStart1").on("click", function() { changeSetting("showBubbleOnStart", true, true); });
		
		$("#dateShort0").on("click", function() { changeSetting("dateFormatShort", "dd.mm.yy", true); });
		$("#dateShort1").on("click", function() { changeSetting("dateFormatShort", "mm-dd-yy", true); });
		$("#dateShort2").on("click", function() { changeSetting("dateFormatShort", "yy-mm-dd", true); });
		
		$("#setIconText0").on("click", function() { changeSetting("iconShowText", 0, true); });
		$("#setIconText1").on("click", function() { changeSetting("iconShowText", 1, true); });	
		$("#setIconText2").on("click", function() { changeSetting("iconShowText", 2, true); });
		
		
		$("#firstMonth1").on("click", function() { changeSetting("showFrom", 1, true); });
		$("#firstMonth2").on("click", function() { changeSetting("showFrom", 2, true); });
		$("#firstMonth3").on("click", function() { changeSetting("showFrom", 3, true); });
		
		$(".badgeColorSelector").on("click", function () { changeBadgeColor(this); });
		
		$("#reseteverything").on("click", function() { resetEverything(); });
			
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
		
		//settings = bg.settings;
		
		if(persist)
		{
			persistSettingsToStorage(settings);
            trackEvent("Setting change", key, value);
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
		
		settingsStorage.remove("settings");
		dateStorage.remove("dates");
		
		chrome.runtime.reload();
	}
	catch(e)
	{
		handleError("Options, resetEverything", e);
	}
}

function checkOnlineStorageContent()
{
	chrome.storage.sync.get("settings", function(items){
		var type = typeof(items.settings)
		if(type === "object")
		{
			logger("info", "Storage", "Settings exists in synced storage");
		}
		else
		{
			logger("info", "Storage", "Settings does not exist in synced storage");
		}
	});
	
	chrome.storage.sync.get("dates", function(items){
			
	});
}

/**
Copy a local storage item from localstorage to synced storage
*/
function copyLocalStorageToSyncedStorage(whatToCopy)
{
	try {
		chrome.storage.local.get(whatToCopy, function(items){
			var type = typeof(items[whatToCopy]);
			if(type === "object")
			{
				var toStore = {};
				toStore[whatToCopy] = items["settings"];
				//console.log(toStore);
				chrome.storage.sync.set(toStore, function(){
					logger("info", "Storage", whatToCopy+" has been copied to synced storage");
				});
			}
			else
			{
				logger("info", "Storage", whatToCopy+" was not found in local storage");
				handleError("Options, copyLocalStorageToSyncedStorage", new Error("Tried to copy non-existing item to synced storage: "+whatToCopy));
			}
		});
	}
	catch(err)
	{
		handleError("options, copyLocalStorageToSyncedStorage", e);
	}
}

/**
Copy a synced storage item from synclstorage to local storage
*/
function copySyncedStorageToLocalStorage(whatToCopy)
{
	try {
		chrome.storage.sync.get(whatToCopy, function(items){
			var type = typeof(items[whatToCopy]);
			if(type === "object")
			{
				var toStore = {};
				toStore[whatToCopy] = items["settings"];
				//console.log(toStore);
				chrome.storage.local.set(toStore, function(){
					logger("info", "Storage", whatToCopy+" has been copied to local storage");
				});
			}
			else
			{
				logger("info", "Storage", whatToCopy+" was not found in synced storage");
				handleError("Options, copySyncedStorageToLocalStorage", new Error("Tried to copy non-existing item to local storage: "+whatToCopy));
			}
		});
	}
	catch(err)
	{
		handleError("options, copySyncedStorageToLocalStorage", e);
	}
}


$(document).ready(function() {
  initOptionsDo();
});

