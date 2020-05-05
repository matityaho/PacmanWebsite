
function Draw(x) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < boardYlen; i++) {
		for (var j = 0; j < boardXlen; j++) {
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
				var wallImg = document.getElementById("wallImp");
				context.drawImage(wallImg, center.x - 30, center.y - 30, 60, 60);
			
			}
			else if(board[i][j] == 6){ //time
				context.beginPath();
				context.moveTo(center.x, center.y);
				context.lineTo(center.x-14, center.y+14);//(20, 100);
				context.lineTo(center.x+14, center.y+14);//(80, 100);
				context.lineTo(center.x, center.y);//(50, 50);
				context.lineTo(center.x-14, center.y-14);//(20, 0);
				context.lineTo(center.x+14, center.y-14);//(80, 0);
				context.lineTo(center.x, center.y);//(50, 50);
				context.lineJoin='round';
				context.strokeStyle="#eeeeeeec";
				context.lineWidth=5;
				context.stroke();
			}
			else if(board[i][j] == 7){ //monster
				drawMonster(center,context, "rgb(45, 192, 0)");
			}
			else if(board[i][j] == 8){ //monster
				drawMonster(center,context, "red");//"rgb(253, 168, 196)");"#ed68ff"
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