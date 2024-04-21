import React,{useState, useEffect} from "react";
import axios from "axios";
import {useHistory } from "react-router-dom";
import Header from "../Dashboard/Header/Header";
import Swal from 'sweetalert2';


export default function CreateHistory() {

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

    function sendData(a) {
        a.preventDefault();

        //calculate the total cost
        const calculatedTotalAmount = quantity*price;
        const newHistory = {
              tid,
              date,
              bname,
              sname,
              pname,
              quantity,
              price,
              address,
              totalAmount: calculatedTotalAmount,
          }
          axios.post("http://localhost:8070/history/save", newHistory)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Transaction Record Added',
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

<div className="container" id="createSupplier" style={{ marginTop:"100px"}}>
    <form onSubmit={sendData}>
      <h2>Create New Transaction Records</h2>
      <br></br>
<div className="mb-3">
    <label for="exampleInputEmail1" className="form-label" id='supplier'>Transaction Code</label>
    <input type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Transaction Code" 
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
    pattern="[A-Za-z\s]+" title="Please enter only letters and spaces"

    onChange={(e) =>{

    setBname(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id='supplier'>Seller Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Seller Name"
    pattern="[A-Za-z\s]+" title="Please enter only letters and spaces"
    onChange={(e) =>{

    setSname(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id='supplier'>Product Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Product Name"
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
    onChange={(e) =>{

    setAddress(e.target.value);
    }}/>
</div>

<div class="count-display" style={{marginBottom:"2%", width:"70%"}}>
    <label class="count-label" for="exampleInputPassword1" id='supplier'>Total Amount:</label>
    <div class="count-value">LKR: {totalAmount}</div>
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
