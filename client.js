var express = require('express');
var app = express();
var ds = require('datastructures-js');
var Profile = require("./web/node/profile.js");
var Email = require("./web/node/email.js");
var myParser = require('body-parser');
var Initialize = require("./web/node/initialize.js");
var shortid = require('shortid');
var http = require('http');
var fs = require('fs');
var path = require('path');
app.use(myParser.urlencoded({extended:true}));
app.use(myParser.json());
app.use(express.static(__dirname + "/web"));

var date = new Date();
console.log(date);

//Initializing the variables 
var init = new Initialize();
var userProfileID, currentFolder,profileHash, userMailHash ,folderHash , MAILS ;
profileHash = init.getProfile();
userMailHash = init.getMail();

app.post('/sessionTime',function(request,response){
   var date1 = new Date();
   console.log(date1);
   var date2 = new Date(request.body.session_token);
   console.log(date2)
   var minutes = (date1-date2)/60000;
   response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
   response.write(JSON.stringify({'status' : 'success' , 'interval':minutes + " min"}));
   response.end();
})

app.post('/send',function(request,response){
    var currentSession = new Date();
    var returnSession = new Date(request.body.session_token);
    console.log(returnSession)
    if((currentSession - returnSession)/60000 < 10)
    {
        folderHash = userMailHash.get(request.body.user_id);
        var SENT_MAIL = folderHash.get("SENT");
        var id = shortid.generate();
        var sender = profileHash.get(request.body.user_id).getEmail();
        var primary_receiver = request.body.receiver;
        var secondary_receiver = request.body.secondary_receiver;
        var subject = request.body.subject;
        var message = request.body.message;
        var status = null;
        console.log(primary_receiver+ secondary_receiver + subject + message)
        var sent_mail = new Email(id,sender,primary_receiver,secondary_receiver,subject,message,status);
        //console.log(sent_mail);
        SENT_MAIL.push(sent_mail);
        folderHash.put("SENT",SENT_MAIL);        
        response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
        response.write(JSON.stringify({'status' : 'success' , 'mail':SENT_MAIL}));
        response.end();
    }else{            
        response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
        response.write(JSON.stringify({'status' : 'timeout'}));
        response.end();
    }  
    
})

app.post('/sent',function(request,response){
    var currentSession = new Date();
    var returnSession = new Date(request.body.session_token);
    if((currentSession - returnSession)/60000 > 10)
    {
        response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
        response.write(JSON.stringify({'status' : 'timeout'}));
        response.end();
    }else{
        folderHash = userMailHash.get(request.body.user_id);
        currentFolder = "SENT";
        MAILS = folderHash.get(currentFolder);
        console.log(MAILS);
        response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
        response.write(JSON.stringify({'status' : 'success' , 'mail':MAILS}));
        response.end();
    }
    
})

app.post('/outbox',function(request,response){
    var currentSession = new Date();
    var returnSession = new Date(request.body.session_token);
    if((currentSession - returnSession)/60000 > 10)
    {
        response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
        response.write(JSON.stringify({'status' : 'timeout'}));
        response.end();
    }else{
        folderHash = userMailHash.get(request.body.user_id);
        currentFolder = "OUTBOX";
        MAILS = folderHash.get(currentFolder);
        console.log(MAILS);
        response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
        response.write(JSON.stringify({'status' : 'success' , 'mail':MAILS}));
        response.end();
    }
    
})

app.post('/inbox',function(request,response){
    var currentSession = new Date();
    var returnSession = new Date(request.body.session_token);
    if((currentSession - returnSession)/60000 > 10)
    {
        response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
        response.write(JSON.stringify({'status' : 'timeout'}));
        response.end();
    }else{
        folderHash = userMailHash.get(request.body.user_id);
        currentFolder = "INBOX";
        MAILS = folderHash.get(currentFolder);
        console.log(MAILS);
        response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
        response.write(JSON.stringify({'status' : 'success' , 'mail':MAILS}));
        response.end();
    }    
})

app.post('/profile',function(request,response){
    var currentSession = new Date();
    var returnSession = new Date(request.body.session_token);
    if((currentSession - returnSession)/60000 > 30)
    {
        response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
        response.write(JSON.stringify({'status' : 'timeout'}));
        response.end();
    }else{
        console.log(profileHash.get(request.body.user_id));
        response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
        response.write(JSON.stringify({'status' : 'success' , 'profile':profileHash.get(request.body.user_id)}));
        response.end();
    }
    
})


app.post('/login',function(request,response){
    var user_id = request.body.user_id;    
    var req_password = request.body.password;
    if(profileHash.contains(user_id))
    {
        console.log("User exists");
        var data = profileHash.get(user_id).getPassword();
        if(data == req_password)
        {   
            console.log("User authenticated");            
            currentFolder = "INBOX";
            folderHash = userMailHash.get(user_id);
            MAILS = folderHash.get(currentFolder);
            var date = new Date();
            var e_mail = profileHash.get(user_id).getEmail();
            var f_name = profileHash.get(user_id).getFirstName();
            var l_name = profileHash.get(user_id).getLastName();
            response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
            response.write(JSON.stringify({'status' : 'authenticated' , 
                                           'total_inbox_mail':MAILS.length , 'session_token':date,
                                           'email':e_mail,
                                           'name':f_name+" "+l_name
                                          }));
            response.end();
        }else{
            console.log("Wrong Password");
            response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
            response.write(JSON.stringify({'status' : 'wrong_password' }));
            response.end();
        }
       
    }else{
        console.log("User does not exists");
        response.writeHead(200,{'Content-Type':'text/json','Access-Control-Allow-Origin':'*'});
        response.write(JSON.stringify({'status' : 'no_user' }));
        response.end();
    }    
});

app.get('/' || '',function(request,response){
  var index = fs.readFileSync('web/login.html');
  console.log("Web page requested")
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(index);
})



var server = app.listen(9000,function(){
        var host = server.address().address;
        var port = server.address().port;
        console.log('My app listening at http://%s:%s',host,port);        
});
