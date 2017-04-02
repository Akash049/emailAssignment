$(document).ready(function(){
    

    $("#login").click(function(){
           var userID = $("#user_id").val();
           var password = $("#password").val();

           $.ajax({
                  type: 'POST',
                  url: "http://localhost:9000/login",
                  data: {user_id:userID,password:password},
                  dataType: "json",
                  success: function(resultData) {     
                      var status = resultData.status;                    
                      if(status == "authenticated")
                          {    
                              document.cookie = JSON.stringify({'userID':userID,
                                                                'session':resultData.session_token,
                                                                'email':resultData.email,
                                                                 'name':resultData.name});                             
                              //var decodedCookie = decodeURIComponent(document.cookie);                              
                              //alert(JSON.parse(decodedCookie).session)
                              window.location.href = "inbox_client.html"                             
                          }                      
                      else if(status == "no_user"){
                          alert("User does not exists")
                      }else{
                          alert("Wrong Password")
                      }                  
                  }
            });       
       });    
});