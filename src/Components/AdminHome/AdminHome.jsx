import React from 'react'
import "../AdminHome/AdminHome.css"
const AdminHome = () => {
  return (
    <div className="home-body">
    <h1>Welcome to the Admin Panel</h1>
    <p>
      Take full control of your exam management system with ease. Our intuitive platform  
      allows you to create, edit, and track exams in just a few clicks.
    </p>
    <p>
      Navigate through the options above to start creating new exams, manage existing ones,  
      and ensure a smooth experience for both administrators and participants.
    </p>
    <div className="features">
      <div className="feature-box">
        <h3>📌 Create Exams</h3>
        <p>Set up exams effortlessly with customizable options.</p>
      </div>
      <div className="feature-box">
        <h3>⚡ Manage Exams</h3>
        <p>View, update, and monitor exams in real-time.</p>
      </div>
      <div className="feature-box">
        <h3>📊 Track Progress</h3>
        <p>Analyze exam performance and make data-driven decisions.</p>
      </div>
    </div>
    
    
  </div>
  
   
  )
}

export default AdminHome
