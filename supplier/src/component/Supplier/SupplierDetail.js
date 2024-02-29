import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../NavBar/NavBar';

export default class SupplierDetail extends Component {

    constructor(props){
        super(props)
    
        this.state = {
          supplier:{}
        }
      }

      componentDidMount(){
 
        const id = this.props.match.params.id;
    
        axios.get(`http://localhost:8070/supplier/${id}`).then((res) =>{
          if(res.data.success){
            this.setState({
              supplier:res.data.supplier
            })
    
            console.log(this.state.supplier)
          }
        })
    
      }
    

  render() {
    const {sid, name, address, product, amount, quantity, date, note,totalAmount, _id } = this.state.supplier;
    return (
      <div>
        <NavBar/>
        <div style={{marginTop:"40px"}} className='container'>
          <h4>{name}</h4>
          <hr/>
      <dl className='row'>
        <dt className='col-sm-3'>Supplier Tempory ID</dt>
        <dd className='col-sm-9'>{_id}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Supplier Code</dt>
        <dd className='col-sm-9'>{sid}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Address</dt>
        <dd className='col-sm-9'>{address}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Product Name</dt>
        <dd className='col-sm-9'>{product}</dd>
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
        <dt className='col-sm-3'>Additional Note</dt>
        <dd className='col-sm-9'>{note}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Total Amount</dt>
        <dd className='col-sm-9'>{totalAmount}</dd>
        
      </dl>
      </div>
       <div style={{marginLeft:"30px", marginTop:"20px"}}>
      <button className='btn btn-dark'><a href='/supplier' style={{textDecoration:"none", color:"white"}}>
      <i className='fas fa-arrow-left'></i></a></button>
      </div>
      </div>

      
    )
  }
}
