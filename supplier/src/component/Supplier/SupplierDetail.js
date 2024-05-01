import React, { Component } from 'react'
import axios from 'axios'
import Header from '../Dashboard/Header/Header'
import './supplier.css'

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
    const {sid, name, address, product, amount, quantity, date, note,totalAmount, _id, InventoryStatus, PaymentStatus } = this.state.supplier;
    return (
      <div>
         <Header/>
        <div className='container' id="detailsContiner">
          <h4 id="AllSupplier">{name}</h4>
          <hr/>
      <dl className='row'>
        <dt className='col-sm-3' id='supplier'>Supplier Tempory ID</dt>
        <dd className='col-sm-9' id="details">{_id}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Supplier Code</dt>
        <dd className='col-sm-9'id="details">{sid}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Address</dt>
        <dd className='col-sm-9' id="details">{address}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Product Name</dt>
        <dd className='col-sm-9' id="details">{product}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Amount</dt>
        <dd className='col-sm-9' id="details">LKR :{amount}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Quantity</dt>
        <dd className='col-sm-9' id="details">{quantity}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Date</dt>
        <dd className='col-sm-9' id="details">{date}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Additional Note</dt>
        <dd className='col-sm-9' id="details">{note}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Total Amount</dt>
        <dd className='col-sm-9' id="details"> LKR :{totalAmount}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Inventory Status</dt>
        <dd className='col-sm-9' id="details">{InventoryStatus}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Payment Status</dt>
        <dd className='col-sm-9' id="details">{PaymentStatus}</dd>
        
      </dl>
      
       <div id='backBtnDiv' >
      <button className='btn btn-dark' id='backBtn'><a href='/supplier'>
      <i className='fas fa-arrow-left' id='backBtn'></i></a></button>
      </div>
      </div>
      </div>

      
    )
  }
}
