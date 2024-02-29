import React,{useState, useEffect} from "react";
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import {useHistory } from "react-router-dom";

export default function CreateSupplier() {

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

    function sendData(e) {
      e.preventDefault();
  
      // Calculate the total amount
      const calculatedTotalAmount = quantity * amount;
  
      const newSupplier = {
          sid,
          name,
          address,
          product,
          amount,
          quantity,
          date,
          note,
          totalAmount: calculatedTotalAmount, // Add this line
      };
  
      axios.post("http://localhost:8070/supplier/save", newSupplier).then(() => {
          alert("Supplier Record Added");
          history.push("/supplier");
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
              <h2>Create New Supplier Records</h2>
              <br></br>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Supplier Code</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Supplier Code" 
    onChange={(e) =>{

        setSid(e.target.value);
    }}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Supplier Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Supplier Name"
     onChange={(e) =>{

        setName(e.target.value);
    }}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Supplier Address"
     onChange={(e) =>{

        setAddress(e.target.value);
    }}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Product</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Product Name"
     onChange={(e) =>{

        setProduct(e.target.value);
    }}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Amount</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Amount"
        min={"1"}
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
    <label for="exampleInputPassword1" className="form-label">Additional Note</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Additional Note"
     onChange={(e) =>{

        setNote(e.target.value);
    }}/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Total Amount</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Total Amount" value={totalAmount} readOnly />
</div>


  
  
  <button type="submit" className="btn btn-success" style={{marginTop:"15px"}}>
  <i className='fas fa-save'></i>
  &nbsp; Save
  </button>
</form>
        </div>
    </div>
  )
}


