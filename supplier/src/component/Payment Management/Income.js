import React, { Component } from 'react';
import axios from 'axios';
import Header from "../Dashboard/Header/Header";
import "./payment.css"


export default class Income extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalAmount: 0,
    };
  }

  componentDidMount() {
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    axios.get('http://localhost:8070/payments').then((res) => {
      if (res.data.success) {
        const payments = res.data.existingPayment;
        let total = 0;
        payments.forEach((payment) => {
          total += parseFloat(payment.amount);
        });
        this.setState({ totalAmount: total });
      }
    }).catch((error) => console.error(error));
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container" id="createPayment">
          <h1>Total Income</h1>
          <p>Total Amount: RS.{this.state.totalAmount.toFixed(2)}</p>
        </div>
      </div>
    );
  }
}