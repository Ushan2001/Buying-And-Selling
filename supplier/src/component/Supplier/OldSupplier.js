import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./supplier.css";
import Header from "../Dashboard/Header/Header";
import Swal from 'sweetalert2';

export default function OldSupplier() {

  //verify JWT token
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


  function sendEmailNotification(subject, message) {
    axios.post("http://localhost:8070/send-email", { subject, message })
      .then((response) => {
        console.log("Email notification sent:", response.data);
      })
      .catch((error) => {
        console.error("Error sending email notification:", error);
      });
  }


  const [sids, setSids] = useState([]);
  const [selectedSid, setSelectedSid] = useState("");
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const history = useHistory();
  const [token, setToken] = useState("");
  

  function sendData(e) {
    e.preventDefault();
  
    // Calculate the total amount
    const calculatedTotalAmount = quantity * amount;
  
    const newSupplier = {
      sid: selectedSid,
      product,
      amount,
      quantity,
      date,
      note,
      totalAmount: calculatedTotalAmount, // Add this line
    };
  
    axios.post("http://localhost:8070/old/supplier/save", newSupplier, {
      headers: {
        Authorization: `Bearer ${token}` // Attach token to request headers
      }
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Supplier Record Added',
          text: 'Supplier record has been successfully added!',
          showConfirmButton: true,
          confirmButtonText: 'Go to Supplier List'
        }).then((result) => {
          if (result.isConfirmed) {
            // Send email notification
            const emailSubject = 'New Product Added';
            const emailMessage = `A new Product has been added with ID: ${newSupplier.sid}, Product Name is ${newSupplier.product}, Quantity is ${newSupplier.quantity} and Amount is ${newSupplier.amount}. Update Inventory!!!`;
            sendEmailNotification(emailSubject, emailMessage);
  
            history.push("/supplier");
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while adding the supplier record. Please try again.'
        });
        console.error(err);
      });
  }
  
  useEffect(() => {
    axios.get("http://localhost:8070/supplier").then((response) => {
      setSids(response.data.existingSupplier.map((supplier) => supplier.sid));
    });
  }, []);

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

      <div className="container" id="createSupplier">
        <form
          onSubmit={sendData}
          style={{ position: "relative", width: "65%" }}
        >
          <h2 id="AllSupplier">Add Old Supplier</h2>
          <br></br>
          
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
              id="supplier"
            >
              Supplier Code
            </label>
            <select
              className="form-control"
              onChange={(e) => setSelectedSid(e.target.value)}
              value={selectedSid}
              id="exampleInputPassword1"
            >
              <option value="">Select Supplier Code</option>
              {sids.map((sid) => (
                <option key={sid} value={sid}>
                  {sid}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
              id="supplier"
            >
              Product
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Product Name"
              onChange={(e) => {
                setProduct(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
              id="supplier"
            >
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Amount"
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
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label"
                  id="supplier"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Quantity"
                 
                  min={"1"}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setTotalAmount(e.target.value * amount);
                  }}
                />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label
                  htmlFor="dateInput"
                  className="form-label"
                  id="supplier"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="dateInput"
                  name="date"
                  max={""}
                  value={date}
                  className="form-control"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
              id="supplier"
            >
              Additional Note
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Additional Note"
              pattern="[A-Za-z\s]+" 
              title="Please enter only letters and spaces"
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
             {!/^[A-Za-z\s]+$/.test(note) && (
        <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>Please enter only letters and spaces</p>)}
          </div>

          <div className="count-display">
            <label
              className="count-label"
              htmlFor="exampleInputPassword1"
              id="supplier"
            >
              Total Amount:
            </label>
            <div className="count-value">LKR: {totalAmount}</div>
          </div>

          <button
            type="submit"
            className="btn btn-success"
            style={{ marginTop: "15px", borderRadius: "20px" }}
          >
            <i className="fas fa-save"></i>
            &nbsp; Save
          </button>
        </form>
      </div>
    </div>
  );
}
