import React, { useState, useEffect } from "react";
import axios from "axios";
import {useHistory } from "react-router-dom"
import NavBar from '../NavBar/NavBar';

export default function EditProduct(props) {

    const [id, setId] = useState("");
    const [pid, setPid] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
    const history = useHistory();

    useEffect(() => {
        const productId = props.match.params.id;

        axios.get(`http://localhost:8070/product/${productId}`).then((res) => {
      const product = res.data.product;

      setId(product._id);
      setPid(product.pid);
      setName(product.name);
      setType(product.type);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setDate(product.date);  
    });
  }, [props.match.params.id]);

  function sendData(e) {
    e.preventDefault();

    const updateProduct = {
      
      pid,
      name,
      type,
      description,
      price,
      quantity,
      date 
    };

    axios.put(`http://localhost:8070/product/update/${id}`, updateProduct).then(() => {
        alert("Product Record Updated");
        history.push("/product"); 
        window.location.reload(); 
      }).catch((err) => {
        alert(err);
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
       <NavBar/>
<div className="container" style={{ marginTop:"63px"}}>
      <form onSubmit={sendData}>
        <h2>Edit Inventory Record</h2>
        <br></br>

        <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Product Code</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Code" 
    value={pid}
    readOnly
    onChange={(e) =>{

    setPid(e.target.value);
    }}/>
</div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Product Category</label>
<select className="form-select" aria-label="Default select example" 
value={type}
  onChange={(e) =>{

    setType(e.target.value);
    }}
>
  <option selected>Open this select menu</option>
  <option value="Electronics">Electronics</option>
  <option value="Clothing and Apparel">Clothing and Apparel</option>
  <option value="Home and Furniture">Home and Furniture</option>
  <option value="Books and Media">Books and Media</option>
  <option value="Sports and Outdoors">Sports and Outdoors</option>
</select>
</div>


        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Price"
            min={"1"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Quantity"
            min={"1"}
            max={"200"}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dateInput" className="form-label">Add Date</label>
          <input type="date" id="dateInput" name="date" max={""} value={date}
            className="form-control"
            onChange={(e) => setDate(e.target.value)}
      required/>
  </div>
        <button type="submit" className="btn btn-success" style={{ marginTop: "15px" }}>
          <i className="far fa-check-square"></i>
          &nbsp;Update
        </button>
      </form>
    </div>
    </div>
  )
}

