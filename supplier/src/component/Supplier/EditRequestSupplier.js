import React, { useState,  useEffect} from "react";
import axios from "axios";
import {useHistory } from "react-router-dom"
import Header from '../Dashboard/Header/Header';

export default function EditRequestSupplier(props) {

    const [id, setId] = useState("");
    const [supplierStatus, setStatus] = useState("");
    const history = useHistory();

    useEffect(() => {

    const customerId = props.match.params.id;

    axios.get(`http://localhost:8070/customer/${customerId}`).then((res) => {
    const customer = res.data.customer;

      setId(customer._id);
      setStatus(customer.supplierStatus)
      
    });
  }, [props.match.params.id]);

  function sendData(e) {
    e.preventDefault();

    const updateCustomer = {
      supplierStatus
    };

    axios.put(`http://localhost:8070/customer/update/${id}`, updateCustomer).then(() => {
      alert("Customer Record Updated");
      history.push("/request/supplier"); 
      window.location.reload(); 
    }).catch((err) => {
      alert(err);
    });
  }


  return (
    <div>
       <Header/>
<div className="container" id="editContainer">
      <form onSubmit={sendData}>
        <h2>Edit Customer Record</h2>
        <br></br>
        <div className="row">
            <div className="col-md-4">
        <div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Supplier Status</label>
<select className="form-select" aria-label="Default select example"  id="exampleInputPassword1"
value={supplierStatus}
  onChange={(e) =>{

    setStatus(e.target.value);
    }}
>
  <option selected>Open this select menu</option>
  <option value="Registered">Registered</option>
 
</select>
</div>
</div>

<div className="col-md-3">

        <button type="submit" className="btn btn-success" style={{ marginTop: "35px", borderRadius:"20px", marginLeft:"-40%" }}>
          <i className="far fa-check-square"></i>
          &nbsp; Update
        </button>
        </div>
        </div>
      </form>
    </div>
    </div>
  )
}
