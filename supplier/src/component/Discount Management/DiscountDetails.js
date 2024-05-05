import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Dashboard/Header/Header';

export default class DiscountDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discount: {}
        };
    }
    
    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8070/discount/${id}`).then((res) => {
            if (res.data.success) {
                const discount = res.data.discount;
                const newPrice = this.calculateNewPrice(discount.price, discount.pdiscount);

                this.setState({
                    discount: {
                        ...discount,
                        newPrice: newPrice.toFixed(2) // Set newPrice in the state
                    }
                });
            }
        });
    }

    calculateNewPrice(price, pdiscount) {
        const discountPercentage = parseFloat(pdiscount) / 100;
        const discountedAmount = parseFloat(price) * discountPercentage;
        const newPrice = parseFloat(price) - discountedAmount;
        return newPrice;
    }

    render() {
        const { name, category, pdiscount, date, time, note, _id, price, newPrice } = this.state.discount;

        return (
            <div>
                <Header />
                <div className="container" id="editContainer">
                    <h4>{name}</h4>
                    <hr />
                    <dl className='row'>
                        <dt className='col-sm-3' id="supplier">Discount Tempory ID</dt>
                        <dd className='col-sm-9' id="details">{_id}</dd>
                        <br></br><br></br>
                        <dt className='col-sm-3' id="supplier">Category</dt>
                        <dd className='col-sm-9' id="details">{category}</dd>
                        <br></br><br></br>
                        <dt className='col-sm-3' id="supplier">Discount%</dt>
                        <dd className='col-sm-9' id="details">{pdiscount}</dd>
                        <br></br><br></br>
                        <dt className='col-sm-3' id="supplier">Price(Rs:)</dt>
                        <dd className='col-sm-9' id="details">{price}</dd>
                        <br></br><br></br>
                        <dt className='col-sm-3' id="supplier">New Price(Rs:)</dt>
                        <dd className='col-sm-9' id="details">{newPrice}</dd>
                        <br></br><br></br>
                        <dt className='col-sm-3' id="supplier">Start Date</dt>
                        <dd className='col-sm-9' id="details">{date}</dd>
                        <br></br><br></br>
                        <dt className='col-sm-3' id="supplier">Time Duration</dt>
                        <dd className='col-sm-9' id="details">{time}</dd>
                        <br></br><br></br>
                        <dt className='col-sm-3' id="supplier">Additional Comment</dt>
                        <dd className='col-sm-9' id="details">{note}</dd>
                    </dl>
                </div>

                <div style={{ marginLeft: "30px", marginTop: "20px" }}>
                    <button className='btn btn-dark'>
                        <a href='/discount' style={{ textDecoration: "none", color: "white" }}>
                            <i className='fas fa-arrow-left'></i>
                        </a>
                    </button>
                </div>
            </div>
        );
    }
}
