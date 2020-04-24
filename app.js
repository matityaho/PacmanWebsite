var context;
var shape;
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var endTime;
var interval;
var interval2;
var intervalSpecial;
var right= 39;
var left =37;
var down= 40;
var up=38;
var food_Amount = 50;
var color5points="black";
var color15points="black";
var color25points="black";
var monstersAmount;
var upKey="ArrowUp";
var downKey="ArrowDown";
var rightKey="ArrowRight";
var leftKey="ArrowLeft";
var x=4;
var player;
var preValMon1=0;
var preValMon2=0;
var preValMon3=0;
var preValMon4=0;
var monster1;
var monster2;
var monster3;
var monster4;
var special;
var lives=5;
var poll;

/*$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});*/

function Start() {
	context = canvas.getContext("2d");
	board = new Array();
	score = 0;
	lives=5;
	updateLives();
	pac_color = "yellow";
	var cnt = 100;
	var pacman_remain = 1;
	var points5count=food_remain*0.6;
	var points15count=food_remain*0.3;
	var points25count=food_remain*0.1;
	var food_remain=food_Amount;
	start_time = new Date();
	monster1 = new Object();
	monster2 = new Object();
	monster3 = new Object();
	monster4 = new Object();
	special = new Object();
	shape = new Object();

	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		//0-empty,1- special points,2-pacman, 4-wall,5- 5 points, 15- 15 points, 25- 25 points, 6-time, 7-monster1,8-monster2,9-monster3,10-monster4,
		for (var j = 0; j < 10; j++) {
			if (//walls
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					color=Math.random() *3;
					if (color>2 && points5count!=0) {
						board[i][j]=5;
						points5count--;
						food_remain--;
					}
					else if (color>1 && points15count!=0) {
						board[i][j]=15;
						points15count--;
						food_remain--;
					}
					else if(points25count!=0){
						board[i][j]=25;
						points25count--;
						food_remain--;
					}

				} else if ((randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) && !(i==0 && j==0) && !(i==0 && j==9) && !(i==9 && j==0) && !(i==9 && j==9)) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	if(food_Amount<89){
		while (food_remain > 0) {
			var emptyCell = findRandomEmptyCell(board);
			color=Math.random() *3;
			if (color>2 && points5count!=0) {
				board[emptyCell[0]][emptyCell[1]]=5;
				points5count--;
				food_remain--;
			}
			else if (color>1 && points15count!=0) {
				board[emptyCell[0]][emptyCell[1]]=15;
				points15count--;
				food_remain--;
			}
			else if(points25count!=0){
				board[emptyCell[0]][emptyCell[1]]=25;
				points25count--;
				food_remain--;
			}
		}
	}
	else{
		while (food_remain > 0) {
			var emptyCell = findEmptyCell(board);
			color=Math.random() *3;
			if (color>2 && points5count!=0) {
				board[emptyCell[0]][emptyCell[1]]=5;
				points5count--;
				food_remain--;
			}
			else if (color>1 && points15count!=0) {
				board[emptyCell[0]][emptyCell[1]]=15;
				points15count--;
				food_remain--;
			}
			else if(points25count!=0){
				board[emptyCell[0]][emptyCell[1]]=25;
				points25count--;
				food_remain--;
			}
		}
	}


	
	//monster 7,8,9,10
	monster1.alive=1;
	monster1.preValMon1=board[0][0]
	board[0][0]=7;
	monster1.value=7;
	monster1.i=0;
	monster1.j=0;
	monster2.alive=0;
	monster3.alive=0;
	monster4.alive=0;
		
	if(monstersAmount>=2){
		monster2.alive=1;
		monster2.preValMon2=board[0][9];
		board[0][9]=8;
		monster2.value=8;
		monster2.i=0;
		monster2.j=9;
	}
	else{
		monster2.value=-1;
		monster3.value=-1;
		monster4.value=-1;
	}
	if(monstersAmount>=3){
		monster3.alive=1;
		monster3.preValMon3=board[9][9];
		board[9][9]=9;
		monster3.value=9;
		monster3.i=9;
		monster3.j=9;
	}else{
		monster3.value=-1;
		monster4.value=-1;
	}
	if(monstersAmount==4){
		monster4.alive=1;
		monster4.preValMon4=board[9][0];
		board[9][0]=10;
		monster4.value=10;
		monster4.i=9;
		monster4.j=0;
	}else{
		monster4.value=-1;
	}

	//time
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]]=6;

	//special points
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]]=1;
	special.preVal=0;
	special.i=emptyCell[0];
	special.j=emptyCell[1];

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
			}
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	Draw(-1);
	interval = setInterval(UpdatePosition, 250);
	interval2 = setInterval(UpdatePositionMonster, 3000);
	intervalSpecial = setInterval(UpdatePositionSpecial, 1000);
	poll = setInterval(function()
	{
		var current_style = document.getElementById('boardGame').style.visibility;
		if (current_style == "hidden") {
			var live1 = document.getElementById('heart1');
			live1.style.visibility="hidden";
			var live2 = document.getElementById('heart2');
			live2.style.visibility="hidden";
			var live3 = document.getElementById('heart3');
			live3.style.visibility="hidden";
			var live4 = document.getElementById('heart4');
			live4.style.visibility="hidden";
			var live5 = document.getElementById('heart5');
			live5.style.visibility="hidden";
			endGame();
			window.clearInterval(poll);
		}
	}, 100);
	
}

