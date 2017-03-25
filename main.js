var clock = 0;
var FPS = 60;
var money = 0;
var score = 0;
var bglmg = document.createElement("img");
var enemylmg = document.createElement("img");
var btnlmg = document.createElement("img");
var towerlmg = document.createElement("img");
var crosshairlmg = document.createElement("img");

bglmg.src = "images/map.png";
enemylmg.src = "images/slime.gif";
btnlmg.src  = "images/tower-btn.png";
towerlmg.src  = "images/tower.jpeg";
crosshairlmg.src  = "images/crosshair.png";

var canvas = document.getElementById("game-canvas");

var ctx = canvas.getContext("2d");

function draw() {

	ctx.drawImage(bglmg,0,0)
	clock++;

	if((clock%80) == 0){
	    var newEnemy = new enemy();
	    enemies.push(newEnemy);
	}

	for(var i = 0; i < enemies.length; i++){
    	if(enemies[i].HP <= 0){
    		enemies.splice(i,1);
    		money += 10;
    		score += 15;
    	}else{
    		enemies[i].move();	
    		ctx.drawImage(enemylmg,enemies[i].x,enemies[i].y);
    	}
    }

	// enemy.move();
	tower.searchEnemy();
	if(tower.aimingenemyid!=null){
		var id = tower.aimingenemyid;
		ctx.drawImage( crosshairlmg, enemies[id].x, enemies[id].y);
	}

	
	ctx.drawImage(enemylmg,enemy.x,enemy.y)
	ctx.drawImage(btnlmg,640-64,480-64,64,64)
	if (IBB == true) {
		ctx.drawImage(towerlmg,cursor.x,cursor.y)
	}else{
		ctx.drawImage(towerlmg,tower.x,tower.y)
 	}
 	ctx.font = "24px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("HP: " + HP, 32, 32 );
	ctx.fillText("score: " + score, 32, 64 );
	ctx.fillText("money: " + money, 32, 96 );
}

var enemies = [];
var towers = [];




setInterval(draw, 1000/FPS);

var enemypath =[
	{x: 320, y: 96},
	{x: 448, y: 96},
	{x: 448, y: 224},
	{x: 544, y: 224},
	{x: 544, y: 0},
	{x: 192, y: 0},
	{x: 192, y: 224},
	{x: 0, y: 224},
	{x: 0, y: 0}
]

var HP = 100;
function enemy(){
	this.x = 320;
	this.y = 480-32;
	this.HP = 100;
	this.speedX = 0;
	this.speedY = -64;
	this.pathdes = 0;
	this.move = function(){
		if(IC(enemypath[this.pathdes].x,
		 	  enemypath[this.pathdes].y,
		 	 this.x,
		 	 this.y,
		  	 64/FPS,
		     64/FPS)){
			
			 this.x = enemypath[this.pathdes].x;
			 this.y = enemypath[this.pathdes].y;

			 this.pathdes++;
			if(this.pathdes == enemypath.length){
				this.HP = 0;
				HP -= 10;
				return;
			}
			if( enemypath[this.pathdes].y < this.y){
				// 往上走
				this.speedX = 0;
				this.speedY = -64;
			} else if(enemypath[this.pathdes].x > this.x){
				// 往右走
				this.speedX = 64;
				this.speedY = 0;
			} else if(enemypath[this.pathdes].y > this.y){
				// 往下走
				this.speedX = 0;
				this.speedY = 64;
			} else if(enemypath[this.pathdes].x < this.x){
				// 往左走
				this.speedX = -64;
				this.speedY = 0;

			}
			
		}else{
			this.x += this.speedX/FPS;
			this.y += this.speedY/FPS;
		}
	}
}
var cursor = {
	x : 100,
	y : 200
}


var IBB = false;


function tower(){
 	this.x = 0;
 	this.y = 0;
 	this.range = 96;
 	this.aimingenemyid = null;
 	this.searchEnemy: function(){
 		this.readyToShootTime -= 1/FPS
 		for(var i=0; i<enemies.length; i++){
 			var distance = Math.sqrt(
 				Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2)
 				);
 			if(distance<=this.range){
 				this.aimingenemyid = i;
 				if(this.readyToShootTime<=0){
 					this.shoot(i);
 					this.readyToShootTime = this.fireRate;
 				}
 				return;
 			}
 		}
 		this.aimingenemyid = null;

 	};
 	this.shoot: function(id){
 		ctx.beginPath();
 		ctx.moveTo(this.x, this.y);
 		ctx.lineTo(enemies[id].x, enemies[id].y);
 		ctx.strokeStyle = 'red';
 		ctx.lineWidth = 3;
 		ctx.stroke();
 		enemies[id].HP -= this.damage;
 	};
 	this.fireRate = 0.1;
 	this.readyToShootTime = 0.1;
 	this.damage = 10;
 };


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
	
};


$("#game-canvas").on("click", IC)

function IC(pointX, pointY, targetX, targetY, targetWidth, targetHeignt){

	if(	targetX <=  pointX &&
		pointX <= targetX + targetWidth && 
	   	targetY <=  pointY &&
	   	pointY <= targetY + targetHeignt){
		return true;
	}else{
		return false;
	}
}


