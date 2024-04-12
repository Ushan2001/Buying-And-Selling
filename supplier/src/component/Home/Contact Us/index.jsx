import React from 'react'
import "./style.css"

export default function index() {
  return (
    <div id="contactUsContainer">
        <h2 id="contactUsTitle">Contact Us</h2>
        <h3 id="contactUsSubTitle">Do you have any questions? Please reach us out anytime we will get back to you<br></br> within 1 working day.</h3>
        <div className='row'>
            <div className='col'>
                <div id="contactImgDiv">
                    <img src="/images/contact.png" alt="logo" id="contactImg"></img>
                </div>
            </div>

            
            <div className='col'>
            <div className="col-md-6" id="Contactform">
            <form id="contact-form">
             
                <div className="mb-3">
                  <label htmlFor="form_name"><b>Name</b></label>
                  <input
                    id="form_name"
                    type="text"
                    name="fname"
                    className="form-control"
                    placeholder="Enter your name"
                    required="required"
                    style={{ borderRadius: "16px", marginTop: "10px" }}
                   
                  />
                </div>
            

              <div className="mb-3">
                <label htmlFor="form_email"><b>Email</b></label>
                <input
                  id="form_email"
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required="required"
                  style={{ borderRadius: "16px", marginTop: "10px" }}
                  
                />
              </div>

              <div className="mb-3">
                <label htmlFor="form_message"><b>Message</b></label>
                <textarea
                  id="form_message"
                  name="message"
                  className="form-control"
                  placeholder="Enter your message"
                  rows="4"
                  required="required"
                  style={{ borderRadius: "16px", marginTop: "10px" }}
                 
                />
              </div>

             

              <div className="text-center">
                <button
                  type="submit"
                  className="btn"
                  id="sendBtn"
                >
                  Send
                </button>
              </div>

              <div id="orDiv">
                <span id="or">Or</span>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn"
                  id="WhatsappBtn"
                >
                  <i class="bi bi-whatsapp"></i>&nbsp;&nbsp;Contact via Whatsapp <i className="fas fa-arrow-right"></i>
                </button>
              </div>


            </form>
          </div>
                                     
            </div>
        </div>
      
    </div>
  )
}
