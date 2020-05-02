var poll;
savePUser();
function savePUser() 
{
    var userName="p";
    var password="p";
    sessionStorage.setItem(userName,password);
}   
//pick between Divs
function PageLoaded()
{
    ShowSection('welcome');
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
		
		}
	}, 100);
}
function ShowSection(id)
{
    //hide all Divs
    var section1 = document.getElementById('welcome');
    section1.style.visibility="hidden";
    var section2 = document.getElementById('Registration');
    section2.style.visibility="hidden";
    var section3 = document.getElementById('login');
    section3.style.visibility="hidden";
    var section4 = document.getElementById('boardGame');
    section4.style.visibility="hidden";
    var section4 = document.getElementById('setups');
    section4.style.visibility="hidden";
    
    //show only one Div
    var selected = document.getElementById(id);
    selected.style.visibility="visible";
    if(id != 'boardGame')
        endGame();
    
    $(".error").remove();
}


//form registration

var canSave=true;
//$(document).ready(function() {

    //$('#registration').submit(function(e) {
        //e.preventDefault();
        
        //return false;
    //});
    

   // });
    
    
function clearReg(){
    document.getElementById('password').value = '';
    document.getElementById('email').value = '';
    document.getElementById('date').value = '';
    document.getElementById('fullname').value = '';
    document.getElementById('username').value = '';
    $(".error").remove();

}

    //end reg
    function subClick(){
        canSave=true;
        var username = $('#username').val();
        var fullname = $('#fullname').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var date = $('#ndt').val();

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
            $('#fullname').after('<span class="error">Enter username with charecters only</span>');
            canSave=false;
            }
        }
        if (date.length < 1) {
            $('#ndt').after('<span class="error">This field is required</span>');
            canSave=false;
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

function mydate() {
    //alert("");
    document.getElementById("dt").hidden = false;
    document.getElementById("ndt").hidden = true;
  }
  
  function mydate1() {
    d = new Date(document.getElementById("dt").value);
    dt = d.getDate();
    mn = d.getMonth();
    mn++;
    yy = d.getFullYear();
    document.getElementById("ndt").value = dt + "/" + mn + "/" + yy
    document.getElementById("ndt").hidden = false;
    document.getElementById("dt").hidden = true;
  }



