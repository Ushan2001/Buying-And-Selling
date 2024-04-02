import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from '../Dashboard/Header/Header';
import "./supplier.css";

export default function EditOldSupplier(props) {
  const [id, setId] = useState("");
  const [sid, setSid] = useState("");
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const oldSupplierId = props.match.params.id;

    axios.get(`http://localhost:8070/old/supplier/${oldSupplierId}`).then((res) => {
      const Oldsupplier = res.data.Oldsupplier;

      setId(Oldsupplier._id);
      setSid(Oldsupplier.sid);
      setProduct(Oldsupplier.product);
      setAmount(Oldsupplier.amount);
      setQuantity(Oldsupplier.quantity);
      setDate(Oldsupplier.date);
      setNote(Oldsupplier.note);
      setTotalAmount(Oldsupplier.totalAmount);
    });
  }, [props.match.params.id]);

  function sendData(e) {
    e.preventDefault();

    // Calculate the total amount
    const calculatedTotalAmount = quantity * amount;

    const updateOldSupplier = {
      sid,
      product,
      amount,
      quantity,
      date,
      note,
      totalAmount: calculatedTotalAmount,
    };

    axios.put(`http://localhost:8070/old/supplier/update/${id}`, updateOldSupplier).then(() => {
      alert("Existing Supplier Record Updated");
      history.push("/supplier");
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
      <Header />
      <div className="container" id="editContainer">
        <form onSubmit={sendData} style={{ position: "relative", width: "65%" }}>
          <h2 id="AllSupplier">Edit Existing Record</h2>
          <br />
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" id='supplier'>Supplier Code</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              aria-describedby="emailHelp"
              placeholder="Enter Supplier Code"
              readOnly
              defaultValue={sid}
              onChange={(e) => setSid(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" id='supplier'>Product</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" id='supplier'>Amount</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Amount"
              value={amount}
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
                <label htmlFor="exampleInputPassword1" className="form-label" id='supplier'>Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Quantity"
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
                <label htmlFor="dateInput" className="form-label" id='supplier'>Date</label>
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
            <label htmlFor="exampleInputPassword1" className="form-label" id='supplier'>Additional Note</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Additional Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="count-display">
            <label className="count-label" htmlFor="exampleInputPassword1" id='supplier'>Total Amount:</label>
            <div className="count-value">LKR: {totalAmount}</div>
          </div>

          <button type="submit" className="btn btn-success" style={{ marginTop: "15px", borderRadius: "20px" }}>
            <i className="far fa-check-square"></i>
            &nbsp;Update
          </button>
        </form>
      </div>
    </div>
  );
}
