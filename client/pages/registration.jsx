
import { useEffect, useState } from "react";
import { LocationData } from "./countryData";

const Registration = () => {
  const [courses, setCourses] = useState([]);
  const [location, setLocation] = useState({ country: "", state: "", district: "" });
  const [statesList, setStatesList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setLocation({ country, state: "", district: "" });

    const countryData = LocationData.find((c) => c.countryName === country);
    setStatesList(countryData?.states || []);
    setDistrictsList([]);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setLocation({ ...location, state, district: "" });

    const stateData = statesList.find((s) => s.name === state);
    setDistrictsList(stateData?.districts || []);
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setLocation({ ...location, district });
  };

// handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Submit data...
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // add location from state
    data.country = location.country;
    data.state = location.state;
    data.district = location.district;

    try{
        const response= await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        })
        const result = await response.json();
        if (result.success){
            alert('Regestration successfull, check your mail');
            // reset form field
            e.target.reset();
            //reset location -reset react state
            setLocation({ country : "", state : "", district : ""});
        }else{
            alert('Failed to send email' + result.message);
        }
    }catch (err){
        console.error('Submission error', err);
        alert('something went wrong')
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/courses/registration')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((err => console.error('error fetching:', err)));
  }, []);

    return(
        <div>
            <section>
                <div className="bg-[#04145f] px-2 py-2 yourCareerPartner text-center viga-regular">
                    <h1>Course Registration at SCOPE INDIA</h1>
                </div>
                <div className="bg-[#E7E7E7]">
                    <h2 className="text-[25px] text-center text-[#14267c] py-2 viga-regular">Center for Software, Networking, & Cloud Education</h2>
                    <h3 className="text-[17px] text-[#0b27a8] viga-regular mt-0 px-2 pb-2">One of India's best Training destinations for Software, Networking, DevOps and Cloud Computing courses with 18 years of Industrial experience. Over 1,000 students find their dream careers each year, and we have assisted more than 15,000 students so far.</h3>
                </div>
                
           </section>
           <section id="registrationForm" className="bg-[#04145F] px-4 py-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-3 justify-between items-stretch">
                <div id="name" className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">Full Name (required)</label><br/>
                    <input
                        type="text"
                        name="fullName"
                        className="w-full"
                        required/>
                        </div>
                <div id="dob" className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">Date of Birth (required)</label><br/>
                    <input
                        type="date"
                        name="dob"
                        className="w-full"
                        required
                        placeholder="mm/dd/yy"/>
                        </div>
                <div id="gender" className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">Gender (required)</label><br/>
                    <label htmlFor="gender1">
                        <input
                            type="radio"
                            name="gender"
                            required
                            value="male"/>
                            Male</label>
                    <label htmlFor="gender2">
                        <input
                            type="radio"
                            name="gender"
                            required
                            value="female"/>
                            Female</label>
                    <label htmlFor="gender3">
                        <input
                            type="radio"
                            name="gender"
                            required
                            value="other"/>
                            Other</label>
                            </div>
                <div className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">Educational Qualification</label><br/>
                    <input
                        type="text"
                        name="education"
                        className="w-full"/>
                        </div>
                <div className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">Mobile Number (required)</label><br/>
                    <input
                        type="numbers"
                        name="mobile"
                        className="w-full"
                        required/>
                        </div>
                <div className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">Email (required)</label><br/>
                    <input
                        type="email"
                        name="email"
                        className="w-full"
                        required/>
                        </div>
                <div className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">Guardian's Name</label><br/>
                    <input
                        type="text"
                        name="guardian"
                        className="w-full"/>
                        </div>
                <div className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">Guardian's Occupation</label><br/>
                    <input
                        type="text"
                        name="occupation"
                        className="w-full"/>
                        </div>
                <div className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">Guardian's Mobile</label><br/>
                    <input
                        type="number"
                        name="gnumber"
                        className="w-full"/>
                        </div>
{/* get all course from db */}
                <div className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">Choose your course (required)</label><br/>
                    <select
                        id="courseList" 
                        name="courseList"
                        placeholder="Choose Your Course!"
                        defaultValue=""
                        required
                        className="w-full regbox">
                            <option disabled value="">Choose your course!</option>
                            {courses.map((e)=>(
                                <optgroup key={e._id} label={e.courseName}>
                                    {e.subCourses.map((sub,index)=>(
                                        <option key={index} value={sub}>{sub}</option>
                                    ))}
                                </optgroup>
                            ))}
                            
                        </select>
                    </div>
                <div id="training_mode" className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">Training Mode (required)</label><br/>
                        <label><input
                            type="radio"
                            name="mode"
                            required
                            value="online"/>
                            Live Online</label> 
                        <label><input
                            type="radio"
                            name="mode"
                            required
                            value="classroom"/>
                            Classroom</label>
                            </div>
                <div className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">SCOPE INDIA Location (required)</label><br/>
                        <label><input
                            type="radio"
                            name="location"
                            required
                            value="technopark"/>
                             Technopark TVM</label> 
                        <label><input
                            type="radio"
                            name="location"
                            required
                            value="tambanoor"/>
                            Thampanoor TVM</label><br />
                        <label><input
                            type="radio"
                            name="location"
                            required
                            value="kochi"/>
                             Kochi</label>
                        <label><input
                            type="radio"
                            name="location"
                            required
                            value="nagercoil"/>
                             Nagercoil</label>
                        <label><input
                            type="radio"
                            name="location"
                            required
                            value="online"/>
                            Online</label>
                             </div>
                
                <div id="checkboxcss" className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label>Preferred Training Timings (required)</label>
                        <label><input 
                            type="checkbox" 
                            name="ptime"
                            value="Between 8am - 10am"/>
                        Between 8am - 10am</label>
                        <label><input 
                            type="checkbox" 
                            name="ptime"
                            value="Between 9am - 1pm"/>
                        Between 9am - 1pm</label>
                        <label><input 
                            type="checkbox" 
                            name="ptime"
                            value="Between 1pm - 6pm"/>
                        Between 1pm - 6pm</label>
                        <label><input 
                            type="checkbox" 
                            name="ptime"
                            value="Between 6pm - 10pm"/>
                        Between 6pm - 10pm</label>
                        </div>
                <div id="address" className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">Address</label><br/>
                    <input
                        type="text"
                        name="address"
                        className="w-full"/>
                        </div>
{/* Country Dropdown */}
                <div className="bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label>Country</label><br />
                    <select
                    className="w-full regbox"
                    name="country"
                    value={location.country}
                    onChange={handleCountryChange}
                    required>
                    <option value="" disabled>Select Country</option>
                    {LocationData.map((c) => (
                        <option key={c.countryName} value={c.countryName}>{c.countryName}</option>
                    ))}
                    </select>
                </div>

{/* State Dropdown */}
                <div className="bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label>State</label><br />
                    <select
                    className="w-full regbox"
                    name="state"
                    value={location.state}
                    onChange={handleStateChange}
                    required
                    disabled={!statesList.length}>
                    <option value="" disabled>Select State</option>
                    {statesList.map((s) => (
                        <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                    </select>
                </div>

{/* District Dropdown */}
                <div className="bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label>District</label><br />
                    <select
                    className="w-full regbox"
                    name="district"
                    value={location.district}
                    onChange={handleDistrictChange}
                    required
                    disabled={!districtsList.length}>
                    <option value="" disabled>Select District</option>
                    {districtsList.map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                    </select>
                </div>

                <div id="pin" className=" bg-[#FFFFFF] p-5 border-[2px] border-solid border-[#c7ac20] rounded-[10px]">
                    <label className="">PIN/Zip Code</label><br/>
                    <input
                        type="text"
                        name="pin"
                        className="w-full"/>
                        </div>
                
                <div className="col-span-3 flex justify-center p-5">
                    <button 
                        type="submit"
                        className="completeButton text-white">Complete Registration &gt;&gt; </button>
                </div>
            </form>
             
           </section>
        </div>
    )
}
export default Registration