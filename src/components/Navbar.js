import React from "react";
import './Navbar.css'
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <a href="">BookMyHotel</a>
      </div>
      <ul className="nav-links">
        <li><a href="">Home</a></li>
        <li><a href="">Hotels</a></li>
        <li><a href="">Places</a></li>
        <li><a href="">Sign in</a></li>
      </ul>
    </div>
  );
};

export default Navbar;
