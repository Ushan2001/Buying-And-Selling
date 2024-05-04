import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../Dashboard/Header/Header";
import "./discount.css";

export default function EditDiscount(props) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [pdiscount, setDiscount] = useState("");
    const [price, setPrice] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [note, setNote] = useState("");
    const history = useHistory();

    useEffect(() => {
        const discountId = props.match.params.id;

        axios.get(`http://localhost:8070/discount/${discountId}`).then((res) => {
            const discount = res.data.discount;

            setId(discount._id);
            setName(discount.name);
            setCategory(discount.category);
            setDiscount(discount.pdiscount);
            setPrice(discount.price);
            setNewPrice(discount.newPrice); // Update newPrice state
            setDate(discount.date);
            setTime(discount.time);
            setNote(discount.note);
        });
    }, [props.match.params.id]);

    function calculateNewPrice(price, pdiscount) {
        const discountPercentage = parseFloat(pdiscount) / 100;
        const newPrice = parseFloat(price) - (parseFloat(price) * discountPercentage);
        return newPrice.toFixed(2);
    }

    function sendData(e) {
        e.preventDefault();

        const updatedNewPrice = calculateNewPrice(price, pdiscount);

        const updateDiscount = {
            name,
            category,
            pdiscount,
            price,
            newPrice: updatedNewPrice, // Include the updated new price in the object
            date,
            time,
            note,
        };

        axios.put(`http://localhost:8070/discount/update/${id}`, updateDiscount).then(() => {
            alert("Discount Record Updated");
            history.push("/discount");
            window.location.reload();
        }).catch((err) => {
            alert(err);
        });
    }

    useEffect(() => {
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        var day = currentDate.getDate().toString().padStart(2, '0');
        var formattedDate = `${year}-${month}-${day}`;
        document.getElementById('dateInput').setAttribute('min', formattedDate);
    }, []);

    return (
        <div>
            <Header />
            <div className="container" id="editContainer">
                <form onSubmit={sendData}>
                    <h2 id="AllSupplier">Edit Discount Records</h2>
                    <br></br>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" id='supplier' className="form-label">Product ID</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" id='supplier' className="form-label">Product Category</label>
                        <select className="form-select" id="exampleInputPassword1" aria-label="Default select example"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing and Apparel">Clothing and Apparel</option>
                            <option value="Home and Furniture">Home and Furniture</option>
                            <option value="Books and Media">Books and Media</option>
                            <option value="Sports and Outdoors">Sports and Outdoors</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" id='supplier' className="form-label">Discount</label>
                        <select className="form-select" id="exampleInputPassword1" aria-label="Default select example"
                            value={pdiscount}
                            onChange={(e) => setDiscount(e.target.value)}
                        >
                            <option value="">Select Discount</option>
                            <option value="2">2%</option>
                            <option value="5">5%</option>
                            <option value="8">8%</option>
                            <option value="10">10%</option>
                            <option value="25">25%</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" id='supplier' className="form-label">Price</label>
                        <input type="number" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" id='supplier' className="form-label">New Price</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter New Price"
                            value={newPrice} // Display the calculated new price
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dateInput" id='supplier' className="form-label">Start Date</label>
                        <input type="date" style={{ marginLeft: "0px" }} id="dateInput" name="date" max={""} value={date}
                            className="form-control"
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" id='supplier' className="form-label">Time Duration</label>
                        <select className="form-select" id="exampleInputPassword1" aria-label="Default select example"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        >
                            <option value="">Select Time Duration</option>
                            <option value="1 Day">1 Day</option>
                            <option value="3 Day">3 Day</option>
                            <option value="1 Week">1 Week</option>
                            <option value="3 Week">3 Week</option>
                            <option value="1 Month">1 Month</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" id='supplier' className="form-label">Additional Comment</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Enter Additional Comment"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-success" style={{ marginTop: "15px" }}>
                        <i className="far fa-check-square"></i>
                        &nbsp;Update
                    </button>
                </form>
            </div>
        </div>
    );
}
