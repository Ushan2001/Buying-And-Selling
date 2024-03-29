import React, { useState, useEffect } from "react";
import axios from "axios";
import {useHistory } from "react-router-dom"
import NavBar from '../NavBar/NavBar';

export default function EditOrder(props) {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [oid, setOid] = useState("");
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [send, setSend] = useState("No");
    const history = useHistory();

    useEffect(() => {
        const orderId = props.match.params.id;

        axios.get(`http://localhost:8070/order/${orderId}`).then((res) => {
      const order = res.data.order;

      setId(order._id);
      setName(order.name);
      setNumber(order.number);
      setOid(order.oid);
      setAmount(order.amount)
      setQuantity(order.quantity);
      setDate(order.date);
      setAddress(order.address);
      setNote(order.note);
      setTotalAmount(order.totalAmount);
      setSend(order.send);
      
      
    });
  }, [props.match.params.id]);

  function sendData(e) {

    // Calculate the total amount
    const calculatedTotalAmount = quantity * amount;

    e.preventDefault();

    const updateOrder = {
      
      name,
      number,
      oid,
      amount,
      quantity,
      date,
      address,
      note,
      totalAmount: calculatedTotalAmount,
      send
    };

    axios.put(`http://localhost:8070/order/update/${id}`, updateOrder).then(() => {
      alert("Order Record Updated");
      history.push("/order"); 
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

    document.getElementById('dateInput').setAttribute('max', maxDate);
       }, []);


  return (
    <div>
      
       <NavBar/>
<div className="container" style={{ marginTop:"63px"}}>
      <form onSubmit={sendData}>
        <h2>Edit Order Record</h2>
        <br></br>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Contact Number</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Contact Number"
            pattern="^\d{10}$"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Product Code</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Order code"
            readOnly
            value={oid}
            onChange={(e) => setOid(e.target.value)}
          />
        </div>

        <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Amount</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Amount"
        min={"1"}
        value={amount}
        onChange={(e) => {
            setAmount(e.target.value);
            setTotalAmount(e.target.value * quantity);
        }}
    />
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Quantity</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
        max={"200"} min={"1"}
        value={quantity}
        onChange={(e) => {
            setQuantity(e.target.value);
            setTotalAmount(e.target.value * amount);
        }}
    />
</div>

        <div className="mb-3">
          <label htmlFor="dateInput" className="form-label">Date</label>
          <input type="date" id="dateInput" name="date" max={""} value={date}
            className="form-control"
            onChange={(e) => setDate(e.target.value)}
      required/>
  </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Additional Comments</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Additional Comments"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Total Amount</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Total Amount" value={totalAmount} readOnly />
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Deliver</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Yes or No"
    value={send}
    onChange={(e) =>{

    setSend(e.target.value);
    }}/>
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
