import React, { Component } from 'react'
import axios from 'axios';
import UserNavBar from '../NavBar/UserNavBar';

export default class UserCustomerDetails extends Component {
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
        <UserNavBar />
        <div className='container mt-4'>
          <h4>{name}</h4>
          <hr />
      
          <dl className='row'>
            <div className='col-sm-3'>
              <dt>Customer ID</dt>
              <dd>{_id}</dd>
            </div>
      
            <div className='col-sm-3'>
              <dt>Contact Number</dt>
              <dd>{number}</dd>
            </div>
      
            <div className='col-sm-3'>
              <dt>Address</dt>
              <dd>{address}</dd>
            </div>
      
            <div className='col-sm-3'>
              <dt>Gender</dt>
              <dd>{gender}</dd>
            </div>
      
            <div className='col-sm-3'>
              <dt>Email</dt>
              <dd>{email}</dd>
            </div>
      
            <div className='col-sm-3'>
              <dt>Customer Type</dt>
              <dd>{ctype}</dd>
            </div>
      
            <div className='col-sm-9'>
              <dt>Additional Information</dt>
              <dd>{note}</dd>
            </div>
          </dl>
        </div>
      
        <div className='ml-3 mt-3'>
          <button className='btn btn-dark'>
            <a href='/usercustomer' style={{ textDecoration: 'none', color: 'white' }}>
              <i className='fas fa-arrow-left'></i>
            </a>
          </button>
        </div>
      </div>
      
    )
  }
}
