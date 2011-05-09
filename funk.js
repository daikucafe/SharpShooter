function ResourceManager(){
	this.urlList = new Array();
	this.imgVault = new Array();
	this.getSprite = function(string){
		var temp;
		var search = this.urlList.indexOf(string);
		if(search >= 0){
			temp = this.imgVault[search];
		} else {
			temp = this.saveSprite(string);
		}
		return temp;
	}
	this.saveSprite = function(string){
		var temp = new Image();
		temp.src = string;
		this.urlList.push(string);
		this.imgVault.push(temp);
		return temp;
	}
}
		

function Shot(){
	this.x = -10;
	this.y = -10;
	this.speed = 0.5;
	this.alive = false;
	this.sprite;
	
	this.fire = function(){
		this.alive = true;
		this.x = player.x+(player.w/2)-2;
		this.y = player.y;
		this.sprite = rm.getSprite("shot.png");
	}
	
	this.move = function(delta){
		if(!this.alive)	return;
		this.y -= this.speed*delta;
		if(this.y < -10) this.alive = false;
	}
	
	this.draw = function(g){
		//g.fillRect(this.x, this.y, 4, 4);
		g.drawImage(this.sprite, this.x, this.y, 4,16);
		
	}
}

function Ship(){
	this.x = 0;
	this.y = 0;
	this.w = 40;
	this.h = 40;
	this.speed = 0.4;
	this.shots = new Array();
	this.mag = 6;
	this.bullet = 0;
	this.lastShot = 0;
	this.sprite;
	
	this.leftPress = false;
	this.upPress = false;
	this.rightPress = false;
	this.downPress = false;
	this.spacePress = false;
	
	this.initShip = function(x, y){
		this.x = x;
		this.y = y;
		this.sprite = rm.getSprite("nave.png");

		for(var i=0; i<this.mag; i++){
			this.shots[i] = new Shot();
		}
	}
	
	this.tryToFire = function(){
		var currentTime = new Date().getTime();
		if(this.bullet < this.mag && (currentTime - this.lastShot) > 190){
			this.shots[this.bullet].fire();
			this.lastShot = currentTime;
			this.bullet++;
			if(this.bullet >= this.mag) this.bullet = 0;
		}
	}
	
	this.draw = function(g){
		g.drawImage(this.sprite, this.x, this.y, this.w, this.h);

	}
	
	this.move = function(delta){
		var timespeed = delta*this.speed;
		var factorX, factorY;
		factorX = (this.leftPress && !this.rightPress)? -1 : ((this.rightPress && !this.leftPress)? 1 : 0);
		factorY = (this.upPress && !this.downPress)? -1 : ((this.downPress && !this.upPress)? 1 : 0);
		if((this.leftPress || this.rightPress) && !(this.upPress || this.downPress)) this.x += factorX*timespeed;
		else if(!(this.leftPress || this.rightPress) && (this.upPress || this.downPress)) this.y += factorY*timespeed;
		else {
			this.x += factorX*timespeed*Math.cos(Math.PI/4);
			this.y += factorY*timespeed*Math.sin(Math.PI/4);
		}
		if(this.x >= sw-this.w) this.x = sw-this.w;
		if(this.x <= 0) this.x = 0;
		if(this.y >= sh-this.h) this.y = sh-this.h;
		if(this.y <= 0) this.y = 0;
		if(this.spacePress) this.tryToFire();
	}
}

function Prop(){

}
function Enemy(){

}

window.onLoad = initGame();
window.onkeydown = keyDown;
window.onkeyup = keyUp;

var sw; //screen width
var sh; //screen height

var canvas; //canvas object
var g; // graphic context

var player; //player ship

var rm; //resource manager, can preload images.

var timer; //manages time
var lastTime; //time of the last loop
var delta; //difference between last and current loop


function keyDown(e){
	if(e.keyCode >= 32 && e.keyCode <= 40){
		e.preventDefault();
	}
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
	}
	if(e.keyCode == 32){
		player.spacePress = true;
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
	if(e.keyCode == 32){
		player.spacePress = false;
	}
	
}

function initGame(){
	rm = new ResourceManager();
	canvas = document.getElementById("screen");
	g = canvas.getContext("2d");
	g.mozImageSmoothingEnabled = false;
	timer = new Date();
	sw = canvas.width;
	sh = canvas.height;
	player = new Ship();
	player.initShip(sw/2-player.w/2,sh-80);
	lastTime = timer.getTime();
	setInterval("step()", 1000/60);
}

function drawBackground(g){
	g.fillStyle="#606E00";
	g.fillRect(0,0,sw,sh);
}

function drawShadow(g){
	g.fillStyle="rgba(58, 94, 4, 0.3)";
	g.fillRect(0,0,10,sh);
	g.fillRect(10, 0, sw, 10);
}

function step(){
	timer = new Date();
	delta = timer.getTime() - lastTime;
	g.clearRect(0,0,sw,sh);
	this.drawBackground(g);
	player.move(delta);
	player.draw(g);
	for(var i=0; i<player.mag; i++){
		if(player.shots[i].alive){
			player.shots[i].move(delta);
			player.shots[i].draw(g);
		}
	}
	this.drawShadow(g);
	timer = new Date();
	lastTime = timer.getTime();
}
