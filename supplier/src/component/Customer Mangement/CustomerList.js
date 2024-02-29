import React, { Component } from 'react'
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import PdfButton from './PdfButton';

export default class CustomerList extends Component {

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

    onDelete = (id) =>{
        const isConfirmed = window.confirm('Are you sure you want to delete this customer?');

        if (isConfirmed) {
            axios.delete(`http://localhost:8070/customer/delete/${id}`)
                .then((res) => {
                    this.retriveCustomer();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
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
        <NavBar/>
        <div className='container' style={{ marginTop:"40px"}}>
         <div className='col-lg-3 mt-2 mb-2'>
            <input  className="form-control"
            type='search'
            placeholder='Search'
            name="serchQuery"
            style={{marginLeft:"1000px"}}
            onChange={this.handleSearchArea}/>
            
           

         </div>
        

        <h2>All Customers</h2>
        <br></br>
         <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'><i className='fas fa-list'></i></th>
                    <th scope='col'>Customer Name</th>
                    <th scope='col'>Contact Number</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>

        <tbody>
            {this.state.customers.map((customers, index) =>(
                <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>
                        <a href= {`/customer/${customers._id}`} style={{textDecoration:"none"}}>
                        {customers.name}
                        </a>
                        </td>
                    <td>{customers.number}</td>
                    <td>{customers.address}</td>
                    <td>
                        <a className='btn btn-warning' href={`/editcustomer/${customers._id}`}>
                            <i className='fas fa-edit'></i>&nbsp;Edit
                        </a>
                        &nbsp;
                        <a className='btn btn-danger' href='# ' onClick={() => this.onDelete(customers._id)}>
                            <i className='fas fa-trash-alt'></i>&nbsp;Delete
                        </a>
                        &nbsp;<PdfButton customer={customers} />
                    </td>
                </tr>
            ))}
    
        </tbody>
         </table>

         <button className='btn btn-success'><a href='add/customer' style={{textDecoration:"none", color:"white"}}>
         <i className='fas fa-plus'></i>&nbsp;Add New</a></button>
        
      </div>
      </div>
    )
  }
}
