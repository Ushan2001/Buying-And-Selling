/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";


function NavAvatar() {
  return (
    <li className="nav-item dropdown pe-3">
      <a
        className="nav-link nav-profile d-flex align-items-center pe-0"
        href="#1">
        <img src="/images/my dp.jpg" alt="Profile" className="rounded-circle" />&nbsp;
        <span className="d-none d-md-block">Ushan</span>
      </a>

    </li>
  );
}

export default NavAvatar;
