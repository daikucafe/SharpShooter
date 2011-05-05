function nave(){}
function prop(){}
function enemy(){}

function initGame(){
	var canvas = document.getElementById("screen");
	var g = canvas.getContext("2d");
	
	g.fillStyle="rgb(30,30,30)";
	g.fillRect(0,0,canvas.width,canvas.height);
}
