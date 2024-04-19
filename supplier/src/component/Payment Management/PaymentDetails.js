import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../NavBar/NavBar';
import Header from '../Dashboard/Header/Header';

export default class PaymentDetails extends Component {

    constructor(props){
        super(props)
    
        this.state = {
          payment:{}
        }
      }

      componentDidMount(){
 
        const id = this.props.match.params.id;
    
        axios.get(`http://localhost:8070/payment/${id}`).then((res) =>{
          if(res.data.success){
            this.setState({
              payment:res.data.payment
            })
    
            console.log(this.state.payment)
          }
        })
    
      }
  render() {

    const {customer, address, phone, amount, method, date, _id } = this.state.payment;
    return (

      <div>
        <Header/>
        <div className='container' id="detailsContiner">
          <h4 id="AllPayment" >{customer}</h4>
          <hr/>
      <dl className='row'>
        <dt className='col-sm-3' id="payment">Payment ID</dt>
        <dd className='col-sm-9' id="details" >{_id}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="payment">Customer Name</dt>
        <dd className='col-sm-9' id="details">{customer}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="payment">Address</dt>
        <dd className='col-sm-9' id="details">{address}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="payment">Phone Number</dt>
        <dd className='col-sm-9' id="details">{phone}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="payment">Amount</dt>
        <dd className='col-sm-9' id="details">{amount}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="payment">Payment Method</dt>
        <dd className='col-sm-9' id="details">{method}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="payment">Date</dt>
        <dd className='col-sm-9' id="details">{date}</dd>
        
      </dl>
      

      <div id='backBtnDiv' >
      <button className='btn btn-dark' id='backBtn'><a href='/payment'>
      <i className='fas fa-arrow-left' id='backBtn'></i></a></button>
      </div>
      </div>
      </div>
      
    )
  }
}
