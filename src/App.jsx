import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../client/pages/homepage'
import Header from '../client/pages/header'
import FooterPage from '../client/pages/footer'
import CoursesPage from '../client/pages/courses'
import AddCourse from '../client/pages/addCourse'
import Registration from '../client/pages/registration'
import AboutUs from '../client/pages/about'
import Contact from '../client/pages/contact'
import Login from '../client/pages/Login'
import Dashboard from '../client/pages/dashboard'
import RequestOtp from '../client/pages/RequestOtp'
import SetPassword from '../client/pages/SetPassword'

function App() {


  return (
   <div>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/courses' element={<CoursesPage />}/>
      <Route path='/add' element={<AddCourse />} />
      <Route path='/registration' element={<Registration />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path='/contact' element={<Contact />} />
      {/* <Route path='/placement' element={<HomePage />} /> */}
      {/* <Route path='/faq' element={<HomePage />} /> */}
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/request-otp' element={<RequestOtp />} />
      <Route path='/set-password' element={<SetPassword />} />
    </Routes>
    <FooterPage />
   </div>
  )
}

export default App
