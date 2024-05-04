import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavBar from '../NavBar/UserNavBar';
import {useHistory, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';


export default function UserCreateOrder() {

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [oid, setOid] = useState("");
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const history = useHistory();
    const [token, setToken] = useState("");
    const location = useLocation();
    const [contactNumberValid, setContactNumberValid] = useState(false);
    

    useEffect(() => {
        console.log("Location state:", location.state);
        const { state } = location;
        if (state && state.oid && state.amount) {
            console.log("Received oid:", state.oid);
            console.log("Received amount:", state.amount);
            setOid(state.oid);
            setAmount(state.amount);
            setTotalAmount(state.amount * quantity); // Update totalAmount based on the received amount
        }
    }, [location, oid, amount, quantity]);
    
    

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

      function sendData(e) {
        e.preventDefault();
    
        // Calculate the total amount
        const calculatedTotalAmount = quantity * amount;
    
        // Display Swal confirmation message
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to confirm this order?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, confirm it',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const newOrder = {
                    name,
                    number,
                    oid,
                    amount,
                    quantity,
                    date,
                    address,
                    note,
                    totalAmount: calculatedTotalAmount,
                }
    
                axios.post("http://localhost:8070/order/save", newOrder, {
                    headers: {
                        Authorization:` Bearer ${token}` // Attach token to request headers
                    }
                })
                .then(() => {
                    // Send email notification
                    const emailSubject = `New Order Added Order ID: ${newOrder._id}`;
                    const emailMessage = `A new Order has been added with name: ${newOrder.name}, Contact Number is ${newOrder.number}, Product Code is ${newOrder.oid} and Amount is ${newOrder.totalAmount}. Delivery Order!!!`;
                    sendEmailNotification(emailSubject, emailMessage);
          
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Your order has been confirmed. Your order will be placed within 3-5 working days. We will contact you!',
                        showConfirmButton: false,
                        timer: 3000 // Display success message for 3 seconds
                    }).then(() => {
                        history.push("/userproduct");
                        window.location.reload();
                    });
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'An error occurred while confirming the order. Please try again.'
                    });
                    console.error(err);
                });
            }
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
        <div id="orderUserContainer">
            <UserNavBar />

            <div className="container" style={{ marginTop: "55px", marginLeft:"23%", maxWidth:"75%" }}>
                <form onSubmit={sendData}>
                    <h2 id='btnAllOrder' style={{ marginLeft:"25%" }}>Order Confirmation  Form</h2>
                    <br></br>


                    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" id="createOrder">Customer Name</label>
    <input 
        type="text" 
        className="form-control" 
        id="exampleInputPassword1" 
        aria-describedby="emailHelp" 
        placeholder="Enter Customer Name"
        pattern="[A-Za-z\s]+"  // Regular expression pattern to allow only letters and spaces
        title="Please enter only letters and spaces"  // Tooltip message
        onChange={(e) => {
            setName(e.target.value);
        }}
    />
    {!/^[A-Za-z\s]+$/.test(name) && (
        <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>Please enter only letters and spaces</p>
    )}
</div>

<div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" id="createOrder">Contact Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Contact Number"
                            pattern="^\d{10}$"  // Regular expression pattern to match a 10-digit number
                            title="Please enter a 10-digit number"  // Tooltip message
                            onChange={(e) => {
                                setNumber(e.target.value);
                                setContactNumberValid(/^\d{10}$/.test(e.target.value));
                            }} />
                        {!contactNumberValid && (
                            <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>Please enter a valid 10-digit number</p>
                        )}
                    </div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id="createOrder" >Product Code</label>
    <input type="text" className="form-control" id="exampleInputPassword1" 
    readOnly
    disabled   // product code can't change
    value={oid}
    onChange={(e) =>{

    setOid(e.target.value);
    }}/>
</div>



<div className="row">
    <div className="col">
<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id="createOrder">Quantity</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
        max={"200"} 
        min={"1"}
        value={quantity}
        onChange={(e) => {
            setQuantity(e.target.value);
            setTotalAmount(e.target.value * amount);
        }}
    />
</div>
</div>

<div className="col">
<div className="mb-3">
    <label htmlFor="dateInput" className="form-label" id="createOrder" >Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date}
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      required/>
  </div>
  </div>

  </div>


<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id="createOrder">Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Address"
   
   onChange={(e) =>{

    setAddress(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id="createOrder">Additional Comments</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Additional Comments"
    onChange={(e) =>{

    setNote(e.target.value);
    }}/>
</div>

<div class="count-display" style={{marginBottom:"2%", width:"70%"}}>
    <label class="count-label" for="exampleInputPassword1" id='supplier'>Total Amount:</label>
    <div class="count-value">LKR: {totalAmount}</div>
</div>




                    <div className="mb-3">
                        <button type="submit" className="btn btn-success" style={{ marginTop: "15px", borderRadius:"20px", marginLeft:"26%", marginBottom:"3%", fontSize:"18px", fontWeight:700 }}>
                            <i className='fas fa-save'></i>
                            &nbsp; Confirm Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}