/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./supplier.css";

function LoadingPage({ loading }) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div className="img-container animate__animated animate__fadeIn">
            <img
            
              src="/images/BuySell Nexus.png"
              alt="Loading"
              className="img animate__animated animate__spin"
              style={{ width: "300px", height: "300px" }}
            />
            
          </div>
         
          <div className="d-flex">
            <div className="w-10 loading-letter loading-blue">B</div>
            <div className="w-10 loading-letter loading-yellow">u</div>
            <div className="w-10 loading-letter loading-green">y</div>
            <div className="w-10 loading-letter loading-orange">S</div>
            <div className="w-10 loading-letter loading-red">e</div>
            <div className="w-10 loading-letter loading-purple">l</div>
            <div className="w-10 loading-letter loading-blue">l</div>
          
          <div className="pt-5 d-flex  px-20">
            <div className="w-10 loading-letter loading-yellow">N</div>
            <div className="w-10 loading-letter loading-green">e</div>
            <div className="w-10 loading-letter loading-orange">x</div>
            <div className="w-10 loading-letter loading-red">u</div>
            <div className="w-10 loading-letter loading-purple">s</div>
          </div>
        </div>
      </div>
      </div>
    );
  }
  return null; 
}

export default LoadingPage;
