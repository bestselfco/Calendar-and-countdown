function getLunarImage(percent){

if(percent < 12)
{
	return "87.png"; //87
}
else if (percent < 25)
{
	return "75.png"; // 75
}
else if (percent < 37)
{
	return "62.png"; //62
}
else if (percent < 50)
{
	return "50.png"; //50
}
else if (percent < 62)
{
	return "37.png"; // 37
}
else if (percent < 75)
{
	return "25.png"; // 25
}
else if (percent < 87)
{
	return "12.png"; // 12
}
else
{
	return "0.png"; // 0
}

}

function getLunarPhase(date)
{

  var currentDate  = date;

  // Convert it to GMT
  currentDate.setTime(currentDate.getTime() + 
  (currentDate.getTimezoneOffset()*60000));

  // Get Date (GMT) for recent full moon
  // NOTE: months, hours, and minutes are 0 based
  var blueMoonDate = new Date(96, 1, 3, 16, 15, 0);

  // Compute length of lunar period -- source: World Almanac
  var lunarPeriod  = 29*(24*3600*1000) + 12*(3600*1000) + 44.05*(60*1000);

  var moonPhaseTime = (currentDate.getTime() - 
                    blueMoonDate.getTime()) % lunarPeriod;
  // alert("Moon phase in days = "+moonPhaseTime/(24*3600*1000))

  // Compute various percentages of lunar cycle
  var percentRaw = (moonPhaseTime / lunarPeriod);
	// alert("% = "+percentRaw)
  var percent  = Math.round(100*percentRaw);

  
  return percent;
}
