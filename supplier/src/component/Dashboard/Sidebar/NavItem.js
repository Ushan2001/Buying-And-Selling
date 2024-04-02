import React from "react";
import NavLink from "./NavLink";
import {useLocation } from "react-router-dom";
import "./NavItem.css"; // Import the CSS file with the styles

function NavItem({ nav }) {
  const location = useLocation();
  const currentPageName = location.pathname.split("/")[1]; // Extract the page name from the URL
  const isCurrentPage = currentPageName.toLowerCase() === nav.name.toLowerCase();

  const isAddRecord = nav.name === "Add Record";
  
  const isHome = nav.name === "Home";

  return (
    <li className={`nav-item ${isCurrentPage ? 'active' : ''} ${isAddRecord ? 'add-record' : ''} ${isHome ? 'home' : ''}`} >
      {nav.children && nav.children.length > 0 ? (
        <>
          {nav.href ? (
            <NavLink
              href={nav.href}
              icon={nav.icon}
              title={nav.name}
              hasSubmenu
              className={`nav-link ${isCurrentPage ? 'active' : ''}`}
            >
              <i className="bi bi-chevron-down"></i>
            </NavLink>
          ) : (
            <div className={`nav-link ${isCurrentPage ? 'active' : ''}`}>
              <span>{nav.name}</span>
            </div>
          )}
        </>
      ) : (
        <>
          {nav.href ? (
            <NavLink href={nav.href} icon={nav.icon} title={nav.name} className={`nav-link ${isCurrentPage ? 'active' : ''}`} />
          ) : (
            <div className={`nav-link ${isCurrentPage ? 'active' : ''}`}>
              <span>{nav.name}</span>
            </div>
          )}
        </>
      )}

      {nav.children && nav.children.length > 0 && (
        <ul
          id={`nav-${nav._id}`}
          className="nav-content collapse"
          data-bs-parent="#sidebar-nav"
        >
          {nav.children.map((childNav) => (
            <NavItem key={childNav._id} nav={childNav} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default NavItem;
