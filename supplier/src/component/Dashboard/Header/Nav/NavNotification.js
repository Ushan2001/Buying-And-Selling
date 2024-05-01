import React, { useState, useEffect } from "react";
import "./Nav.css"
import SupplierReport from '../../../Supplier/SupplierReport';

//import "./NavNotification.css"; // Import your CSS file for styling

function NavNotification() {
  const [isMonthlyReportAvailable, setIsMonthlyReportAvailable] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    checkMonthlyReportAvailability();
  }, []);

  const checkMonthlyReportAvailability = () => {
    // Simulated monthly report availability check
    const isAvailable = true; // Replace this with your logic to check availability
    setIsMonthlyReportAvailable(isAvailable);
  };

  const displayMonthlyReport = () => {
    setShowNotifications(true);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const currentMonthIndex = new Date().getMonth();
  const currentMonthName = months[currentMonthIndex];

  return (
    <div className="notification-container">
      {isMonthlyReportAvailable && (
        <button className="btn notification-icon" onClick={displayMonthlyReport}>
          <img src="/images/notify.png" alt="logo" id="notifyImg" />
        </button>
      )}
      {showNotifications  && ( 
        <div className="notification-dropdown">
          <div className="notification-header">
            <h5 className="reportName">Notification Center</h5>
          </div>
          <ul className="notification-list">
            <li>1️⃣ {currentMonthName} suppliers' report available <SupplierReport/></li>
          </ul>
          <button className="close-button" onClick={closeNotifications}><i class="bi bi-x-square" id="closeIcon"></i></button>
        </div>
      )}
    </div>
  );
}

export default NavNotification;
