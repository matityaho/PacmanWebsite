	
//setups
$(document).ready(function() {

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
	
    });
    
//set the values in the game
function buttonSetGame(){
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
    }else if (Time < 60) {
        $('#Time').after('<span class="error">Enter 60 or more seconds!</span>');
        canSaveSetup=false;
    }
    if (monsters.length < 1) {
        $('#monsters').after('<span class="error">This field is required</span>');
        canSaveSetup=false;
    }
    if(canSaveSetup){
        //set keys
        up=upkeyValue;
        down=downkeyValue;
        right=rightkeyValue;
        left=leftkeyValue;
        food_Amount=balls;
        endTime=parseInt(Time);
        color5points=color5;
        color15points=color15;
        color25points=color25;
        monstersAmount=monsters;
        Start();
        showSetups();
        ShowSection('boardGame');
    } 
    return false;
}	
//button random
function randomSetups(){
    document.getElementById('buttomUp').value='Up';
    document.getElementById('buttomDown').value='Down';
    document.getElementById('buttomLeft').value='Left';
    document.getElementById('buttomRight').value='Right';
    right= 39,rightkeyValue= 39;
    left =37,leftkeyValue= 37;
    down= 40,downkeyValue= 40;
    up=38,upkeyValue= 38;
    upKey="ArrowUp";
    downKey="ArrowDown";
    rightKey="ArrowRight";
    leftKey="ArrowLeft";

    food_Amount = Math.round((Math.random()*40)+50);//50-90
    document.getElementById('balls').value=food_Amount;
    document.getElementById("ballsDemo").innerHTML =food_Amount;
    
    var arrColor=getRandomColor();
    color5points=arrColor[0];
    document.getElementById('ball5p').value=arrColor[1];
    arrColor=getRandomColor();
    color15points=arrColor[0];
    document.getElementById('ball15p').value=arrColor[1];
    arrColor=getRandomColor();
    color25points=arrColor[0];
    document.getElementById('ball25p').value=arrColor[1];
    endTime=Math.round((Math.random()*100)+60);//minimum 60
    document.getElementById('Time').value=endTime;
    monstersAmount=Math.round((Math.random()*3)+1);//1-4
    document.getElementById('monsters').value=monstersAmount;
    document.getElementById("monstersDemo").innerHTML =monstersAmount;
}
    
function getRandomColor() {
    var num1=Math.round((Math.random()*150)+50);
    var num2=Math.round((Math.random()*150)+50);
    var num3=Math.round((Math.random()*150)+50);
    var color="rgb("+num1+","+num2+","+num3+")";
    var colorHex=rgbToHex(num1,num2,num3);
    return [color,colorHex];
    }

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
    }
    
    function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

//display settings near the game
function showSetups(){
    var demoKeyUp=document.getElementById('KeyUpDemoSet');
    if(up == 32){
      demoKeyUp.innerHTML='space';
    }
    else{
        demoKeyUp.innerHTML=upKey;
    }
    var demoKeyDown=document.getElementById('KeyDownDemoSet');
    if(down == 32){
      demoKeyDown.innerHTML='space';
    }else{
        demoKeyDown.innerHTML=downKey;
    }
    var demoKeyRight=document.getElementById('KeyRightDemoSet');
    if(right == 32){
      demoKeyRight.innerHTML='space';
    }
    else{
        demoKeyRight.innerHTML=rightKey;
    }
    var demoKeyLeft=document.getElementById('KeyLeftDemoSet');
    if(left == 32){
      demoKeyLeft.innerHTML='space';
    }else{
        demoKeyLeft.innerHTML=leftKey;
    }
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

//listeners to keys
var upPressed;
function upButtom(){
    upPressed=false;
    addEventListener('keydown', function f(e) {
        if (e != undefined && !upPressed){
            upkeyValue=e.keyCode;
            upKey=e.key;
            if(upkeyValue == 32){
                document.getElementById('buttomUp').value='space';
            }
            else{
                document.getElementById('buttomUp').value=upKey;
            }
            upPressed=true;
            
        }
    });
    
}

var rightPressed;
function rightButtom(){
    rightPressed=false;
    addEventListener('keydown', function f(e) {
        if (e != undefined && !rightPressed){
            rightkeyValue=e.keyCode;
            rightKey=e.key;
            if(rightkeyValue == 32){
                document.getElementById('buttomRight').value='space';
            }
            else{
                document.getElementById('buttomRight').value=rightKey;
            }
            rightPressed=true;
            
        }
    });
    
}

var downPressed;
function downButtom(){
    downPressed=false;
    addEventListener('keydown', function f(e) {
        if (e != undefined && !downPressed){
            downkeyValue=e.keyCode;
            downKey=e.key;
            if(downkeyValue== 32){
                document.getElementById('buttomDown').value='space';
            }
            else{
                document.getElementById('buttomDown').value=downKey;
            }
            downPressed=true;
            
        }
    });
    
}

var leftPressed;
function leftButtom(){
    leftPressed=false;
    addEventListener('keydown', function f(e) {
        if (e != undefined && !leftPressed){
            leftkeyValue=e.keyCode;
            leftKey=e.key;
            if(leftkeyValue== 32){
                document.getElementById('buttomLeft').value='space';
            }
            else{
                document.getElementById('buttomLeft').value=leftKey;
            }
            leftPressed=true;
            
        }
    });
    
}