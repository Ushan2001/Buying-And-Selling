import React, { Component } from 'react'
import axios from 'axios'
import Header from '../Dashboard/Header/Header'
import './supplier.css'

export default class OldSupplierDetail extends Component {

    constructor(props){
        super(props)
    
        this.state = {
          Oldsupplier:{}
        }
      }

      componentDidMount(){
 
        const id = this.props.match.params.id;
    
        axios.get(`http://localhost:8070/old/supplier/${id}`).then((res) =>{
          if(res.data.success){
            this.setState({
              oldsupplier:res.data.oldsupplier
            })
    
            console.log(this.state.oldsupplier)
          }
        })
    
      }
    

  render() {
    const {sid,product, amount, quantity, date, note,totalAmount, _id } = this.state.oldsupplier;
    return (
      <div>
         <Header/>
        <div className='container' id="detailsContiner">
          <h4 id="AllSupplier">{sid}</h4>
          <hr/>
      <dl className='row'>
        <dt className='col-sm-3' id='supplier'>Supplier Tempory ID</dt>
        <dd className='col-sm-9' id="details">{_id}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Product Name</dt>
        <dd className='col-sm-9' id="details">{product}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Amount</dt>
        <dd className='col-sm-9' id="details">{amount}</dd>
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
        <dd className='col-sm-9' id="details">{totalAmount}</dd>
        
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

