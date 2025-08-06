//route for getting studnets data and fetch to dashboard after loggedin
const express = require('express');
const router = express.Router();


const Students = require('../models/Students.cjs');
const isAuthenticated = require('./sessionAuth.cjs')

//get loggedin student profile
router.get('/profile', isAuthenticated, async (req,res)=>{
    try{
        const student = await Students.findById(req.session.studentId); //.select('fullName email course dob mobile gender');
        if(!student){
            return res.status(404).json({success: false, message: 'student not found'});
        }
        res.json({success: true, student});
    }catch(err){
        console.error('error fetching student', err);
        res.status(500).json({success: false, message:'server error'});
    }
});

//profile update and save
router.put('/update',isAuthenticated, async(req,res)=>{
    try{
        const updatedField = req.body;
        const updatedStudent = await Students.findByIdAndUpdate( req.session.studentId, updatedField,  {new:true});

        if(!updatedStudent){
            return res.status(404).json({success: false, message:'student not found'})
        }
        res.json({success: true, message:'profile updated', student:updatedStudent});
    }catch(err){
        console.error('server error',err);
        res.status(500).json({success: false, message:'server error'})
    }
});
//send added course to backend
router.put('/courses',isAuthenticated, async(req,res)=>{
    try{
        const {selectedCourses}= req.body;
        if(!Array.isArray(selectedCourses)){
            return res.status(400).json({success: false, message:'Invalid course List'});
        }
        const updatedCourse = await Students.findByIdAndUpdate(
            req.session.studentId,
            {$set: {courseList: selectedCourses}},
            {new: true}
    );
    if(!updatedCourse){
        return res.status(400).json({success: false, message: 'course not updated'});
    }
        res.json({success:true, message:'courses updated', student:updatedCourse});
    }catch(err){
        console.error('server error', err);
        res.status(500).json({success:false, message:'server error'})
    }
});
//get courses in courses page
router.get('/courses',isAuthenticated,async(req,res)=>{
    try{
        const student = await Students.findById(req.session.studentId).select('courseList');
        if(!student){
            return res.status(400).json({success:false, message:'student not found'})
        }
        res.json({success:true, courses: student.courseList || []});
    }catch(err){
        console.error('server error',err);
        res.status(500).json({success:false, message:'server error'})
    }
});

module.exports = router;