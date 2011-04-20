$.template( "popupTemplate", 
		"<div>" +
		"<span class='dayinfo'  >${dayInfo}</span>" +
		"<span class='dayinyear'>${dayInYear}</span>" +
		"<span class='countdown'>${countDown}</span>" +
		"<span class='countdown'>${countDownDelta}</span>" +
		"<img  class='moonicon' src='pics/phases/${moonPhase}'>" +
		"</div>"
);


$.template( "monthTemplate", 
		"<table>" +
		"<tr class='cal_tr_header'><td class='cal_td_header' colspan='8'>${monthName}</td></tr>"+
		"<tr class='cal_tr_titles'>" +
		"<td class='cal_td_weeknames cal_weekblock'>${weekShortName}</td>" +
		"<td class='cal_td_dayname'>${day0_ShortName}</td>" +
		"<td class='cal_td_dayname'>${day1_ShortName}</td>" +
		"<td class='cal_td_dayname'>${day2_ShortName}</td>" +
		"<td class='cal_td_dayname'>${day3_ShortName}</td>" +
		"<td class='cal_td_dayname'>${day4_ShortName}</td>" +
		"<td class='cal_td_dayname'>${day5_ShortName}</td>" +
		"<td class='cal_td_dayname'>${day6_ShortName}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_0}</td>" +
		"<td class='${d_class_0_0}' onclick='dayClicked(${d_stamp_0_0}, false)' dateTimestamp='${d_stamp_0_0}' title=' ' id='cal_day_${d_stamp_0_0}'>${d_content_0_0}</td>" +
		"<td class='${d_class_0_1}' onclick='dayClicked(${d_stamp_0_1}, false)' dateTimestamp='${d_stamp_0_1}' title=' ' id='cal_day_${d_stamp_0_1}'>${d_content_0_1}</td>" +
		"<td class='${d_class_0_2}' onclick='dayClicked(${d_stamp_0_2}, false)' dateTimestamp='${d_stamp_0_2}' title=' ' id='cal_day_${d_stamp_0_2}'>${d_content_0_2}</td>" +
		"<td class='${d_class_0_3}' onclick='dayClicked(${d_stamp_0_3}, false)' dateTimestamp='${d_stamp_0_3}' title=' ' id='cal_day_${d_stamp_0_3}'>${d_content_0_3}</td>" +
		"<td class='${d_class_0_4}' onclick='dayClicked(${d_stamp_0_4}, false)' dateTimestamp='${d_stamp_0_4}' title=' ' id='cal_day_${d_stamp_0_4}'>${d_content_0_4}</td>" +
		"<td class='${d_class_0_5}' onclick='dayClicked(${d_stamp_0_5}, false)' dateTimestamp='${d_stamp_0_5}' title=' ' id='cal_day_${d_stamp_0_5}'>${d_content_0_5}</td>" +
		"<td class='${d_class_0_6}' onclick='dayClicked(${d_stamp_0_6}, false)' dateTimestamp='${d_stamp_0_6}' title=' ' id='cal_day_${d_stamp_0_6}'>${d_content_0_6}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_1}</td>" +
		"<td class='${d_class_1_0}' onclick='dayClicked(${d_stamp_1_0}, false)' dateTimestamp='${d_stamp_1_0}' title=' ' id='cal_day_${d_stamp_1_0}'>${d_content_1_0}</td>" +
		"<td class='${d_class_1_1}' onclick='dayClicked(${d_stamp_1_1}, false)' dateTimestamp='${d_stamp_1_1}' title=' ' id='cal_day_${d_stamp_1_1}'>${d_content_1_1}</td>" +
		"<td class='${d_class_1_2}' onclick='dayClicked(${d_stamp_1_2}, false)' dateTimestamp='${d_stamp_1_2}' title=' ' id='cal_day_${d_stamp_1_2}'>${d_content_1_2}</td>" +
		"<td class='${d_class_1_3}' onclick='dayClicked(${d_stamp_1_3}, false)' dateTimestamp='${d_stamp_1_3}' title=' ' id='cal_day_${d_stamp_1_3}'>${d_content_1_3}</td>" +
		"<td class='${d_class_1_4}' onclick='dayClicked(${d_stamp_1_4}, false)' dateTimestamp='${d_stamp_1_4}' title=' ' id='cal_day_${d_stamp_1_4}'>${d_content_1_4}</td>" +
		"<td class='${d_class_1_5}' onclick='dayClicked(${d_stamp_1_5}, false)' dateTimestamp='${d_stamp_1_5}' title=' ' id='cal_day_${d_stamp_1_5}'>${d_content_1_5}</td>" +
		"<td class='${d_class_1_6}' onclick='dayClicked(${d_stamp_1_6}, false)' dateTimestamp='${d_stamp_1_6}' title=' ' id='cal_day_${d_stamp_1_6}'>${d_content_1_6}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_2}</td>" +
		"<td class='${d_class_2_0}' onclick='dayClicked(${d_stamp_2_0}, false)' dateTimestamp='${d_stamp_2_0}' title=' ' id='cal_day_${d_stamp_2_0}'>${d_content_2_0}</td>" +
		"<td class='${d_class_2_1}' onclick='dayClicked(${d_stamp_2_1}, false)' dateTimestamp='${d_stamp_2_1}' title=' ' id='cal_day_${d_stamp_2_1}'>${d_content_2_1}</td>" +
		"<td class='${d_class_2_2}' onclick='dayClicked(${d_stamp_2_2}, false)' dateTimestamp='${d_stamp_2_2}' title=' ' id='cal_day_${d_stamp_2_2}'>${d_content_2_2}</td>" +
		"<td class='${d_class_2_3}' onclick='dayClicked(${d_stamp_2_3}, false)' dateTimestamp='${d_stamp_2_3}' title=' ' id='cal_day_${d_stamp_2_3}'>${d_content_2_3}</td>" +
		"<td class='${d_class_2_4}' onclick='dayClicked(${d_stamp_2_4}, false)' dateTimestamp='${d_stamp_2_4}' title=' ' id='cal_day_${d_stamp_2_4}'>${d_content_2_4}</td>" +
		"<td class='${d_class_2_5}' onclick='dayClicked(${d_stamp_2_5}, false)' dateTimestamp='${d_stamp_2_5}' title=' ' id='cal_day_${d_stamp_2_5}'>${d_content_2_5}</td>" +
		"<td class='${d_class_2_6}' onclick='dayClicked(${d_stamp_2_6}, false)' dateTimestamp='${d_stamp_2_6}' title=' ' id='cal_day_${d_stamp_2_6}'>${d_content_2_6}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_3}</td>" +
		"<td class='${d_class_3_0}' onclick='dayClicked(${d_stamp_3_0}, false)' dateTimestamp='${d_stamp_3_0}' title=' ' id='cal_day_${d_stamp_3_0}'>${d_content_3_0}</td>" +
		"<td class='${d_class_3_1}' onclick='dayClicked(${d_stamp_3_1}, false)' dateTimestamp='${d_stamp_3_1}' title=' ' id='cal_day_${d_stamp_3_1}'>${d_content_3_1}</td>" +
		"<td class='${d_class_3_2}' onclick='dayClicked(${d_stamp_3_2}, false)' dateTimestamp='${d_stamp_3_2}' title=' ' id='cal_day_${d_stamp_3_2}'>${d_content_3_2}</td>" +
		"<td class='${d_class_3_3}' onclick='dayClicked(${d_stamp_3_3}, false)' dateTimestamp='${d_stamp_3_3}' title=' ' id='cal_day_${d_stamp_3_3}'>${d_content_3_3}</td>" +
		"<td class='${d_class_3_4}' onclick='dayClicked(${d_stamp_3_4}, false)' dateTimestamp='${d_stamp_3_4}' title=' ' id='cal_day_${d_stamp_3_4}'>${d_content_3_4}</td>" +
		"<td class='${d_class_3_5}' onclick='dayClicked(${d_stamp_3_5}, false)' dateTimestamp='${d_stamp_3_5}' title=' ' id='cal_day_${d_stamp_3_5}'>${d_content_3_5}</td>" +
		"<td class='${d_class_3_6}' onclick='dayClicked(${d_stamp_3_6}, false)' dateTimestamp='${d_stamp_3_6}' title=' ' id='cal_day_${d_stamp_3_6}'>${d_content_3_6}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_4}</td>" +
		"<td class='${d_class_4_0}' onclick='dayClicked(${d_stamp_4_0}, false)' dateTimestamp='${d_stamp_4_0}' title=' ' id='cal_day_${d_stamp_4_0}'>${d_content_4_0}</td>" +
		"<td class='${d_class_4_1}' onclick='dayClicked(${d_stamp_4_1}, false)' dateTimestamp='${d_stamp_4_1}' title=' ' id='cal_day_${d_stamp_4_1}'>${d_content_4_1}</td>" +
		"<td class='${d_class_4_2}' onclick='dayClicked(${d_stamp_4_2}, false)' dateTimestamp='${d_stamp_4_2}' title=' ' id='cal_day_${d_stamp_4_2}'>${d_content_4_2}</td>" +
		"<td class='${d_class_4_3}' onclick='dayClicked(${d_stamp_4_3}, false)' dateTimestamp='${d_stamp_4_3}' title=' ' id='cal_day_${d_stamp_4_3}'>${d_content_4_3}</td>" +
		"<td class='${d_class_4_4}' onclick='dayClicked(${d_stamp_4_4}, false)' dateTimestamp='${d_stamp_4_4}' title=' ' id='cal_day_${d_stamp_4_4}'>${d_content_4_4}</td>" +
		"<td class='${d_class_4_5}' onclick='dayClicked(${d_stamp_4_5}, false)' dateTimestamp='${d_stamp_4_5}' title=' ' id='cal_day_${d_stamp_4_5}'>${d_content_4_5}</td>" +
		"<td class='${d_class_4_6}' onclick='dayClicked(${d_stamp_4_6}, false)' dateTimestamp='${d_stamp_4_6}' title=' ' id='cal_day_${d_stamp_4_6}'>${d_content_4_6}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_5}</td>" +
		"<td class='${d_class_5_0}' onclick='dayClicked(${d_stamp_5_0}, false)' dateTimestamp='${d_stamp_5_0}' title=' ' id='cal_day_${d_stamp_5_0}'>${d_content_5_0}</td>" +
		"<td class='${d_class_5_1}' onclick='dayClicked(${d_stamp_5_1}, false)' dateTimestamp='${d_stamp_5_1}' title=' ' id='cal_day_${d_stamp_5_1}'>${d_content_5_1}</td>" +
		"<td class='${d_class_5_2}' onclick='dayClicked(${d_stamp_5_2}, false)' dateTimestamp='${d_stamp_5_2}' title=' ' id='cal_day_${d_stamp_5_2}'>${d_content_5_2}</td>" +
		"<td class='${d_class_5_3}' onclick='dayClicked(${d_stamp_5_3}, false)' dateTimestamp='${d_stamp_5_3}' title=' ' id='cal_day_${d_stamp_5_3}'>${d_content_5_3}</td>" +
		"<td class='${d_class_5_4}' onclick='dayClicked(${d_stamp_5_4}, false)' dateTimestamp='${d_stamp_5_4}' title=' ' id='cal_day_${d_stamp_5_4}'>${d_content_5_4}</td>" +
		"<td class='${d_class_5_5}' onclick='dayClicked(${d_stamp_5_5}, false)' dateTimestamp='${d_stamp_5_5}' title=' ' id='cal_day_${d_stamp_5_5}'>${d_content_5_5}</td>" +
		"<td class='${d_class_5_6}' onclick='dayClicked(${d_stamp_5_6}, false)' dateTimestamp='${d_stamp_5_6}' title=' ' id='cal_day_${d_stamp_5_6}'>${d_content_5_6}</td>" +
		"</tr>" +
		"</table>");