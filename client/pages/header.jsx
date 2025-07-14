import { NavLink, useLocation } from "react-router-dom"
import HomePage from "./homepage"
import FloatingBtn from "./FloatingBtn";

const Header=()=>{
    // uselocation for hero and Home naming control
    const location = useLocation();
    return(
        <section id="header">
            <FloatingBtn />
        <div className="headerbg flex items-stretch px-5 py-2 bg-cover bg-center bg-repeat-x border border-b-2 border-b-[#eeaf10] pr-[80px]">
                <div id="logo" className="flex items-stretch">
                    <NavLink to="/" className="block">
                        <img 
                            src="/images/scopeindia-logo.webp"
                            alt="scope india logo"
                            width="200" 
                            className="h-full object-contain"/>
                    </NavLink>
                </div>
                <div className="flex flex-col justify-between flex-1 pl-4">
                    <div id="starRating" className="flex justify-end">
                        <NavLink to="/">
                            <img
                                src="/images/google-rating-scope-india.webp"
                                alt="rating"
                                width="200" />
                        </NavLink>
                    </div>
                {/* </div> */}
            
            <nav id="headerOptions" className="font-semibold uppercase">
                <ul className="flex justify-end space-x-2 pb-2 text-xs">
                    <li><NavLink 
                        to='/'
                        className={({isActive})=> isActive ? "text-[#eeaf10] px-2 py-1 border border-white-500 rounded-md" : "text-white px-2 py-1 transition hover:text-[#eeaf10] hover:border hover:border-white-500 hover:shadow-inner hover:shadow-white rounded-md"}
                            >{location.pathname === "/" ? "HERO" : "HOME"}</NavLink></li>
                    <li><NavLink 
                        to='/courses'
                        className={({isActive})=> isActive ? "text-[#eeaf10] px-2 py-1 border border-white-500 rounded-md" : "text-white px-2 py-1 transition hover:text-[#eeaf10] hover:border hover:border-white-500 hover:shadow-inner hover:shadow-white rounded-md"}
                            >Courses</NavLink></li>
                    <li><NavLink 
                        to='/registration'
                        className={({isActive})=> isActive ? "bg-red-600 text-white px-2 py-1 border border-white-500 rounded-md" : "bg-red-600 text-white px-2 py-1 transition hover:text-[#eeaf10] hover:border hover:border-white-500 rounded-md hover:shadow-inner hover:shadow-white"}
                            >Registration</NavLink></li>
                    {/* <li><NavLink 
                        to='/placement'
                        className={({isActive})=> isActive ? "text-[#eeaf10] px-2 py-1 border border-white-500 rounded-md" : "text-white px-2 py-1 transition hover:text-[#eeaf10] hover:border hover:border-white-500 hover:shadow-inner hover:shadow-white rounded-md"}
                            >Placement</NavLink></li> */}
                    <li><NavLink 
                        to='/about'
                        className={({isActive})=> isActive ? "text-[#eeaf10] px-2 py-1 border border-white-500 rounded-md" : "text-white px-2 py-1 transition hover:text-[#eeaf10] hover:border hover:border-white-500 hover:shadow-inner hover:shadow-white rounded-md"}
                            >About Us</NavLink></li>
                    {/* <li><NavLink 
                        to='/faq'
                        className={({isActive})=> isActive ? "text-[#eeaf10] px-2 py-1 border border-white-500 rounded-md" : "text-white px-2 py-1 transition hover:text-[#eeaf10] hover:border hover:border-white-500 hover:shadow-inner hover:shadow-white rounded-md"}
                            >FAQ</NavLink></li> */}
                    
                    <li><NavLink 
                        to='/contact'
                        className={({isActive})=> isActive ? "text-[#eeaf10] px-2 py-1 border border-white-500 rounded-md" : "text-white px-2 py-1 transition hover:text-[#eeaf10] hover:border hover:border-white-500 hover:shadow-inner hover:shadow-white rounded-md"}
                            >Contact Us</NavLink></li>
                    <li><NavLink 
                        to='/login'
                        className={({isActive})=> isActive ? "text-[#eeaf10] px-2 py-1 border border-white-500 rounded-md" : "text-white px-2 py-1 transition hover:text-[#eeaf10] hover:border hover:border-white-500 hover:shadow-inner hover:shadow-white rounded-md"}
                            >LOGIN</NavLink></li>
                </ul>
            </nav>
            </div>
        </div>
        </section>
    )
}
export default Header