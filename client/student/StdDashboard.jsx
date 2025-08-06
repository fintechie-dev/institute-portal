import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'

// Reusable field component
const Field = ({ label, value }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-200">
    <div className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wide">{label}</div>
    <div className="text-lg font-semibold text-gray-800">
      {Array.isArray(value) ? (
        <ul className="list-disc list-inside space-y-1">
          {value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        value || 'N/A'
      )}
    </div>
  </div>
);

function StdDashboard() {

  const [studentData, setStudentData]= useState(null);
  const [loading,setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(()=>{
    const fetchStudent = async ()=>{
      try{
        const res = await fetch('http://localhost:5000/api/student/profile',{
          credentials: 'include'
        });
        const data = await res.json();
        if(data.success){
          setStudentData(data.student)
        }else{
          console.error('data.message');
        }
      }catch(err){
        console.error('error in fetch student', err)
      }finally{
        setLoading(false)
      }
    };

    fetchStudent();
  },[]);
  //image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append('profileImage', file);

    try {
      setUploading(true);
      const res = await fetch('http://localhost:5000/api/student/upload-profile-image', {
        method: 'POST',
        credentials: 'include',
        body: formDataImg,
      });

      const data = await res.json();
      if (data.success) {
        alert("Image uploaded successfully");
        // refetch(); // refresh studentData
      } else {
        alert("Failed to upload image");
      }
    } catch (err) {
      console.error("Image upload error", err);
      alert("Server error while uploading image");
    } finally {
      setUploading(false);
    }
  };
  
  return (
     <div className="min-h-screen flex bg-gray-100 ml-60">
      <Sidebar />
      <div className="p-6 sm:p-10 flex-1">
        <h2 className="text-3xl font-bold text-blue-700 mb-8">Dashboard</h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : studentData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border border-gray-200 relative">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={studentData.profileImage ? `http://localhost:5000${studentData.profileImage}` : "/default-avatar.png"}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-2 border-blue-500"
                />
                <label
                  htmlFor="profileUpload"
                  className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </label>
                <input
                  type="file"
                  id="profileUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {uploading && <p className="text-xs text-blue-500 mt-2">Uploading...</p>}
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">{studentData.fullName}</h3>
                <p className="text-sm text-gray-500">{studentData.email}</p>
              </div>
            </div>
            <Field label="Email" value={studentData.email} />
            <Field label="Training Mode" value={studentData.mode} />
            {/* <Field label="Mobile" value={studentData.mobile} />
            <Field label="Location" value={studentData.location} /> */}
            <div>
            
            </div>
            <div className="col-span-full bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-sm text-gray-500 font-medium mb-4 tracking-wide">Selected Courses</h3>
              {studentData.courseList && studentData.courseList.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-gray-800 text-base">
                  {studentData.courseList.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No courses listed.</p>
              )}
            </div>
          </div>
          
        ) : (
          <p className="text-red-500">No student data found.</p>
        )}
      </div>
    </div>
  );
}

export default StdDashboard;