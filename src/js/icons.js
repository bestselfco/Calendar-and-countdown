function Icon(iconDefinition){

	if(iconDefinition.showNumbers == null) iconDefinition.showNumbers = "0";
	if(iconDefinition.fillText == null) iconDefinition.fillText = "?";
	if(iconDefinition.topColor == null) iconDefinition.topColor = "rgba(27,140,160,1)";
	if(iconDefinition.textColor == null) iconDefinition.textColor = "rgba(0,0,0,0.65)";

	this.showNumbers = iconDefinition.showNumbers;
	this.fillText = iconDefinition.fillText;
	this.topColor = iconDefinition.topColor;
	this.textColor = iconDefinition.textColor;

	//Setup element
	this.canvas = document.createElement('canvas');
	this.ctx = this.canvas.getContext("2d");

	this.ctx.font = '10px sans-serif';
	this.ctx.textAlign = "center";
	this.ctx.textBaseline = "alphabetic";

	this.lineargradient = this.ctx.createLinearGradient(0,0,19,19);

	//Build canvas
	this.buildIcon =  function()
	{

		//Outline
		this.ctx.fillStyle = "rgba(240,240,240,1)";
		this.ctx.fillRect (0, 0, 19, 19);

		//Main fill
		this.ctx.fillStyle = "rgba(255,255,255,1)";
		this.ctx.fillRect (1, 1, 17, 17);

		//Top fill
		this.ctx.fillStyle = this.topColor;
		this.ctx.fillRect (1, 1, 17, 5);

		//Lines
		if(this.showNumbers == "0") {
			this.ctx.fillStyle = "rgba(200,200,200,1)";
			this.ctx.fillRect (3,8, 13,0.8);
			this.ctx.fillRect (3,10,13,0.8);
			this.ctx.fillRect (3,12,13,0.8);
			this.ctx.fillRect (3,14,13,0.8);
		}
		else //Add text
		{
			this.ctx.fillStyle = this.textColor;
			
			this.ctx.fillText(this.fillText, 10, 16);
		}

		//Add gradients
		this.lineargradient.addColorStop(0,  "rgba(0, 0, 0, 0.3)");
		this.lineargradient.addColorStop(1,  "rgba(255, 255, 255, 0.1)");
		this.ctx.fillStyle = this.lineargradient;
		this.ctx.fillRect(1, 1, 17, 17);
	};
	
	//Get canvas
	this.getCanvas = function (){
		
		this.buildIcon();
		
		return this.canvas;
		
	};
	
	//Get imagedata
	this.getImage = function (){
		
		this.buildIcon();
		
		return this.ctx.getImageData(0, 0, 19, 19);
	};

}