import React, { Component } from 'react';
import axios from 'axios';
import Header from "../Dashboard/Header/Header";
import "./payment.css"

export default class Income extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalAmount: 0,
      previousMonthAmount: 0,
      comparisonResult: '',
    };
  }

  componentDidMount() {
    this.calculateTotalAmount();
    this.fetchIncomeData('currentMonth');
    this.fetchIncomeData('previousMonth');
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

  fetchIncomeData(timePeriod) {
    axios.get('http://localhost:8070/payments').then((res) => {
      if (res.data.success) {
        const payments = res.data.existingPayment;
        let total = 0;
        payments.forEach((payment) => {
          const paymentDate = new Date(payment.date);
          const month = paymentDate.getMonth();
          const year = paymentDate.getFullYear();
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();
          const currentYear = currentDate.getFullYear();

          if ((timePeriod === 'currentMonth' && month === currentMonth && year === currentYear) ||
            (timePeriod === 'previousMonth' && month === currentMonth - 1 && year === currentYear)) {
            total += parseFloat(payment.amount);
          }
        });
        if (timePeriod === 'currentMonth') {
          this.setState({ totalAmount: total });
        } else if (timePeriod === 'previousMonth') {
          this.setState({ previousMonthAmount: total });
        }
      }
    }).catch((error) => console.error(error));
  }

  compareIncome() {
    const { totalAmount, previousMonthAmount } = this.state;
    if (totalAmount > previousMonthAmount) {
      this.setState({ comparisonResult: 'Income increased compared to the previous month.' });
    } else if (totalAmount < previousMonthAmount) {
      this.setState({ comparisonResult: 'Income decreased compared to the previous month.' });
    } else {
      this.setState({ comparisonResult: 'Income remained the same compared to the previous month.' });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container" id="createPayment">
          <div id='incomeview'>
            <h1 id='totincome'>$ Total Income </h1>&nbsp;
            <h3 id='rs'>Total Amount  :RS.{this.state.totalAmount.toFixed(2)}</h3>

            <h3 id='rs1'>Previous Monthly Income: RS.{this.state.previousMonthAmount.toFixed(2)}</h3>
            <button id='comparebtn' onClick={() => this.compareIncome()}>Compare Income</button>
            <p id='compareResult'>{this.state.comparisonResult}</p>
          </div>
        </div>
      </div>
    );
  }
}