import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../NavBar/NavBar';

export default class OrderDetail extends Component {

    constructor(props){
        super(props)
    
        this.state = {
          order:{}
        }
      }

      componentDidMount(){
 
        const id = this.props.match.params.id;
    
        axios.get(`http://localhost:8070/order/${id}`).then((res) =>{
          if(res.data.success){
            this.setState({
              order:res.data.order
            })
    
            console.log(this.state.order)
          }
        })
    
      }
  render() {

    const {name, number, oid, amount, quantity, date, address, note, totalAmount, send, _id } = this.state.order;

    return (
      <div>
        <NavBar/>
        <div style={{marginTop:"40px"}} className='container'>
          <h4>{name}</h4>
          <hr/>
      <dl className='row'>
      <dt className='col-sm-3'>Tempory Order ID</dt>
        <dd className='col-sm-9'>{_id}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Contact Number</dt>
        <dd className='col-sm-9'>{number}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Product Code</dt>
        <dd className='col-sm-9'>{oid}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Amount</dt>
        <dd className='col-sm-9'>{amount}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Quantity</dt>
        <dd className='col-sm-9'>{quantity}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Date</dt>
        <dd className='col-sm-9'>{date}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Address</dt>
        <dd className='col-sm-9'>{address}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Additional Comments</dt>
        <dd className='col-sm-9'>{note}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Total Amount</dt>
        <dd className='col-sm-9'>{totalAmount}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Delivery</dt>
        <dd className='col-sm-9'>{send}</dd>
        
      </dl>
      </div>

      <div style={{marginLeft:"30px", marginTop:"20px"}}>
      <button className='btn btn-dark'><a href='/order' style={{textDecoration:"none", color:"white"}}>
      <i className='fas fa-arrow-left'></i></a></button>
      </div>
      </div>
    )
  }
}
