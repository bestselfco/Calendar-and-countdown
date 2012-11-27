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
	
	var colorSelected = bg.settings.badgeColor;

	$("#badgeColorSelect").val(colorSelected);
	
	todayDate = new Date().getUTCDate();
	cDownDate = 9;
	
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

	
	$("#div_show312").buttonset();
	$("#divOptionWeek").buttonset();
	$("#divOptionWeekNumbers").buttonset();
	$("#divOptionMoonPhase").buttonset();
	$("#optionsShowBadge").buttonset();
	$("#reseteverything a").button();
	$("#resettext a").button();
	
	//Bind events
	$("#show31203").on("click", function() { setPopupFile(3); });
	$("#show31212").on("click", function() { setPopupFile(12); });
	$("#firstday0").on("click", function() { setFirstDay(0); });
	$("#firstday1").on("click", function() { setFirstDay(1); });
	$("#showweek0").on("click", function() { setWeek('0'); });
	$("#showweek1").on("click", function() { setWeek('1'); });
	$("#showBadge0").on("click", function() { setShowBadge(0); });
	$("#showBadge1").on("click", function() { setShowBadge(1); });
	
	$("#reseteverything").on("click", function() { resetEverything(); });
	
	$("#badgeColorSelect").on("change", function() { setColor('badge',this.value); });
	
	$("#ccversion").html(bg.getVersion().currVersion);
	
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
	bg.settings.badgeColor = hex; //setItem("badgeColor",hex);
	bg.persistSettingsToStorage();
	bg.maintain(); 
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
	//setItem("icon_textColor", textColor);
	//setItem("icon_topColor", topColor);
	//setItem("icon_showtext", showText);
	
	bg.settings.iconShowText = showText;
	bg.settings.iconTextColor = textColor;
	bg.settings.iconTopColor = topColor;
	
	bg.persistSettingsToStorage();
	bg.maintain(); 
}

function setPopupFile(value)
{
	bg.settings.popup = value;
	bg.persistSettingsToStorage();
	bg.maintain(); 
}

function setFirstDay(value)
{
	bg.settings.firstDay = value;
	bg.persistSettingsToStorage(); //setItem("firstDay", value);	
	bg.maintain(); 
}

function setShowBadge(value)
{
	bg.settings.showBadge = value; // setItem("showBadge", value);
	bg.persistSettingsToStorage();
	bg.maintain(); 
}

function setWeek(value)
{
	bg.settings.showWeek = value; //setItem("showWeek", value);
	bg.persistSettingsToStorage();
	bg.maintain(); 
}

function resetEverything()
{
	$("#reseteverything").css("color", "blue");
	$("#reseteverything").html("Resetting extension");
	
	bg.killEmAll();
	
	window.location.reload();
}

$(document).ready(function() {
  init()
});

