import React,{useState } from "react";
import axios from "axios";
import {useHistory } from "react-router-dom";
import UserNavBar from '../NavBar/UserNavBar';

export default function UserCreateCustomer() {

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [ctype, setCtype] = useState("");
    const [note, setNote] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const history = useHistory();

    function sendData(a){

        a.preventDefault();
        const newCustomer = {

              name,
              number,
              address,
              gender,
              email,
              ctype,
              note
          }
      
          axios.post("http://localhost:8070/customer/save", newCustomer)
          .then(() => {
              setSuccessMessage("You Are Successfully Add Our System!!!");
              history.push("/usercustomer");
              setTimeout(() => {
                window.location.reload();
            }, 2000); // Adjust the delay as needed 
          })
          .catch((err) => {
              alert(err);
          });
  }

  return (
    <div>
       <UserNavBar/>

       <div className="container" style={{ marginTop: "55px"}}>
  <form onSubmit={sendData}>
    <center>
    <h2>Register Here!</h2>
    </center>
    <br />

    {successMessage && (
      <div className="alert alert-success" role="alert">
        {successMessage}
      </div>
    )}

    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Customer Name
      </label>
      <input
        type="text"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter Customer Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Contact Number
      </label>
      <input
        type="text"
        className="form-control"
        id="exampleInputPassword1"
        placeholder="Enter Contact Number"
        pattern="^\d{10}$"
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Address
      </label>
      <input
        type="text"
        className="form-control"
        id="exampleInputPassword1"
        placeholder="Enter Customer Address"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Gender
      </label>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={(e) => {
          setGender(e.target.value);
        }}
      >
        <option selected>Open this select menu</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Email
      </label>
      <input
        type="email"
        className="form-control"
        id="exampleInputPassword1"
        placeholder="Enter Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Customer Type
      </label>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={(e) => {
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
      <label htmlFor="exampleInputPassword1" className="form-label">
        Additional Information
      </label>
      <input
        type="text"
        className="form-control"
        id="exampleInputPassword1"
        placeholder="Enter Additional Information"
        onChange={(e) => {
          setNote(e.target.value);
        }}
      />
    </div>
<center>
    <button type="submit" className="btn btn-success" style={{ marginTop: "15px" }}>
      <i className="fas fa-save"></i>&nbsp;Register
    </button>
    </center>
  </form>
</div>

    </div>
  )
}
