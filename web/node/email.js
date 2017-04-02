var Email = function(id,sender,primary_receiver,secondary_receiver,subject ,message,status){
        this._id = id;
        this._sender = sender;
        this._primary_receiver = primary_receiver;
        this._secondary_receiver = secondary_receiver;
        this._subject = subject;
        this._message = message;
        this._status = status;    
}

Email.prototype.showData = function(){
    console.log(this._id + this._sender);
}
Email.prototype.getSender = function(){
    return this._sender;
}
Email.prototype.getPrimaryReceiver = function(){
    return this._primary_receiver;
}
Email.prototype.getSecondaryReceiver = function(){
    return this._secondary_receiver;
}
Email.prototype.getSubject = function(){
    return this._subject;
}
Email.prototype.getStatus = function(){
    return this._status;
}
Email.prototype.getMessage = function(){
    return this._message;
}

module.exports = Email;
