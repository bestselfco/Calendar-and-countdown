var monthTemplate = "<table>" +
		"<tr class='cal_tr_header'><td class='cal_td_header' colspan='8'><span class='cal_tr_monthname'>${monthName}</span>&nbsp;<span class='cal_tr_year'>${year}</span></td></tr>"+
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
		"<td class='${d_class_0_0}'  dateTimestamp='${d_stamp_0_0}'  id='cal_day_${d_id_0_0}'>${d_content_0_0}</td>" +
		"<td class='${d_class_0_1}'  dateTimestamp='${d_stamp_0_1}'  id='cal_day_${d_id_0_1}'>${d_content_0_1}</td>" +
		"<td class='${d_class_0_2}'  dateTimestamp='${d_stamp_0_2}'  id='cal_day_${d_id_0_2}'>${d_content_0_2}</td>" +
		"<td class='${d_class_0_3}'  dateTimestamp='${d_stamp_0_3}'  id='cal_day_${d_id_0_3}'>${d_content_0_3}</td>" +
		"<td class='${d_class_0_4}'  dateTimestamp='${d_stamp_0_4}'  id='cal_day_${d_id_0_4}'>${d_content_0_4}</td>" +
		"<td class='${d_class_0_5}'  dateTimestamp='${d_stamp_0_5}'  id='cal_day_${d_id_0_5}'>${d_content_0_5}</td>" +
		"<td class='${d_class_0_6}'  dateTimestamp='${d_stamp_0_6}'  id='cal_day_${d_id_0_6}'>${d_content_0_6}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_1}</td>" +
		"<td class='${d_class_1_0}'  dateTimestamp='${d_stamp_1_0}'  id='cal_day_${d_id_1_0}'>${d_content_1_0}</td>" +
		"<td class='${d_class_1_1}'  dateTimestamp='${d_stamp_1_1}'  id='cal_day_${d_id_1_1}'>${d_content_1_1}</td>" +
		"<td class='${d_class_1_2}'  dateTimestamp='${d_stamp_1_2}'  id='cal_day_${d_id_1_2}'>${d_content_1_2}</td>" +
		"<td class='${d_class_1_3}'  dateTimestamp='${d_stamp_1_3}'  id='cal_day_${d_id_1_3}'>${d_content_1_3}</td>" +
		"<td class='${d_class_1_4}'  dateTimestamp='${d_stamp_1_4}'  id='cal_day_${d_id_1_4}'>${d_content_1_4}</td>" +
		"<td class='${d_class_1_5}'  dateTimestamp='${d_stamp_1_5}'  id='cal_day_${d_id_1_5}'>${d_content_1_5}</td>" +
		"<td class='${d_class_1_6}'  dateTimestamp='${d_stamp_1_6}'  id='cal_day_${d_id_1_6}'>${d_content_1_6}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_2}</td>" +
		"<td class='${d_class_2_0}'  dateTimestamp='${d_stamp_2_0}'  id='cal_day_${d_id_2_0}'>${d_content_2_0}</td>" +
		"<td class='${d_class_2_1}'  dateTimestamp='${d_stamp_2_1}'  id='cal_day_${d_id_2_1}'>${d_content_2_1}</td>" +
		"<td class='${d_class_2_2}'  dateTimestamp='${d_stamp_2_2}'  id='cal_day_${d_id_2_2}'>${d_content_2_2}</td>" +
		"<td class='${d_class_2_3}'  dateTimestamp='${d_stamp_2_3}'  id='cal_day_${d_id_2_3}'>${d_content_2_3}</td>" +
		"<td class='${d_class_2_4}'  dateTimestamp='${d_stamp_2_4}'  id='cal_day_${d_id_2_4}'>${d_content_2_4}</td>" +
		"<td class='${d_class_2_5}'  dateTimestamp='${d_stamp_2_5}'  id='cal_day_${d_id_2_5}'>${d_content_2_5}</td>" +
		"<td class='${d_class_2_6}'  dateTimestamp='${d_stamp_2_6}'  id='cal_day_${d_id_2_6}'>${d_content_2_6}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_3}</td>" +
		"<td class='${d_class_3_0}'  dateTimestamp='${d_stamp_3_0}'  id='cal_day_${d_id_3_0}'>${d_content_3_0}</td>" +
		"<td class='${d_class_3_1}'  dateTimestamp='${d_stamp_3_1}'  id='cal_day_${d_id_3_1}'>${d_content_3_1}</td>" +
		"<td class='${d_class_3_2}'  dateTimestamp='${d_stamp_3_2}'  id='cal_day_${d_id_3_2}'>${d_content_3_2}</td>" +
		"<td class='${d_class_3_3}'  dateTimestamp='${d_stamp_3_3}'  id='cal_day_${d_id_3_3}'>${d_content_3_3}</td>" +
		"<td class='${d_class_3_4}'  dateTimestamp='${d_stamp_3_4}'  id='cal_day_${d_id_3_4}'>${d_content_3_4}</td>" +
		"<td class='${d_class_3_5}'  dateTimestamp='${d_stamp_3_5}'  id='cal_day_${d_id_3_5}'>${d_content_3_5}</td>" +
		"<td class='${d_class_3_6}'  dateTimestamp='${d_stamp_3_6}'  id='cal_day_${d_id_3_6}'>${d_content_3_6}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_4}</td>" +
		"<td class='${d_class_4_0}'  dateTimestamp='${d_stamp_4_0}'  id='cal_day_${d_id_4_0}'>${d_content_4_0}</td>" +
		"<td class='${d_class_4_1}'  dateTimestamp='${d_stamp_4_1}'  id='cal_day_${d_id_4_1}'>${d_content_4_1}</td>" +
		"<td class='${d_class_4_2}'  dateTimestamp='${d_stamp_4_2}'  id='cal_day_${d_id_4_2}'>${d_content_4_2}</td>" +
		"<td class='${d_class_4_3}'  dateTimestamp='${d_stamp_4_3}'  id='cal_day_${d_id_4_3}'>${d_content_4_3}</td>" +
		"<td class='${d_class_4_4}'  dateTimestamp='${d_stamp_4_4}'  id='cal_day_${d_id_4_4}'>${d_content_4_4}</td>" +
		"<td class='${d_class_4_5}'  dateTimestamp='${d_stamp_4_5}'  id='cal_day_${d_id_4_5}'>${d_content_4_5}</td>" +
		"<td class='${d_class_4_6}'  dateTimestamp='${d_stamp_4_6}'  id='cal_day_${d_id_4_6}'>${d_content_4_6}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_5}</td>" +
		"<td class='${d_class_5_0}'  dateTimestamp='${d_stamp_5_0}'  id='cal_day_${d_id_5_0}'>${d_content_5_0}</td>" +
		"<td class='${d_class_5_1}'  dateTimestamp='${d_stamp_5_1}'  id='cal_day_${d_id_5_1}'>${d_content_5_1}</td>" +
		"<td class='${d_class_5_2}'  dateTimestamp='${d_stamp_5_2}'  id='cal_day_${d_id_5_2}'>${d_content_5_2}</td>" +
		"<td class='${d_class_5_3}'  dateTimestamp='${d_stamp_5_3}'  id='cal_day_${d_id_5_3}'>${d_content_5_3}</td>" +
		"<td class='${d_class_5_4}'  dateTimestamp='${d_stamp_5_4}'  id='cal_day_${d_id_5_4}'>${d_content_5_4}</td>" +
		"<td class='${d_class_5_5}'  dateTimestamp='${d_stamp_5_5}'  id='cal_day_${d_id_5_5}'>${d_content_5_5}</td>" +
		"<td class='${d_class_5_6}'  dateTimestamp='${d_stamp_5_6}'  id='cal_day_${d_id_5_6}'>${d_content_5_6}</td>" +
		"</tr>" +
		"</table>";
