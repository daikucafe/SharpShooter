/* Core class, initialize the canvas context and manages the rest of the classes */

function Sharp(canvas_tag){
	this.canvas = document.getElementById(canvas_tag);
	this.g = this.canvas.getContext("2d");
	
	this.buffer = document.createElement("canvas");
	this.h = this.buffer.getContext("2d");
	
	this.stage = new Stage(buffer);
	this.gui = new GUI(buffer);
	this.cam = new Camera(stage);
	
	this.playerName = "";
	
	this.events = [];
	
	this.init();
}

Sharp.prototype = {
	init: function(){
		this.setFPS(60);
		Ticker.addListener(this);
	}
}