/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param int dowOffset
 * @return int
 */
Date.prototype.getWeek = function (dowOffset) {
	/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

	dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
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
			nday = nYear.getDay() - dowOffset;
			nday = nday >= 0 ? nday : nday + 7;
			/*if the next year starts before the middle of
 			  the week, it is week #1 of that year*/
			weeknum = nday < 4 ? 1 : 53;
		}
	}
	else {
		weeknum = Math.floor((daynum+day-1)/7);
	}

	if(weeknum == 0) weeknum = 52;

	return weeknum;
};

//Return number of days in year
Date.prototype.getDaysInYear = function (){
	var year = this.getUTCFullYear();

	if((year % 100 != 0 && year % 4 == 0)  || year%400 == 0)
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
	else if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11)
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
	
	var oneJanStamp = Date.UTC(this.getUTCFullYear(), 0, 1);
	return Math.floor((this - oneJanStamp) / 86400000);

};

//Get day distance from today
Date.prototype.getDaysFromToday = function () {
	//this.setTime(this.getTime+86400000);
	
	var tmptoday = new Date();
	var today = new Date(tmptoday.getTime() + tmptoday.getTimezoneOffset());
	
	var diff = Math.floor((this.getTime() - today.getTime()) / 86400000);

	//var diff = DaysBetweenDateAndNow(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDay());

	return diff;
};

function DaysBetweenDateAndNow(yr, mo, dy)
{
   // Determine the milliseconds per day.
   var MinMilli = 1000 * 60
   var HrMilli = MinMilli * 60
   var DyMilli = HrMilli * 24

   // Determine today's UTC year, month, and day.
   var d = new Date();
   var yeartoday = d.getUTCFullYear();
   var monthtoday = d.getUTCMonth();
   var dayofmonthtoday = d.getUTCDate();
   
   // Get the milliseconds since 1/1/1970 UTC.
   var t1 = Date.UTC(yr, mo - 1, dy)
   var t2 = Date.UTC(yeartoday, monthtoday, dayofmonthtoday);
   
   // Determine the difference in days.
   var days = (t1 - t2) / DyMilli;
   
   return(days);
}