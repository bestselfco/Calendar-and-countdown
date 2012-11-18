/**
Check if there is a need to upgrade dates to UTC format
*/
function doUTCUpgrade()
{
	//Stupid checking code to see if we have already updated to UTC. 
	var tDates = getDates();
	
	//If we are updating, update scores
	if(tDates !== null)
	{ 
		log("Update to UTC", "Checking times to see if update done");
		
		//Check if stored date has UTC time of "0", update if not. 
		var checkUpdateDate = new Date(tDates[0] * 1);
		var updateTime = checkUpdateDate.getUTCHours() * 1;

		if(updateTime != 0)
		{
			updateDatesToUtc();
		}
		else {
			log("Update to UTC", "Already UTC");
		}
		
	}
}