function findEmptyCell(board){
	var i=0;
	var j=0;
	for(i=0;i<10;i++){
		for(j=0;j<10;j++){
			if(board[i][j] == 0)
				return [i, j];
		}
	}
	return [i, j];
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[up]) {//up
		return 1;
	}
	else if (keysDown[down]) {//down
		return 2;
	}
	else if (keysDown[left]) {//left
		return 3;
	}
	else if (keysDown[right]) {//right
		return 4;
	}
	else{//non of them happend
		return 0;
	}
}

function Draw(x) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			
			if (board[i][j] == 2) { //0-empty,2-pacman, 4-wall,5- 5 points, 15- 15 points, 25- 25 points, 6-time, 7-monster
				if (x == 1) {//up
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				if (x == 2) {//down
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				if (x == 3) {//left
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				if (x == 4 ) {//right
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				
			} else if (board[i][j] == 5) {//5 point food
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = color5points; //color
				context.fill();
			}  else if (board[i][j] == 15) {//15 point food
				context.beginPath();
				context.arc(center.x, center.y, 6.5, 0, 2 * Math.PI); // circle
				context.fillStyle = color15points; //color
				context.fill();
			} else if (board[i][j] == 25) {//25 point food
				context.beginPath();
				context.arc(center.x, center.y,8, 0, 2 * Math.PI); // circle
				context.fillStyle = color25points; //color
				context.fill();
			}else if (board[i][j] == 4) {//wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "blue"; 
				context.fill();
			}
			else if(board[i][j] == 6){ //time
				context.beginPath();
				context.moveTo(center.x, center.y);
				context.lineTo(center.x-15, center.y+15);//(20, 100);
				context.lineTo(center.x+15, center.y+15);//(80, 100);
				context.lineTo(center.x, center.y);//(50, 50);
				context.lineTo(center.x-15, center.y-15);//(20, 0);
				context.lineTo(center.x+15, center.y-15);//(80, 0);
				context.lineTo(center.x, center.y);//(50, 50);
				context.lineJoin='round';
				context.lineWidth=5;
				context.stroke();
			}
			else if(board[i][j] == 7){ //monster
				drawMonster(center,context, "rgb(45, 192, 0)");
			}
			else if(board[i][j] == 8){ //monster
				drawMonster(center,context, "rgb(253, 168, 196)");
			}
			else if(board[i][j] == 9){ //monster
				drawMonster(center,context, "#30cfb4");
			}
			else if(board[i][j] == 10){ //monster
				drawMonster(center,context, "orange");
			}
			else if(board[i][j] == 1){ //special
				drawSpecial(center);
			}
		}
	}
}

function drawMonster(center,context, mColor){
	//head
	context.beginPath();
	context.arc(center.x, center.y, 20, 0, 2 * Math.PI); 
	context.lineTo(center.x, center.y);
	context.fillStyle = mColor; //color
	context.fill();
	//white eye left
	context.beginPath();
	context.arc(center.x-7,  center.y-5, 7, 0, 2 * Math.PI); // circle
	context.fillStyle = "white"; //color
	context.fill();
	//black eye left
	context.beginPath();
	context.arc(center.x-5,  center.y-3, 5, 0, 2 * Math.PI); // circle
	context.fillStyle = "#00498d"; //color
	context.fill();
	//white eye right
	context.beginPath();
	context.arc(center.x+11,  center.y-5, 7, 0, 2 * Math.PI); // circle
	context.fillStyle = "white"; //color
	context.fill();
	//black eye right
	context.beginPath();
	context.arc(center.x+13,  center.y-3, 5, 0, 2 * Math.PI); // circle
	context.fillStyle = "#00498d"; //color
	context.fill();
	//buttom right
	context.beginPath();
	context.moveTo(center.x+20, center.y);
	context.lineJoin = "round";
	context.lineTo(center.x+19, center.y+27);
	context.lineTo(center.x, center.y+10);
	context.lineTo(center.x+20, center.y);
	context.fillStyle = mColor; //color
	
	context.fill();
	//buttom left
	context.beginPath();
	context.moveTo(center.x-20, center.y);
	context.lineJoin = "round";
	context.lineTo(center.x-19, center.y+27);
	context.lineTo(center.x, center.y+10);
	context.lineTo(center.x-20, center.y);
	context.fillStyle = mColor; //color
	
	context.fill();
	//buttom center
	context.beginPath();
	context.moveTo(center.x+16, center.y+13);
	context.lineJoin = "round";
	context.lineTo(center.x, center.y+27);
	context.lineTo(center.x-14, center.y+13);
	context.lineTo(center.x+16, center.y+13);
	context.fillStyle = mColor; //color
	context.fill();
}

function drawSpecial(center){//(30,30)
	/*context.beginPath();
	context.moveTo(center.x+12, center.y-7);
	context.lineTo(center.x, center.y+14);
	context.lineTo(center.x-12, center.y-7);
	context.lineTo(center.x+12, center.y-7);
	context.fillStyle = "#30cfb4"; //color
	context.lineJoin = "round";
	context.fill();
	
	context.beginPath();
	context.moveTo(center.x+12,  center.y+7);
	context.lineTo(center.x-12,  center.y+7);
	context.lineTo(center.x,  center.y-14);
	context.lineTo(center.x+12,  center.y+7);
	context.fillStyle = "#30cfb4"; //color
	context.lineJoin = "round";
	context.fill();*/

	context.beginPath();
	context.arc(center.x+5, center.y, 12, 0, 2 * Math.PI); 
	context.fillStyle = "red";
	context.fill();
	context.beginPath();
	context.arc(center.x-5, center.y, 12, 0, 2 * Math.PI); 
	context.fillStyle = "red";
	context.fill();

	context.beginPath();
	context.arc(center.x+5, center.y+6, 8, 0, 2 * Math.PI); 
	context.fillStyle = "red";
	context.fill();
	context.beginPath();
	context.arc(center.x-5, center.y+6, 8, 0, 2 * Math.PI); 
	context.fillStyle = "red";
	context.fill();

	context.beginPath();
	context.arc(center.x-11, center.y-3, 2, 0, 2 * Math.PI); 
	context.fillStyle = "white";
	context.fill();

	context.beginPath();
	context.arc(center.x-9, center.y-7, 1, 0, 2 * Math.PI); 
	context.fillStyle = "white";
	context.fill();

	context.beginPath();
	context.moveTo(center.x-1, center.y-8);
	context.lineTo(center.x-1, center.y-18);
	context.lineTo(center.x+5, center.y-18);
	context.fillStyle = "green"; //color
	context.lineJoin = "round";
	context.fill();
  }

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var newKey = GetKeyPressed();
	if(newKey !=0){
		x=newKey;
	
		if (x == 1) {//up
			if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
				shape.j--;
			}
		}
		if (x == 2) {//down
			if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
				shape.j++;
			}
		}
		if (x == 3) {//left
			if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
				shape.i--;
			}
		}
		if (x == 4) {//right
			if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
				shape.i++;
			}
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score+=50;
		window.clearInterval(intervalSpecial);
	}
	if (board[shape.i][shape.j] == 5) {
		score+=5;
	}
	if (board[shape.i][shape.j] == 15) {
		score+= 15;
	}
	if (board[shape.i][shape.j] == 25) {
		score+= 25;
	}
	if(board[shape.i][shape.j] == 6){
		endTime+=20;
	}
	if((shape.i == monster1.i)&&(shape.j == monster1.j)){
		score-=10;
		if(score<0)
			score=0;
		lives--;
		updateLives();
		continueGame();
	}
	else if((shape.i == monster2.i)&&(shape.j == monster2.j)){
		score-=10;
		if(score<0)
			score=0;
		lives--;
		endTime-=10;
		updateLives();
		continueGame();
	}
	else if((shape.i == monster3.i)&&(shape.j == monster3.j)){
		score-=10;
		if(score<0)
			score=0;
		lives-=2;
		updateLives();
		continueGame();
	}
	else if((shape.i == monster4.i)&&(shape.j == monster4.j)){
		score-=20;
		if(score<0)
			score=0;
		lives--;
		updateLives();
		continueGame();
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	time_elapsed=endTime-time_elapsed;
	if(time_elapsed <= 0){
		updateLives();
		endGame();
		if(score<100)
			window.alert("You are better than "+score+" points!");
		else
			window.alert("Winner!!");
	}
	/*if (score >= 20 && time_elapsed <= 10) {//????????????????????????????????????????????????????????????????????????????
		//pac_color = "green";
	}
	if (score == 50) {//????????????????????????????????????????????????????????????????????????????
		//window.clearInterval(interval);
		//window.alert("Game completed");

	}*/ else {
		Draw(x);
	}
}

