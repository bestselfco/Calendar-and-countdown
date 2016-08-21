var listItemTemplate = "<div class='listDateElement'>{{title}} {{date}}</div>";


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
		"<td class='${d_class_0}'  dateTimestamp='${d_stamp_0}'  id='cal_day_${d_id_0}'>${d_content_0}</td>" +
		"<td class='${d_class_1}'  dateTimestamp='${d_stamp_1}'  id='cal_day_${d_id_1}'>${d_content_1}</td>" +
		"<td class='${d_class_2}'  dateTimestamp='${d_stamp_2}'  id='cal_day_${d_id_2}'>${d_content_2}</td>" +
		"<td class='${d_class_3}'  dateTimestamp='${d_stamp_3}'  id='cal_day_${d_id_3}'>${d_content_3}</td>" +
		"<td class='${d_class_4}'  dateTimestamp='${d_stamp_4}'  id='cal_day_${d_id_4}'>${d_content_4}</td>" +
		"<td class='${d_class_5}'  dateTimestamp='${d_stamp_5}'  id='cal_day_${d_id_5}'>${d_content_5}</td>" +
		"<td class='${d_class_6}'  dateTimestamp='${d_stamp_6}'  id='cal_day_${d_id_6}'>${d_content_6}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_1}</td>" +
		"<td class='${d_class_7}'  dateTimestamp='${d_stamp_7}'  id='cal_day_${d_id_7}'>${d_content_7}</td>" +
		"<td class='${d_class_8}'  dateTimestamp='${d_stamp_8}'  id='cal_day_${d_id_8}'>${d_content_8}</td>" +
		"<td class='${d_class_9}'  dateTimestamp='${d_stamp_9}'  id='cal_day_${d_id_9}'>${d_content_9}</td>" +
		"<td class='${d_class_10}'  dateTimestamp='${d_stamp_10}'  id='cal_day_${d_id_10}'>${d_content_10}</td>" +
		"<td class='${d_class_11}'  dateTimestamp='${d_stamp_11}'  id='cal_day_${d_id_11}'>${d_content_11}</td>" +
		"<td class='${d_class_12}'  dateTimestamp='${d_stamp_12}'  id='cal_day_${d_id_12}'>${d_content_12}</td>" +
		"<td class='${d_class_13}'  dateTimestamp='${d_stamp_13}'  id='cal_day_${d_id_13}'>${d_content_13}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_2}</td>" +
		"<td class='${d_class_14}'  dateTimestamp='${d_stamp_14}'  id='cal_day_${d_id_14}'>${d_content_14}</td>" +
		"<td class='${d_class_15}'  dateTimestamp='${d_stamp_15}'  id='cal_day_${d_id_15}'>${d_content_15}</td>" +
		"<td class='${d_class_16}'  dateTimestamp='${d_stamp_16}'  id='cal_day_${d_id_16}'>${d_content_16}</td>" +
		"<td class='${d_class_17}'  dateTimestamp='${d_stamp_17}'  id='cal_day_${d_id_17}'>${d_content_17}</td>" +
		"<td class='${d_class_18}'  dateTimestamp='${d_stamp_18}'  id='cal_day_${d_id_18}'>${d_content_18}</td>" +
		"<td class='${d_class_19}'  dateTimestamp='${d_stamp_19}'  id='cal_day_${d_id_19}'>${d_content_19}</td>" +
		"<td class='${d_class_20}'  dateTimestamp='${d_stamp_20}'  id='cal_day_${d_id_20}'>${d_content_20}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_3}</td>" +
		"<td class='${d_class_21}'  dateTimestamp='${d_stamp_21}'  id='cal_day_${d_id_21}'>${d_content_21}</td>" +
		"<td class='${d_class_22}'  dateTimestamp='${d_stamp_22}'  id='cal_day_${d_id_22}'>${d_content_22}</td>" +
		"<td class='${d_class_23}'  dateTimestamp='${d_stamp_23}'  id='cal_day_${d_id_23}'>${d_content_23}</td>" +
		"<td class='${d_class_24}'  dateTimestamp='${d_stamp_24}'  id='cal_day_${d_id_24}'>${d_content_24}</td>" +
		"<td class='${d_class_25}'  dateTimestamp='${d_stamp_25}'  id='cal_day_${d_id_25}'>${d_content_25}</td>" +
		"<td class='${d_class_26}'  dateTimestamp='${d_stamp_26}'  id='cal_day_${d_id_26}'>${d_content_26}</td>" +
		"<td class='${d_class_27}'  dateTimestamp='${d_stamp_27}'  id='cal_day_${d_id_27}'>${d_content_27}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_4}</td>" +
		"<td class='${d_class_28}'  dateTimestamp='${d_stamp_28}'  id='cal_day_${d_id_28}'>${d_content_28}</td>" +
		"<td class='${d_class_29}'  dateTimestamp='${d_stamp_29}'  id='cal_day_${d_id_29}'>${d_content_29}</td>" +
		"<td class='${d_class_30}'  dateTimestamp='${d_stamp_30}'  id='cal_day_${d_id_30}'>${d_content_30}</td>" +
		"<td class='${d_class_31}'  dateTimestamp='${d_stamp_31}'  id='cal_day_${d_id_31}'>${d_content_31}</td>" +
		"<td class='${d_class_32}'  dateTimestamp='${d_stamp_32}'  id='cal_day_${d_id_32}'>${d_content_32}</td>" +
		"<td class='${d_class_33}'  dateTimestamp='${d_stamp_33}'  id='cal_day_${d_id_33}'>${d_content_33}</td>" +
		"<td class='${d_class_34}'  dateTimestamp='${d_stamp_34}'  id='cal_day_${d_id_34}'>${d_content_34}</td>" +
		"</tr>" +
		"<tr>" +
		"<td class='cal_td_weeknumber cal_weekblock'>${w_5}</td>" +
		"<td class='${d_class_35}'  dateTimestamp='${d_stamp_35}'  id='cal_day_${d_id_35}'>${d_content_35}</td>" +
		"<td class='${d_class_36}'  dateTimestamp='${d_stamp_36}'  id='cal_day_${d_id_36}'>${d_content_36}</td>" +
		"<td class='${d_class_37}'  dateTimestamp='${d_stamp_37}'  id='cal_day_${d_id_37}'>${d_content_37}</td>" +
		"<td class='${d_class_38}'  dateTimestamp='${d_stamp_38}'  id='cal_day_${d_id_38}'>${d_content_38}</td>" +
		"<td class='${d_class_39}'  dateTimestamp='${d_stamp_39}'  id='cal_day_${d_id_39}'>${d_content_39}</td>" +
		"<td class='${d_class_40}'  dateTimestamp='${d_stamp_40}'  id='cal_day_${d_id_40}'>${d_content_40}</td>" +
		"<td class='${d_class_41}'  dateTimestamp='${d_stamp_41}'  id='cal_day_${d_id_41}'>${d_content_41}</td>" +
		"</tr>" +
		"</table>";
