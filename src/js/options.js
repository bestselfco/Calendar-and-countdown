function init()
{

	//Setup tabs
	$(function() {
		$("ul.tabs").tabs("div.options > div");
	});

	var firstDay = getItem("firstDay");
	if(firstDay == "0")
	{
		document.getElementById("firstday0").checked = true;
	}
	else
	{
		document.getElementById("firstday1").checked = true;
	}

	var showBadge = getItem("showBadge");
	if(showBadge == "0")
	{
		document.getElementById("showBadge0").checked = true;
	}
	else
	{
		document.getElementById("showBadge1").checked = true;
	}
	
	var popup = getItem("popup");
	if(popup == "3")
	{
		document.getElementById("show31203").checked = true;
	}
	else
	{
		document.getElementById("show31212").checked = true;
	}

	var showweek = getItem("showWeek");
	if(showweek == "0")
	{
		document.getElementById("showweek0").checked = true;
	}
	else
	{
		document.getElementById("showweek1").checked = true;
	}

	$("#badgeColorSelect").val(getItem("badgeColor"));//;
	document.getElementById('badgeColorSelect').color.fromString(getItem("badgeColor"));
	
	todayDate = new Date().getDate();
	cDownDate = getDistanceInDays();
	
	//Setup Icon selector Colors
	createIconPreview("1", todayDate, 'rgba(160,57,27,1)', 'rgba(0,0,0,0.65)', "canvas_icon_1");
	createIconPreview("1", todayDate, 'rgba(255,0,0,1)', 'rgba(0,0,0,0.65)', "canvas_icon_2");
	createIconPreview("1", todayDate, 'rgba(115,115,115,1)', 'rgba(0,0,0,0.65)', "canvas_icon_3");
	createIconPreview("1", todayDate, 'rgba(222,210,16,1)', 'rgba(0,0,0,0.65)', "canvas_icon_4");
	createIconPreview("1", todayDate, 'rgba(27,140,160,1)', 'rgba(0,0,0,0.65)', "canvas_icon_5");
	createIconPreview("1", todayDate, 'rgba(27,160,40,1)', 'rgba(0,0,0,0.65)', "canvas_icon_6");
	createIconPreview("1", todayDate, 'rgba(27,74,160,1)', 'rgba(0,0,0,0.65)', "canvas_icon_7");
	createIconPreview("1", todayDate, 'rgba(0,0,255,1)', 'rgba(0,0,0,0.65)', "canvas_icon_8");
	
	createIconPreview("0", todayDate, 'rgba(160,57,27,1)', 'rgba(0,0,0,0.65)', "canvas_icon_9");
	createIconPreview("0", todayDate, 'rgba(255,0,0,1)', 'rgba(0,0,0,0.65)', "canvas_icon_10");
	createIconPreview("0", todayDate, 'rgba(115,115,115,1)', 'rgba(0,0,0,0.65)', "canvas_icon_11");
	createIconPreview("0", todayDate, 'rgba(222,210,16,1)', 'rgba(0,0,0,0.65)', "canvas_icon_12");
	createIconPreview("0", todayDate, 'rgba(27,140,160,1)', 'rgba(0,0,0,0.65)', "canvas_icon_13");
	createIconPreview("0", todayDate, 'rgba(27,160,40,1)', 'rgba(0,0,0,0.65)', "canvas_icon_14");
	createIconPreview("0", todayDate, 'rgba(27,74,160,1)', 'rgba(0,0,0,0.65)', "canvas_icon_15");
	createIconPreview("0", todayDate, 'rgba(0,0,255,1)', 'rgba(0,0,0,0.65)', "canvas_icon_16");

	createIconPreview("2", cDownDate, 'rgba(160,57,27,1)', 'rgba(0,0,0,0.65)', "canvas_icon_17");
	createIconPreview("2", cDownDate, 'rgba(255,0,0,1)', 'rgba(0,0,0,0.65)', "canvas_icon_18");
	createIconPreview("2", cDownDate, 'rgba(115,115,115,1)', 'rgba(0,0,0,0.65)', "canvas_icon_19");
	createIconPreview("2", cDownDate, 'rgba(222,210,16,1)', 'rgba(0,0,0,0.65)', "canvas_icon_20");
	createIconPreview("2", cDownDate, 'rgba(27,140,160,1)', 'rgba(0,0,0,0.65)', "canvas_icon_21");
	createIconPreview("2", cDownDate, 'rgba(27,160,40,1)', 'rgba(0,0,0,0.65)', "canvas_icon_22");
	createIconPreview("2", cDownDate, 'rgba(27,74,160,1)', 'rgba(0,0,0,0.65)', "canvas_icon_23");
	createIconPreview("2", cDownDate, 'rgba(0,0,255,1)', 'rgba(0,0,0,0.65)', "canvas_icon_24");

	
}

