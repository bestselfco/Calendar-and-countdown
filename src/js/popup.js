/*
 * 
 * Popup specific scripts
 * 
 */

function initCssChanges()
{
	log("CSS", "Initializing css changes");
}

//Somebody has clicked a date
function dayClicked(timestamp, force)
{
	oldId = getItem("countto");
	
	log("Day clicked", timestamp);

	var idDate = new Date(timestamp+86400000);
	var diff = Math.abs(idDate.getDaysFromToday());

	if(oldId == timestamp)
	{
		//Unselect all
		removeHighLights();
		log("Same day", timestamp);
		setBadge("");
		setItem("countto", "null");
	}
	else
	{
		log("New day", timestamp);
		highLightDay(timestamp);
		setItem("countto", timestamp);	
		setBadge(diff.toString());	
	}

	oldId = getItem("countto"); //Set the memory item as well

	googleTrack("Extension", "Calendar", "Day clicked");

	//Redo tooltips
	init();	

}


function highLightToday()
{
	var today = new Date();
	today.setSeconds(0, 0);
	today.setMinutes(0);
	today.setHours(0);
	var selectorString = '[dateTimestamp="'+today.getTime()+'"]';
	$(selectorString).addClass("cal_day_today");
}

//Highlight a specific day, remove other hightlights
function highLightDay(timestamp)
{	

	var selectorString = '[dateTimestamp="'+timestamp+'"]';
	//Unselect all
	removeHighLights();
	$(selectorString).removeClass(normalClass).addClass(selectorClass);

}

//Remove all highlights
function removeHighLights()
{
	$(selectedClass).addClass(normalClass).removeClass(selectorClass);
}