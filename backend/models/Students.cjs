// model for students- to setup login system

const mongoose =  require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName : String,
    email : { type : String, unique : true},
    password : String,
    hasSetPassword : { type : Boolean, default : false},
    otp : String,
    otpExpiry : Date
});
module.exports = mongoose.model('Students', studentSchema);