
const HomePage=()=>{
    return(
        <div>
           <section className="">
                <div className="bg-[#04145f] px-2 py-2 yourCareerPartner text-center viga-regular">
                    <h1>Your career partner!</h1>
                </div>
                <div className="bg-white-500">
                    <h2 className="text-[25px] text-center text-[#14267c] py-2 viga-regular">Center for Software, Networking, & Cloud Education</h2>
                    <h3 className="text-[17px] text-[#0b27a8] viga-regular mt-0 px-2 pb-2">One of India's best Training destinations for Software, Networking, DevOps and Cloud Computing courses with 18 years of Industrial experience. Over 1,000 students find their dream careers each year, and we have assisted more than 15,000 students so far.</h3>
                </div>
           </section>
           
           <section id="careerit" className="py-7">
            <div id="careerInIt" className="careerinItbg text-white viga-regular px-8 py-8">
                <div className="px-3 pb-3">
                    <h2 className="text-[35px] text-[#FECB00]">Dreaming about a career in IT</h2>
                </div>
                <div id="dreaming" className="grid grid-cols-2 gap-6 px-3 py-5">
                    <div>
                        <p className="text-[18px] py-3">Spearheaded by the working professionals of Suffix E Solutions in flexible learning mode, we provide quality training with 100% placement support.</p>
                        <p className="text-[18px] py-3">We provide comprehensive courses in:</p>
                        <div>
                            <ul className="grid grid-cols-2 gap-y-2">
                                {[
                                    "Software Programming",
                                    "DevOps",
                                    "Data Science & AI",
                                    "Software Testing",
                                    "Data Analytics",
                                    "Server Administration",
                                    "Cloud Computing",
                                    "NetWorking",
                                    "Mobile App Development",
                                    "Digital Marketing"
                                ].map((e,index)=>{
                                    return(
                                        <li 
                                            className="flex items-center space-x-2"
                                            key={index}>
                                                <img 
                                                    src="/images/tick-svgrepo-com.svg"
                                                    className="w-7 h-7" /><span>{e}</span></li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 px-4">
                        <div className="bg-[#0b1e7d] forboxRound hover:scale-110 transform transition-transform duration-400">
                            <h3 className="text-xl text-[#FECB00] p-3 pb-1">Classes</h3>
                            <p className="text-m mb-2 px-2">Learn Anywhere, Anytime - Online & in-Person Classes Available!</p>
                        </div>
                        <div className="bg-[#0b1e7d] forboxRound hover:scale-110 transform transition-transform duration-400">
                            <h3 className="text-xl text-[#FECB00] p-3 pb-1">Placement</h3>
                            <p className="text-m mb-2 px-2">Guaranteed Success -100% Placement Support </p>
                        </div>
                        <div className="bg-[#0b1e7d] forboxRound hover:scale-110 transform transition-transform duration-400">
                            <h3 className="text-xl text-[#FECB00] p-3 pb-1">Training</h3>
                            <p className="text-m mb-2 px-2">Training by Working Professionals of Suffix E Solutions</p>
                        </div>
                        <div className="bg-[#0b1e7d] forboxRound hover:scale-110 transform transition-transform duration-400">
                            <h3 className="text-xl text-[#FECB00] p-3 pb-1">Internship</h3>
                            <p className="text-m mb-2 px-">OJT (On the Job Training) under Suffix E Solutions after course completion with experience certificate</p>
                        </div>
                        
                    </div>
                </div>
            </div>
           </section>
           <section>
            <div id="placement" className="text-center viga-regular bg-[#F4F4F4] px-10">
                <h2 id="highlights" className="text-[#0b1e7d] text-[30px] font-bold">Placement Highlights</h2>
                <div className="grid grid-cols-3 gap-3 p-3 pb-5 text-left">
                    <div className="flex flex-col bg-white shadow-lg p-6 pt-2 rounded-[15px]">
                        <span className="placementfontSize">100%</span>
                        <p>Placement Assistance</p>
                        </div>
                    <div className="flex flex-col bg-white shadow-lg p-6 pt-2 rounded-[15px]">
                        <span className="placementfontSize">1000+</span>
                        <p>Students are GettingPlaced Every Year</p>
                        </div>
                    <div className="flex flex-col bg-white shadow-lg p-6 pt-2 rounded-[15px]">
                        <span className="placementfontSize">500+</span>
                        <p>Partner Companies</p>
                        </div>
                </div>
            </div>
           </section>
           
            <section>
            <div  id="matchAi" className="matchAi text-white viga-regular px-8 py-8 bgGradient">
                <div className="matchAitext pb-3">
                    <h2 className="text[40px] font-bold">Match the Pace of Artificial Intelligence</h2>
                </div>
                <div>
                    <h3 id="matchAih3">Study AI From SCOPE INDIA</h3>
                </div>
                <div id="dreaming" className="grid grid-cols-2 gap-6 px-3 py-5">
                    <div className="relative">
                        <div>
                            <img 
                                src="https://scopeindia.org/ads/data-science-ai-course-scopeindia.webp"
                                className="block" 
                                alt="scienceAi"/>
                            <img 
                                src="https://scopeindia.org/images/robo-scope-site.webp"
                                className="absolute top-0 left-0 animateRobot"
                                alt="robot" />
                        </div>
                        
                        
                    </div>
                    <div className="border-2 border-[#e5c000] rounded-2xl p-8">
                        <div>
                            <ul className="grid grid-cols-2 gap-y-4">
                                {[
                                    "Python 3.12",
                                    "SQL",
                                    "Pandas",
                                    "NumPy",
                                    "Matplotlib and Seaborn",
                                    "Tableau",
                                    "Excel & Power BI",
                                    "Django & REST Services",
                                    "Machine Learning",
                                    "Deep Learning & AI",
                                    "English Language Training",
                                    "Live Projects"
                                ].map((e,index)=>{
                                    return(
                                        <li 
                                            className="flex items-center space-x-2"
                                            key={index}>
                                                <img 
                                                    src="/images/tick-svgrepo-com.svg"
                                                    className="w-7 h-7" /><span>{e}</span></li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    
                </div>
                <p className="p-[20px] m-[20px] text-[20px]">Harness the capabilities of machine learning, deep learning, natural language processing and uncover hidden patterns, optimize processes, and drive smarter decision-making.</p>
            </div>
           </section>
           <section>
            <div className="viga-regular p-[15px] px-5 bg-[#F5F5F5]">
                <div className="p-8">
                <h2 className="text-left text-[35px] text-[#0b1e7d] font-bold mb-8">Become a Full Stack Developer</h2>
                <div className="grid grid-cols-2 gap-6 items-stretch px-5">
                <div className="p-10 bg-white shadow-2xl rounded">
                    <div>
                    <h3 className="text-xl font-semibold mb-2">Your pathway includes</h3>
                    </div>
                    <ol>
                        <li className="flex flex-between items-start gap-4 p-2">
                            <span className="bg-[#E5C000] w-6 h-6 rounded-full text-center">1</span>
                            <div>
                                <p className="font-semibold">Foundation</p>
                                <p>Programming Fundamentals, SQL</p>
                            </div>
                        </li>
                        <li className="flex flex-between items-start gap-4 p-2">
                            <span className="bg-[#E5C000] w-6 h-6 rounded-full text-center">2</span>
                            <div>
                                <p className="font-semibold">Front End</p>
                                <p>HTML, CSS, JavaScript, jQuery, Bootstrap, React JS</p>
                            </div>
                        </li>
                        <li className="flex flex-between items-start gap-4 p-2">
                            <span className="bg-[#E5C000] w-6 h-6 rounded-full text-center">3</span>
                            <div>
                                <p className="font-semibold">Back End</p>
                                <p>Python / Java / ASP.NET / PHP / JavaScript</p>
                            </div>
                        </li>
                    </ol>
                </div>
                <div>
                    <img 
                        src="https://scopeindia.org/ads/full-stack-course-scopeindia.webp"
                        className="w-full h-auto object-cover rounded" />
                </div>
                </div>
                </div>
            </div>
            </section>

            <section id="noCoding" className="viga-regular">
                <div id="nocode" className="noCodingBG">
                    <h2><span className="title">No Coding</span> Prowess? <span className="title">Not a Problem</span></h2>
                    <div className="grid grid-cols-2 items-stretch gap-6 px-[30px]">
                        <div>
                            <img 
                                src="https://scopeindia.org/ads/software-testing-course-scopeindia.webp" 
                                className="w-full h-auto object-cover rounded-2xl"/>
                        </div>
                        <div>
                            <div className="flex justify-center mb-4 p-[10px]">
                                <span className="bg-[#fecb00] text-[23px] text-[#0b1e7d] p-1 rounded-tl-2xl rounded-br-2xl">Software Testing is the Gateway to Your IT Career</span>
                            </div>
                            <ol className="grid grid-cols-2 text-white p-5 gap-4 ">
                                {[
                                    "Manual Testing",
                                "Automation Testing",
                                "Practical Sessions",
                                "Theoretical Sessions",
                                "Flexible Schedules",
                                "On Job Training"
                                ].map((e,index)=>(
                                    <li
                                        className="flex items-center justify-start gap-2 p-1 pl-12 text-md"
                                        key={index}>
                                            <span><img src="/images/tick-svgrepo-com.svg" 
                                                className="w-7 h-7 items-start"/></span>{e}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <h2 className="title1 pb-6">Start your tech journey today with<span className="title"> SCOPE INDIA </span>and make your mark in the IT industry!</h2>
                </div>
            </section>
            <section id="careerWithDevops" className="viga-regular">
                <div>
                    <h2 className="text-center text-[35px] text-[#0b1e7d] p-4">Career with DevOps</h2>
                    <div className="flex space-x-5 px-6 pb-10">
                        <div className="bg-[#E5E5E5] w-1/2 rounded-3xl shadow-2xl p-5">
                            <div className="bg-[#D9126F] inline-block text-[26px] rounded-br-[50px] rounded-tr-[50px] mb-2 text-center text-white shadow-lg devopsLinear">
                                <h4 className="">Master DevOps From SCOPE INDIA</h4>
                            </div>
                            <ol className="grid grid-cols-2">
                                {[
                                    "Build Applications",
                                    "Deploy Applications",
                                    "Automate Workflows",
                                    "Hands-on Experience",
                                    "Popular Tools",
                                    "Cloud Infrastructure",
                                    "Cloud Management",
                                    "Deployement Strategies",
                                ].map((e,index)=>(
                                    <li 
                                        key={index}
                                        className="flex items-center gap-3 p-2">
                                        <img src="\images\icons8-tick-30.png" />{e}</li>
                                ))}
                            </ol>
                        </div>
                        
                        <img src="https://scopeindia.org/ads/devops-course-scope-india.webp"
                            alt="6 month course" 
                            className="w-1/2 rounded-3xl shadow-2xl"/>
                        
                    </div>
                </div>
            </section>

            <section id="Business Intelligence" className="viga-regular">
                <div id="bi" className="bg-[#F6F4F5] pb-10">
                    <h2 className="text-[#0b1e7d] text-[35px] text-center p-5">Match the Pace of Business Intelligence</h2>
                    <div className="grid grid-cols-2 items-stretch gap-6 px-[30px]">
                        <div>
                            <img 
                                src="https://scopeindia.org/ads/power-bi-course-scopeindia.webp" 
                                className="w-full h-auto object-cover"/>
                        </div>
                        <div>
                            <div className="flex justify-center mb-4 p-[10px]">
                                <span className="bg-[#fecb00] text-[23px] p-1 rounded-tl-2xl rounded-br-2xl">Study Power BI From SCOPE INDIA</span>
                            </div>
                            <ol className="grid grid-cols-2 text-black text-[20px] p-5 gap-4 ">
                                {[
                                    "Transform Raw Data",
                                    "Interactive Dashboards",
                                    "Hands-on Training",
                                    "Real-World Scenarios",
                                    "Flexible Schedules",
                                    "On Job Training"
                                ].map((e,index)=>(
                                    <li
                                        className="flex items-center justify-start gap-2 pl-10 text-md"
                                        key={index}>
                                            <span><img src="/images/tick-svgrepo-com.svg" 
                                                className="w-10 h-10 items-start"/></span>{e}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section id="ourMission" className="viga-regular">
                <h2 className="text-[35px] text-center text-[#fecb00] pb-7">Our Mission & Vision</h2>
                <div className="flex gap-5">
                    <div className="w-1/2 missionBox p-5">
                        <div className="missiondiv">
                            <img src="\images\icons8-flash-50.png"
                                    alt="mission" 
                                    className="w-10 h-10"/>
                        </div>        
                        <h4>Our Mission</h4>
                        <p>SCOPE INDIA seeks to close the knowledge gap between education and employment by offering interactive, industry-focused IT training led by proficient working professionals and aligned with the latest trends and technologies. Our objective is to provide people with the technical expertise and confidence they need to build fulfilling careers.</p>
                        <ul>
                            {["Industry-aligned curriculum",
                                "Practical skill development",
                                "Career-focused training"
                            ].map((e,index)=>(
                                <li 
                                    key={index}
                                    className="flex items-center">
                                    <img src="/images/tick-svgrepo-com.svg" 
                                                className="w-10 h-7 items-start"/>{e}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-1/2 missionBox p-5">
                            <div className="missiondiv">
                            <img src="/images/icons8-group-32.png"
                                    alt="vision" 
                                    className="w-10 h-10"/>
                        </div>
                        <h4>Our Vision</h4>
                        <p>We aspire to become the most respected and forward-thinking training organization in India and beyond by shaping the future of IT education via innovation, integrity, and strong industry ties. We intend to expand globally.</p>
                        <ul>
                            {[
                                "Global recognition",
                                "Innovation leadership",
                                "Technology excellence"
                            ].map((e,index)=>(
                                <li 
                                    key={index}
                                    className="flex items-center">
                                    <img src="/images/tick-svgrepo-com.svg" 
                                        className="w-10 h-7 items-start"
                                        />{e}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

           
           
        </div>
    )
}
export default HomePage