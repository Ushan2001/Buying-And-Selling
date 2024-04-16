import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavBar from '../NavBar/UserNavBar';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';


export default function UserCreateOrder() {

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [oid, setOid] = useState("PID");
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [send, setSend] = useState("Pending");
    const history = useHistory();
    const [token, setToken] = useState("");

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
                    send
                }
    
                axios.post("http://localhost:8070/order/save", newOrder, {
                    headers: {
                        Authorization: `Bearer ${token}` // Attach token to request headers
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
        <div>
            <UserNavBar />

            <div className="container" style={{ marginTop: "55px" }}>
                <form onSubmit={sendData}>
                    <h2>Order Confirm Form</h2>
                    <br></br>


<div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Customer Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Customer Name" 
    onChange={(e) =>{

    setName(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Contact Number</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Contact Number"
    pattern="^\d{10}$"

    onChange={(e) =>{

    setNumber(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" >Product Code</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="check the product details page enter valid product code"
    value={oid}
    onChange={(e) =>{

    setOid(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Amount</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Amount"
        min={"1"}
        onChange={(e) => {
            setAmount(e.target.value);
            setTotalAmount(e.target.value * quantity);
        }}
    />
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Quantity</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
        max={"200"} min={"1"}
        onChange={(e) => {
            setQuantity(e.target.value);
            setTotalAmount(e.target.value * amount);
        }}
    />
</div>
 
<div className="mb-3" style={{marginLeft:"23%"}}>
    <label htmlFor="dateInput" className="form-label" style={{marginLeft:"-30%"}} >Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date}
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      />
  </div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Address"
   
   onChange={(e) =>{

    setAddress(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Additional Comments</label>
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
    <label for="exampleInputPassword1" className="form-label">Deliver</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Yes or No"
    value={send}
    disabled
    onChange={(e) =>{

    setSend(e.target.value);
    }}/>
</div>


                    <div className="mb-3">
                        <button type="submit" className="btn btn-success" style={{ marginTop: "15px" }}>
                            <i className='fas fa-save'></i>
                            &nbsp; Confirm Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
