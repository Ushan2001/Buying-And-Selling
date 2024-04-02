import React from "react";
import "./Nav.css";
import NavAvatar from "./NavAvatar";



function Nav() {
  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
      
        <NavAvatar />
      </ul>
    </nav>
  );
}

export default Nav;
