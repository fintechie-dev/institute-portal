import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const CoursesPage=()=>{
    const [courses,setCourses]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/api/courses')
        .then(res=>res.json())
        .then(data =>setCourses(data))
        .catch((err)=>console.error('error in using api',err))
    },[]);

    const slugify = (name) =>
        name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return(
        <div>
            <section className="">
                <div className="bg-[#04145f] px-2 py-2 yourCareerPartner text-center viga-regular">
                    <h1>Courses at SCOPE INDIA</h1>
                </div>
                <div className="bg-white-500">
                    <h2 className="text-[25px] text-center text-[#14267c] py-2 viga-regular">Center for Software, Networking, & Cloud Education</h2>
                    <h3 className="text-[17px] text-[#0b27a8] viga-regular mt-0 px-2 pb-2">One of India's best Training destinations for Software, Networking, DevOps and Cloud Computing courses with 18 years of Industrial experience. Over 1,000 students find their dream careers each year, and we have assisted more than 15,000 students so far.</h3>
                </div>
           </section>
            
        
            {courses.map(course=>(
                <div key={course._id}>
                    <div id="courseTitle">
                    <h2
                        className="bg-[#fdd51c] text-center text-[26px] viga-regular p-1 border-t-5 border-[#c7ac20]"
                        >{course.courseName}</h2>
                    </div>
                    <div id="subCourses" className="bg-[#04145f] ">
                        <ul className="grid grid-cols-3 gap-4 p-5 pb-9">
                            {course.subCourses.map((subCourse,index)=>(
                                <li 
                                    key={index}
                                    className="bg-white p-5 text-[21px] text-[#0d0d8a] viga-regular hover:bg-[#fff9dc] cursor-pointer rounded-[10px] flex items-center justify-between border-2 border-[#fdd51c]"
                                    ><Link to={`/courses/${slugify(subCourse)}`}>
                                        <h3>{subCourse}</h3>
                                        </Link>
                                    <img src="./images/icons8-right-50.png" className="w-6 h-8 ml-2"/> 
                                </li>
                            ))}

{/* ANY ARRAY EMPTY WE SHOULD USE TERNARY OPERATOR */}
                        {/* {Array.isArray(course.subCourses) && course.subCourses.map((subCourse, index) => (
                        <li key={index} className="bg-white text-[#04145f] px-3 py-1 rounded shadow-sm">
                            {subCourse}
                        </li>
                        ))} */}


                        {/* {course.subCourses ?.map((subCourse,index)=>(
                            <li 
                                key={index} 
                                className="text-white"
                                >{subCourse}

                            </li>
                        ))} */}
                        </ul>
                        
                        
                    </div>


                </div>
                
            ))}
        </div>
    )
}
export default CoursesPage