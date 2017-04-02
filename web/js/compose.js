$(document).ready(function(){
    
var MAIL_LIST = []; 
var USERID=null, SESSION_TOKEN=null;
    

    if(document.cookie.length>0){
        var data = JSON.parse(document.cookie);        
        USERID = data.userID;        
        SESSION_TOKEN = data.session;
       // alert(data.name) 
        $("#user_name").text(data.name);
        $("#user_email").text(data.email);}    
        else{
            alert("Your Session expired")
            window.location.href = "login.html"      
        }    
    
     $("#send").click(function(){
            var to = $("#to").val();
            var cc = $("#cc").val();
            var subject = $("#subject").val();
            var message = $("#message").val();            
                var mail = {
                'user_id':USERID,
                'receiver':to,
                'secondary_receiver':cc,
                'subject':subject,
                'message':message,
                'session_token':SESSION_TOKEN
                }           
            $.ajax({
                  type: 'POST',
                  url: "http://localhost:9000/send",
                  data: mail,
                  dataType: "json",
                  success: function(resultData) {                  
                      var data = "";
                      var status = resultData.status;                    
                      if(status == "success")
                          {                       
                              $("#myModal").css("display","block");
                          }                      
                      else{
                          alert("Your session has timed out. Please login back to access !!!")
                          window.location.href = "login.html"  
                      }                  
                  }
            });
        });
      $(window).click(function(){
          $("#myModal").css("display","none"); 
      })
      
      $("#close_mail").click(function(){
        $("#myModal").css("display","none");  
      })
      
     $("#logout").click(function(){
        document.cookie = "";
        window.location.href = "login.html";
    });
    
});