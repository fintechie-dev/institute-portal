const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

//while regestering save to DB
const Students = require('../models/Students.cjs');

// nodemailer setup
router.post('/', async (req,res)=>{
    const {
        fullName, 
        dob, 
        gender, 
        education, 
        mobile, 
        email, 
        guardian, 
        occupation, 
        gnumber, 
        courseList, 
        mode, 
        location, 
        ptime, 
        address, 
        country, 
        state, 
        district, 
        pin } = req.body;
       
        //if string make courselist as an array always
        if(typeof courseList ==='string'){
            courseList = [courseList]
        }

    if (!fullName || !email || !courseList.length) {
        return res.status(400).json({success :  false, message : 'Missing required fields..'})
    }

    try{
        //while regestering save to DB
        await Students.findOneAndUpdate( 
        // first argument for search students data if exist or not 
        {email}, 
        //update / create
        { fullName,
            dob,
            gender,
            education,
            mobile,
            email,
            guardian,
            occupation,
            gnumber,
            course: courseList,
            mode,
            location,
            ptime,
            address,
            country,
            state,
            district,
            pin,
            hasSetPassword:false},{ upsert: true, new : true})
    
        //set nodemailer transporter
        let transporter = nodemailer.createTransport({
            host : 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to : email,
            subject: 'Registration Confirmation - Scope India',
            text: `Hi ${fullName} You have Successfully Registered for ${courseList}`
        };

        //send the mail
        await transporter.sendMail(mailOptions);
        // try{
        //     transporter.sendMail(mailOptions);
            res.status(200).json({success: true, message : 'Email sent!'});
            console.log('nodemailer Successfully running')
    }catch(err){
        console.error('Email Error:', err);
        res.status(500).json({success: false, message: 'Failed to send Email'});
    }
});

module.exports = router;

//Option	Meaning
// upsert: true	If student not found, insert a new one (update + insert = upsert)
// new: true	Return the updated or newly created student document instead of the original