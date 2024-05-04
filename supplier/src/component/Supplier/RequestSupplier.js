import React, { Component } from 'react';
import axios from "axios";
import Header from '../Dashboard/Header/Header';

export default class RequestSupplier extends Component {

    constructor(props){
        super(props)

        this.state = {
            customers:[],
           
        }
    } 

    componentDidMount(){
        this.retrieveCustomer();
    }

    retrieveCustomer() {
        axios.get("http://localhost:8070/customers").then((res) => {
            if (res.data.success) {
                const existingCustomer = res.data.existingCustomer;
                const sellerAndBothCustomers = existingCustomer.filter(customer => customer.ctype === "Seller" || customer.ctype === "Both");
                this.setState({
                    customers: sellerAndBothCustomers,
                });
            }
        });
    }
    
    

    filterData(customers, searchKey){
        const result =  customers.filter((customer) =>
            customer.name.toLowerCase().includes(searchKey) ||
            customer.number.toLowerCase().includes(searchKey) ||
            customer.address.toLowerCase().includes(searchKey) ||
            customer.supplierStatus.toLowerCase().includes(searchKey)
        )
      
        this.setState({ customers: result });
       
    }

    handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value;
     
        axios.get("http://localhost:8070/customers").then((res) =>{
            if(res.data.success){
                this.filterData(res.data.existingCustomer, searchKey);
            }
        });
    }

    render() {
        return (
            <div>
                <Header />
                <div className='container' id="supplierContainer" style={{width:"80%"}}>
                    <div className='col-lg-3 mt-2 mb-2'>
                        <input  className="form-control"
                            type='search'
                            placeholder='Search'
                            name="serchQuery"
                            style={{marginLeft:"40px", marginBottom:"5%"}}
                            onChange={this.handleSearchArea}/>
                    </div>
                    <div className='row' id="customerRow">
                        <div className='col-md-4'>
                            <h2 id="AllSupplier">Request Suppliers</h2>
                        </div>
                        </div>
                        

                        
                   
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope='col'><i className='fas fa-list'></i></th>
                                <th scope='col'>Supplier Name</th>
                                <th scope='col'>Contact Number</th>
                                <th scope='col'>Address</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.customers.map((customer, index) =>(
                                <tr key={index}>
                                    <th scope='row'>{index+1}</th>
                                    <td> {customer.name} </td>
                                    <td>{customer.number}</td>
                                    <td>{customer.address}</td>
                                    <td style={{color:"tomato"}}>{customer.supplierStatus}</td>
                                    <td>
                                        <a className='btn' id="editBtn" href={`/request/supplier/${customer._id}`}>
                                            <i className='fas fa-edit' id="editIcon"></i>
                                        </a>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        );
    }
}
