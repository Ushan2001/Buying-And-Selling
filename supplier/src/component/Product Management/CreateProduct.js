import React,{useState, useEffect} from "react";
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import {useHistory } from "react-router-dom";

export default function CreateProduct() {
    
    const [pid, setPid] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
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
  
        document.getElementById('dateInput').setAttribute('max', maxDate);
           }, []);
  return (
    <div>
        <NavBar/>

<div className="container" style={{ marginTop:"55px"}}>
    <form onSubmit={sendData}>
      <h2>Create Inventory Records</h2>
      <br></br>

      <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Product Code</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Code" 
    onChange={(e) =>{

    setPid(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Product Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Name" 
    onChange={(e) =>{

    setName(e.target.value);
    }}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Product Category</label>
<select className="form-select" aria-label="Default select example" 
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
    <label for="exampleInputPassword1" className="form-label">Description</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Description"
    
    onChange={(e) =>{

    setDescription(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Price</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Price"
    min={"1"}
    onChange={(e) =>{

    setPrice(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Quantity</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
    min={"1"}  max={"200"}
    onChange={(e) =>{

    setQuantity(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label htmlFor="dateInput" className="form-label">Add Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date}
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      required/>
  </div>

  <div className="mb-3">
  <label htmlFor="image" className="form-label">Image</label>
    <input type="file" className="form-control" id="image" accept="image/*"
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
