// Users Schema
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var usersSchema = new schema({
    userId : {
        type: String,
        unique: true,
        trim : true,
        required : true
    },
    password : {
        type: String,
        default :'124567'
    },
    emailId:{
        type: String,
        required:true,
        match : /.+\@.+\..+/
    }    
},{collection:"users"});

var User = mongoose.model('Users',usersSchema);
module.exports = {User}