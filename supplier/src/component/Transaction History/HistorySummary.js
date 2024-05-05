import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

export default function HistorySummary() {

  const [sid, setSid] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const history = useHistory();

  function sendData(e) {
    e.preventDefault();

    const newHistory = {
      sid,
      date,
      item: selectedItem
    };

    axios.post("http://localhost:8070/history/summary/save", newHistory)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Summary Record Added',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }).then(() => {
          history.push("/history");
          window.location.reload();
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message // Display the error message from the server
        });
      });
  }

  useEffect(() => {
    axios.get("http://localhost:8070/products")
      .then((response) => {
        setItems(response.data.existingProduct.map((product) => product.pid));
      })
      .catch((error) => {
        console.error("Error fetching supplier data:", error);
      });
  }, []);

  useEffect(() => {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');
    var maxDate = `${year}-${month}-${day}`;
    document.getElementById('dateInput').setAttribute('max', maxDate);
  }, []);

  return (
    <div>
      <div>
        <form onSubmit={sendData}>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" id='supplier'>Summary Code</label>
            <input type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Summary Code"
              onChange={(e) => {
                setSid(e.target.value);
              }} />
          </div>

          <div className="mb-3">
            <label htmlFor="dateInput" className="form-label" id='supplier'>Date</label>
            <input type="date" id="dateInput" name="date" max={""} value={date} style={{ marginLeft: "3px" }}
              className="form-control"
              onChange={(e) => setDate(e.target.value)}
              required />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" id="supplier">Product Code</label>
            <select
              className="form-control"
              onChange={(e) => setSelectedItem(e.target.value)}
              value={selectedItem}
              id="exampleInputPassword1"
            >
              <option value="">Select Product Code</option>
              {items.map((pid) => (
                <option key={pid} value={pid}>
                  {pid}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-success" style={{ marginTop: "15px" }}>
            <i className="bi bi-send"></i>
            &nbsp; Send
          </button>
        </form>
      </div>
    </div>
  );
}
