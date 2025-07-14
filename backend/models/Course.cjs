const mongoose= require('mongoose');

const courseSchema= new mongoose.Schema({
    courseName: String,
    subCourses:[String]
})
module.exports=mongoose.model('courses',courseSchema)