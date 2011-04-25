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

}

function setColor(where, hex)
{
	//Set color for selector element
	$("#badgeColorSelect").css("color", hex);
	
	setItem("badgeColor",hex);
	chrome.extension.sendRequest({action: "refresh"});
	googleTrack("Options", "Setting change", "Badge color");

}

function setIconColor(color)
{
	setItem("iconColor", color);
	chrome.extension.sendRequest({action: "refresh"});
	googleTrack("Options", "Setting change", "Icon color");
	googleTrack("Options", "Icon color", color);
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

function setWeek(value)
{
	setItem("showWeek", value);
	chrome.extension.sendRequest({action: "refresh"});
	
	googleTrack("Options", "Setting change", "Show week number");
	googleTrack("Options", "Week number", value);
	
}

function resetCache()
{
	
}
