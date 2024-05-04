import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavBar from '../NavBar/UserNavBar';
import { useHistory } from "react-router-dom";

export default function UserPayment() {

  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pid, setPid] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();

  function sendData(a) {

    a.preventDefault();
    const newPayment = {

      customer,
      address,
      phone,
      pid,
      amount,
      method,
      date
    }

    axios.post("http://localhost:8070/payment/save", newPayment)
      .then(() => {

        setSuccessMessage("Your Paymet is SuccessFull Add, Order Place On 3-5 Working Day. We Will Contact You!!");
        history.push("/user/payment/form");
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Adjust the delay as needed 
      })


      .catch((err) => {
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
    <div id="paymentformbg">
      <UserNavBar />
      <div className="container" style={{ marginTop: "50px", marginLeft: "300px", width: "75%" }}>
        <form onSubmit={sendData}>
          <h2 id="AllPayment">Payment Records</h2>
          <br></br>

          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label" id="userpayment">Customer Name</label>
            <input style={{ borderWidth: 2, borderColor: '#40739e' }} type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Customer Name"
              onChange={(e) => {

                setCustomer(e.target.value);
              }} />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label" id="userpayment">Address</label>
            <input style={{ borderWidth: 2, borderColor: '#40739e' }} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Your Address"
              onChange={(e) => {

                setAddress(e.target.value);
              }} />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label" id="userpayment">Contact Number</label>
            <input style={{ borderWidth: 2, borderColor: '#40739e' }} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Contact Number"
              pattern="^\d{10}$"
              onChange={(e) => {

                setPhone(e.target.value);
              }} />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label" id="userpayment">Product Code</label>

            <input style={{ borderWidth: 2, borderColor: '#40739e' }} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Product Code"
              onChange={(e) => {

                setPid(e.target.value);
              }} />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label" id="userpayment">Bill Amount</label>
            <input style={{ borderWidth: 2, borderColor: '#40739e' }} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Bill Amount"
              min={1}
              onChange={(e) => {

                setAmount(e.target.value);
              }} />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label" id="userpayment">Payment Method</label>
            <select style={{ borderWidth: 2, borderColor: '#40739e' }} id="exampleInputPassword1" className="form-select" aria-label="Default select example"
              onChange={(e) => {

                setMethod(e.target.value);
              }}
            >
              <option selected>Open this select menu</option>
              <option value="Credit/Debit Card">Credit/Debit Card</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="dateInput" className="form-label" id="userpayment">Date</label>
            <input type="date" id="dateInput" style={{ marginLeft: "0px", borderWidth: 2, borderColor: '#40739e' }} name="date" max={""} value={date}
              className="form-control"
              onChange={(e) => setDate(e.target.value)}
              required />
          </div>

          <button type="submit" className="btn btn-success" style={{ marginTop: "15px", backgroundColor: "#40739e" }}>
            <i className='fas fa-save'></i>
            &nbsp; Proceed Payment
          </button>



        </form>
      </div>
    </div>
  )
}
