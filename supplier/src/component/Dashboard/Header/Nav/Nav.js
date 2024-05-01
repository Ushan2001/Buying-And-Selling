import React from "react";
import "./Nav.css";
import NavAvatar from "./NavAvatar";
import NavNotification from "./NavNotification";



function Nav() {
  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
         <NavNotification/>
         <NavAvatar />
      </ul>
    </nav>
  );
}

export default Nav;
