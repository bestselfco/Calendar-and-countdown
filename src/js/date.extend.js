/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param int dowOffset
 * @return int
 */
Date.prototype.getWeek = function (dowOffset) {
	/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

	dowOffset = typeof(dowOffset) == 'number' ? dowOffset : 0; //default dowOffset to zero
	var newYearStamp = Date.UTC(this.getUTCFullYear(),0,1);
	var newYear = new Date(newYearStamp);
	var day = newYear.getUTCDay() - dowOffset; //the day of week the year begins on
	day = (day >= 0 ? day : day + 7);
	var daynum = Math.floor((this.getTime() - newYear.getTime() - 
			(this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
	var weeknum;
	//if the year starts before the middle of a week
	if(day < 4) {
		weeknum = Math.floor((daynum+day-1)/7) + 1;
		if(weeknum > 52) {
			nYear = new Date(this.getUTCFullYear() + 1,0,1);
			nday = nYear.getUTCDay() - dowOffset;
			nday = nday >= 0 ? nday : nday + 7;
			/*if the next year starts before the middle of the week, it is week #1 of that year*/
			weeknum = nday < 4 ? 1 : 53;
		}
	}
	else {
		weeknum = Math.floor((daynum+day-1)/7);
	}

	if(weeknum === 0) weeknum = 52;

	return weeknum;
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