//Get background page and settings object
var bg = chrome.extension.getBackgroundPage();

function init()
{

	//Copyright year
	var dd = new Date();
	$(".copyyear").html(dd.getFullYear());

	var firstDay = bg.settings.firstDay;
	if(firstDay == "0")
	{
		document.getElementById("firstday0").checked = true;
	}
	else
	{
		document.getElementById("firstday1").checked = true;
	}

	var showBadge = bg.settings.showBadge;
	if(showBadge == "0")
	{
		document.getElementById("showBadge0").checked = true;
	}
	else
	{
		document.getElementById("showBadge1").checked = true;
	}
	
	var popup = bg.settings.popup;
	if(popup == "3")
	{
		document.getElementById("show31203").checked = true;
	}
	else
	{
		document.getElementById("show31212").checked = true;
	}

	var showweek = bg.settings.showWeek;
	if(showweek == "0")
	{
		document.getElementById("showweek0").checked = true;
	}
	else
	{
		document.getElementById("showweek1").checked = true;
	}
	
	var showStartBubble = bg.settings.showBubbleOnStart;
	if(showStartBubble === true)
	{	
		document.getElementById("showBubbleOnStart1").checked = true;
	}
	else
	{
		document.getElementById("showBubbleOnStart0").checked = true;
	}
	
	var dateFormatShort = bg.settings.dateFormatShort;
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
	
	var iconTextStyle = bg.settings.iconShowText;
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
	
	var badgeColorSelected = bg.settings.badgeColor;
	$("#badgeColorSelect").val(badgeColorSelected);

	//Setup Icon selector Colors
	createIconPreview('#A0391B', "canvas_icon_9");
	createIconPreview('#FF0000', "canvas_icon_10");
	createIconPreview('#737373', "canvas_icon_11");
	createIconPreview('#DED210', "canvas_icon_12");
	createIconPreview('#1B8CA0', "canvas_icon_13");
	createIconPreview('#1BA032', "canvas_icon_14");
	createIconPreview('#1B4AA0', "canvas_icon_15");
	createIconPreview('#0000FF', "canvas_icon_16");

	
	$("#div_show312").buttonset();
	$("#divOptionWeek").buttonset();
	$("#divOptionWeekNumbers").buttonset();
	$("#divOptionMoonPhase").buttonset();
	$("#optionsShowBadge").buttonset();
	$("#divShowBubbleOnStart").buttonset();
	$("#optionsDateFormatShort").buttonset();
	$("#optionsDateFormatLong").buttonset();
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
	
	
	
	$("#reseteverything").on("click", function() { resetEverything(); });
	
	$("#badgeColorSelect").on("change", function() { setColor('badge',this.value); });
	
	$("#ccversion").html(bg.getVersion().currVersion);
	
}

//Create an icon preview and bind it to the icon setup function
function createIconPreview(topColor, targetCanvas)
{
	//Setup object
	var iconSetup = new Object();
	iconSetup.showNumbers = "0";
	iconSetup.fillText = "0";
	iconSetup.topColor = topColor;
	iconSetup.textColor = bg.settings.iconTextColor;
	
	//Bind event
	var selectString = "#"+targetCanvas;
	$(selectString).bind('click', function() {
		changeSetting("iconTopColor", topColor, true);
	});
	
	document.getElementById(targetCanvas).getContext("2d").putImageData(new Icon(iconSetup).getImage(),0,0);

}

function setColor(where, hex)
{
	//Set color for selector element
	$("#badgeColorSelect").css("color", hex);
	
	changeSetting("badgeColor", hex, true);

}


/**
Write a setting to storage and persist it if persist is true, before maintaining all views
*/
function changeSetting(key, value, persist)
{
	log("Setting changed", key+": "+value+ " - persist: " + persist);
	
	bg.settings[key] = value;
	
	if(persist)
	{
		bg.persistSettingsToStorage();
		bg.maintain();
	}
		
}

function resetEverything()
{
	$("#reseteverything").css("color", "blue");
	$("#reseteverything").html("Resetting extension");
	
	bg.killEmAll();
	
	window.location.reload();
}

$(document).ready(function() {
  init();
  
  
  
});

