import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../Dashboard/Header/Header";
import "./payment.css"

export default function CreatePayment() {

  const [customer, setCustomer] = useState("");
  const [PayID, setPayID] = useState("");
  const [phone, setPhone] = useState("");
  const [pid, setPid] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [date, setDate] = useState("");
  const history = useHistory();

  function sendData(a) {

    a.preventDefault();
    const newPayment = {

      customer,
      PayID,
      phone,
      pid,
      amount,
      method,
      date
    }

    axios.post("http://localhost:8070/payment/save", newPayment).then(() => {
      alert("Payment Record Added")
      history.push("/payment");
      window.location.reload();
    }).catch((err) => {
      alert(err)
    })
  }

  useEffect(() => {
    // Get the current date
    var currentDate = new Date();

    // Set the maximum date attribute for the input to the current date
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');
    var maxDate = `${year}-${month}-${day}`;

    // Update the input element
    var dateInput = document.getElementById('dateInput');
    dateInput.setAttribute('max', maxDate);
    dateInput.setAttribute('min', maxDate); // Set the minimum date to the current date
  }, []);

  return (
    <div>
      <Header />

      <div className="container" id="createPayment">
        <form onSubmit={sendData} style={{ position: "relative", width: "65%" }}>
          <h2 id="AllPayment">Create New Payment Records</h2>
          <br></br>

          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label" id="payment">Customer Name</label>
            <input type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Customer Name"
              onChange={(e) => {

                setCustomer(e.target.value);
              }} />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label" id="payment">PayID</label>
            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Your Address"
              onChange={(e) => {

                setPayID(e.target.value);
              }} />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label" id="payment">Contact Number</label>
            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Contact Number"
              pattern="^\d{10}$"
              onChange={(e) => {

                setPhone(e.target.value);
              }} />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label" id="payment">Product Code</label>

            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Product Code"
              onChange={(e) => {

                setPid(e.target.value);
              }} />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label" id="payment">Bill Amount</label>
            <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Bill Amount"
              min={1}
              onChange={(e) => {

                setAmount(e.target.value);
              }} />
          </div>

          <div className="mb-3" style={{ position: "relative", width: "70%"}}>
            <label for="exampleInputPassword1" className="form-label" id="payment">Payment Method</label>
            <select style={{borderRadius:"20px" }} className="form-select" aria-label="Default select example"
              onChange={(e) => {

                setMethod(e.target.value);
              }}
            >
              <option selected>Open this select menu</option>
              <option value="Credit/Debit Card">Credit/Debit Card</option>
              <option value="COD">COD</option>
            </select>
          </div>

          
          <div className="mb-3">
            <label htmlFor="dateInput" className="form-label" id="payment">Date</label>
            <input type="date" id="dateInput" name="date" max={""} value={date}
            style={{marginLeft:"0%"}}
              className="form-control"
              onChange={(e) => setDate(e.target.value)}
              required />
          </div>
        

          <button type="submit" className="btn btn-success"  style={{ marginTop: "15px", borderRadius: "20px" }}>
            <i className='fas fa-save'></i>
            &nbsp; Save
          </button>
        </form>
      </div>
    </div>
  )
}
