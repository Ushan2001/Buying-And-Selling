import React, { Component } from 'react'
import axios from 'axios'
import Header from '../Dashboard/Header/Header';

export default class CustomerDetails extends Component {

    constructor(props){
        super(props)
    
        this.state = {
          customer:{}
        }
      }

      componentDidMount(){
 
        const id = this.props.match.params.id;
    
        axios.get(`http://localhost:8070/customer/${id}`).then((res) =>{
          if(res.data.success){
            this.setState({
              customer:res.data.customer
            })
    
            console.log(this.state.customer)
          }
        })
    
      }
  render() {

    const {name, number, address, gender, email, ctype, note, _id } = this.state.customer;

    return (
      <div>
        <div>
        <Header />
        <div id="detailsContiner" className='container'>
          <h4>{name}</h4>
          <hr/>
      <dl className='row'>
        <dt className='col-sm-3'>Customer ID</dt>
        <dd className='col-sm-9'>{_id}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Contact Number</dt>
        <dd className='col-sm-9'>{number}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Address</dt>
        <dd className='col-sm-9'>{address}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Gender</dt>
        <dd className='col-sm-9'>{gender}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Email</dt>
        <dd className='col-sm-9'>{email}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Customer Type</dt>
        <dd className='col-sm-9'>{ctype}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Additional Information</dt>
        <dd className='col-sm-9'>{note}</dd>
        
      </dl>
      </div>

      <div style={{marginLeft:"30px", marginTop:"20px"}}>
      <button className='btn btn-dark'><a href='/customer' style={{textDecoration:"none", color:"white"}}>
      <i className='fas fa-arrow-left'></i></a></button>
      </div>
      </div>
      </div>
    )
  }
}
