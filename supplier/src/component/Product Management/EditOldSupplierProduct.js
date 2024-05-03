import React, { useState, useEffect } from "react";
import axios from "axios";
import {useHistory } from "react-router-dom"
import Header from '../Dashboard/Header/Header'
import Swal from 'sweetalert2';

export default function EditOldSupplierProduct(props) {

    const [id, setId] = useState("");
    const [InventoryStatus, setStatus] = useState("");
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

    useEffect(() => {
        const oldSupplierId = props.match.params.id;

        axios.get(`http://localhost:8070/old/supplier/${oldSupplierId}`).then((res) => {
      const Oldsupplier = res.data.Oldsupplier;

      setId(Oldsupplier._id);
      setStatus(Oldsupplier.InventoryStatus) 
    });
  }, [props.match.params.id]);

  function sendData(e) {
    e.preventDefault();
  
    
  
    const updateOldSupplier = {
      InventoryStatus
    };
  
    axios.put(`http://localhost:8070/old/supplier/update/${id}`, updateOldSupplier,{
      headers: {
        Authorization: `Bearer ${token}` // Attach token to request headers
      }
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Supplier Record Updated',
          text: 'Supplier record has been successfully updated!',
          showConfirmButton: true,
          confirmButtonText: 'Go to Request Product'
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/RequestedProduct");
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Cannot update.'
        });
        console.error(err);
      });
  }
  
  return (
    <div>
       <Header/>
<div className="container" id="editContainer">
      <form onSubmit={sendData} style={{position:"relative", width:"65%"}}>
        <h2 id="AllSupplier">Update Inventory Status</h2>
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
  <option value="Updated">Updated</option>
 
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