function endGame(){
	window.clearInterval(interval);
	window.clearInterval(interval2);
	window.clearInterval(intervalSpecial);
}


function UpdatePositionMonster() {
	board[monster1.i][monster1.j]=monster1.preValMon1;
	
	//ROW
	if(monster1.i<shape.i && board[monster1.i+1][monster1.j ] != 1 && board[monster1.i+1][monster1.j ] != 4 && board[monster1.i+1][monster1.j ] != monster2.value && board[monster1.i+1][monster1.j ] != monster3.value && board[monster1.i+1][monster1.j ] != monster4.value){//monster above the pacman
		monster1.i++;
	}
	else if(monster1.i>shape.i && board[monster1.i-1][monster1.j ] != 1 && board[monster1.i-1][monster1.j ] != 4 && board[monster1.i-1][monster1.j ] != monster2.value && board[monster1.i-1][monster1.j ] != monster3.value && board[monster1.i-1][monster1.j ] != monster4.value){//monster under the pacman
		monster1.i--;
	}
	else{//COL
		if(monster1.j<shape.j && board[monster1.i][monster1.j + 1] != 1 && board[monster1.i][monster1.j + 1] != 4 && board[monster1.i][monster1.j + 1] != monster2.value && board[monster1.i][monster1.j + 1] != monster3.value && board[monster1.i][monster1.j + 1] != monster4.value){//monster is on the pacmans left
			monster1.j++;
		}
		else if(monster1.j>shape.j && board[monster1.i][monster1.j - 1] != 1 && board[monster1.i][monster1.j - 1] != 4 && board[monster1.i][monster1.j - 1] != monster2.value && board[monster1.i][monster1.j - 1] != monster3.value && board[monster1.i][monster1.j - 1] != monster4.value){//monster is on the pacmans right
			monster1.j--;
		}
	}
	monster1.preValMon1=board[monster1.i][monster1.j];
	board[monster1.i][monster1.j]=monster1.value;
	
	if(monster2.alive==1){
		board[monster2.i][monster2.j]=monster2.preValMon2;
		//COL
		if(monster2.j<shape.j && board[monster2.i][monster2.j + 1] != 1 && board[monster2.i][monster2.j + 1] != 4 && board[monster2.i][monster2.j + 1] !=monster1.value && board[monster2.i][monster2.j + 1] !=monster3.value && board[monster2.i][monster2.j + 1] !=monster4.value){//monster is on the pacmans left
			monster2.j++;
		}
		else if(monster2.j>shape.j && board[monster2.i][monster2.j - 1] != 1 && board[monster2.i][monster2.j - 1] != 4 && board[monster2.i][monster2.j - 1] !=monster1.value && board[monster2.i][monster2.j - 1] !=monster3.value && board[monster2.i][monster2.j - 1] !=monster4.value){//monster is on the pacmans right
			monster2.j--;
		}
		else{
			//ROW
			if(monster2.i<shape.i && board[monster2.i+1][monster2.j ] != 1 && board[monster2.i+1][monster2.j ] != 4 && board[monster2.i+1][monster2.j ] != monster1.value && board[monster2.i+1][monster2.j ] != monster3.value && board[monster2.i+1][monster2.j ] != monster4.value){//monster above the pacman
				monster2.i++;
			}
			else if(monster2.i>shape.i && board[monster2.i-1][monster2.j ] != 1 && board[monster2.i-1][monster2.j ] != 4 && board[monster2.i-1][monster2.j ] !=monster1.value && board[monster2.i-1][monster2.j ] !=monster3.value && board[monster2.i-1][monster2.j ] !=monster4.value){//monster under the pacman
				monster2.i--;
			}
		}
		monster2.preValMon2=board[monster2.i][monster2.j];
		board[monster2.i][monster2.j]=monster2.value;
	}
	if(monster3.alive==1){
		board[monster3.i][monster3.j]=monster3.preValMon3;
		//ROW
		if(monster3.i<shape.i && board[monster3.i+1][monster3.j ] != 1 && board[monster3.i+1][monster3.j ] != 4  && board[monster3.i+1][monster3.j ] !=monster1.value&& board[monster3.i+1][monster3.j ] !=monster2.value && board[monster3.i+1][monster3.j ] !=monster4.value){//monster above the pacman
			monster3.i++;
		}
		else if(monster3.i>shape.i && board[monster3.i-1][monster3.j ] != 1  && board[monster3.i-1][monster3.j ] != 4 && board[monster3.i-1][monster3.j ] !=monster1.value && board[monster3.i-1][monster3.j ] !=monster2.value && board[monster3.i-1][monster3.j ] !=monster4.value){//monster under the pacman
			monster3.i--;
		}
		else{//COL
			if(monster3.j<shape.j && board[monster3.i][monster3.j + 1] != 1 && board[monster3.i][monster3.j + 1] != 4 && board[monster3.i][monster3.j + 1] !=monster1.value && board[monster3.i][monster3.j + 1] !=monster2.value && board[monster3.i][monster3.j + 1] !=monster4.value){//monster is on the pacmans left
				monster3.j++;
			}
			else if(monster3.j>shape.j&& board[monster3.i][monster3.j - 1] != 1&& board[monster3.i][monster3.j - 1] != 4 && board[monster3.i][monster3.j - 1] !=monster1.value && board[monster3.i][monster3.j - 1] !=monster2.value && board[monster3.i][monster3.j - 1] !=monster4.value){//monster is on the pacmans right
				monster3.j--;
			}
		}
		monster3.preValMon3=board[monster3.i][monster3.j];
		board[monster3.i][monster3.j]=monster3.value;
	}
	if(monster4.alive==1){
		board[monster4.i][monster4.j]=monster4.preValMon4;
		//COL
		if(monster4.j<shape.j && board[monster4.i][monster4.j + 1] != 1&& board[monster4.i][monster4.j + 1] != 4 && board[monster4.i][monster4.j + 1] !=monster1.value  && board[monster4.i][monster4.j + 1] !=monster2.value  && board[monster4.i][monster4.j + 1] !=monster3.value ){//monster is on the pacmans left
			monster4.j++;
		}
		else if(monster4.j>shape.j && board[monster4.i][monster4.j - 1] != 1 && board[monster4.i][monster4.j - 1] != 4 && board[monster4.i][monster4.j - 1] !=monster1.value && board[monster4.i][monster4.j - 1] !=monster2.value && board[monster4.i][monster4.j - 1] !=monster3.value){//monster is on the pacmans right
			monster4.j--;
		}
		else{//ROW
			if(monster4.i<shape.i && board[monster4.i+1][monster4.j ] != 1  && board[monster4.i+1][monster4.j ] != 4 && board[monster4.i+1][monster4.j ] != monster1.value && board[monster4.i+1][monster4.j ] != monster2.value && board[monster4.i+1][monster4.j ] != monster3.value){//monster above the pacman
				monster4.i++;
			}
			else if(monster4.i>shape.i&& board[monster4.i-1][monster4.j ] != 1&& board[monster4.i-1][monster4.j ] != 4 && board[monster4.i-1][monster4.j ] != monster1.value && board[monster4.i-1][monster4.j ] != monster2.value && board[monster4.i-1][monster4.j ] != monster3.value){//monster under the pacman
				monster4.i--;
			}
		}
		monster4.preValMon4=board[monster4.i][monster4.j];
		board[monster4.i][monster4.j]=monster4.value;
	}


	
}

