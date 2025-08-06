import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout= async()=>{
    try{
      const res= await fetch('http://localhost:5000/api/auth/logout',{
        method:"GET",
        credentials: 'include'
      });
      const data = await res.json();

      if (data.success){
        alert('Logged out successfully');
        navigate('/');
      }else{
        alert('Logout failed')
      }
    }catch(err){
      console.error('Server error',err);
      alert('failed due to server issue')
    }
  }
  return (
    <div>
      <aside className='bg-[#14267c] w-60 h-screen fixed text-2xl text-white p-4 top-0 left-0 viga-regular'>
        <nav className='flex flex-col gap-4 mt-10'>
            <Link to='/dashboard'
              className="hover:bg-[#0e1a57] px-3 py-2 rounded-md transition-colors duration-200">Dashboard</Link>
            <Link to='/profile'
              className="hover:bg-[#0e1a57] px-3 py-2 rounded-md transition-colors duration-200">Profile</Link>
            <Link to='/addcourse'
              className="hover:bg-[#0e1a57] px-3 py-2 rounded-md transition-colors duration-200">Courses</Link>
            <button onClick={handleLogout}
            className="text-left hover:bg-[#0e1a57] px-3 py-2 rounded-md transition-colors duration-200">Logout</button>
        </nav>
    </aside>
    </div>
  )
}

export default Sidebar