/** 
 * Get the ISO week date week number 
 */  
Date.prototype.getWeek = function () {  
    // Create a copy of this date object  
    var target  = new Date(this.valueOf());  
  
    // ISO week date weeks start on monday  
    // so correct the day number  
    var dayNr   = (this.getDay() + 6) % 7;  
  
    // ISO 8601 states that week 1 is the week  
    // with the first thursday of that year.  
    // Set the target date to the thursday in the target week  
    target.setDate(target.getDate() - dayNr + 3);  
  
    // Store the millisecond value of the target date  
    var firstThursday = target.valueOf();  
  
    // Set the target to the first thursday of the year  
    // First set the target to january first  
    target.setMonth(0, 1);  
    // Not a thursday? Correct the date to the next thursday  
    if (target.getDay() != 4) {  
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);  
    }  
  
    // The weeknumber is the number of weeks between the   
    // first thursday of the year and the thursday in the target week  
    return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000  
};  

//Return number of days in year
Date.prototype.getDaysInYear = function (){
	var year = this.getUTCFullYear();

	if((year % 100 !== 0 && year % 4 === 0)  || year%400 === 0)
	{
		return 366;
	}
	else
	{
		return 365;
	}	
};

//Get days left in year
Date.prototype.getDaysLeftInYear = function()
{
	return this.getDaysInYear() - this.getDayOfYear();
};

//Get days in month. No point in generalizing this. 
Date.prototype.getDaysInMonth = function()
{
	var month = this.getUTCMonth();

	if(month == 1 && this.getDaysInYear() == 366)
	{
		return 29;
	}
	else if(month == 1){
		return 28;
	}
	else if(month === 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11)
	{
		return 31;
	}
	else if(month == 3 || month == 5 || month == 8 || month == 10)
	{
		return 30;
	}
	else {
		return false;
	}


};


//Get day of the year
Date.prototype.getDayOfYear = function() {
	
	var todayUTC = this.getTime();
		
	var oneJanStamp = Date.UTC(this.getUTCFullYear(), 0, 1, 0 ,0 ,0);
	return Math.round((todayUTC - oneJanStamp) / 86400000) + 1;

};

//Get day distance from today.  Does not clean up non-round numbers. 
Date.prototype.getDaysFromToday = function () {

	var now = new Date();
	nowUtc = Date.UTC(now.getFullYear(),now.getMonth(), now.getDate());
	
	var diff = this.getDistanceInDays(nowUtc);	
	return diff;
};

//Get diff from this date to another given date. Does not clean up non-round numbers. 
Date.prototype.getDistanceInDays = function (timestamp) {
	
	var diff = (this.getTime() - timestamp) / 86400000;
	
	return diff;
};

//Get diff from this date to another given date, counting work days. Does not clean up non-round numbers. 
Date.prototype.getDistanceInWeekDaysFromToday = function() {
	var now = new Date();
	
	nowUtc = Date.UTC(now.getFullYear(),now.getMonth(), now.getDate());
	var diff = this.getDistanceInWeekDays(nowUtc);	

	return Math.max(diff-1,0);
};

//Get workdays distance. Looping, due to lack of will to think out a proper algorithm
Date.prototype.getDistanceInWeekDays = function(timestamp)
{

	try {
		var stop = new Date(timestamp);
		var start = this;
		
		if(start > stop)
		{
			var tmp = stop; 
			stop = start;
			start = tmp;
		}
		
		var days = 0;
		
		var startLoop = start.getTime();
		var stopLoop = stop.getTime();

		var step = 86400 * 1000;
		for(i=startLoop; i <= stopLoop; i = i + step)
		{
			var tmpDayForCount = new Date(i).getUTCDay();
			if(tmpDayForCount !== 0 && tmpDayForCount !== 6)
			{
				days++;
			}
		}
		
		return days;
	}
	catch(e)
	{
		handleError("date.extend.js Date.prototype.getDistanceInWeekDays", e);
		return 0;
	}
};