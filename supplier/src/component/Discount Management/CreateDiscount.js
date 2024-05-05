import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../Dashboard/Header/Header";
import "./discount.css";

export default function CreateDiscount() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [pdiscount, setDiscount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const history = useHistory();

  function calculateNewPrice() {
    const discountAmount = parseFloat(price) * (parseFloat(pdiscount) / 100);
    const discountedPrice = parseFloat(price) - discountAmount;
    setNewPrice(discountedPrice.toFixed(2));
  }

  function sendData(e) {
    e.preventDefault();
    const newDiscount = {
      name,
      category,
      price,sendData,
      pdiscount,
      date,
      time,
      note,
      newPrice,
    };

    axios.post("http://localhost:8070/discount/save", newDiscount)
      .then(() => {
        alert("Discount Added");
        history.push("/discount");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    if (price !== "" && pdiscount !== "") {
      calculateNewPrice();
    }
  });

  return (
    <div>
      <Header />
      <div className="container" id="createDis">
        <form onSubmit={sendData} style={{ position: "relative", width: "65%" }}>
          <h2 id="AllDis">New Discount Records</h2>
          <br></br>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label" id="dis">Product ID</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              aria-describedby="emailHelp"
              placeholder="Enter Product ID"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" id="dis">Product Category</label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="exampleInputPassword1"
              onChange={(e) => setCategory(e.target.value)}
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
            <label htmlFor="exampleInputPassword1" className="form-label" id="dis">Product Price</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" id="dis">Discount</label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="exampleInputPassword1"
              onChange={(e) => setDiscount(e.target.value)}
            >
              <option selected>Open this select menu</option>
              <option value="2">2%</option>
              <option value="5">5%</option>
              <option value="8">8%</option>
              <option value="10">10%</option>
              <option value="25">25%</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="dateInput" className="form-label" id="dis">Start Date</label>
            <input
              style={{ marginLeft: "0px" }}
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

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" id="dis">Time Duration</label>
            <select
              className="form-select"
              id="exampleInputPassword1"
              aria-label="Default select example"
              onChange={(e) => setTime(e.target.value)}
            >
              <option selected>Open this select menu</option>
              <option value="1 Day">1 Day</option>
              <option value="3 Day">3 Day</option>
              <option value="1 Week">1 Week</option>
              <option value="3 Week">3 Week</option>
              <option value="1 Month">1 Month</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label" id="dis">Additional Comment</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              aria-describedby="emailHelp"
              placeholder="Enter Additional Comment"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" id="dis">New Price After Discount</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={newPrice}
              disabled
            />
          </div>

          <button type="submit" className="btn btn-success" style={{ marginTop: "15px" }}>
            <i className='fas fa-save'></i>
            &nbsp; Save
          </button>
        </form>
      </div>
    </div>
  );
}
