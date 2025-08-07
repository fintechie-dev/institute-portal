import React from 'react'
import { useParams } from 'react-router-dom'
import { courseExtras } from '../components/courses';

const CourseDetails = () => {
    const {slug} = useParams();
    const course = courseExtras[slug];

    if(!course) return <p>Course not found!</p>;
  return (
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
           <section>
            <div className='bg-[#04145f]'>
                <div className='bg-[#fdd51c] text-center text-[26px] text-[#04145f] viga-regular p-1 border-t-5 border-[#c7ac20]'>
                    <h2>Course Syllabus</h2>
                </div>
                <div className='p-6'>
                <div>
                    <div className='grid grid-cols-3 gap-4 p-5 pb-9'>
                    <p
                    className="bg-[#040D37] p-5 text-white rounded-[10px] flex items-center justify-between border-2 border-[#fdd51c]">Course Duration : 5 Month + 3 Month OJT</p>
                    <p
                    className="bg-[#040D37] p-5 text-white rounded-[10px] flex items-center justify-between border-2 border-[#fdd51c]">Mon–Fri Offline 4 hrs. / Online 2 hrs.</p>
                    <p
                    className="bg-[#040D37] p-5 text-white rounded-[10px] flex items-center justify-between border-2 border-[#fdd51c] blinkcss">Next Batch : 30th July, 2025</p>
                    </div>
                {/* <h1 className="text-3xl font-bold text-[#14267c] mb-4">{course.title}</h1> */}
                <div className='bg-white p-2 border-2 border-[#fdd51c] rounded-[10px]'>
                {/* <p className="bg-white p-5 text-[16px] text-[#0d0d8a] rounded-[10px] flex items-center justify-between border-2 border-[#fdd51c]">{course.intro}</p> */}
                {course.intro.split('\n\n').map((para, index) => (
                    <p key={index} 
                    className="bg-white p-2 text-[17px] text-[#0d0d8a]">
                        {para}
                    </p>
                    ))}
                    </div>

                {/* <h2 className="text-white text-xl px-5 pt-5 viga-regular">Syllabus:</h2> */}
            <div id="syllabus" className="bg-[#04145f] ">
                <ul className="grid grid-cols-3 gap-4 pt-4 pb-9">
                    {course.syllabus.map((topic, index) => (
                    <li
                        key={index}
                        className="bg-white p-5 text-[21px] text-[#0d0d8a] viga-regular hover:bg-[#fff9dc] cursor-pointer rounded-[10px] flex items-center justify-between border-2 border-[#fdd51c]"
                    >
                        <h3>{topic}</h3>
                        <img src="/images/icons8-right-50.png" className="w-6 h-8 ml-2" alt="→" />
                    </li>
                    ))}
                </ul>
                </div>
                <div className='flex justify-center gap-50'>
                    <a 
                    href='#' className="back2course text-white w-90 text-center">Talk To Us</a>
                    <a 
                    href='/courses' className="back2course text-white w-90 text-center">Back to Courses</a>
                </div>
                </div>
                </div>
            </div>
    </section>
    </div>
  )
}

export default CourseDetails