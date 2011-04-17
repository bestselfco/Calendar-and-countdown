//Change active clusterthingy
function switchCluster(cnum) {

	$(".cluster").hide();

	$(".clusterselect").css("color", "#AAAAAA");

	if(cnum == 1) {
		$("#cluster1").css("display", "block");
		$("#clusterselect1").css("color", "#333333");
	}

	if(cnum == 2) {
		$("#cluster2").css("display", "block");
		$("#clusterselect2").css("color", "#333333");
	}

	if(cnum == 3) {
		$("#cluster3").css("display", "block");
		$("#clusterselect3").css("color", "#333333");
	}

	if(cnum == 4) {
		$("#cluster4").css("display", "block");
		$("#clusterselect4").css("color", "#333333");
	}

}

//Initialise clusterthingy
function initCluster() {

	var d = new Date().getMonth();

	if(d == 0 || d == 1 || d == 2 ) $("#clusterselect1").css("color", "#333333");
	if(d == 3 || d == 4 || d == 5 ) $("#clusterselect2").css("color", "#333333");
	if(d == 6 || d == 7 || d == 8 ) $("#clusterselect3").css("color", "#333333");
	if(d == 9 || d == 10|| d == 11) $("#clusterselect4").css("color", "#333333");

	if(d == 0 || d == 1 || d == 2 ) $("#cluster1").css("display", "block");
	if(d == 3 || d == 4 || d == 5 ) $("#cluster2").css("display", "block");
	if(d == 6 || d == 7 || d == 8 ) $("#cluster3").css("display", "block");
	if(d == 9 || d == 10|| d == 11) $("#cluster4").css("display", "block");

}


$(document).ready(function() {
	initCluster();
	googleTrack("page_viewed", "cal_03");
});