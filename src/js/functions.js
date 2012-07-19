var now = new Date(); //Today
var currentYear = now.getFullYear(); //This year
var firstDayOfWeek = 1; //Default value
//var oldId = 0; //Get countdown value
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

//Common date object. The new backbone of everything date related in this extension.
function CCDate(UTCTime)
{
    this.timestamp = UTCTime;
	
	this.date = new Date(UTCTime);
	
	
    this.dayClass = null;
    this.note = null;
	this.showNote = false;
	
	this.year = this.date.getUTCFullYear();
	this.month = this.date.getUTCMonth();
	this.workMonth = this.month - 1;
	this.day = this.date.getUTCDate();

	this.setNote = function(text){
		this.note = text;
	}
	
	return this;
}

//Create a UTC date from any date
function CCDateFromDate(year, month, day)
{
    var tmpStamp = Date.UTC(year,month,day);
    return new CCDate(tmpStamp);
}

function CCDateToday()
{
	var tmpDate = new Date();
	
	return new CCDateFromDate(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate());
}