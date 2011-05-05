function nave = {};
function prop = {};
function enemy = {};

window.onLoad(initGame());

var w;
var h;

function initGame(){
	var canvas = document.getElementById("screen");
	var g = canvas.getContext("2d");
	
	w = canvas.width;
	h = canvas.height;
	
	g.fillStyle = "rgb(30,30,30)";
	g.fillRect(0, 0, canvas.width, canvas.height);
}

function step(){
}


