import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../../assests/JJRSF purple.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbars">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>

      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li><a href="#"><Link to={"/Home/manage-exam"}>Create Exam </Link></a></li>
        <li><a href="#"><Link to={"/Home/create-exam"}>Add Exam</Link></a></li>
        <button className="login-btn"><Link to={"/Home"}>Logout</Link></button>
      </ul>

      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
    </nav>
  );
};

export default Navbar;
