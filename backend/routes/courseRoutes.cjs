const express= require('express');
const router= express.Router();

const Course=require('../models/Course.cjs')

//get all courses
router.get('/',async (req,res)=>{
    try{
        const courses=await Course.find();
        res.json(courses)
    }catch(err){
        res.json({message:'error getting data',error:err.message})
    }
});

//add course -

// router.post('/addcourses', async (req,res)=>{
//     try{
//         const{courseName, subCourses}=req.body;
//         const newCourse= new Course({courseName,subCourses});
//         const savedCourse=await newCourse.save();
//         res.json(savedCourse)
//     }catch(err){
//         res.json({message:'error in course save', error:err.message})
//     }
// });


//add course    //findOneAndUpdate() needs three arguments:

                    // Filter (what to find)

                    // Update (what to change)

                    // Options (like new or upsert)
router.post('/addcourses', async (req,res)=>{
    try{
        const{courseName, subCourses}=req.body;

        // Find if courseName exists and push only unique subCourses
        const newCourse= await Course.findOneAndUpdate({courseName},
                            {$addToSet:{subCourses: {$each: subCourses} } }, // add subcourse without duplicates
                            {new:true, upsert:true}); // return new doc , insert if not found
        // const savedCourse=await newCourse.save();
        res.json(newCourse)
    }catch(err){
        res.json({message:'error in course save', error:err.message})
    }
});

//get all courses in dropdown 
router.get('/registration',async (req,res)=>{
    try{
        const courses=await Course.find();
        res.json(courses)
    }catch(err){
        res.json({message:'error getting data',error:err.message})
    }
});

module.exports= router