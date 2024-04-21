import React, { useState, useEffect } from "react";
import axios from "axios";
import {useHistory } from "react-router-dom"
import Header from '../Dashboard/Header/Header'
import "./supplier.css"
import Swal from 'sweetalert2';

export default function EditSupplier(props) {

    const [id, setId] = useState("");
    const [sid, setSid] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const history = useHistory();
    const [token, setToken] = useState("");
      

    useEffect(() => {
      // Function to fetch token from local storage on component mount
      const fetchToken = () => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }
      };
      fetchToken(); // Call fetchToken function
    }, []);

    useEffect(() => {
        const supplierId = props.match.params.id;

        axios.get(`http://localhost:8070/supplier/${supplierId}`).then((res) => {
      const supplier = res.data.supplier;

      setId(supplier._id);
      setSid(supplier.sid);
      setName(supplier.name);
      setAddress(supplier.address);
      setProduct(supplier.product);
      setAmount(supplier.amount);
      setQuantity(supplier.quantity);
      setDate(supplier.date);
      setNote(supplier.note);
      setTotalAmount(supplier.totalAmount);
     
      
    });
  }, [props.match.params.id]);

  function sendData(e) {
    e.preventDefault();
  
    // Calculate the total amount
    const calculatedTotalAmount = quantity * amount;
  
    const updateSupplier = {
      sid,
      name,
      address,
      product,
      amount,
      quantity,
      date,
      note,
      totalAmount: calculatedTotalAmount,
    };
  
    axios.put(`http://localhost:8070/supplier/update/${id}`, updateSupplier,{
      headers: {
        Authorization: `Bearer ${token}` // Attach token to request headers
      }
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Supplier Record Updated',
          text: 'Supplier record has been successfully updated!',
          showConfirmButton: true,
          confirmButtonText: 'Go to Supplier List'
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/supplier");
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the supplier record. Please try again.'
        });
        console.error(err);
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
<div className="container" id="editContainer">
      <form onSubmit={sendData} style={{position:"relative", width:"65%"}}>
        <h2 id="AllSupplier">Edit Supplier Record</h2>
        <br></br>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" id='supplier'>Supplier Code</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            aria-describedby="emailHelp"
            placeholder="Enter Supplier Code"
            readOnly
            value={sid}
            onChange={(e) => setSid(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" id='supplier'>Supplier Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Supplier Name"
            pattern="[A-Za-z\s]+" title="Please enter only letters and spaces"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
            {!/^[A-Za-z\s]+$/.test(name) && (
        <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>Please enter only letters and spaces</p>)}

        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" id='supplier'>Address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Post Category Here"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" id='supplier'>Product</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Productr"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>

        <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id='supplier'>Amount</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Amount"
    value={amount}
        min={"1"}
        onChange={(e) => {
            setAmount(e.target.value);
            setTotalAmount(e.target.value * quantity);
        }}
    />
</div>

<div className="row">
  <div className="col">
<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id='supplier'>Quantity</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
         min={"1"}
        value={quantity}
        onChange={(e) => {
            setQuantity(e.target.value);
            setTotalAmount(e.target.value * amount);
        }}
    />
</div>
</div>


<div className="col">
  <div className="mb-3">
    <label htmlFor="dateInput" className="form-label" id='supplier'>Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date}
    readOnly
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      required/>
  </div>
  </div>
  </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" id='supplier'>Additional Note</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Additional Note"
            pattern="[A-Za-z\s]+" title="Please enter only letters and spaces"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div class="count-display">
    <label class="count-label" for="exampleInputPassword1" id='supplier'>Total Amount:</label>
    <div class="count-value">LKR: {totalAmount}</div>
</div>

        <button type="submit" className="btn btn-success" style={{ marginTop: "15px", borderRadius:"20px" }}>
          <i className="far fa-check-square"></i>
          &nbsp;Update
        </button>
      </form>
    </div>
      
    </div>
  )
}
