var context;
var shape;
var board;
var boardXlen=10;
var boardYlen=12;
var score;
var pac_color;
var start_time;
var time_elapsed;
var endTime;
var interval;
var interval2;
var intervalSpecial;
var right= 39,rightkeyValue= 39;
var left =37,leftkeyValue= 37;
var down= 40,downkeyValue= 40;
var up=38,upkeyValue= 38;
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
var audio;
var gameTime;
var foodRemainGame;


$(document).ready(function() {
	audio = document.getElementById("gameAudio"); 
 });

function playAudio() { 
	audio.currentTime = 0;
	audio.play(); 
} 

function stopAudio() { 
	audio.pause(); 
}


function Start() {
	board=[	[0,0,0,0,0,0,0,0,0,0],
			[0,4,0,0,0,0,0,4,4,0],
			[0,4,4,0,0,0,4,4,0,0],
			[0,0,4,0,4,0,0,0,0,0],
			[0,0,0,0,4,0,0,4,4,0],
			[0,4,0,0,0,0,0,0,0,0],
			[0,4,0,0,0,4,4,0,0,0],
			[0,0,0,0,0,0,4,0,0,0],
			[0,0,0,0,0,0,0,0,4,0],
			[0,0,4,4,0,0,4,4,4,0],
			[0,0,0,4,4,0,4,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]];
	context = canvas.getContext("2d");
	//board = new Array();
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
	foodRemainGame=food_Amount;
	start_time = new Date();
	monster1 = new Object();
	monster2 = new Object();
	monster3 = new Object();
	monster4 = new Object();
	special = new Object();
	shape = new Object();
	gameTime=endTime;
	for (var i = 0; i < boardYlen; i++) {
		//board[i] = new Array();

		//0-empty,1- special points,2-pacman, 4-wall,5- 5 points, 15- 15 points, 25- 25 points, 6-time, 7-monster1,8-monster2,9-monster3,10-monster4,
		for (var j = 0; j < boardXlen; j++) {
			if (board[i][j] != 4) {//not walls
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

				} else if ((randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) && !(i==0 && j==0) && !(i==0 && j==boardXlen-1) && !(i==boardYlen-1 && j==0) && !(i==boardYlen-1 && j==boardXlen-1)) {
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
	if(pacman_remain || shape.i == undefined || shape.j == undefined){
		var emptyCell = findEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		pacman_remain--;
		board[emptyCell[0]][emptyCell[1]] = 2;
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
		monster2.preValMon2=board[0][boardXlen-1];
		board[0][boardXlen-1]=8;
		monster2.value=8;
		monster2.i=0;
		monster2.j=boardXlen-1;
	}
	else{
		monster2.value=-1;
		monster3.value=-1;
		monster4.value=-1;
	}
	if(monstersAmount>=3){
		monster3.alive=1;
		monster3.preValMon3=board[boardYlen-1][boardXlen-1];
		board[boardYlen-1][boardXlen-1]=9;
		monster3.value=9;
		monster3.i=boardYlen-1;
		monster3.j=boardXlen-1;
	}else{
		monster3.value=-1;
		monster4.value=-1;
	}
	if(monstersAmount==4){
		monster4.alive=1;
		monster4.preValMon4=board[boardYlen-1][0];
		board[boardYlen-1][0]=10;
		monster4.value=10;
		monster4.i=boardYlen-1;
		monster4.j=0;
	}else{
		monster4.value=-1;
	}

	//time
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]]=6;

	//special points
	if(monstersAmount==4){
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]]=1;
		special.preVal=0;
		special.i=emptyCell[0];
		special.j=emptyCell[1];
	}else{
		board[boardYlen-1][0]=1;
		special.preVal=0;
		special.i=boardYlen-1;
		special.j=0;
	}

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
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
	interval = setInterval(UpdatePosition, 100);
	interval2 = setInterval(UpdatePositionMonster, 400);
	intervalSpecial = setInterval(UpdatePositionSpecial, 600);
	playAudio();
	
	
}

