import React, { useState, useEffect } from "react";
import axios from "axios";
import {useHistory } from "react-router-dom";
import Header from "../Dashboard/Header/Header";
import Swal from 'sweetalert2';

export default function EditHistory(props) {

    const [id, setId] = useState("");
    const [tid, setTID] = useState("");
    const [date, setDate] = useState("");
    const [bname, setBname] = useState("");
    const [sname, setSname] = useState("");
    const [pname, setPname] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
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
      setPrice(history.price);
      setAddress(history.address);
      setTotalAmount(history.totalAmount);
    
    });
  }, [props.match.params.id]);

  function sendData(e) {
    e.preventDefault();

    const calculatedTotalAmount = quantity*price;

    const updateHistory = {
      
      tid,
      date,
      bname,
      sname,
      pname,
      quantity,
      price,
      address,
      totalAmount: calculatedTotalAmount,
    };

    axios.put(`http://localhost:8070/history/update/${id}`, updateHistory)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Transaction Record Updated',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'OK'
      }).then(() => {
        history.push("/history");
        window.location.reload();
      });
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message // Display the error message from the server
      });
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
       <Header/>

<div className="container" id="editContainer" style={{ marginTop:"100px"}}>
    <form onSubmit={sendData}>
      <h2>Edit History Record</h2>
      <br></br>
<div className="mb-3">
    <label for="exampleInputEmail1" className="form-label" id='supplier'>Transaction Code</label>
    <input type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Transaction Code"
    readOnly
    value={tid} 
    onChange={(e) =>{

    setTID(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label htmlFor="dateInput" className="form-label" id='supplier'>Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date} style={{marginLeft:"3px"}}
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      required/>
  </div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id='supplier'>Buyer Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Buyer Name"
    value={bname}
    pattern="[A-Za-z\s]+" title="Please enter only letters and spaces"

    onChange={(e) =>{

    setBname(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id='supplier'>Seller Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Seller Name"
    value={sname}
    pattern="[A-Za-z\s]+" title="Please enter only letters and spaces"
    onChange={(e) =>{

    setSname(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id='supplier'>Product Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Product Name"
    value={pname}
    pattern="[A-Za-z\s]+" title="Please enter only letters and spaces"

    onChange={(e) =>{

    setPname(e.target.value);
    }}/>
</div>

<div className="row">
    <div className="col-md-5">
<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id='supplier'>Quantity</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
    min={"1"} max={"200"}
   
   onChange={(e) =>{

    setQuantity(e.target.value);
    setTotalAmount(e.target.value* price);
    }}/>
</div>
</div>
<div className="col-md-5">
<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id='supplier'>Price Per Unit</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Price"
    min={"1"} 
   
   onChange={(e) =>{

    setPrice(e.target.value);
    setTotalAmount(e.target.value* quantity);
    }}/>
</div>
     </div>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id='supplier'>Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Address"
    value={address}
    onChange={(e) =>{

    setAddress(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id='supplier'>Total Cost</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Total Cost"
    value={totalAmount}
    min={"1"}
    onChange={(e) =>{

    setTotalAmount(e.target.value);
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
