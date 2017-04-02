$(document).ready(function(){
    

var USERID=null, SESSION_TOKEN=null;
    

    if(document.cookie.length>0){
        var data = JSON.parse(document.cookie);        
        USERID = data.userID;        
        SESSION_TOKEN = data.userID;
        var name = data.name;
        var email = data.email;
        //alert("getting data")
            $.ajax({
                  type: 'POST',
                  url: "http://localhost:9000/profile",
                  data: {user_id:USERID,session_token:SESSION_TOKEN},
                  dataType: "json",
                  success: function(resultData) {                  
                      var data = "";
                      //alert(resultData.profile._dob)
                      var status = resultData.status;                    
                      if(status == "success")
                          {                                
                          $("#user_name").text(name);
                          $("#user_email").text(email);
                            data += "<tr><th>First Name</th><td>"+resultData.profile._firstName+"</td></tr>"
                            data += "<tr><th>Last Name</th><td>"+resultData.profile._lastName+"</td></tr>"
                            data += "<tr><th>Email</th><td>"+resultData.profile._email+"</td></tr>"
                            data += "<tr><th>User Id</th><td>"+resultData.profile._user_id+"</td></tr>"
                            data += "<tr><th>Date of Birth</th><td>"+resultData.profile._dob+"</td></tr>"
                            data += "<tr><th>Password</th><td>"+resultData.profile._password+"</td></tr>"
                            $("#mail_column").html(data);
                          }                      
                      else{
                          alert("Your session has timed out. Please login back to access !!!")
                      }                  
                  }
            });       
        }else{
            alert("Your Session expired")
            window.location.href = "login.html"      
    }    
 
    $('#myInput').keyup(function() {
      var filter = $('#myInput').val().toUpperCase();
      var data = "";     
         for(var i = 0 ; i < MAIL_LIST.length ; i++)
            {
                 if(MAIL_LIST[i]._subject.toUpperCase().indexOf(filter) > -1)
                  {
                      data += "<tr><td>"+MAIL_LIST[i]._sender+"</td><th>20-01-2017</td><th>"+MAIL_LIST[i]._subject+"</td><td>"+MAIL_LIST[i]._message+"</td></tr>"
                  }          
            }       
        $("#mail_column").html(data);
    });     
    
    $("#logout").click(function(){
        document.cookie = "";
        window.location.href = "login.html";
    });
    
    
});