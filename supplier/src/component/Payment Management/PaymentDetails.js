import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../NavBar/NavBar';

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
        <div>
        <NavBar/>
        <div style={{marginTop:"40px"}} className='container'>
          <h4>{customer}</h4>
          <hr/>
      <dl className='row'>
        <dt className='col-sm-3'>Payment ID</dt>
        <dd className='col-sm-9'>{_id}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Customer Name</dt>
        <dd className='col-sm-9'>{customer}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Address</dt>
        <dd className='col-sm-9'>{address}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Phone Number</dt>
        <dd className='col-sm-9'>{phone}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Amount</dt>
        <dd className='col-sm-9'>{amount}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Payment Method</dt>
        <dd className='col-sm-9'>{method}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Date</dt>
        <dd className='col-sm-9'>{date}</dd>
        
      </dl>
      </div>

      <div style={{marginLeft:"30px", marginTop:"20px"}}>
      <button className='btn btn-dark'><a href='/payment' style={{textDecoration:"none", color:"white"}}>
      <i className='fas fa-arrow-left'></i></a></button>
      </div>
      </div>
      </div>
    )
  }
}
