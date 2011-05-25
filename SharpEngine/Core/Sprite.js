/* Superclass to all movable elements in game. */
function Sprite(){
	this.x;
	this.y;
	this.z;
	this.width;
	this.height;
	this.speed;
	this.rotation;
	this.frame;
	this.frameCount;
	this.image;
	this.initialize();
}
Sprite.prototype = {
	initialize: function(){
		
	},
	
}