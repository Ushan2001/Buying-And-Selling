import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../NavBar/NavBar';

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

    const {tid, date, bname, sname, pname, quantity, address, cost, _id } = this.state.history;

    return (
      <div>
         <NavBar/>
        <div style={{marginTop:"40px"}} className='container'>
          <h4>{tid}</h4>
          <hr/>
      <dl className='row'>
       <dt className='col-sm-3'>Transaction Tempory ID</dt>
        <dd className='col-sm-9'>{_id}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Date</dt>
        <dd className='col-sm-9'>{date}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Buyer Name</dt>
        <dd className='col-sm-9'>{bname}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Seller Name</dt>
        <dd className='col-sm-9'>{sname}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Product Name</dt>
        <dd className='col-sm-9'>{pname}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Quantity</dt>
        <dd className='col-sm-9'>{quantity}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Address</dt>
        <dd className='col-sm-9'>{address}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Total Cost</dt>
        <dd className='col-sm-9'>{cost}</dd>
        
      </dl>
      </div>

      <div style={{marginLeft:"30px", marginTop:"20px"}}>
      <button className='btn btn-dark'><a href='/history' style={{textDecoration:"none", color:"white"}}>
      <i className='fas fa-arrow-left'></i></a></button>
      </div>
      </div>
    )
  }
}