function UpdatePositionSpecial() {
	board[special.i][special.j]=special.preVal;
	var found=false;
	while(!found){
		var random=(Math.random()*4)+1;
		//ROW
		if(random>4){
			if(special.i<9 && board[special.i+1][special.j ] != 2 && board[special.i+1][special.j ] != 4 && board[special.i+1][special.j ] != monster1.value && board[special.i+1][special.j ] != monster2.value && board[special.i+1][special.j ] != monster3.value && board[special.i+1][special.j ] != monster4.value){
				special.i++;
				found=true;
				break;
			}
		}
		else if(random>3){
			if(special.i>0 && board[special.i-1][special.j ] != 2 && board[special.i-1][special.j ] != 4 && board[special.i-1][special.j ] != monster1.value && board[special.i-1][special.j ] != monster2.value && board[special.i-1][special.j ] != monster3.value && board[special.i-1][special.j ] != monster4.value){
				special.i--;
				found=true;
				break;
			}
		}
		//COL
		else if(random>2){
			if(special.j<9 && board[special.i][special.j + 1] != 2 && board[special.i][special.j + 1] != 4 && board[special.i][special.j + 1] != monster1.value && board[special.i][special.j + 1] != monster2.value && board[special.i][special.j + 1] != monster3.value && board[special.i][special.j + 1] != monster4.value){
				special.j++;
				found=true;
				break;
			}
		}
		else {
			if(special.j>0 && board[special.i][special.j - 1] != 2 && board[special.i][special.j - 1] != 4 && board[special.i][special.j - 1] != monster1.value && board[special.i][special.j - 1] != monster2.value && board[special.i][special.j - 1] != monster3.value && board[special.i][special.j - 1] != monster4.value){
				special.j--;
				found=true;
				break;
			}
		}
	}
	special.preVal=board[special.i][special.j];
	board[special.i][special.j]=1;
}

