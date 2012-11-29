/**
COMMON FUNCTIONS FOR ALL PARTS OF THE APPLICATION. 
*/

var googleID = "caplfhpahpkhhckglldpmdmjclabckhc"; //For turning on/off logging
var extVersion = 0; //Get extension version - for logging

/**
 * Output to log if "debug" is true
 * 
 * @param cat Logging category
 * @param text Text to log
 */
function log(cat, text)
{
	if(location.hostname != googleID) //Only if local, not if proper
	{
		var time = new Date();
		console.log(time.getHours()+":"+time.getMinutes()+":"+time.getSeconds() + " " + cat + ": " + text);
	}
}