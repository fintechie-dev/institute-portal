const express = require('express');
const router = express.Router();
const Students = require('../models/Students.cjs');
const nodemailer = require('nodemailer');

//session auth require here
const isSessionAuth = require('./sessionAuth.cjs')

//generate random OTP -- 6 nos
const generateOTP = function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post('/request-otp', async (req,res)=>{
    const {email} = req.body;
    try{

        const student = await Students.findOne({email});

        if (!student) {
            return res.status(404).json({ success : false, message : 'student not found, Please Register your Course first'});
        }
        if (student.hasSetPassword) {
            return res.status(400).json({ success : false, message: 'password already set'});
        }
        const otp = generateOTP();
        const expiry = new Date(Date.now() + 10 * 60 * 1000); //10 minute

        student.otp = otp;
        student.otpExpiry = expiry;

        await student.save();
        
        //send otp on mail-nodemailer
        let transporter = nodemailer.createTransport({
            host : 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your registration OTP',
                text: `Your OTP is ${otp}. it will expires in 10 minutes`
            });

            return res.json({success : true, message: 'OTP send to mail'});
    }catch(err){
        console.error('OTP request failed', err);
        return res.status(500).json({success: false, message: 'server error'})
    }
});

// set password with OTP
router.post('/set-password', async (req,res)=>{
    const {email, otp, password} = req.body;
    const student = await Students.findOne({email});

    //check student exists || OTP enetered is correct || OTP still valid based on time exipry
    if(!student || student.otp !== otp || new Date() > student.otpExpiry)
        return res.status(400).json({ success : false, message: 'Invalid OTP or Expired'});

    //hash password using bcrypt
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);

    student.password = hashedPassword;
    student.hasSetPassword = true;
    student.otp = undefined;
    student.otpExpiry = undefined;
    await student.save();

    res.json({success: true, message: 'password set successfully'});
})

router.post('/verify-otp',async (req,res)=>{
    const {email,otp} = req.body;
    const student = await Students.findOne({email});

    if(!student || student.otp !== otp || new Date() > student.otpExpiry){
        return res.status(400).json({success: false, message:'Invalid OTP'});
    }
    return res.json({success:true, message: 'OTP verified'});
})

//login api
router.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    const student = await Students.findOne({email});

    if (!student){
        return res.status(400).json({ success : false, message : 'Student not found, Please Register your Course'})
    }
    if (!student.hasSetPassword){
        return res.status(400).json({success: false, message: 'Not setup password, please try to setup your password'})
    }

    const bcrypt = require('bcrypt');
    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch){
        return res.status(401).json({ success: false, message : 'ivalid password'})
    }

    //save login session here in two lines
    req.session.studentId = student._id;
    req.session.email = student.email;

    res.json({ success : true, message : 'login successful', student});
});

//isSessionAuth chekc shere
router.get('/dashboard', isSessionAuth, (req,res)=>{
    res.json({success: true, message : `Welcome ${req.session.email}`})
});

// session logout also
router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if (err) return res.status(500).json({success: false, message: 'logout failed'});
        res.clearCookie('connect.sid');// default cookie name
        res.json({ success : true, message :' logout successfully'})
    });
});
//check seession in every minute
router.get('/check-session', (req,res)=>{
    if (req.session && req.session.studentId){
        res.json({loggedIn: true , user: req.session.studentId});
    }else{
        res.json({loggedIn: false})
    }
});

module.exports = router;