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
	googleTrack("setting_change", "badge_color");

}

function setIconColor(color)
{
	setItem("iconColor", color);
	chrome.extension.sendRequest({action: "refresh"});
	googleTrack("setting_change", "icon_color_"+color);
}

function setPopupFile(value)
{
	setItem("popup", value);
	chrome.extension.sendRequest({action: "refresh"});
	googleTrack("setting_change", "calendar_type_"+value);

}

function setFirstDay(value)
{
	setItem("firstDay", value);
	chrome.extension.sendRequest({action: "refresh"});
	googleTrack("setting_change", "calendar_first_day_"+value);
}

function setWeek(value)
{
	setItem("showWeek", value);
	chrome.extension.sendRequest({action: "refresh"});
	googleTrack("setting_change", "calendar_show_week_"+value);
}

