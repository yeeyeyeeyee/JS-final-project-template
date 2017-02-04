var FPS = 500;
var bglmg = document.createElement("img");
var enemylmg = document.createElement("img");
var btnlmg = document.createElement("img");
var towerlmg = document.createElement("img");

bglmg.src = "images/map.png";
enemylmg.src = "images/slime.gif";
btnlmg.src  = "images/tower-btn.png";
towerlmg.src  = "images/tower.jpeg";

var canvas = document.getElementById("game-canvas");

var ctx = canvas.getContext("2d");

function draw() {
	// body...
	enemy.move();

	ctx.drawImage(bglmg,0,0)
	ctx.drawImage(enemylmg,enemy.x,enemy.y)
	ctx.drawImage(btnlmg,640-64,480-64,64,64)
	if (IBB == true) {
		ctx.drawImage(towerlmg,cursor.x,cursor.y)
	}else{
		ctx.drawImage(towerlmg,tower.x,tower.y)
	// body.
 	}
}




setInterval(draw, 1000/FPS);

var enemy = {
	x: 320,
	y: 480-32,
	speedX: 0,
	speedY: -64,
	move: function(){
		this.x =this.x + this.speedX/FPS;
		this.y =this.y + this.speedY/FPS;
	}
}
var cursor = {
	x : 100,
	y : 200
}


var IBB = false;


 var tower = {
 	x: 0,
 	y: 0
 }


$("#game-canvas").on('mousemove', CM);
function CM(event){
	cursor.x = event.offsetX - (event.offsetX % 32);
	cursor.y = event.offsetY - (event.offsetY % 32);
	}

$("#game-canvas").on("click", IB)
function IB(){
	
	if(event.offsetX > 576 && event.offsetY > 416){
    	IBB = true;
    }else{
    	
    	if(IBB == true){
    		tower.x = cursor.x - (cursor.x % 32);
    		tower.y = cursor.y - (cursor.y % 32);
    		
    	}
    	IBB = false;
    }
	
}
$("#game-canvas").on("click", bil)