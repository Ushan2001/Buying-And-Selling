import React,{useState,  useEffect } from "react";
import axios from "axios";
import {useHistory } from "react-router-dom";
import Header from '../Dashboard/Header/Header';
import "./style.css"


export default function CreateDelivery() {

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [oid, setOid] = useState("");
    const [code, setCode] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [status, setStatus] = useState("");
    const [distance, setDistance] = useState(""); // New state for distance
    const [deliveryFee, setDeliveryFee] = useState(0); // Initialize deliveryFee
    const history = useHistory();

    function sendData(a){

      if (distance > 10) {
        const extraDistance = distance - 10;
        const calculatedDeliveryFee = extraDistance * 50;
        setDeliveryFee(calculatedDeliveryFee);
    } else {
        setDeliveryFee(0); // Reset deliveryFee if distance is 10km or less
    }

        a.preventDefault();
        const newDelivery = {

              name,
              number,
              oid,
              code,
              address,
              date,
              note,
              status,
              distance,
              deliveryFee
          }
      
          axios.post("http://localhost:8070/delivery/save", newDelivery).then(() =>{
              alert("Delivery Record Added")
              history.push("/delivery"); 
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
    
        // Update the input element
        var dateInput = document.getElementById('dateInput');
        dateInput.setAttribute('max', maxDate);
        dateInput.setAttribute('min', maxDate); // Set the minimum date to the current date
      }, []);

  return (
    <div>
      <Header />

<div className="container" id="createDeliveryContainer" >
    <form onSubmit={sendData}>
      <h2 id="btnAllDelivery">Create New Delivery Records</h2>
      <br></br>
<div className="mb-3">
<label for="exampleInputEmail1" className="form-label"  id='createDelivery'>Customer Name</label>
<input type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Customer Name" 
onChange={(e) =>{

setName(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label" id='createDelivery'>Contact Number</label>
<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Contact Number"
pattern="^\d{10}$"
onChange={(e) =>{

setNumber(e.target.value);
}}/>
</div>

<div className="row">
    <div className="col">
<div className="mb-3">
<label for="exampleInputPassword1" className="form-label" id='createDelivery'>Order ID</label>
<input type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Order ID" 
onChange={(e) =>{

setOid(e.target.value);
}}/>
</div>
</div>

<div className="col">
<div className="mb-3">
<label for="exampleInputPassword1" className="form-label" id='createDelivery'>Delivery Code</label>
<input type="text" className="form-control" id="dateInput" aria-describedby="emailHelp" placeholder="Enter Delivery Code" 
onChange={(e) =>{

setCode(e.target.value);
}}/>
</div> 
</div>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label" id='createDelivery'>Address</label>
<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Customer Address"
onChange={(e) =>{

setAddress(e.target.value);
}}/>
</div>

<div className="mb-3">
    <label htmlFor="dateInput" className="form-label" id='createDelivery' >Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date} style={{marginLeft:"3px"}}
    className="form-control"
     onChange={(e) =>
      { setDate(e.target.value);
      }}/>
  </div>


<div className="mb-3">
<label for="exampleInputPassword1" className="form-label" id='createDelivery'>Additional Information</label>
<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Additional Information"
onChange={(e) =>{

setNote(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label" id='createDelivery'>Delivery Status</label>

<select
              className="form-select"
              id="exampleInputPassword1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
</select>

</div>

<div className="mb-3">
  <label htmlFor="exampleInputDistance" className="form-label" id='createDelivery'>Distance (in km)</label>
  <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Distance"
      onChange={(e) => setDistance(parseInt(e.target.value))} />
</div>

<div class="count-display" style={{marginBottom:"2%", width:"70%"}}>
    <label class="count-label" for="exampleInputPassword1" id='createDelivery'>Delivery Fee:</label>
    <div class="count-value">LKR: {deliveryFee}</div>
</div>

<button type="submit" className="btn btn-success" style={{marginTop:"15px",borderRadius:"20px"}}>
<i className='fas fa-save'></i>
&nbsp; Save Delivery
</button>
</form>
</div>
    </div>
  )
}
