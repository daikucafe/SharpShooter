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
		g.scale(0.1, 0.1);
		g.fillStyle = "rgb(10,10,10)";
		g.moveTo(0,0);
		g.lineTo(150,200);
		g.lineTo(-150,200);
		g.lineTo(0,0);
		g.fill();
		g.restore();
	}
	
	this.move = function(delta){
		var timespeed = delta*this.speed;
		var factorX, factorY;
		factorX = (this.leftPress && !this.rightPress)? -1 : ((this.rightPress && !this.leftPress)? 1 : 0);
		factorY = (this.upPress && !this.downPress)? -1 : ((this.downPress && !this.upPress)? 1 : 0);
		this.x += factorX*timespeed;
		this.y += factorY*timespeed;
	}
}
function Prop(){

}
function Enemy(){

}

window.onLoad = initGame();
document.onkeydown = keyPress(e);
document.onkeyup = keyUp(e);

var sw;
var sh;

var player;

function keyPress(e){
	if(e.keyCode==37){
		player.leftPress = true;
	}
	if(e.keyCode==39){
		player.rightPress = true;
	}
	if(e.keyCode==38){
		player.upPress = true;
	}
	if(e.keyCode==40){
		player.downPress = true;
		alert("presionaste hacia abajo");
	}
}

function keyUp(e){
	if(e.keyCode==37){
		player.leftPress = false;
	}
	if(e.keyCode==39){
		player.rightPress = false;
	}
	if(e.keyCode==38){
		player.upPress = false;
	}
	if(e.keyCode==40){
		player.downPress = false;
	}
}

function initGame(){
	var canvas = document.getElementById("screen");
	var g = canvas.getContext("2d");
	sw = canvas.width;
	sh = canvas.height;
	
	drawBackground(g);
	
	player = new Ship();
	player.initShip(sw/2,sh-80);
		player.draw(g);
		player.move(10);

}

function drawBackground(g){
	g.fillStyle="#406A00";
	g.fillRect(0,0,sw,sh);
	g.fillStyle="#606E00";
	g.fillRect(10,10,sw,sh);
}

function step(){
	
}
