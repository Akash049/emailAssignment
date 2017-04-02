var ds = require('datastructures-js');
var Profile = require("./profile.js");
var Email = require("./email.js");
var shortid = require('shortid');


var initialize = function(){
    this._ProfileHash = ds.hashtable();
    this._profile1 = new Profile("akash01","Akash","Chandra","random","akash@assign.com","01-05-1993");
    this._profile2 = new Profile("harish01","Harish","Chauhan","random","hairsh@assign.com","01-05-1993");
    this._profile3 = new Profile("aman01","Anam","Chandra","random","aman@assign.com","01-05-1993");
    this._profile4 = new Profile("vaibhav01","Vaibhav","Chandra","random","vaibhav@assign.com","01-05-1993");
    this._ProfileHash.put(this._profile1.getUserId(),this._profile1);
    this._ProfileHash.put(this._profile2.getUserId(),this._profile2);
    this._ProfileHash.put(this._profile3.getUserId(),this._profile3);
    this._ProfileHash.put(this._profile4.getUserId(),this._profile4); 
    
    this._INPUT_EMAIL = [];
    var random_subject = ["Random subject ","Important Mail ","New data transfer ","Secondary data transfer"];
    for(var i = 0 ; i < 20 ; i++)
    {   var x = Math.floor(Math.random() * (4)) ;
        var email = new Email(shortid.generate(),"xyz"+(i*100)+"@assign.com","hairsh@assign.com",null,random_subject[x] + (i*1000),"Message Content " + (i*1000),null);
        this._INPUT_EMAIL.push(email);
    }
    
    this._OUTBOX_EMAIL = [];
    for(var i = 0 ; i < 4 ; i++)
    {   var x = Math.floor(Math.random() * (4)) ;
        var email = new Email(shortid.generate(),"xyz"+(i*100)+"@assign.com","hairsh@assign.com",null,random_subject[x] + (i*1000),"Message Content " + (i*1000),null);
        this._OUTBOX_EMAIL.push(email);
    }
    this._SENT_EMAIL = [];
    for(var i = 0 ; i < 11 ; i++)
    {   var x = Math.floor(Math.random() * (4)) ;
        var email = new Email(shortid.generate(),"hairsh@assign.com","xyz"+(i*100)+"@assign.com",null,random_subject[x] + (i*1000),"Message Content " + (i*1000),null);
        this._SENT_EMAIL.push(email);
    }
    
    this._FOLDER_HASH = ds.hashtable();
    this._FOLDER_HASH.put("INBOX",this._INPUT_EMAIL);
    this._FOLDER_HASH.put("OUTBOX",this._OUTBOX_EMAIL);
    this._FOLDER_HASH.put("SENT",this._SENT_EMAIL);
    
    this._USERMAIL_HASH = ds.hashtable();
    this._USERMAIL_HASH.put("harish01",this._FOLDER_HASH);
    this._USERMAIL_HASH.put("akash01",this._FOLDER_HASH);
    this._USERMAIL_HASH.put("aman01",this._FOLDER_HASH);
    
}

initialize.prototype.getProfile = function(){
    return this._ProfileHash;
}

initialize.prototype.show = function(){
    console.log(this._INPUT_EMAIL[7].getSubject());
}

initialize.prototype.getMail = function(){
    return this._USERMAIL_HASH;
}

module.exports = initialize;
