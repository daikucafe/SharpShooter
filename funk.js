function Ship(){
	this.x = 0;
	this.y = 0;
	this.w = 30;
	this.h = 30;
	this.speed = 0.6;
	
	this.leftPress = false;
	this.upPress = false;
	this.rightPress = false;
	this.downPress = false;
	
	this.initShip = function(x, y){
		this.x = x;
		this.y = y;
	}
	
	this.draw = function(g){
		g.save();
		g.translate(this.x, this.y);
		g.scale(0.2, 0.2);
		g.fillStyle = "rgb(10,10,10)";
		g.moveTo(0,0);
		g.lineTo(150,200);
		g.lineTo(-150,200);
		g.lineTo(0,0);
		g.fill();
		g.restore();
	}
	
	this.move = function(delta, e){
		this.leftPress = this.upPress = this.rightPress = this.downPress = false;
		switch(e.KeyCode){
			case 37: this.leftPress = true; break;
			case 38: this.upPress = true; break;
			case 39: this.rightPress = true; break;
			case 40: this.downPress = true; break;
		}
	}
}
function Prop(){

}
function Enemy(){

}

window.onLoad = initGame();

var sw;
var sh;

var player;

function initGame(){
	var canvas = document.getElementById("screen");
	var g = canvas.getContext("2d");
	sw = canvas.width;
	sh = canvas.height;
	
	g.fillStyle="#606E00";
	g.fillRect(0,0,sw,sh);
	
	player = new Ship();
	player.initShip(sw/2,sh-80);
	player.draw(g);
}

function step(){
	
}
