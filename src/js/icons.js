function createIcon(showNumbers, fillText, topColor, textColor, targetElement) {

	var canvas = document.getElementById(targetElement);
	var ctx = canvas.getContext("2d");
	var lineargradient = ctx.createLinearGradient(0,0,19,19);
	
	ctx.font = '10px sans-serif';
	ctx.textAlign = "center";
	ctx.textBaseline = 'alphabetic';

	//Outline
	ctx.fillStyle = "rgba(240,240,240,1)";
	ctx.fillRect (0, 0, 19, 19);

	//Main fill
	ctx.fillStyle = "rgba(255,255,255,1)";
	ctx.fillRect (1, 1, 17, 17);

	//Top fill
	ctx.fillStyle = topColor;
	ctx.fillRect (1, 1, 17, 5);

	//Lines
	if(showNumbers == "0") {
		ctx.fillStyle = "rgba(200,200,200,1)";
		ctx.fillRect (3,8, 13,0.8);
		ctx.fillRect (3,10,13,0.8);
		ctx.fillRect (3,12,13,0.8);
		ctx.fillRect (3,14,13,0.8);
	}
	else //Add text
	{
		ctx.fillStyle = textColor;

		ctx.fillText(fillText, 10, 16);
	}

	//Add gradients
	lineargradient.addColorStop(0,  "rgba(0, 0, 0, 0.3)");
	lineargradient.addColorStop(1,  "rgba(255, 255, 255, 0.1)");
	ctx.fillStyle = lineargradient;
	ctx.fillRect(1, 1, 17, 17);

}