function updateLives(){//---------------------------------------------------------------------------wait??
	if(lives == 0){
		var live1 = document.getElementById('heart1');
		live1.style.visibility="hidden";
		var live2 = document.getElementById('heart2');
		live2.style.visibility="hidden";
		var live3 = document.getElementById('heart3');
		live3.style.visibility="hidden";
		var live4 = document.getElementById('heart4');
		live4.style.visibility="hidden";
		var live5 = document.getElementById('heart5');
		live5.style.visibility="hidden";
		endGame();
		setTimeout(window.alert("Loser!"), 1500);
	}
	if(lives==1){
		var live1 = document.getElementById('heart1');
		live1.style.visibility="visible";
		var live2 = document.getElementById('heart2');
		live2.style.visibility="hidden";
		var live3 = document.getElementById('heart3');
		live3.style.visibility="hidden";
		var live4 = document.getElementById('heart4');
		live4.style.visibility="hidden";
		var live5 = document.getElementById('heart5');
		live5.style.visibility="hidden";
	}
	else if(lives==2){
		var live1 = document.getElementById('heart1');
		live1.style.visibility="visible";
		var live2 = document.getElementById('heart2');
		live2.style.visibility="visible";
		var live3 = document.getElementById('heart3');
		live3.style.visibility="hidden";
		var live4 = document.getElementById('heart4');
		live4.style.visibility="hidden";
		var live5 = document.getElementById('heart5');
		live5.style.visibility="hidden";
	}
	else if(lives==3){
		var live1 = document.getElementById('heart1');
		live1.style.visibility="visible";
		var live2 = document.getElementById('heart2');
		live2.style.visibility="visible";
		var live3 = document.getElementById('heart3');
		live3.style.visibility="visible";
		var live4 = document.getElementById('heart4');
		live4.style.visibility="hidden";
		var live5 = document.getElementById('heart5');
		live5.style.visibility="hidden";
	}
	else if(lives==4){
		var live1 = document.getElementById('heart1');
		live1.style.visibility="visible";
		var live2 = document.getElementById('heart2');
		live2.style.visibility="visible";
		var live3 = document.getElementById('heart3');
		live3.style.visibility="visible";
		var live4 = document.getElementById('heart4');
		live4.style.visibility="visible";
		var live5 = document.getElementById('heart5');
		live5.style.visibility="hidden";
	}
	else if(lives==5){
		var live1 = document.getElementById('heart1');
		live1.style.visibility="visible";
		var live2 = document.getElementById('heart2');
		live2.style.visibility="visible";
		var live3 = document.getElementById('heart3');
		live3.style.visibility="visible";
		var live4 = document.getElementById('heart4');
		live4.style.visibility="visible";
		var live5 = document.getElementById('heart5');
		live5.style.visibility="visible";
	}
}

