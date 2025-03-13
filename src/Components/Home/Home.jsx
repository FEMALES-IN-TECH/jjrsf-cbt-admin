import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import  "../Home/Home.css"
import Navbar from '../Navbar/Navbar'

const Home = () => {
  return (
    <div>
     <div className="home-container">
     <Navbar/>
      {/* Main Content - Outlet renders nested pages */}
      <div className="">
        <Outlet />
      </div>
    </div>
      
    </div>
  )
}

export default Home