//Create an icon preview and bind it to the icon setup function
function createIconPreview(textType, textValue, topColor, textColor, targetCanvas)
{
	//Setup object
	var iconSetup = new Object();
	iconSetup.showNumbers = textType;
	iconSetup.fillText = textValue;
	iconSetup.topColor = topColor;
	iconSetup.textColor = textColor;
	
	//Bind event
	var selectString = "#"+targetCanvas;
	$(selectString).bind('click', function() {
		setIconProperties(topColor, textColor, textType);
	});
	
	//Create preview
	//createIcon(textType, textValue, topColor, textColor, targetCanvas);
	//createIcon(targetCanvas, iconSetup);
	
	document.getElementById(targetCanvas).getContext("2d").putImageData(new Icon(iconSetup).getImage(),0,0);

	
}

function setColor(where, hex)
{
	//Set color for selector element
	$("#badgeColorSelect").css("color", hex);
	
	setItem("badgeColor",hex);
	chrome.extension.sendRequest({action: "refresh"});
	googleTrack("Options", "Setting change", "Badge color");

}

/**
 * Set parameters for generating icon. New version, no more pngs.
 * 
 * @param topColor Color of top field
 * @param textColor Color of text
 * @param showText Should text be shown?
 */
function setIconProperties(topColor, textColor, showText)
{
	setItem("icon_textColor", textColor);
	setItem("icon_topColor", topColor);
	setItem("icon_showtext", showText);
	chrome.extension.sendRequest({action: "refresh"});
	googleTrack("Options", "Setting change", "Icon colors");
}

function setPopupFile(value)
{
	setItem("popup", value);
	chrome.extension.sendRequest({action: "refresh"});
	googleTrack("Options", "Setting change", "Calendar type");
	googleTrack("Options", "Calendar type", value);

}

function setFirstDay(value)
{
	setItem("firstDay", value);
	
	//Refresh the cache - changed calendars
	
	chrome.extension.sendRequest({action: "killcache"});
	
	googleTrack("Options", "Setting change", "First day of week");
	googleTrack("Options", "First day", value);
}

function setShowBadge(value)
{
	setItem("showBadge", value);
	chrome.extension.sendRequest({action: "refresh"});
	
	googleTrack("Options", "Setting change", "Show badge");
	googleTrack("Options", "Show badge", value);
}

function setWeek(value)
{
	setItem("showWeek", value);
	chrome.extension.sendRequest({action: "refresh"});
	
	googleTrack("Options", "Setting change", "Show week number");
	googleTrack("Options", "Week number", value);
	
}

function resetCache()
{
	$("#resettext").css("color", "blue");
	$("#resettext").html("Resetting cache");
	
	googleTrack("Options", "Setting change", "Cache reset");
	
	chrome.extension.sendRequest({action: "killcache"}, function(response) {
		$("#resettext").css("color", "green");
		$("#resettext").html("Cache has been reset.");
	});
}

function resetEverything()
{
	$("#reseteverything").css("color", "blue");
	$("#reseteverything").html("Resetting extension");
	
	googleTrack("Options", "Setting change", "Full reset");
	
	chrome.extension.sendRequest({action: "killeverything"}, function(response) {
		$("#reseteverything").css("color", "green");
		$("#reseteverything").html("Everything has been reset.");
		window.location.reload();
	});
}