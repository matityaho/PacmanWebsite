var poll;
savePUser();
function savePUser() 
{
    var userName="p";
    var password="p";
    sessionStorage.setItem(userName,password);
}   
function PageLoaded()
{
    ShowSection('welcome');
    poll = setInterval(function()
	{
		var current_style = document.getElementById('boardGame').style.display;
		if (current_style == "none") {
			endGame();
		}
	}, 100);
}
//pick between Divs
function ShowSection(id)
{
    //hide all Divs
    var section1 = document.getElementById('welcome');
    section1.style.display="none";
    var section2 = document.getElementById('Registration');
    section2.style.display="none";
    var section3 = document.getElementById('login');
    section3.style.display="none";
    var section4 = document.getElementById('boardGame');
    section4.style.display="none";
    var section4 = document.getElementById('setups');
    section4.style.display="none";
    
    //show only one Div
    var selected = document.getElementById(id);
    selected.style.display="table";
    if(id != 'boardGame')
        endGame();
    
    $(".error").remove();
}


//form registration
var canSave=true;
function clearReg(){
    document.getElementById('password').value = '';
    document.getElementById('email').value = '';
    document.getElementById('fullname').value = '';
    document.getElementById('username').value = '';
    document.getElementById('day').value = '1';
    document.getElementById('month').value = 'Jan';
    document.getElementById('year').value = '2016';
    $(".error").remove();

}

//end reg
function subClick(){
    canSave=true;
    var username = $('#username').val();
    var fullname = $('#fullname').val();
    var email = $('#email').val();
    var password = $('#password').val();

    $(".error").remove();

    if (username.length < 1) {
        $('#username').after('<span class="error">This field is required</span>');
        canSave=false;
    }
    else{
        var regEx = /^[a-zA-Z]+$/;
        var validusername = regEx.test(username);
        if (!validusername) {
        $('#username').after('<span class="error">Enter username with charecters only</span>');
        canSave=false;
        }
    }
    if (fullname.length < 1) {
        $('#fullname').after('<span class="error">This field is required</span>');
        canSave=false;
    }
    else{
        var regEx = /^[a-z][a-z\s]*$/;
        var validfullname = regEx.test(fullname);
        if (!validfullname) {
        $('#fullname').after('<span class="error">Enter full name with charecters only</span>');
        canSave=false;
        }
    }
    if (email.length < 1) {
        $('#email').after('<span class="error">This field is required</span>');
        canSave=false;
    } else {
        var regEx = /^\S+@\S+\.\S+$/;
        var validEmail = regEx.test(email);
        if (!validEmail) {
        $('#email').after('<span class="error">Enter a valid email</span>');
        canSave=false;
        } 
    }
    if (password.length < 1) {
        $('#password').after('<span class="error">This field is required</span>');
        canSave=false;
    }
    else if (password.length < 6) {
        $('#password').after('<span class="error">Password must be at least 6 characters long</span>');
        canSave=false;
    }
    else{
        var regEx = /[a-z].[0-9]|[0-9].[a-z]/i;
        var validPass = regEx.test(password);
        if (!validPass) {
        $('#password').after('<span class="error">Enter password with charecters and digits</span>');
        canSave=false;
        }
    }
    if(canSave){
    saveUser(); 
    alert("You have registered successfully!");
    $("#registration")[0].reset();
    $(".error").remove();
    ShowSection('login');
    }
}
function saveUser() 
{
    var userName=document.getElementById("username");
    var password=document.getElementById("password");
    sessionStorage.setItem(userName.value,password.value);
    
}   

//login
function checkDetails() 
{
    $(".error").remove();
    var userName=document.getElementById("userName");
    var password=document.getElementById("Password");
    var passwordFromStorage=sessionStorage.getItem(userName.value);
    if(password.value != passwordFromStorage){
        alert("Wrong password or Username");
    }
     else{
        ShowSection('setups');
    } 
} 