function continueGame(){
	//pacman
	board[shape.i][shape.j]=0;
	var emptyCell = findRandomEmptyCell(board);
	shape.i=emptyCell[0];
	shape.j=emptyCell[1];
	board[emptyCell[0]][emptyCell[1]]=2;

	//monsters
	monster1.alive=1;
	if(monster1.preValMon1==2){
		board[monster1.i][monster1.j]=0;
	}else{
		board[monster1.i][monster1.j]=monster1.preValMon1;
	}
	
	monster1.preValMon1=board[0][0];
	board[0][0]=7;
	monster1.value=7;
	monster1.i=0;
	monster1.j=0;
	monster2.alive=0;
	monster3.alive=0;
	monster4.alive=0;
		
	if(monstersAmount>=2){
		monster2.alive=1;
		if(monster2.preValMon2==2){
			board[monster2.i][monster2.j]=0;
		}
		else{
			board[monster2.i][monster2.j]=monster2.preValMon2;
		}
		monster2.preValMon2=board[0][9];
		board[0][9]=8;
		monster2.value=8;
		monster2.i=0;
		monster2.j=9;
	}
	else{
		monster2.value=-1;
		monster3.value=-1;
		monster4.value=-1;
	}
	if(monstersAmount>=3){
		monster3.alive=1;
		if(monster3.preValMon3==2){
			board[monster3.i][monster3.j]=0;
		}
		else{
			board[monster3.i][monster3.j]=monster3.preValMon3;
		}
		monster3.preValMon3=board[9][9];
		board[9][9]=9;
		monster3.value=9;
		monster3.i=9;
		monster3.j=9;
	}else{
		monster3.value=-1;
		monster4.value=-1;
	}
	if(monstersAmount==4){
		monster4.alive=1;
		if(monster4.preValMon4==2){
			board[monster4.i][monster4.j]=0;
		}
		else{
			board[monster4.i][monster4.j]=monster4.preValMon4;
		}
		monster4.preValMon4=board[9][0];
		board[9][0]=10;
		monster4.value=10;
		monster4.i=9;
		monster4.j=0;
	}else{
		monster4.value=-1;
	}

	Draw(-1);
}

