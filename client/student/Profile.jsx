import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import useStudentData from './useStudentData';
import { LocationData } from '../pages/countryData';

function Profile() {
    const { studentData, loading } = useStudentData();
    const [formData, setFormData]= useState({
        fullName: '',
        dob: '',
        gender: '',
        education: '',
        mobile: '',
        email: '',
        guardian: '',
        gnumber: '',
        occupation: '',
        courseList: '',
        mode: '',
        location: '',
        ptime: '',
        address: '',
        country: '',
        state: '',
        district: '',
        pin: ''
    });
    const [courses,setCourses]=useState([]);

    //for country from country.jsx
    const [location, setLocation] = useState({ country: "", state: "", district: "" });
    const [statesList, setStatesList] = useState([]);
    const [districtsList, setDistrictsList] = useState([]);

    const handleCountryChange = (e) => {
        const country = e.target.value;
        setLocation({ country, state: "", district: "" });
        setFormData((prev)=>({...prev, country, state:'', district:''}));
    
        const countryData = LocationData.find((c) => c.countryName === country);
        setStatesList(countryData?.states || []);
        setDistrictsList([]);
      };
    
      const handleStateChange = (e) => {
        const state = e.target.value;
        setLocation({ ...location, state, district: "" });
        setFormData({ ...location, state, district: "" });
    
        const stateData = statesList.find((s) => s.name === state);
        setDistrictsList(stateData?.districts || []);
      };
    
      const handleDistrictChange = (e) => {
        const district = e.target.value;
        setLocation({ ...location, district });
        setFormData({ ...location, district });
      };

    useEffect(()=>{
        if(studentData){
            console.log('fetched student data',studentData);
            setFormData(studentData);

             // first load country take from db 
            setLocation({
            country: studentData.country || "",
            state: studentData.state || "",
            district: studentData.district || "",
    });
    
    // Set dependent dropdowns (states & districts)
    const countryData = LocationData.find(c => c.countryName === studentData.country);
    setStatesList(countryData?.states || []);
    const stateData = countryData?.states?.find(s => s.name === studentData.state);
    setDistrictsList(stateData?.districts || []);

    } 
    },[studentData]);

    //fetch courses list
    useEffect(()=>{
        fetch('http://localhost:5000/api/courses/registration')
        .then(res=> res.json())
        .then(setCourses)   
        .catch(console.error)
    },[]);

    const handleChange=(e)=>{
        const {name,value,type,checked} = e.target;
        if(type === 'checkbox'){
            setFormData((prev)=>({...prev,[name]:checked ? [...(prev[name] || []),value] : (prev[name] || []).filter((v)=> v!== value)}))
        }else{
            setFormData((prev)=>({...prev,[name]: value}))
        }
    };

    const handleSave= async (e)=>{
        e.preventDefault();
        try{
            const res = await fetch('http://localhost:5000/api/student/update',{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                credentials:'include',
                body:JSON.stringify(formData)
            });
            const result = await res.json();
            if(result.success){
                alert('Profile Saved');
            }else{
                alert('not updated');
            }
        }catch(err){
            console.error('server error',err);
            alert('error in updating data');
        }
    };

    //multi select course
    const handleMultiSelectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, courseList: selected }));
    };

    if (loading) return <p>Loading...</p>;
    if (!studentData) return <p>No student data found</p>

    return (
        <div className='flex ml-64 disableContainer'><Sidebar />
        <div className="flex-1 max-w-5xl mx-auto ">
            <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSave}>
                <h1 className="text-3xl font-bold text-blue-700 mb-8">Edit Profile</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                    <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Date of Birth</label>
                    <input
                    type="date"
                    name="dob"
                    value={formData.dob || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Gender</label>
                    <select
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                    >
                    <option value="">{formData.gender}</option>
                    </select>
                </div>

               <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Education</label>
                    <select
                    type="text"
                    name="education"
                    value={formData.education || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <option value="Post Graduated">Post Graduated</option>
                    <option value="Under Graduated">Under Graduated</option>
                    <option value="12 or Equivalent">12 or Equivalent</option>
                    <option value="10 or Equivalent">10 or Equivalent</option>
                    <option value="10 or Below">10 or Below</option>
                    </select>
                    </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Mobile</label>
                    <input
                    type="text"
                    name="mobile"
                    value={formData.mobile || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Guardians Name</label>
                    <input
                    type="text"
                    name="guardian"
                    value={formData.guardian || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Contact Number</label>
                    <input
                    type="text"
                    name="gnumber"
                    value={formData.gnumber || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Occupation</label>
                    <input
                    type="text"
                    name="occupation"
                    value={formData.occupation || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Course List</label>
                    <input
                    name="courseList"
                    multiple
                    value={formData.courseList}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                    /> */}
                    {/* {courses.map((course) => (
                        <optgroup key={course._id} label={course.courseName}>
                        {course.subCourses.map((sub, idx) => (
                            <option key={idx} value={sub}>
                            {sub}
                            </option>
                        ))}
                        </optgroup>
                    ))}
                    </select> */}
                {/* </div> */}

                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Mode</label>
                    <select
                    name="mode"
                    value={formData.mode || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <option value="">Select</option>
                    <option value="online">Online</option>
                    <option value="classroom">Classroom</option>
                    </select>
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Location</label>
                    <select
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <option value="">Select</option>
                    <option value="technopark">Technopark</option>
                    <option value="tambanoor">Tambanoor</option>
                    <option value="kochi">Kochi</option>
                    <option value="nagercoil">Nagercoil</option>
                    <option value="online">Online</option>
                    </select>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                    <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Country</label>
                    <select
                    type="text"
                    name="country"
                    value={location.country || ""}
                    onChange={handleCountryChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled>Select Country</option>
                        {LocationData.map((c) => (
                            <option key={c.countryName} value={c.countryName}>{c.countryName}</option>
                        ))}
                        </select>
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">State</label>
                    <select
                    type="text"
                    name="state"
                    value={formData.state || ""}
                    onChange={handleStateChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Select State</option>
                        {statesList.map((s)=>(
                            <option key={s.name} value={s.name}>{s.name}</option>
                        ))}
                    </select>
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">District</label>
                    <select
                    type="text"
                    name="district"
                    value={location.district || ""}
                    onChange={handleDistrictChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Select District</option>
                        {districtsList.map((d)=>(
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <label className="block text-sm font-medium text-gray-600 mb-2">PIN</label>
                    <input
                    type="text"
                    name="pin"
                    value={formData.pin || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Preferred Time</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                        "Between 8am - 10am",
                        "Between 9am - 1pm",
                        "Between 1pm - 6pm",
                        "Between 6pm - 10pm",
                    ].map((time) => (
                        <label key={time} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="ptime"
                            value={time}
                            checked={(formData.ptime || []).includes(time)}
                            onChange={handleChange}
                            className="accent-blue-500"
                            disabled
                        />
                        {time}
                        </label>
                    ))}
                    </div>
                </div>

                </div>

                <div className="mt-6">
                <button
                    type="submit"
                    className="mt-4 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-semibold py-2 px-6 rounded-lg shadow"
                >
                    Save
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
        );

}

export default Profile;
