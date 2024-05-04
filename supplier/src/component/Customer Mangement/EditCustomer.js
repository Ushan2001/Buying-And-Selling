import React, { useState,  useEffect} from "react";
import axios from "axios";
import {useHistory } from "react-router-dom"
import Header from '../Dashboard/Header/Header';

export default function EditCustomer(props) {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [ctype, setCtype] = useState("");
    const [note, setNote] = useState("");
    const history = useHistory();

    useEffect(() => {

    const customerId = props.match.params.id;

    axios.get(`http://localhost:8070/customer/${customerId}`).then((res) => {
    const customer = res.data.customer;

      setId(customer._id);
      setName(customer.name);
      setNumber(customer.number);
      setAddress(customer.address);
      setGender(customer.gender);
      setEmail(customer.email);
      setCtype(customer.ctype);
      setNote(customer.note); 
      
    });
  }, [props.match.params.id]);

  function sendData(e) {
    e.preventDefault();

    const updateCustomer = {
      
      name,number,address,gender,email,ctype,note
    };

    axios.put(`http://localhost:8070/customer/update/${id}`, updateCustomer).then(() => {
      alert("Customer Record Updated");
      history.push("/customer"); 
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
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
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
          <label htmlFor="exampleInputPassword1" className="form-label">Gender</label>
          <select className="form-select" aria-label="Default select example" 
             id="exampleInputPassword1"
             value={gender}
             onChange={(e) => setGender(e.target.value)} >
        <option selected>Open this select menu</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        </select>
        </div>

    
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Customer Type</label>
<select className="form-select" aria-label="Default select example"
id="exampleInputPassword1"
value={ctype} 
  onChange={(e) =>{

    setCtype(e.target.value);
    }}
>
  <option selected>Open this select menu</option>
  <option value="Buyer">Buyer</option>
  <option value="Seller">Seller</option>
  <option value="Both">Both</option>
</select>
</div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Additional Information</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Additional Information"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
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
