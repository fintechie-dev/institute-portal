// model for students- to setup login system

const mongoose =  require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: String,
    dob: String,
    gender: String,
    education: String,
    mobile: String,
    email: { type: String, unique: true },
    guardian: String,
    occupation: String,
    gnumber: String,
    courseList: {type:[String]},
    mode: String,
    location: String,
    ptime: [String], // array of preferred timings
    address: String,
    country: String,
    state: String,
    district: String,
    pin: String,
    profileImage: {type: String,default: ''},

    // login-related fields
    password: String,
    hasSetPassword: { type: Boolean, default: false },
    otp: String,
    otpExpiry: Date
    });
module.exports = mongoose.model('Students', studentSchema);