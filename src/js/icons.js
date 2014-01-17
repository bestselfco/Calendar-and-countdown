//showNumbers	:	Should we show lines (0), or number (1)
//fillText		:	The text to show
//topColor		:	Color of the top bar
//outLineColor	:	The outer line of the icon
//fillColor	: Background of main part
//lineColor	: Color of the lines in the calendar
//GradColorStart: Upper left corner of gradient
//GradColorStop: Lower right corner of gradient
//font			
//textAlign
//textBaseline

function Icon(iconDefinition){

	try {

		//Get values from passed object
		this.def = iconDefinition;
	
		//Fill inn the rest of the values
	
		//Setup element
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext("2d");
	
		this.lineargradient = this.ctx.createLinearGradient(0,0,19,19);
	
		//Build canvas
		this.buildIcon = function()
		{
			//Define font
			this.ctx.font = this.def.font;
			this.ctx.textAlign = this.def.textAlign;
			this.ctx.textBaseline = this.def.textBaseline;
	
			//Outline
			this.ctx.fillStyle = this.def.outlineColor;
			this.ctx.fillRect (0, 0, 19, 19);
	
			//Main fill
			this.ctx.fillStyle = this.def.fillColor;
			this.ctx.fillRect (1, 1, 17, 17);
	
			//Top fill
			this.ctx.fillStyle = this.def.topColor;
			this.ctx.fillRect (1, 1, 17, 5);
	
			//Lines
			if(this.def.showNumbers == "0") {
				this.ctx.fillStyle = this.def.lineColor;
				this.ctx.fillRect (3,8, 13,0.8);
				this.ctx.fillRect (3,10,13,0.8);
				this.ctx.fillRect (3,12,13,0.8);
				this.ctx.fillRect (3,14,13,0.8);
			}
			else //Add text
			{
				this.ctx.fillStyle = this.def.textColor;
				this.ctx.fillText(this.def.fillText, 10, 16);
			}
	
			//Add gradients
			this.lineargradient.addColorStop(0, this.def.gradColorStart);
			this.lineargradient.addColorStop(1, this.def.gradColorStop);
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
	
		this.store = function (){
			var iconDataJSON = JSON.stringify(this.def);
			setItem("iconDataJson", iconDataJSON);
		};
		
		this.load = function (){
			var iconDataJSON = getItem("iconDataJSON"); // Load from storage
			if(iconDataJSON === null)
			{
				this.storeDefaultIcon(); //If not set, create default values
			}
			this.def = JSON.parse(iconDataJSON); //Load data into object
			this.getDefaultValues(false); //Load any other data to ensure coverage
		};
		
		this.storeDefaultIcon = function(){
			this.getDefaultValues(true);
			this.store();
		};
	
		//Define all the default values. If force is true, do it if it is already set as well.
		this.getDefaultValues = function(force) {
			
			if(force || this.def.showNumbers === undefined) this.def.showNumbers = "0";
			if(force || this.def.fillText === null) this.def.fillText = "?";
			if(force || this.def.topColor === null) this.def.topColor = "rgba(27,140,160,1)";
			if(force || this.def.textColor === null) this.def.textColor = "#323232";
			if(force || this.def.outlineColor === null) this.def.outlineColor = "rgba(240,240,240,1)";
			if(force || this.def.fillColor === null) this.def.backColor = "rgba(255,255,255,1)";
			if(force || this.def.lineColor === null) this.def.lineColor = "rgba(200,200,200,1)";
			if(force || this.def.gradColorStart === null) this.def.gradColorStart = "rgba(0, 0, 0, 0.3)";
			if(force || this.def.gradColorStop === null) this.def.gradColorStop = "rgba(255, 255, 255, 0.1)";
			if(force || this.def.font === null) this.def.font = '10px sans-serif';
			if(force || this.def.textAlign === null) this.def.textAlign = 'center';
			if(force || this.def.textBaseline === null) this.def.textBaseline = "alphabetic";
	
		};
		
		this.getDefaultValues(false);
		
	}
	catch(e)
	{
		handleError("Icon.js Icon", e);
	}

}