//setups

$(document).ready(function() {

	var upkeyValue;
	var DownkeyValue;
	var RightkeyValue;
	var LeftkeyValue;

	//sliders
	var rangesliderballs = document.getElementById("balls"); 
	var outputballs = document.getElementById("ballsDemo"); 
	outputballs.innerHTML = rangesliderballs.value; 
	
	rangesliderballs.oninput = function() { 
	outputballs.innerHTML = this.value; 
	}

	var rangeslidermonsters = document.getElementById("monsters"); 
	var outputmonsters = document.getElementById("monstersDemo"); 
	outputmonsters.innerHTML = rangeslidermonsters.value; 
	
	rangeslidermonsters.oninput = function() { 
	outputmonsters.innerHTML = this.value; 
	}

	let UpKeyEl = document.getElementById('UpKey');
	UpKeyEl.addEventListener('keydown', (e) => {
		if (!e.repeat){
			$("#UpKeyerror").remove();
			upkeyValue=e.keyCode;
			upKey=e.key;
			  $('#UpKey').after('<span id="UpKeyerror" class="error">Key '+upKey+' pressed</span>');
		}

	  });
	let DownKeyEl = document.getElementById('DownKey');
	DownKeyEl.addEventListener('keydown', (e) => {
	if (!e.repeat){
		$("#DownKeyerror").remove();
		DownkeyValue=e.keyCode;
		downKey=e.key;
		$('#DownKey').after('<span id="DownKeyerror" class="error">Key '+downKey+' pressed</span>');
	}

	  });
	  let RightKeyEl = document.getElementById('RightKey');
	  RightKeyEl.addEventListener('keydown', (e) => {
		if (!e.repeat){
			$("#RightKeyerror").remove();
			RightkeyValue=e.keyCode;
			rightKey=e.key;
			  $('#RightKey').after('<span id="RightKeyerror" class="error">Key '+rightKey+' pressed</span>');
		}

	  });
	  let LeftKeyEl = document.getElementById('LeftKey');
	  LeftKeyEl.addEventListener('keydown', (e) => {
		if (!e.repeat){
			$("#LeftKeyerror").remove();
			LeftkeyValue=e.keyCode;
			leftKey=e.key;
			  $('#LeftKey').after('<span id="LeftKeyerror" class="error">Key '+leftKey+' pressed</span>');
		}

	  });

	//setups
	  



	$('#Setups').submit(function(e) {
		e.preventDefault();
		var canSaveSetup=true;
		var balls = $('#balls').val();
		var Time = $('#Time').val();
		var monsters = $('#monsters').val();
		var color5 = $('#ball5p').val();
		var color15 = $('#ball15p').val();
		var color25 = $('#ball25p').val();

		$(".error").remove();

		
		if (balls.length < 1) {
			$('#balls').after('<span class="error">This field is required</span>');
			canSaveSetup=false;
		}

		if (Time.length < 1) {
			$('#Time').after('<span class="error">This field is required</span>');
			canSaveSetup=false;
		}
		if (monsters.length < 1) {
			$('#monsters').after('<span class="error">This field is required</span>');
			canSaveSetup=false;
		}

		if(canSaveSetup){
			//set keys
			up=upkeyValue;
			down=DownkeyValue;
			right=RightkeyValue;
			left=LeftkeyValue;
			food_Amount=balls;
			endTime=Time;
			color5points=color5;
			color15points=color15;
			color25points=color25;
			monstersAmount=monsters;
			Start();
			showSetups();
			ShowSection('boardGame');
			
		} 

		//return false;
		//else?
	});
	});

	//function submit(){
		
		

	function randomSetups(){
		right= 39;
		left =37;
		down= 40;
		up=38;
		food_Amount = Math.round((Math.random()*40)+50);//50-90
		color5points=getRandomColor();
		color15points=getRandomColor();
		color25points=getRandomColor();
		endTime=Math.round((Math.random()*100)+60);//minimum 60
		monstersAmount=Math.round((Math.random()*4)+1);//1-4
		Start();
		showSetups();
		ShowSection('boardGame');
	}

	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
		  color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	  }

	  function showSetups(){
		  var demoKeyUp=document.getElementById('KeyUpDemoSet');
		  demoKeyUp.innerHTML=upKey;
		  var demoKeyDown=document.getElementById('KeyDownDemoSet');
		  demoKeyDown.innerHTML=downKey;
		  var demoKeyRight=document.getElementById('KeyRightDemoSet');
		  demoKeyRight.innerHTML=rightKey;
		  var demoKeyLeft=document.getElementById('KeyLeftDemoSet');
		  demoKeyLeft.innerHTML=leftKey;
		  var demofood=document.getElementById('foodDemoSet');
		  demofood.innerHTML=food_Amount;
		  var demo5points=document.getElementById('5pointsDemoSet');
		  demo5points.style="background-color:"+color5points+";";
		  var demo15points=document.getElementById('15pointsDemoSet');
		  demo15points.style="background-color:"+color15points+";";
		  var demo25points=document.getElementById('25pointsDemoSet');
		  demo25points.style="background-color:"+color25points+";";
		  var demotime=document.getElementById('TimeDemoSet');
		  demotime.innerHTML=endTime;
		  var monsterDemo=document.getElementById('MonsterDemoSet');
		  monsterDemo.innerHTML=monstersAmount;
		  player= document.getElementById("userName");
		  var demoPlayer=document.getElementById('userNamePlayer');
		  demoPlayer.innerHTML=player.value;
	  }
	  
