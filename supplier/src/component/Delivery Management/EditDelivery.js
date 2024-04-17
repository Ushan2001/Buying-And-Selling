import React, { useState,  useEffect} from "react";
import axios from "axios";
import {useHistory } from "react-router-dom"
import Header from '../Dashboard/Header/Header';


export default function EditDelivery(props) {

    const [id, setId] = useState("");
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

    useEffect(() => {

        const deliveryId = props.match.params.id;
    
        axios.get(`http://localhost:8070/delivery/${deliveryId}`).then((res) => {
        const delivery = res.data.delivery;
    
          setId(delivery._id);
          setName(delivery.name);
          setNumber(delivery.number);
          setOid(delivery.oid);
          setCode(delivery.code);
          setAddress(delivery.address);
          setDate(delivery.date);
          setNote(delivery.note); 
          setStatus(delivery.status); 
          setDistance(delivery.distance);
          setDeliveryFee(delivery.deliveryFee);
          
        });
      }, [props.match.params.id]);
    
      function sendData(e) {
        e.preventDefault();
    
        const updateDelivery = {
          
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
          
        };
    
        axios.put(`http://localhost:8070/delivery/update/${id}`,updateDelivery).then(() => {
          alert("Delivery Record Updated");
          history.push("/delivery"); 
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

<div className="container"id="createSupplier" >
    <form onSubmit={sendData}style={{ position: "relative", width: "65%" }}>
      <h2 id="AllSupplier">Edit Delivery Records</h2>
      <br></br>
<div className="mb-3">
<label for="exampleInputEmail1" className="form-label"id='supplier'>Customer Name</label>
<input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Customer Name"
value={name} 
onChange={(e) =>{

setName(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label"id='supplier'>Contact Number</label>
<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Contact Number"
pattern="^\d{10}$"
value={number}
onChange={(e) =>{

setNumber(e.target.value);
}}/>
</div>

<div className="row">
    <div className="col">
<div className="mb-3">
<label for="exampleInputEmail1" className="form-label"id='supplier'>Order ID</label>
<input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Order ID" 
value={oid}
onChange={(e) =>{

setOid(e.target.value);
}}/>
</div>
</div>

<div className="col">
<div className="mb-3">
<label for="exampleInputEmail1" className="form-label"id='supplier'>Delivery Code</label>
<input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Delivery Code"
value={code} 
onChange={(e) =>{

setCode(e.target.value);
}}/>
</div> 
</div>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label"id='supplier'>Address</label>
<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Customer Address"
value={address}
onChange={(e) =>{

setAddress(e.target.value);
}}/>
</div>

<div className="mb-3">
    <label htmlFor="dateInput" className="form-label"id='supplier'>Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date} style={{marginLeft:"3px"}}
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      required/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id="createOrder">Distance</label>
    <input type="number" className="form-control" id="exampleInputPassword1"
        max={"200"} min={"1"}
        value={distance}
        onChange={(e) => {
          if (distance > 10) {
            const extraDistance = distance - 10;
            const calculatedDeliveryFee = extraDistance * 50;
            setDeliveryFee(calculatedDeliveryFee);
        } else {
            setDeliveryFee(0); // Reset deliveryFee if distance is 10km or less
        }
        }}
    />
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label"id='supplier'>Additional Information</label>
<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Additional Information"
value={note}
onChange={(e) =>{

setNote(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label"id='supplier'>Delivery Status</label>
<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Delivery Status"
value={status}
onChange={(e) =>{

setStatus(e.target.value);
}}/>
</div>
<div class="count-display" style={{marginBottom:"2%", width:"70%"}}>
    <label class="count-label" for="exampleInputPassword1" id='supplier'>Delivery Fee:</label>
    <div class="count-value">LKR: {deliveryFee}</div>
</div>



<button type="submit" className="btn btn-success" style={{marginTop:"15px"}}>
<i className='fas fa-save'></i>
&nbsp; Update
</button>
</form>
</div>
    </div>
  )
}
