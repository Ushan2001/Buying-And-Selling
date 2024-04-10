import React, { Component } from 'react'
import axios from 'axios'
import Header from '../Dashboard/Header/Header'
import './supplier.css'

export default class DeliveryDetail extends Component {

    constructor(props){
        super(props)
    
        this.state = {
          delivery:{}
        }
      }

      componentDidMount(){
 
        const id = this.props.match.params.id;
    
        axios.get(`http://localhost:8070/delivery/${id}`).then((res) =>{
          if(res.data.success){
            this.setState({
              delivery:res.data.delivery
            })
    
            console.log(this.state.delivery)
          }
        })
    
      }
    

  render() {
    const {name, number, oid, code, address, date, note,status,deliveryFee,distance, _id } = this.state.delivery;
    return (
      <div>
         <Header/>
        <div className='container' id="detailsContiner">
          <h4 id="AllSupplier">{oid}</h4>
          <hr/>
      <dl className='row'>
        <dt className='col-sm-3' id='supplier'>Delivery ID</dt>
        <dd className='col-sm-9' id="details">{_id}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Customer Name</dt>
        <dd className='col-sm-9'id="details">{name}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Phone Number</dt>
        <dd className='col-sm-9' id="details">{number}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Order ID</dt>
        <dd className='col-sm-9' id="details">{oid}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Delivery Code</dt>
        <dd className='col-sm-9' id="details">{code}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Delivery Address</dt>
        <dd className='col-sm-9' id="details">{address}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Delivery Distance</dt>
        <dd className='col-sm-9' id="details">{distance}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Date</dt>
        <dd className='col-sm-9' id="details">{date}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Additional Note</dt>
        <dd className='col-sm-9' id="details">{note}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Current State</dt>
        <dd className='col-sm-9' id="details">{status}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id='supplier'>Delivery Fee</dt>
        <dd className='col-sm-9' id="details">{deliveryFee}</dd>
      </dl>
      
       <div id='backBtnDiv' >
      <button className='btn btn-dark' id='backBtn'><a href='/delivery'>
      <i className='fas fa-arrow-left' id='backBtn'></i></a></button>
      </div>
      </div>
      </div>

      
    )
  }
}
