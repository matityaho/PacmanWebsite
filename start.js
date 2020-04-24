
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
}


//form registration

var canSave=true;
$(document).ready(function() {

    $('#registration').submit(function(e) {
    e.preventDefault();
    var username = $('#username').val();
    var fullname = $('#fullname').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var date = $('#date').val();

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
        $('#date').after('<span class="error">This field is required</span>');
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
    if (password.length < 6) {
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
    });
    

    });
    
    
    //end reg
    function subClick(){
      if(canSave){
        saveUser(); 
        //showName();
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



