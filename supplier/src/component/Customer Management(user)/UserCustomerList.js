import React, { Component } from 'react'
import UserNavBar from '../NavBar/UserNavBar';
import axios from 'axios';

export default class UserCustomerList extends Component {

    constructor(props){
        super(props)

        this.state = {
            customers:[]
        }
    } 

    componentDidMount(){
        this.retriveCustomer()
    }

    retriveCustomer(){
        axios.get("http://localhost:8070/customers").then((res) =>{
            if(res.data.success){
                this.setState({
                    customers:res.data.existingCustomer
                })

                console.log(this.state.customers)
            }
        })
    }

    filterData(customers, searchKey){
   
        const result =  customers.filter((customer) =>
           customer.name.toLowerCase().includes(searchKey) ||
           customer.number.toLowerCase().includes(searchKey) ||
           customer.address.toLowerCase().includes(searchKey)
    
        )
      
        this.setState({customers:result})
      
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/customers").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingCustomer, searchKey)
     
                    
                 }
             })
     }

  render() {
    return (
      <div>
        <UserNavBar/>
         <div className="container" style={{ marginTop: '40px' }}>
          <div className="col-lg-3 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              style={{ marginLeft: '1000px' }}
              onChange={this.handleSearchArea}
            />
          </div>

          <h2><b>𝙾𝚞𝚛 𝙲𝚞𝚜𝚝𝚘𝚖𝚎𝚛</b></h2>
          <br></br>
          <div className="row">
            {this.state.customers.map((customer, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card animated-card" style={{ width: '18rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', overflow: 'hidden', backgroundImage: 'url("/images/back.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="card-body" style={{ backgroundColor: 'rgba(255, 255, 255, 0)', padding: '16px' }}>
    <h5 className="card-title" style={{ color: '#343a40', fontSize: '1.5rem', marginBottom: '8px' }}>{customer.name}</h5>
    <p className="card-text" style={{ color: '#000', fontSize: '1rem', marginBottom: '4px' }}>Contact: {customer.number}</p>
    <p className="card-text" style={{ color: '#28a745', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>Address: {customer.address}</p>
    <a href={`/usercustomer/${customer._id}`} className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff', borderRadius: '4px' }}>
      View Details
    </a>
  </div>
</div>


              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
