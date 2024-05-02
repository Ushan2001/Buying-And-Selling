import React from "react";
import "./SideBar.css";
import navList from "../../Dashboard/data";
import NavItem from "./NavItem";

function SideBar() {
  return (
    <aside id="sidebar" className="sidebar">

      {/*company Logo */}
      <div id="sideBarDiv">
        <a href="/home">
      <img id="sidebarLogo" src="/images/logo.png" alt="logo"/>
      </a>
      </div>

      <ul className="sidebar-nav" id="sidebar-nav">
        {navList.map((nav) => (
          <NavItem key={nav._id} nav={nav} />
        ))}
      </ul>
      <a href="/">
      <button id="logoutBtn"><i class="bi bi-box-arrow-right"></i>&nbsp;Log out</button>
      </a>
      
    </aside>
  );
}

export default SideBar;
