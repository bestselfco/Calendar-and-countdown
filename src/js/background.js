//Bootstrap
$(document).ready(function() {
	bginit();
});


function bginit()
{
	log("Event", "BGInit");
	resetSettings();
	maintainLoop();
	googleTrack("Initialized", extVersion);
}


//Run maintenance script every minute
function maintainLoop()
{
	maintain();
	var t = setTimeout("maintainLoop()", 60000);
}


//Maintain data
function maintain()
{
	log("Event", "maintain()");


	updateBadgeFromStored();
	updatePopupFromStored();
	updateIconFromStored();

	setToolTip(new Date().toLocaleDateString());

}

function resetSettings()
{
	log("Event", "resetSettings()");

	var badgeColor = getItem("badgeColor");

	if(badgeColor == null) {
		var color = "#18CD32";
		setItem("badgeColor", color);
		log("setting up default badge color");
	}

	var popup = getItem("popup");
	if(popup == null) {
		var popup = "12";
		setItem("popup", popup);
		log("setting up default popup");
	}

	var iconColor = getItem("iconColor");
	if(iconColor == null) {
		var popup = "red";
		setItem("iconColor", popup);
		log("setting default icon color");
	}

}

function updateIconFromStored()
{
	var iconColor = getItem("iconColor");
	setIcon(iconColor);
}



function updateBadgeFromStored()
{
	var countto = getItem("countto");

	if(countto != null)
	{
		try {
			var badgeDate = new Date((countto*1)+86400000); //Stupid casting

			var diff = Math.abs(badgeDate.getDaysFromToday());

			if(badgeDate.getFullYear() > 1980 && badgeDate.getFullYear() < 2050)
			{
				setBadge(diff);
			}
		}
		catch(err)
		{

		}

	}
}

function updatePopupFromStored()
{
	var popup = getItem("popup");
	setPopup(popup);
}

//Listen for external stuff
chrome.extension.onRequest.addListener(
		function(request, sender, sendResponse) {
			if (request.action == "trackEvent") {

				sendResponse({response: "ok"});
				log("Google Analytics", request.event_type + ": "+request.event_details);
				_gaq.push(['_trackEvent', request.event_type, request.event_details]);

			}
			else if (request.action == "refresh") {

				sendResponse({response: "ok"});

				log("Options event", "Refreshing settings");

				maintain();

			}
			else
				sendResponse({}); // snub them.
		});

function setIconToCanvasForTesting()
{

	var iconCanvas = document.getElementById('iconCanvas');
	iconCanvas.height = 19;
	iconCanvas.width = 19;

	var iconContext = iconCanvas.getContext('2d');

	iconContext.fillStyle = '#000000';  
	iconContext.fillRect(0, 0, 10, 10);

	var iconImageData = iconContext.createImageData(19,19);

	chrome.browserAction.setIcon({imageData:iconImageData});

}