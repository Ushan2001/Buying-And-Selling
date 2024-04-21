import React,{useState, useEffect} from "react";
import axios from "axios";
import {useHistory } from "react-router-dom";
import Header from "../Dashboard/Header/Header";

export default function CreateProduct() {
    
    const [pid, setPid] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
    const [contact, setContact] = useState("");
    const [sname, setSname] = useState("");
    const [image, setImage] = useState(null);
    const history = useHistory();

    function sendData(a){

        a.preventDefault();
         
        const formData = new FormData();
        formData.append("pid", pid);
        formData.append("name", name);
        formData.append("type", type);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity",quantity);
        formData.append("date",date);
        formData.append("contact", contact);
        formData.append("sname", sname);
        formData.append("image", image);
      
          axios.post("http://localhost:8070/product/save", formData).then(() =>{
              alert("Inventory Record Added")
              history.push("/product"); 
              window.location.reload(); 
          }).catch((err)=>{
              alert(err)
          })

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
        <Header/>

<div className='container' id="productContainer">
    <form onSubmit={sendData} style={{ position: "relative", width: "65%" }}>
      <h2>Add Products To Inventory</h2>
      <br></br>

      <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label" id="product">Product Code</label>
    <input  type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Product Code" 
    onChange={(e) =>{

    setPid(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputEmail1" className="form-label" id="product">Product Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Product Name" 
    onChange={(e) =>{

    setName(e.target.value);
    }}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label" id="product">Product Category</label>
<select id="exampleInputPassword1" className="form-select" aria-label="Default select example" 
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
    <label for="exampleInputPassword1" className="form-label" id="product">Description</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Description"
    
    onChange={(e) =>{

    setDescription(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id="product">Price</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Price"
    min={"1"}
    onChange={(e) =>{

    setPrice(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id="product">Quantity</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
    min={"1"}  max={"200"}
    onChange={(e) =>{

    setQuantity(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label htmlFor="dateInput" className="form-label" id="product">Add Date</label>
    <input style={{ marginLeft:"0px"}} type="date" id="dateInput" name="date" max={""} value={date}
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      required/>
  </div>

  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id="product">Your Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Your Name"
    
    onChange={(e) =>{

    setSname(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id="product">Contact Number</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter your Contact Number"
       pattern="^\d{10}$"
    onChange={(e) =>{

    setContact(e.target.value);
    }}/>
</div>

  <div className="mb-3">
  <label htmlFor="image" className="form-label" id="product">Image</label>
    <input id="exampleInputPassword1" type="file" className="form-control"  accept="image/*"
     onChange={(e) => {
     setImage(e.target.files[0]);
    }}/>
    </div>

<button type="submit" className="btn btn-success" style={{marginTop:"15px"}}>
    <i className='fas fa-save'></i>
    &nbsp; Save
</button>
</form>
</div>
      
    </div>
  )
}
