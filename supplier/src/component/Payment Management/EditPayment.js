import React, { useState,  useEffect} from "react";
import axios from "axios";
import {useHistory } from "react-router-dom"
import Header from "../Dashboard/Header/Header";

export default function EditPayment(props) {

    const [id, setId] = useState("");
    const [customer, setCustomer] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [pid, setPid] = useState("");
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("");
    const [date, setDate] = useState("");
    const history = useHistory();

    useEffect(() => {

        const paymentId = props.match.params.id;
    
        axios.get(`http://localhost:8070/payment/${paymentId}`).then((res) => {
        const payment = res.data.payment;
    
          setId(payment._id);
          setCustomer(payment.customer);
          setAddress(payment.address);
          setPhone(payment.phone);
          setPid(payment.pid);
          setAmount(payment.amount);
          setMethod(payment.method);
          setDate(payment.date); 
          
        });
      }, [props.match.params.id]);
    
      function sendData(e) {
        e.preventDefault();
    
        const updatePayment = {
          
          customer,
          address,
          phone,
          pid,
          amount,
          method,
          date
        };
    
        axios.put(`http://localhost:8070/payment/update/${id}`, updatePayment).then(() => {
          alert("Payment Record Updated");
          history.push("/payment"); 
          window.location.reload(); 
        }).catch((err) => {
          alert(err);
        });
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
       <Header/>
      <div className="container" id="createPayment">
    <form onSubmit={sendData}>
      <h2>Edit Payment Records</h2>
      <br></br>
      <div className="mb-3">
<label for="exampleInputEmail1" className="form-label">Customer Name</label>
<input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Customer Name"
value={customer}
onChange={(e) =>{

setCustomer(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Address</label>
<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Your Address"
value={address}
onChange={(e) =>{

setAddress(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Contact Number</label>
<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Contact Number"
pattern="^\d{10}$"
value={phone}
onChange={(e) =>{

setPhone(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Product Code</label>

<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Product Code"
value={pid}
onChange={(e) =>{

setPid(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Bill Amount</label>
<input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Bill Amount"
value={amount}
min={1}
onChange={(e) =>{

setAmount(e.target.value);
}}/>
</div>

<div className="mb-3" style={{ position: "relative", width: "70%"}}>
<label for="exampleInputPassword1" className="form-label">Payment Method</label>
<select style={{borderRadius:"20px" }} className="form-select" aria-label="Default select example"
value={method} 
  onChange={(e) =>{

    setMethod(e.target.value);
    }}
>
  <option selected>Open this select menu</option>
  <option value="Credit/Debit Card">Credit/Debit Card</option>
</select>
</div>

<div className="mb-3">
    <label htmlFor="dateInput" className="form-label">Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date}
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      required/>
  </div>
    

    <button type="submit" className="btn btn-success" style={{ marginTop: "15px" }}>
          <i className="far fa-check-square"></i>
          &nbsp; Update
        </button>
      </form>
    </div>
    </div>
    
  )
}
