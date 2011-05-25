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
	this.sprite = rm.getSprite("shot.png");
	
	this.fire = function(){
		this.alive = true;
		this.x = player.x+(player.w/2)-((this.sprite.width*zoom)/2);
		this.y = player.y;
	}
	
	this.move = function(delta){
		if(!this.alive)	return;
		this.y -= this.speed*delta;
		if(this.y < -10) this.alive = false;
	}
	
	this.draw = function(g){
		g.drawImage(this.sprite, this.x, this.y, this.sprite.width*zoom, this.sprite.height*zoom);
		
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
		this.sprite = new Sprite("nave.png", 3);
		this.w = this.sprite.frameWidth;
		this.h = this.sprite.frameHeight;

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
		this.sprite.draw(g, this.x, this.y);

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
		this.sprite.getFrame(0);
		if(this.leftPress && !this.rightPress) this.sprite.getFrame(1);
		else if(this.rightPress && !this.leftPress) this.sprite.getFrame(2);
		if(this.spacePress) this.tryToFire();
	}
}

function Prop(){

}
function Enemy(){

}
/*
function Texture(texname, x, y, w, h){
	this.image = rm.getSprite(texname);
	this.draw = function(g){
		for(var i=0; i < w/(this.image.width*zoom); i++){
			for(var j=0; j < h/(this.image.height*zoom); j++){
				g.drawImage(this.image, x + i*(this.image.width*zoom), y + j*(this.image.height*zoom), this.image.width*zoom, this.image.height*zoom);
			}
		}
	}
}*/

function Sprite(source, frameNumber){
	this.image = rm.getSprite(source);
	this.frameWidth = (this.image.width/frameNumber)*zoom;
	this.frameHeight = this.image.height*zoom;
	this.frame = 0;
	this.totalFrames = frameNumber;
	this.nextFrame = function(){
		this.frame++;
		if(this.frame >= this.totalFrames){
			this.frame = 0;
		}
	}
	this.getFrame = function(number){
		if(number < this.totalFrames){
			this.frame = number;
		}
	}
	this.draw = function(g, x, y){
		g.drawImage(this.image, this.frame*(this.frameWidth/zoom), 0, this.frameWidth/zoom, this.frameHeight/zoom, x, y, this.frameWidth, this.frameHeight);
	}
}
	
	

window.onLoad = initGame();
window.onkeydown = keyDown;
window.onkeyup = keyUp;

var sw; //screen width
var sh; //screen height
var zoom; //pixel zoom

var canvas; //canvas object
var g; // graphic context

var player; //player ship

var rm; //resource manager, can preload images.

var timer; //manages time
var lastTime; //time of the last loop
var delta; //difference between last and current loop
var bg;

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
	zoom = 2;
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
	//bg = new Texture("texsea.png",0,0,sw,sh);
	setInterval("step()", 1000/60);
}

function step(){
	timer = new Date();
	delta = timer.getTime() - lastTime;
	g.clearRect(0,0,sw,sh);
	//bg.draw(g);
	player.move(delta);
	player.draw(g);
	for(var i=0; i<player.mag; i++){
		if(player.shots[i].alive){
			player.shots[i].move(delta);
			player.shots[i].draw(g);
		}
	}
	timer = new Date();
	lastTime = timer.getTime();
}
