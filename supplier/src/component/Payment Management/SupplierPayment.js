import React, { Component } from 'react';
import axios from "axios";
import Header from '../Dashboard/Header/Header';

export default class SupplierPayment extends Component {

    constructor(props){
        super(props)

        this.state = {
            suppliers:[],
            oldsuppliers:[],
            currentPage: 1,
            itemsPerPage: 5,
            token: "", 
        }
    }

    componentDidMount() {
        this.fetchToken();
        this.retriveSupplier();
        this.retriveOldSupplier();
      
    }

    fetchToken() {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            this.setState({ token: storedToken });
        }
    }  
    retriveSupplier(){
        axios.get("http://localhost:8070/supplier").then((res) =>{
            if(res.data.success){
                const  existingSupplier =  res.data.existingSupplier;
                this.setState({
                 suppliers:existingSupplier,
                
    
                });
            }
        })
        .catch((error) => console.error(error));
    }

    retriveOldSupplier(){
        axios.get("http://localhost:8070/old/supplier").then((res) =>{
            if(res.data.success){
                this.setState({
                    oldsuppliers: res.data.existingOldSupplier
                });
            }
        })
    }




  // new supplier search bar
    filterData(suppliers, oldsuppliers, searchKey){
        const result1 = suppliers.filter((supplier) =>
            supplier.sid.toLowerCase().includes(searchKey) ||
            supplier.totalAmount.toLowerCase().includes(searchKey) || 
            supplier.InventoryStatus.toLowerCase().includes(searchKey) ||
            supplier.PaymentStatus.toLowerCase().includes(searchKey) 
        );

        const result2 = oldsuppliers.filter((oldsupplier) =>
            oldsupplier.sid.toLowerCase().includes(searchKey) ||
            oldsupplier.totalAmount.toLowerCase().includes(searchKey) || 
            oldsupplier.InventoryStatus.toLowerCase().includes(searchKey) ||
            oldsupplier.PaymentStatus.toLowerCase().includes(searchKey) 
        );
    
        this.setState({suppliers: result1, oldsupplier: result2});
    }

    handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value;

        axios.get("http://localhost:8070/supplier").then((res) =>{
            if(res.data.success){
                this.filterData(res.data.existingSupplier, searchKey);
            }
        });
    }

// old supplier search bar
    filterData1(oldsuppliers, searchKey){
        const result = oldsuppliers.filter((oldsupplier) =>
            oldsupplier.sid.toLowerCase().includes(searchKey) ||
            oldsupplier.totalAmount.toLowerCase().includes(searchKey) || 
            oldsupplier.InventoryStatus.toLowerCase().includes(searchKey) ||
            oldsupplier.PaymentStatus.toLowerCase().includes(searchKey) 
        );
    
        this.setState({oldsuppliers: result});
    }

    handleSearchArea1 = (e) =>{
        const searchKey =  e.currentTarget.value;

        axios.get("http://localhost:8070/old/supplier").then((res) =>{
            if(res.data.success){
                this.filterData1(res.data.existingOldSupplier, searchKey);
            }
        });
    }

    paymentColor = (PaymentStatus) =>{
        let color;
        if(PaymentStatus=== "Not yet"){
            color = 'tomato';
        }else{
            color = '#28a745';
        }
        return{color};
    }

    productColor = (InventoryStatus) =>{
        let color;
        if(InventoryStatus=== "Not yet"){
            color = 'tomato';
        }else{
            color = '#28a745';
        }
        return{color};
    }

  
    render() {
        const { suppliers, oldsuppliers, currentPage, itemsPerPage } = this.state;
        const indexOfLastSupplier = currentPage * itemsPerPage;
        const indexOfFirstSupplier = indexOfLastSupplier - itemsPerPage;
        const currentSuppliers = suppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);
        const currentOldSuppliers = oldsuppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);

      

        return (
            <div>
                
                <Header/>
               
                <div className='container' id="supplierContainer" style={{maxWidth:"80%"}}>
                    
                    <div className='col-lg-3 mt-2 mb-2' id="searchDiv">
                        <input  
                            className="form-control"
                            type='search'
                            id="searchSupplier"
                            placeholder='Search'
                            name="serchQuery"
                            style={{marginLeft:"50px", borderRadius:"20px", marginBottom:"3%"}}
                            onChange={this.handleSearchArea}
                        />
                    </div>
                    
                    <h2 id="AllSupplier">New Supplier Payment</h2>
                    <br></br>       
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope='col'><i className='fas fa-list'></i></th>
                                <th scope='col'>Supplier Code</th>
                                <th scope='col'>Total Amount</th>
                                <th scope='col'>Inventory Status</th>
                                <th scope='col'>Payment Status</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentSuppliers.map((supplier, index) =>(
                                <tr key={index}>
                                    <th scope='row'>{index+1}</th>
                                    <td id='supplier'>{supplier.sid}</td>
                                    <td id='supplier'>{supplier.totalAmount}</td>
                                    <td id='supplier' style={this.productColor(supplier.InventoryStatus)}>{supplier.InventoryStatus}</td>
                                    <td id='supplier' style={this.paymentColor(supplier.PaymentStatus)}>{supplier.PaymentStatus}</td>
                                    <td>
                                        <a className='btn' id="editBtn" href={`/edit/new/payment/${supplier._id}`}>
                                            <i className='fas fa-edit' id="editIcon"></i>
                                        </a> 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
                    <div id="Extisting">
                        <div className='row'>
                            <div className='col' id="Extisting">
                                <br></br>
                        <h2 id="AllSupplier">Old Supplier Payment</h2>
                        </div>
                        <br></br> 
                        <div className='col'> 
                        <div className='col-lg-3 mt-2 mb-2' >
                        <input  
                            className="form-control"
                            type='search'
                            id="searchSupplier1"
                            placeholder='Search'
                            name="serchQuery"
                            style={{borderRadius:"20px", width:"300px"}}
                            onChange={this.handleSearchArea1}
                        />
                    </div>
                    </div> 
                    </div>
                    <br></br>    
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th scope='col'><i className='fas fa-list'></i></th>
                                    <th scope='col'>Supplier Code</th>
                                    <th scope='col'>Total Amount</th>
                                    <th scope='col'>Inventory Status</th>
                                    <th scope='col'>Payment Status</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentOldSuppliers.map((oldsupplier, index) =>(
                                    <tr key={index}>
                                        <th scope='row'>{index+1}</th>
                                        <td id='supplier'>{oldsupplier.sid}</td>
                                        <td id='supplier'>{oldsupplier.totalAmount}</td>
                                        <td id='supplier' style={this.productColor(oldsupplier.InventoryStatus)}>{oldsupplier.InventoryStatus}</td>
                                        <td id='supplier' style={this.paymentColor(oldsupplier.PaymentStatus)}>{oldsupplier.PaymentStatus}</td>
                                        <td>
                                            <a className='btn' id="editBtn" href={`/edit/old/payment/${oldsupplier._id}`}>
                                                <i className='fas fa-edit' id="editIcon"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {suppliers.length > itemsPerPage &&
                                Array(Math.ceil(suppliers.length / itemsPerPage)).fill().map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <a href="#!"className="page-link" onClick={() => this.setState({ currentPage: index + 1 })}>{index + 1}</a>
                                    </li>
                                ))}
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}
