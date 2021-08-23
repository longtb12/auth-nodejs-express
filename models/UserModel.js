const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email:{type:String,require:true},
    password:{type:String,require:true},
    name:{type:String},
    phoneNumber:{type:String}
});

module.exports = mongoose.model('user',UserSchema);