 const express=require('express');
 const mongoose= require('mongoose');
 const cors= require('cors');
 const path = require('path');
 require('dotenv').config();

 const session = require('express-session');
 const cookieParser = require('cookie-parser');

const app= express();
app.use(cookieParser());
app.use(session({
  secret : 'student-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
     sameSite: 'lax',
    maxAge : 10000* 60 * 10 // 1mnt
  }
}));
 //middleware
app.use(cors({
  origin: 'http://localhost:5173', // React frontend URL
  credentials: true               // Allow cookies
}));
app.use(express.json());
//image uplaod
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//require courseroutes and use in /api/courses
const courseRoutes=require('./routes/courseRoutes.cjs');
app.use('/api/courses',courseRoutes);
//require register Route
const registerRoute = require('./routes/register.cjs');
app.use('/api/register', registerRoute)

//for dahsboard student fetch
const studentRoute = require('./routes/student.cjs')
app.use('/api/student', studentRoute)

// login route / otp
const otpRoute = require('./routes/otp.cjs');
const { default: Students } = require('./models/Students.cjs');
// const { default: cookieParser } = require('cookie-parser');
app.use('/api/auth', otpRoute)

//image uplaod
const uploadRoutes = require('./routes/upload.cjs');
app.use('/api/student', uploadRoutes);

//db Connection
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Mongo DB connection Successfull')
})
.catch((err)=>{
    console.error('error in connection DB',err)
})

//server start
app.listen(5000,()=>{
    console.log(`App listening 5000 ...`)
})


