import React,{useState } from "react";
import axios from "axios";
import {useHistory } from "react-router-dom";
import UserNavBar from '../NavBar/UserNavBar';
import Swal from 'sweetalert2';
import "./customer.css"

export default function UserCreateCustomer() {

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [ctype, setCtype] = useState("");
    const [note, setNote] = useState("");
    const history = useHistory();

    function sendData(a) {
      a.preventDefault();
      const newCustomer = {
          name,
          number,
          address,
          gender,
          email,
          ctype,
          note
      };
  
      axios.post("http://localhost:8070/customer/save", newCustomer)
          .then(() => {
              Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'You Are Successfully Add Our System!!!',
                  showConfirmButton: false,
                  timer: 2000 // Display success message for 2 seconds
              }).then(() => {
                  history.push("/userHome");
                  setTimeout(() => {
                      window.location.reload();
                  }, 1000); // Adjust the delay as needed
              });
          })
          .catch((err) => {
              Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: 'An error occurred while saving the customer. Please try again.',
              });
              console.error(err);
          });
  }
  
  return (
    <div style={{backgroundImage: "url('/images/form.jpg')", backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
       <UserNavBar/>

       <div className="container" style={{ marginTop: "55px", marginLeft: "20%"}}>

  <form onSubmit={sendData}>
    
    <h2  id="register">Register Here!</h2>
    
    <br />

    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label" id="rashini">
        Customer Name
      </label>
      <input
        type="text"
        className="form-control"
        id="exampleInputPassword1"
        aria-describedby="emailHelp"
        placeholder="Enter Customer Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label" id="rashini">
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
      <label htmlFor="exampleInputPassword1" className="form-label" id="rashini">
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
      <label htmlFor="exampleInputPassword1" className="form-label" id="rashini">
        Gender
      </label>
      <select
        className="form-select"
        id="exampleInputPassword1"
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
      <label htmlFor="exampleInputPassword1" className="form-label" id="rashini">
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
      <label htmlFor="exampleInputPassword1" className="form-label" id="rashini">
        Customer Type
      </label>
      <select
        className="form-select"
        id="exampleInputPassword1"
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
      <label htmlFor="exampleInputPassword1" className="form-label" id="rashini">
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
    <button type="submit" className="btn btn-success" style={{ marginTop: "15px", marginLeft:"-30%", marginBottom:"3%" }}>
      <i className="fas fa-save"></i>&nbsp;Register
    </button>
    </center>
  </form>
</div>

    </div>
  )
}
