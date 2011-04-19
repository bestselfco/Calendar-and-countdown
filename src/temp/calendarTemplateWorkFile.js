//Main structure
<table class='cal'>
<tbody>
${headerLine}
${week1}
${week2}
${week3}
${week4}
${week5}
</tbody>
</table>
//END main structure

//Normal day
<td class='cal_td_day' onclick='dayClicked(${calDayTimestamp}, false)' id='cal_day_${calDayTimestamp}'>${calDayDate}</td>
//End normal day

//Blank day
<td>&nbsp;</td>
//End blank day

//Week line
<tr class='cal_tr_dates'>
<td class='cal_td_weeknumber cal_weekblock'>${calWeekNumber}</td>
${calTrDay1}
${calTrDay2}
${calTrDay3}
${calTrDay4}
${calTrDay5}
${calTrDay6}
${calTrDay7}
</tr>
//End week line

//Header line
<tr class='cal_tr_titles'>
<td class='cal_td_weeknames cal_weekblock'>${weekShortName}</td>
<td class='cal_td_dayname'>${day1_ShortName}</td>
<td class='cal_td_dayname'>${day2_ShortName}</td>
<td class='cal_td_dayname'>${day3_ShortName}</td>
<td class='cal_td_dayname'>${day4_ShortName}</td>
<td class='cal_td_dayname'>${day5_ShortName}</td>
<td class='cal_td_dayname'>${day6_ShortName}</td>
<td class='cal_td_dayname'>${day0_ShortName}</td>
</tr>
//End header line

************
HERE BE JUNK
************

<table class="cal">
<tbody>
<tr class="cal_tr_header">
<td class="cal_td_header" colspan="8">Januar</td>
</tr>

<tr class="cal_tr_titles">
<td class="cal_td_weeknames cal_weekblock">Uk</td>
<td class="cal_td_dayname">Ma</td>
<td class="cal_td_dayname">Ti</td>
<td class="cal_td_dayname">On</td>
<td class="cal_td_dayname">To</td>
<td class="cal_td_dayname">Fr</td>
<td class="cal_td_dayname">L¿</td>
<td class="cal_td_dayname">S¿</td>
</tr>

<tr class="cal_tr_dates">
<td class="cal_td_weeknumber cal_weekblock">52</td>
<td colspan="5">&nbsp;</td>
<td class="cal_td_day" onclick="dayClicked(1293836400000, false)" id="cal_day_1293836400000">1</td>
<td class="cal_td_day" onclick="dayClicked(1293922800000, false)" id="cal_day_1293922800000">2</td>
</tr>

<tr class="cal_tr_dates">
<td class="cal_td_weeknumber cal_weekblock">1</td>
<td class="cal_td_day" onclick="dayClicked(1294009200000, false)" id="cal_day_1294009200000">3</td>
<td class="cal_td_day" onclick="dayClicked(1294095600000, false)" id="cal_day_1294095600000">4</td>
<td class="cal_td_day" onclick="dayClicked(1294182000000, false)" id="cal_day_1294182000000">5</td>
<td class="cal_td_day" onclick="dayClicked(1294268400000, false)" id="cal_day_1294268400000">6</td>
<td class="cal_td_day" onclick="dayClicked(1294354800000, false)" id="cal_day_1294354800000">7</td>
<td class="cal_td_day" onclick="dayClicked(1294441200000, false)" id="cal_day_1294441200000">8</td>
<td class="cal_td_day" onclick="dayClicked(1294527600000, false)" id="cal_day_1294527600000">9</td>
</tr>

<tr class="cal_tr_dates">
<td class="cal_td_weeknumber cal_weekblock">2</td>
<td class="cal_td_day" onclick="dayClicked(1294614000000, false)" id="cal_day_1294614000000">10</td>
<td class="cal_td_day" onclick="dayClicked(1294700400000, false)" id="cal_day_1294700400000">11</td>
<td class="cal_td_day" onclick="dayClicked(1294786800000, false)" id="cal_day_1294786800000">12</td>
<td class="cal_td_day" onclick="dayClicked(1294873200000, false)" id="cal_day_1294873200000">13</td>
<td class="cal_td_day" onclick="dayClicked(1294959600000, false)" id="cal_day_1294959600000">14</td>
<td class="cal_td_day" onclick="dayClicked(1295046000000, false)" id="cal_day_1295046000000">15</td>
<td class="cal_td_day" onclick="dayClicked(1295132400000, false)" id="cal_day_1295132400000">16</td>
</tr>

<tr class="cal_tr_dates"><td class="cal_td_weeknumber cal_weekblock">3</td>
<td class="cal_td_day" onclick="dayClicked(1295218800000, false)" id="cal_day_1295218800000">17</td>
<td class="cal_td_day" onclick="dayClicked(1295305200000, false)" id="cal_day_1295305200000">18</td>
<td class="cal_td_day" onclick="dayClicked(1295391600000, false)" id="cal_day_1295391600000">19</td>
<td class="cal_td_day" onclick="dayClicked(1295478000000, false)" id="cal_day_1295478000000">20</td>
<td class="cal_td_day" onclick="dayClicked(1295564400000, false)" id="cal_day_1295564400000">21</td>
<td class="cal_td_day" onclick="dayClicked(1295650800000, false)" id="cal_day_1295650800000">22</td>
<td class="cal_td_day" onclick="dayClicked(1295737200000, false)" id="cal_day_1295737200000">23</td>
</tr>

<tr class="cal_tr_dates">
<td class="cal_td_weeknumber cal_weekblock">4</td>
<td class="cal_td_day" onclick="dayClicked(1295823600000, false)" id="cal_day_1295823600000">24</td>
<td class="cal_td_day" onclick="dayClicked(1295910000000, false)" id="cal_day_1295910000000">25</td>
<td class="cal_td_day" onclick="dayClicked(1295996400000, false)" id="cal_day_1295996400000">26</td>
<td class="cal_td_day" onclick="dayClicked(1296082800000, false)" id="cal_day_1296082800000">27</td>
<td class="cal_td_day" onclick="dayClicked(1296169200000, false)" id="cal_day_1296169200000">28</td>
<td class="cal_td_day" onclick="dayClicked(1296255600000, false)" id="cal_day_1296255600000">29</td>
<td class="cal_td_day" onclick="dayClicked(1296342000000, false)" id="cal_day_1296342000000">30</td>
</tr>

<tr class="cal_tr_dates"><td class="cal_td_weeknumber cal_weekblock">5</td>
<td class="cal_td_day" onclick="dayClicked(1296428400000, false)" id="cal_day_1296428400000">31</td>
</tr>
</tbody>
</table>