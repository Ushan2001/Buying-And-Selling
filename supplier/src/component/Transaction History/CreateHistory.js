import React,{useState, useEffect} from "react";
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import {useHistory } from "react-router-dom";

export default function CreateHistory() {

    const [tid, setTID] = useState("");
    const [date, setDate] = useState("");
    const [bname, setBname] = useState("");
    const [sname, setSname] = useState("");
    const [pname, setPname] = useState("");
    const [quantity, setQuantity] = useState("");
    const [address, setAddress] = useState("");
    const [cost, setCost] = useState("");
    const history = useHistory();

    function sendData(a){

        a.preventDefault();
        const newHistory = {
              tid,
              date,
              bname,
              sname,
              pname,
              quantity,
              address,
              cost
          }
      
          axios.post("http://localhost:8070/history/save", newHistory).then(() =>{
              alert("Transaction Record Added")
              history.push("/history"); 
              window.location.reload(); 
          }).catch((err)=>{
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
  
        document.getElementById('dateInput').setAttribute('max', maxDate);
           }, []);
  return (
    <div>
       <NavBar/>

<div className="container" style={{ marginTop:"55px"}}>
    <form onSubmit={sendData}>
      <h2>Create New Transaction Records</h2>
      <br></br>
<div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Transaction Code</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Transaction Code" 
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

    onChange={(e) =>{

    setBname(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Seller Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Seller Name"
    onChange={(e) =>{

    setSname(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Product Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Product Name"

    onChange={(e) =>{

    setPname(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Quantity</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
    min={"1"} max={"200"}
   
   onChange={(e) =>{

    setQuantity(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Address"
    onChange={(e) =>{

    setAddress(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Total Cost</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Total Cost"
    min={"1"}
    onChange={(e) =>{

    setCost(e.target.value);
    }}/>
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
