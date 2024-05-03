import React,{useState,  useEffect } from "react";
import axios from "axios";
import {useHistory } from "react-router-dom";
import Header from '../Dashboard/Header/Header';


export default function CreateDelivery() {

    const [names, setNames] = useState([]);
    const [selectedName, setSelectedName] = useState("");
    const [numbers, setNumbers] = useState("");
    const [selectedNumber, setSelectedNumber] = useState("");
    const [oids, setOids] = useState("");
    const [selectedOid, setSelectedOid] = useState("");
    const [code, setCode] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [status, setStatus] = useState("");
    const [distance, setDistance] = useState(""); // New state for distance
    const [deliveryFee, setDeliveryFee] = useState(0); // Initialize deliveryFee
    const history = useHistory();

    function sendData(a){

      if (distance > 10) {
        const extraDistance = distance - 10;
        const calculatedDeliveryFee = extraDistance * 50;
        setDeliveryFee(calculatedDeliveryFee);
    } else {
        setDeliveryFee(0); // Reset deliveryFee if distance is 10km or less
    }

        a.preventDefault();
        const newDelivery = {

              name: selectedName ,
              number : selectedNumber,
              oid : selectedOid,
              code,
              address,
              date,
              note,
              status,
              distance,
              deliveryFee
          }
      
          axios.post("http://localhost:8070/delivery/save", newDelivery).then(() =>{
              alert("Delivery Record Added")
              history.push("/delivery"); 
              window.location.reload(); 
          }).catch((err)=>{
              alert(err)
          })
      }

      useEffect(() => {
        axios.get("http://localhost:8070/orders")
            .then((response) => {
                const orders = response.data.existingOrder;
                setNames(orders.map((order) => order.name));
                setOids(orders.reduce((acc, order) => {
                    acc[order.name] = order._id; // Store name-ID pairs in an object
                    return acc;
                }, {}));
                setNumbers(orders.reduce((acc1, order) => {
                  acc1[order.name] = order.number; // Store name-Number pairs in an object
                  return acc1;
              }, {}));
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    function handleNameChange(event) {
        const selectedName = event.target.value;
        setSelectedName(selectedName);
        setSelectedOid(oids[selectedName]); // Get the corresponding ID from the object
        setSelectedNumber(numbers[selectedName]);
    }

    useEffect(() => {
        axios.get("http://localhost:8070/orders")
            .then((response) => {
                const orders = response.data.existingOrder;
                const pendingOrders = orders.filter(order => order.send === "Pending");
                const pendingNames = pendingOrders.map((order) => order.name);
                setNames(pendingNames);
                setOids(pendingOrders.reduce((acc, order) => {
                    acc[order.name] = order._id; // Store name-ID pairs in an object
                    return acc;
                }, {}));
                setNumbers(pendingOrders.reduce((acc1, order) => {
                    acc1[order.name] = order.number; // Store name-Number pairs in an object
                    return acc1;
                }, {}));
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

  return (
    <div>
      <Header />

<div className="container" id="createSupplier" >
    <form onSubmit={sendData} style={{ position: "relative",width: "70%" }}>
      <h2 id="AllSupplier">Create New Delivery Records</h2>
      <br></br>

      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" id="supplier">
                            Customer Name
                        </label>
                        <select
                            className="form-control"
                            onChange={handleNameChange}
                            value={selectedName}
                            id="exampleInputPassword1"
                        >
                            <option value="">Select Customer Name</option>
                            {names.map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" id="supplier">
                           Contact Number
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            aria-describedby="emailHelp"
                            value={selectedNumber}
                            disabled
                        />
                    </div>
                        <div className="row">
                        <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" id="supplier">
                            Order ID
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            aria-describedby="emailHelp"
                            value={selectedOid}
                            disabled
                        />
                    </div>
                    

<div className="col">
<div className="mb-3">
<label for="exampleInputEmail1" className="form-label" id='supplier'>Delivery Code</label>
<input type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Delivery Code" 
onChange={(e) =>{

setCode(e.target.value);
}}/>
</div> 
</div>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label" id='supplier'>Address</label>
<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Delivery Address"
onChange={(e) =>{

setAddress(e.target.value);
}}/>
  </div>

<div className="mb-3">
    <label htmlFor="dateInput" className="form-label" id='supplier' >Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date} style={{marginLeft:"3px"}}
    className="form-control"
     onChange={(e) =>
      { setDate(e.target.value);
      }}/>
  </div>


<div className="mb-3">
<label for="exampleInputPassword1" className="form-label" id='supplier'>Additional Information</label>
<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Additional Information"
onChange={(e) =>{

setNote(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label" id='supplier'>Delivery Status</label>
<select
              className="form-select"
              id="exampleInputPassword1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
</select>
</div>

<div className="mb-3">
  <label htmlFor="exampleInputDistance" className="form-label" id='supplier'>Distance (in km)</label>
  <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Distance"
      onChange={(e) => setDistance(parseInt(e.target.value))} />
</div>

<div class="count-display" style={{marginBottom:"2%", width:"70%"}}>
    <label class="count-label" for="exampleInputPassword1" id='supplier'>Delivery Fee:</label>
    <div class="count-value">LKR: {deliveryFee}</div>
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