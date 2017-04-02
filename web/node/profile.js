var ds = require('datastructures-js');

var profile = function(user_id,firstName, lastName, password, email , dob){
    this._user_id = user_id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._password = password;
    this._email = email;
    this._dob = dob;    
    this._checkValue = "Akash Chandra"
}

profile.prototype.getFirstName= function(){
    return this._firstName;
}
profile.prototype.getUserId = function(){
    return this._user_id;
}
profile.prototype.getLastName = function(){
     return this._lastName;
}
profile.prototype.getPassword = function(){
    return this._password;
}
profile.prototype.getEmail = function(){
    return this._email;
}
profile.prototype.getDob = function(){
    return this._dob;
}
profile.prototype.getCheck = function(){
    return this._checkValue;
}

module.exports = profile;