function findEmptyCell(board){
	var i=0;
	var j=0;
	for(i=0;i<boardYlen;i++){
		for(j=0;j<boardXlen;j++){
			if(board[i][j] == 0)
				return [i, j];
		}
	}
	return [i, j];
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (boardYlen-1) + 1);
	var j = Math.floor(Math.random() * (boardXlen-1) + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * (boardYlen-1) + 1);
		j = Math.floor(Math.random() * (boardXlen-1) + 1);
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
			if (shape.j < boardXlen-1 && board[shape.i][shape.j + 1] != 4) {
				shape.j++;
			}
		}
		if (x == 3) {//left
			if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
				shape.i--;
			}
		}
		if (x == 4) {//right
			if (shape.i < boardYlen-1 && board[shape.i + 1][shape.j] != 4) {
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
		foodRemainGame--;
	}
	if (board[shape.i][shape.j] == 15) {
		score+= 15;
		foodRemainGame--;
	}
	if (board[shape.i][shape.j] == 25) {
		score+= 25;
		foodRemainGame--;
	}
	if(board[shape.i][shape.j] == 6){
		gameTime+=20;
	}
	if((shape.i == monster1.i)&&(shape.j == monster1.j)){
		score-=10;
		if(score<0)
			score=0;
		lives--;
		if(lives<0)
			lives=0;
		updateLives();
		continueGame();
	}
	else if((shape.i == monster2.i)&&(shape.j == monster2.j)){
		score-=10;
		if(score<0)
			score=0;
		lives--;
		if(lives<0)
			lives=0;
		gameTime-=10;
		updateLives();
		continueGame();
	}
	else if((shape.i == monster3.i)&&(shape.j == monster3.j)){
		score-=10;
		if(score<0)
			score=0;
		lives-=2;
		if(lives<0)
			lives=0;
		updateLives();
		continueGame();
	}
	else if((shape.i == monster4.i)&&(shape.j == monster4.j)){
		score-=20;
		if(score<0)
			score=0;
		lives--;
		if(lives<0)
			lives=0;
		updateLives();
		continueGame();
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	time_elapsed=Math.round(gameTime-time_elapsed);
	if(time_elapsed < 0){
		updateLives();
		endGame();
		lblScore.value = score;
		lblTime.value = 0;
		if(score<100)
			setTimeout(function(){window.alert("You are better than "+score+" points!");},250);
		else
			setTimeout(function(){window.alert("Winner!!");},250);		
	}else if(foodRemainGame <=3 && findCandys()){
		updateLives();
		endGame();
		Draw(x);
		setTimeout(function(){window.alert("Winner!!");},250);
	} else {
		Draw(x);
	}
}

function findCandys(){
	var i=0;
	var j=0;
	for(i=0;i<boardYlen;i++){
		for(j=0;j<boardXlen;j++){
			if(board[i][j] == 5 || board[i][j] == 15 || board[i][j] == 25 )
				return false;
		}
	}
	return true;
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
	if((shape.i == monster1.i)&&(shape.j == monster1.j)){
		monster1.preValMon1=0;
		score-=10;
		if(score<0)
			score=0;
		lives--;
		if(lives<0)
			lives=0;
		updateLives();
		continueGame();
		return;
	}
	else{
		monster1.preValMon1=board[monster1.i][monster1.j];
	}
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
		if((shape.i == monster2.i)&&(shape.j == monster2.j)){
			monster2.preValMon2=0;
			score-=10;
			if(score<0)
				score=0;
			lives--;
			if(lives<0)
				lives=0;
			gameTime-=10;
			updateLives();
			continueGame();
			return;
		}
		else{
			monster2.preValMon2=board[monster2.i][monster2.j];
			board[monster2.i][monster2.j]=monster2.value;
		}
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
		if((shape.i == monster3.i)&&(shape.j == monster3.j)){
			monster3.preValMon3=0;
			score-=10;
			if(score<0)
				score=0;
			lives-=2;
			if(lives<0)
				lives=0;
			updateLives();
			continueGame();
			return;
		}
		else{
			monster3.preValMon3=board[monster3.i][monster3.j];
			board[monster3.i][monster3.j]=monster3.value;
		}
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
		if((shape.i == monster4.i)&&(shape.j == monster4.j)){
			monster4.preValMon4=0;
			score-=20;
			if(score<0)
				score=0;
			lives--;
			if(lives<0)
				lives=0;
			updateLives();
			continueGame();
			return;
		}
		else{
			monster4.preValMon4=board[monster4.i][monster4.j];
		}
		board[monster4.i][monster4.j]=monster4.value;
	}
}

