$(document).ready(function(){
    
var MAIL_LIST = []; 
var USERID=null, SESSION_TOKEN=null;
var mailhash = new Object();
var mailPerPage = 8;
var lastMailIndex = 0;
var CLICK_STATE;


    

    if(document.cookie.length>0){
        var data = JSON.parse(document.cookie);        
        USERID = data.userID;        
        SESSION_TOKEN = data.userID;
        var name = data.name;
        var email = data.email;
        //alert(data.name)
            $.ajax({
                  type: 'POST',
                  url: "http://localhost:9000/outbox",
                  data: {user_id:USERID,session_token:SESSION_TOKEN},
                  dataType: "json",
                  success: function(resultData) {                  
                      var data = "";
                      var status = resultData.status;                    
                      if(status == "success")
                          {                       
                              $("#folder").text("OUTBOX");
                              $("#user_name").text(name);
                              $("#user_email").text(email);
                              var mail = resultData.mail;  
                              MAIL_LIST = mail;
                              if(lastMailIndex >= mail.length)
                              {
                                  alert("No more mails to show")
                              }else{
                                  CLICK_STATE = "next";
                                  var size;
                                  if(lastMailIndex+mailPerPage >= mail.length)
                                  {
                                     size =  mail.length;
                                  }else{
                                      size = lastMailIndex+mailPerPage;
                                  }                                  
                              for(var i = size - 1 ;i >= lastMailIndex ;i--)
                                  {
                                      
                                      mailhash[mail[i]._id] = mail[i];
                                      data += "<tr id="+mail[i]._id+"><td>"+mail[i]._primary_receiver+"</td><th>20-01-2017</td><th>"+mail[i]._subject+"</td><td>"+mail[i]._message+"</td></tr>"
                                  }
                                  lastMailIndex += mailPerPage;
                                  $("#mail_column").html(data);
                              }
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
      
    
    $("#next").click(function(){       
          if(CLICK_STATE=="prev")
              {
                  //alert("prev state")
                  lastMailIndex += mailPerPage;                  
              }
          CLICK_STATE = "next"
          if(lastMailIndex >= MAIL_LIST.length)
          {
              //alert("No more mails to show")
          }else{
              var size;
              if(lastMailIndex+mailPerPage >= MAIL_LIST.length)
              {
                 size =  MAIL_LIST.length;
              }else{
                  size = lastMailIndex+mailPerPage;
              }   
          var data="";
          for(var i = size - 1 ;i >= lastMailIndex ;i--)
              {
                  mailhash[MAIL_LIST[i]._id] = MAIL_LIST[i];
                  data += "<tr id="+MAIL_LIST[i]._id+"><td>"+MAIL_LIST[i]._primary_receiver+"</td><th>20-01-2017</td><th>"+MAIL_LIST[i]._subject+"</td><td>"+MAIL_LIST[i]._message+"</td></tr>"
              }
              lastMailIndex += mailPerPage;
              $("#mail_column").html(data);
          }
     });
    
    $("#prev").click(function(){
         if(CLICK_STATE=="next")
              {
                  //alert("next state")
                  lastMailIndex -= mailPerPage;                  
              }
          CLICK_STATE = "prev"
         if(lastMailIndex <= 0 )
          {
              //alert("No more mails to show")
          }else{
              var start;
              if(lastMailIndex-mailPerPage <= 0)
              {
                 start =  0;
              }else{
                 start = lastMailIndex-mailPerPage;
              }   
          var data="";
          for(var i = lastMailIndex - 1 ;i >= start ;i--)
              {

                  data += "<tr id="+MAIL_LIST[i]._id+"><td>"+MAIL_LIST[i]._primary_receiver+"</td><th>20-01-2017</td><th>"+MAIL_LIST[i]._subject+"</td><td>"+MAIL_LIST[i]._message+"</td></tr>"
              }
              lastMailIndex -= mailPerPage;
              $("#mail_column").html(data);
          }
     });
    
    
      
    $("#close_mail").click(function(){
        $("#myModal").css("display","none");  
    })
  
    $('tbody').on('click', 'tr', function() { 
        
        var id = $(this).attr("id");        
        //var data = $(this).parents('td:nth-child(1)').text();
        $("#mail_from").html(mailhash[id]._sender)
        $("#mail_to").html(mailhash[id]._primary_receiver)
        $("#mail_cc").html(mailhash[id]._secondary_receiver)
        $("#mail_subject").html(mailhash[id]._subject)
        $("#mail_message").html(mailhash[id]._message)        
        $("#myModal").css("display","block");   
        //alert(mailhash[id]._id);
    });
    
    $('#myInput').keyup(function() {
      var filter = $('#myInput').val().toUpperCase();
      var data = "";     
         for(var i = MAIL_LIST.length - 1 ;i >= 0 ;i--)
            {
                 if(MAIL_LIST[i]._subject.toUpperCase().indexOf(filter) > -1)
                  {
                      data += "<tr id="+MAIL_LIST[i]._id+"><td>"+MAIL_LIST[i]._primary_receiver+"</td><th>20-01-2017</td><th>"+MAIL_LIST[i]._subject+"</td><td>"+MAIL_LIST[i]._message+"</td></tr>"
                  }          
            }       
        $("#mail_column").html(data);
    });  
    
     $("#logout").click(function(){
        document.cookie = "";
        window.location.href = "login.html";
    });
    
    
});