const NavLink = ({ href, icon, title, hasSubmenu, children }) => {
  return (
    <div className="nav-link-wrapper">
      <a
        className={`nav-link ${hasSubmenu ? "collapsed" : ""}`}
        href={href}
        data-bs-toggle={hasSubmenu ? "collapse" : ""}
        aria-expanded={hasSubmenu ? "false" : "true"}
      >
        <i className={icon}></i>
        <span>{title}</span>
        {hasSubmenu && <i className="bi bi-chevron-down ms-auto"></i>}
      </a>
      {children && (
        <div className={`submenu ${hasSubmenu ? "collapse" : ""}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default NavLink;