function UpdatePositionSpecial() {
	board[special.i][special.j]=special.preVal;
	var found=false;
	var random=(Math.random()*4)+1;
	if(random>4){
		if(special.i<boardYlen-1 && board[special.i+1][special.j ] != 2 && board[special.i+1][special.j ] != 4 && board[special.i+1][special.j ] != monster1.value && board[special.i+1][special.j ] != monster2.value && board[special.i+1][special.j ] != monster3.value && board[special.i+1][special.j ] != monster4.value){
			special.i++;
			found=true;
		}
	}
	else if(random>3 && !found){
		if(special.i>0 && board[special.i-1][special.j ] != 2 && board[special.i-1][special.j ] != 4 && board[special.i-1][special.j ] != monster1.value && board[special.i-1][special.j ] != monster2.value && board[special.i-1][special.j ] != monster3.value && board[special.i-1][special.j ] != monster4.value){
			special.i--;
			found=true;
		}
	}
	//COL
	else if(random>2 && !found){
		if(special.j<boardXlen-1 && board[special.i][special.j + 1] != 2 && board[special.i][special.j + 1] != 4 && board[special.i][special.j + 1] != monster1.value && board[special.i][special.j + 1] != monster2.value && board[special.i][special.j + 1] != monster3.value && board[special.i][special.j + 1] != monster4.value){
			special.j++;
			found=true;
		}
	}
	else if(random>1 && !found){
		if(special.j>0 && board[special.i][special.j - 1] != 2 && board[special.i][special.j - 1] != 4 && board[special.i][special.j - 1] != monster1.value && board[special.i][special.j - 1] != monster2.value && board[special.i][special.j - 1] != monster3.value && board[special.i][special.j - 1] != monster4.value){
			special.j--;
			found=true;
		}
	}
	special.preVal=board[special.i][special.j];
	board[special.i][special.j]=1;
}
//showing the amount of lives
function updateLives(){
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
		setTimeout(function(){window.alert("Loser!")},250);
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

//when one lives down
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
	monster1.preValMon1=0;
	monster2.preValMon2=0;
	monster3.preValMon3=0;
	monster4.preValMon4=0;
		
	if(monstersAmount>=2){
		monster2.alive=1;
		if(monster2.preValMon2==2){
			board[monster2.i][monster2.j]=0;
		}
		else{
			board[monster2.i][monster2.j]=monster2.preValMon2;
		}
		monster2.preValMon2=board[0][boardXlen-1];
		board[0][boardXlen-1]=8;
		monster2.value=8;
		monster2.i=0;
		monster2.j=boardXlen-1;
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
		monster3.preValMon3=board[9][boardXlen-1];
		board[boardYlen-1][boardXlen-1]=9;
		monster3.value=9;
		monster3.i=boardYlen-1;
		monster3.j=boardXlen-1;
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
		monster4.preValMon4=board[boardYlen-1][0];
		board[boardYlen-1][0]=10;
		monster4.value=10;
		monster4.i=boardYlen-1;
		monster4.j=0;
	}else{
		monster4.value=-1;
	}
	Draw(-1);
}
//button new game
function newGameSameSetups(){
	endGame();
	Start();
}

function endGame(){
	window.clearInterval(interval);
	window.clearInterval(interval2);
	window.clearInterval(intervalSpecial);
	stopAudio();
}

	  
