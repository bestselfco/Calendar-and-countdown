$.template ( "monthNameTempate", 
		"<tr class='cal_tr_header'><td class='cal_td_header' colspan='8'>${monthName}</td></tr>");

$.template( "headerRowTemplate", 
		"<tr class='cal_tr_titles'>" +
		"<td class='cal_td_weeknames cal_weekblock'>${weekShortName}</td>" +
		"<td class='cal_td_dayname'>${day0_ShortName}</td>" +
		"<td class='cal_td_dayname'>${day1_ShortName}</td>" +
		"<td class='cal_td_dayname'>${day2_ShortName}</td>" +
		"<td class='cal_td_dayname'>${day3_ShortName}</td>" +
		"<td class='cal_td_dayname'>${day4_ShortName}</td>" +
		"<td class='cal_td_dayname'>${day5_ShortName}</td>" +
		"<td class='cal_td_dayname'>${day6_ShortName}</td>" +
		"</tr>");

$.template( "monthTableTemplate" , 
		"<table class='cal'>" +
		"<tbody>" +
		"<tr class='cal_tr_header'>" +
		"<td class='cal_td_header' colspan='8'>${monthName}</td>" +
		"</tr>" +
		"${headerLine}" +
		"${week1}" +
		"${week2}" +
		"${week3}" +
		"${week4}" +
		"${week5}" +
		"</tbody>" +
		"</table>");

$.template( "popupTemplate", 
		"<div>" +
		"<span class='dayinfo'  >${dayInfo}</span>" +
		"<span class='dayinyear'>${dayInYear}</span>" +
		"<span class='countdown'>${countDown}</span>" +
		"<span class='countdown'>${countDownDelta}</span>" +
		"<img  class='moonicon' src='pics/phases/${moonPhase}'>" +
		"</div>"
);