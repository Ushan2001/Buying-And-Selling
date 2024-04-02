import React from "react";
import "./Header.css";
import Logo from "./Logo";
import SearchBar from "../Sidebar/SideBar";
import Nav from "./Nav/Nav";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const currentPageName = location.pathname.split("/")[1]; // Extract the page name from the URL
  

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <Logo />&nbsp;&nbsp;&nbsp;
      <h5>{currentPageName.charAt(0).toUpperCase() + currentPageName.slice(1)}</h5>
      <SearchBar />
      <Nav />
    </header>
  );
}

export default Header;
