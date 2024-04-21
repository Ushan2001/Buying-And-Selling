import React, { Component } from 'react'
import axios from 'axios'
import Header from '../Dashboard/Header/Header';

export default class HistoryDetails extends Component {

    constructor(props){
        super(props)
    
        this.state = {
          history:{}
        }
      }

      componentDidMount(){
 
        const id = this.props.match.params.id;
    
        axios.get(`http://localhost:8070/history/${id}`).then((res) =>{
          if(res.data.success){
            this.setState({
              history:res.data.history
            })
    
            console.log(this.state.history)
          }
        })
    
      }
  render() {

    const {tid, date, bname, sname, pname, quantity, address, totalAmount, _id } = this.state.history;

    return (
      <div>
         <Header/>
        <div  style={{marginTop:"100px"}} className='container' id="detailsContiner">
          <h4 id="AllSupplier">{tid}</h4>
          <hr/>
      <dl className='row'>
       <dt className='col-sm-3'id="supplier">Transaction Tempory ID</dt>
        <dd className='col-sm-9' id="details">{_id}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="supplier">Date</dt>
        <dd className='col-sm-9' id="details">{date}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="supplier">Buyer Name</dt>
        <dd className='col-sm-9' id="details">{bname}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="supplier">Seller Name</dt>
        <dd className='col-sm-9' id="details">{sname}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="supplier">Product Name</dt>
        <dd className='col-sm-9' id="details">{pname}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="supplier">Quantity</dt>
        <dd className='col-sm-9' id="details">{quantity}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="supplier">Address</dt>
        <dd className='col-sm-9' id="details">{address}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="supplier">Total Cost</dt>
        <dd className='col-sm-9' id="details">{totalAmount}</dd>
        
      </dl>
      </div>

      <div style={{marginLeft:"30px", marginTop:"20px"}}>
      <button className='btn btn-dark' id="backBtn"><a href='/history' style={{textDecoration:"none", color:"white"}}>
      <i className='fas fa-arrow-left' id="backBtn"></i></a></button>
      </div>
      </div>
    )
  }
}
