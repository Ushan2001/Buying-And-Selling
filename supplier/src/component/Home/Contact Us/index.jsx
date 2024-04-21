import "./style.css";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  function sendData(e) {
    e.preventDefault();
    const newComplain = {
      name,
      email,
      message,
      
    };

    axios.post("http://localhost:8070/complain/save", newComplain).then(() =>{
      alert("Complaint Added")
      history.push("/home"); 
      window.location.reload(); 
  }).catch((err)=>{
      alert(err)
  })
  }

  return (
    <div id="contactUsContainer">
      <h2 id="contactUsTitle">Contact Us</h2>
      <h3 id="contactUsSubTitle">
        Do you have any complaints? Please reach out anytime, and we'll get back
        to you within 1 working day.
      </h3>
      <div className="row">
        <div className="col">
          <div id="contactImgDiv">
            <img src="/images/contact.png" alt="logo" id="contactImg" />
          </div>
        </div>

        <div className="col">
          <div className="col-md-6" id="Contactform">
            <form id="contact-form" onSubmit={sendData}>
              <div className="mb-3">
                <label htmlFor="form_name">
                  <b>Name</b>
                </label>
                <input
                  id="form_name"
                  type="text"
                  name="fname"
                  className="form-control"
                  placeholder="Enter your name"
                  required
                  style={{ borderRadius: "16px", marginTop: "10px" }}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="form_email">
                  <b>Email</b>
                </label>
                <input
                  id="form_email"
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                  style={{ borderRadius: "16px", marginTop: "10px" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="form_message">
                  <b>Message</b>
                </label>
                <textarea
                  id="form_message"
                  name="message"
                  className="form-control"
                  placeholder="Enter your message"
                  rows="4"
                  required
                  style={{ borderRadius: "16px", marginTop: "10px" }}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

          

              <div className="text-center">
                <button type="submit" className="btn" id="sendBtn">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
