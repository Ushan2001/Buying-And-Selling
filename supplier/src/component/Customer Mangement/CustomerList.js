import React, { Component } from 'react';
import axios from "axios";
import Header from '../Dashboard/Header/Header';
import PdfButton from './PdfButton';
import "./customer.css";

export default class CustomerList extends Component {

    constructor(props){
        super(props)

        this.state = {
            customers:[],
            customerCount: 0,
            buyersCount: 0,
            sellersCount: 0,
            bothCount: 0,
            customerType: ""
        }
    } 

    componentDidMount(){
        this.retrieveCustomer();
    }

    retrieveCustomer(){
        axios.get("http://localhost:8070/customers").then((res) =>{
            if(res.data.success){
                const existingCustomer = res.data.existingCustomer;
                this.setState({
                    customers: existingCustomer,
                    customerCount: existingCustomer.length
                });
                // Update buyers and sellers count
                this.countBuyersAndSellers(existingCustomer);
            }
        });

    }

    countBuyersAndSellers(customers){
        let buyers = 0;
        let sellers = 0;
        let both = 0;
        customers.forEach(customer => {
            if (customer.ctype === "Buyer") {
                buyers++;
            }else if (customer.ctype === "Seller") {
                sellers++;
            }else if (customer.ctype === "Both"){
                both++;
            }
        });
        this.setState({
            buyersCount: buyers,
            sellersCount: sellers,
            bothCount: both,
        });
    }

    onDelete = (id) =>{
        const isConfirmed = window.confirm('Are you sure you want to delete this customer?');

        if (isConfirmed) {
            axios.delete(`http://localhost:8070/customer/delete/${id}`)
                .then((res) => {
                    this.retrieveCustomer();
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
      
        this.setState({ customers: result, customerCount: result.length });
        // Update buyers and sellers count after filtering
        this.countBuyersAndSellers(result);
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
                <div className='container' id="supplierContainer" style={{width:"85%"}}>
                    <div className='col-lg-3 mt-2 mb-2'>
                        <input  className="form-control"
                            type='search'
                            placeholder='Search'
                            name="serchQuery"
                            style={{marginLeft:"40px", marginBottom:"5%"}}
                            onChange={this.handleSearchArea}/>
                    </div>
                    <div className='row' id="customerRow">
                        <div className='col-md-2'>
                            <h2 id="AllSupplier">All Customers</h2>
                        </div>
                        </div>
                        <div className='row' id="customerRow">
                        <div className='col-md-2'>
                            <div className='col-md-3' id="card">
                                <div className='card' id="card1" style={{ width: '17rem', backgroundImage: 'url("/images/back.jpg")'}}>
                                    <div className='card-body'>
                                        <h5 className='card-title' id="cardTitile">No. Of Customers</h5>
                                        <p className='card-text' id="cardText">{this.state.customerCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2' id="customerCol1">
                            <div className='col-md-3' id="card">
                                <div className='card' id="card1" style={{ width: '15rem', backgroundImage: 'url("/images/back.jpg")'}}>
                                    <div className='card-body'>
                                        <h5 className='card-title' id="cardTitile">No. Of Sellers</h5>
                                        <p className='card-text' id="cardText">{this.state.sellersCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2' id="customerCol">
                            <div className='col-md-3' id="card">
                                <div className='card' id="card1" style={{ width: '15rem', backgroundImage: 'url("/images/back.jpg")'}}>
                                    <div className='card-body'>
                                        <h5 className='card-title' id="cardTitile">No. Of Buyers</h5>
                                        <p className='card-text' id="cardText">{this.state.buyersCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2'id="customerCol">
                            <div className='col-md-3' id="card">
                                <div className='card' id="card1" style={{ width: '15rem', backgroundImage: 'url("/images/back.jpg")'}}>
                                    <div className='card-body'>
                                        <h5 className='card-title' id="cardTitile">No. Of Both</h5>
                                        <p className='card-text' id="cardText">{this.state.bothCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div id="customerNewDiv">
                        <button className='btn btn-success'><a href='add/customer' style={{textDecoration:"none", color:"white"}}>
                        <i className='fas fa-plus'></i>&nbsp;Add New</a></button>
                        </div>
                   
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
                            {this.state.customers.map((customer, index) =>(
                                <tr key={index}>
                                    <th scope='row'>{index+1}</th>
                                    <td>
                                        <a href= {`/customer/${customer._id}`} style={{textDecoration:"none"}}>
                                        {customer.name}
                                        </a>
                                    </td>
                                    <td>{customer.number}</td>
                                    <td>{customer.address}</td>
                                    <td>
                                        <a className='btn' id="editBtn" href={`/editcustomer/${customer._id}`}>
                                            <i className='fas fa-edit' id="editIcon"></i>
                                        </a>
                                        &nbsp;
                                        <a className='btn' id="editDelete" href='# ' onClick={() => this.onDelete(customer._id)}>
                                            <i className='fas fa-trash-alt' id="DeleteIcon"></i>
                                        </a>
                                        &nbsp;<PdfButton customer={customer} />
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
