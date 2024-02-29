import React, { useState, useEffect } from "react";
import axios from "axios";
import {useHistory } from "react-router-dom"
import NavBar from '../NavBar/NavBar';

export default function EditHistory(props) {

    const [id, setId] = useState("");
    const [tid, setTID] = useState("");
    const [date, setDate] = useState("");
    const [bname, setBname] = useState("");
    const [sname, setSname] = useState("");
    const [pname, setPname] = useState("");
    const [quantity, setQuantity] = useState("");
    const [address, setAddress] = useState("");
    const [cost, setCost] = useState("");
    const history = useHistory();

    useEffect(() => {
        const historyId = props.match.params.id;

        axios.get(`http://localhost:8070/history/${historyId}`).then((res) => {
      const history = res.data.history;

      setId(history._id);
      setTID(history.tid);
      setDate(history.date);
      setBname(history.bname);
      setSname(history.sname);
      setPname(history.pname);
      setQuantity(history.quantity);
      setAddress(history.address);
      setCost(history.cost);
    
    });
  }, [props.match.params.id]);

  function sendData(e) {
    e.preventDefault();

    const updateHistory = {
      
      tid,
      date,
      bname,
      sname,
      pname,
      quantity,
      address,
      cost
    };

    axios.put(`http://localhost:8070/history/update/${id}`, updateHistory).then(() => {
      alert("Transaction Record Updated");
      history.push("/history"); 
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

<div className="container" style={{ marginTop:"55px"}}>
    <form onSubmit={sendData}>
      <h2>Edit History Record</h2>
      <br></br>
<div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Transaction Code</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Transaction Code"
    readOnly
    value={tid} 
    onChange={(e) =>{

    setTID(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label htmlFor="dateInput" className="form-label">Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date}
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      required/>
  </div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Buyer Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Buyer Name"
    value={bname}

    onChange={(e) =>{

    setBname(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Seller Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Seller Name"
    value={sname}
    onChange={(e) =>{

    setSname(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Product Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Product Name"
    value={pname}

    onChange={(e) =>{

    setPname(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Quantity</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
    min={"1"} max={"200"}
    value={quantity}
   
   onChange={(e) =>{

    setQuantity(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Address"
    value={address}
    onChange={(e) =>{

    setAddress(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Total Cost</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Total Cost"
    value={cost}
    min={"1"}
    onChange={(e) =>{

    setCost(e.target.value);
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
