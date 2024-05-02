import React, { useState, useEffect } from "react";
import axios from "axios";
import {useHistory } from "react-router-dom"
import Header from "../Dashboard/Header/Header"
import Swal from 'sweetalert2';

export default function EditInventoryOrders(props) {

    const [id, setId] = useState("");
    const[requestOrderStatus, setStatus]=useState("");
    const history = useHistory();
    const [token, setToken] = useState("");



    //verify JWT Token
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

    useEffect(() => {
        const orderId = props.match.params.id;

        axios.get(`http://localhost:8070/order/${orderId}`).then((res) => {
      const order = res.data.order;

      setId(order._id);
      setStatus(order.requesteOrderStatus)
      
    });
  }, [props.match.params.id]);

  function sendData(e) {
   
  
    e.preventDefault();
  
    const updateOrder = {
     requestOrderStatus
    };
  
    axios.put(`http://localhost:8070/order/update/${id}`, updateOrder, {
      headers: {
        Authorization: `Bearer ${token}` // Attach token to request headers
      }
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Order Record Updated',
          text: 'Order record has been successfully updated!',
          showConfirmButton: true,
          confirmButtonText: 'Go to Order list'
        }).then(() => {
          history.push("/inventory/requeste/order");
          window.location.reload();
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the order record. Please try again.'
        });
        console.error(err);
      });
  }

  


  return (
    <div>
      
      <Header/>
<div className="container" id="editOrderContainer">
      <form onSubmit={sendData}>
        <h2 id='btnAllOrder'>Edit Order Record</h2>
        <br></br>
        <div className="row">
            <div className="col-md-4">
        <div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Inventory Status</label>
<select className="form-select" aria-label="Default select example"  id="exampleInputPassword1"
  onChange={(e) =>{

    setStatus(e.target.value);
    }}
>
  <option selected>Open this select menu</option>
  <option value="Recived">Recived</option>
 
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
