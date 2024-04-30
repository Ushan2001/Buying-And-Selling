import React, { Component } from 'react';
import axios from "axios";
import PdfButton from './PdfButton';
import Header from '../Dashboard/Header/Header';
import Chart from 'chart.js/auto'; 
import "./supplier.css";
import Swal from 'sweetalert2';
import SupplierReport from './SupplierReport';
import LoadingPage from './LoadingPage';


export default class SupplierList extends Component {

    constructor(props){
        super(props)

        this.state = {
            suppliers:[],
            oldsuppliers:[],
            supplierCount: 0,
            currentPage: 1,
            itemsPerPage: 5,
            token: "",
            isMonthlyReportAvailable: false,
            loading: true,
           
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
                 supplierCount: existingSupplier.length,
                 loading: false
    
                }, () => {
                    this.initializeChart(this.state.suppliers);
                    
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
                }, () => {
                    this.initializeChart(this.state.suppliers, this.state.oldsuppliers);
                });
            }
        })
    }


//    Old supplier delete function

    onDelete1 = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this Old supplier ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8070/old/supplier/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${this.state.token}`
                    }
                })
                    .then((res) => {
                        this.retriveOldSupplier();
                        Swal.fire(
                            'Deleted!',
                            'The supplier has been deleted.',
                            'success'
                        );
                    })
                    .catch((err) => {
                        console.error(err);
                        Swal.fire(
                            'Error!',
                            'Failed to delete the supplier.',
                            'error'
                        );
                    });
            }
        });
    }
    

    // New supplier delete function
    onDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this supplier?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8070/supplier/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${this.state.token}`
                    }
                })
                    .then((res) => {
                        this.retriveSupplier();
                        Swal.fire(
                            'Deleted!',
                            'The supplier has been deleted.',
                            'success'
                        );
                    })
                    .catch((err) => {
                        console.error(err);
                        Swal.fire(
                            'Error!',
                            'Failed to delete the supplier.',
                            'error'
                        );
                    });
            }
        });
    }
    


  // new supplier search bar
    filterData(suppliers, searchKey){
        const result = suppliers.filter((supplier) =>
            supplier.sid.toLowerCase().includes(searchKey) ||
            supplier.name.toLowerCase().includes(searchKey) || 
            supplier.address.toLowerCase().includes(searchKey) 
        );
    
        this.setState({suppliers: result, supplierCount: result.length});
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
            oldsupplier.product.toLowerCase().includes(searchKey) || 
            oldsupplier.amount.toLowerCase().includes(searchKey) 
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

    initializeChart(suppliers, oldSuppliers) {
        const ctxL = document.getElementById("lineChart");
    
        if (!ctxL || !suppliers || !oldSuppliers) return;
    
        if (this.chartInstance) {
            this.chartInstance.destroy(); // Destroy existing chart instance
        }
    
        // Combine current and old suppliers for easier processing
        const allSuppliers = [...suppliers, ...oldSuppliers];
    
        // Extract unique SIDs
        const uniqueSIDs = Array.from(new Set(allSuppliers.map(supplier => supplier.sid)));
    
        // Define an array of colors
        const colors = [
                /* Dark Purple Plum */
                'rgba(75, 0, 94, .7)',
            
                /* Dark Caribbean Green */
                'rgba(0, 75, 71, .7)',
            
                /* Dark Blush Red */
                'rgba(150, 50, 94, .7)',
            
                /* Dark Deep Sea Blue */
                'rgba(0, 5, 65, .7)',
            
                /* Dark Royal Purple */
                'rgba(75, 15, 120, .7)',
            
                /* Dark Lemon Yellow */
                'rgba(200, 200, 0, .7)',
            
                /* Dark Fire Engine Red */
                'rgba(200, 0, 0, .7)',
            
                /* Dark Neon Green */
                'rgba(0, 150, 0, .7)',
            
                /* Dark Electric Blue */
                'rgba(0, 0, 150, .7)',
            
                /* Dark Orange Peel */
                'rgba(200, 100, 0, .7)',
            
                /* Dark Fuchsia */
                'rgba(150, 0, 150, .7)',
            
                /* Dark Gray */
                'rgba(75, 75, 75, .7)',
            
                /* Dark Purple Heart */
                'rgba(75, 0, 75, .7)',
            
                /* Dark Teal */
                'rgba(0, 75, 75, .7)',
            
                /* Dark Maroon */
                'rgba(75, 0, 0, .7)',
            
                /* Dark Lime */
                'rgba(0, 75, 0, .7)',
            
                /* Dark Navy Blue */
                'rgba(0, 0, 75, .7)',
            
                /* Dark White */
                'rgba(150, 150, 150, .7)',
            
                /* Dark Silver */
                'rgba(100, 100, 100, .7)',
            
                /* Dark Olive */
                'rgba(75, 75, 0, .7)'
            ];
            
       
        
        
        // Prepare data for each SID
        const datasets = uniqueSIDs.map((sid, index) => {
            const currentSupplier = suppliers.find(supplier => supplier.sid === sid);
            const existingSupplier = oldSuppliers.find(supplier => supplier.sid === sid);
            const data = [currentSupplier ? currentSupplier.totalAmount : 0, existingSupplier ? existingSupplier.totalAmount : 0];
            const colorIndex = index % colors.length; // Get color index within the range of colors array
            return {
                label: `SID: ${sid}`,
                data: data,
                backgroundColor: colors[colorIndex],
                borderColor: colors[colorIndex],
                borderWidth: 2,
                tension: 0.4,
                fill: true
            };
        });
    
        this.chartInstance = new Chart(ctxL, {
            type: 'bar',
            data: {
                labels: ['Current Supplier', 'Existing Supplier'],
                datasets: datasets
            },
            options: {
                responsive: true,
                animation: {
                    duration: 1000, // Animation duration in milliseconds
                    easing: 'easeInOutQuart', // Easing function for animation
                    // You can add more animation properties as needed
                }
            }
        });
    }
    
    
    render() {
        const { suppliers, oldsuppliers, currentPage, itemsPerPage } = this.state;
        const indexOfLastSupplier = currentPage * itemsPerPage;
        const indexOfFirstSupplier = indexOfLastSupplier - itemsPerPage;
        const currentSuppliers = suppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);
        const currentOldSuppliers = oldsuppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);

        const { loading } = this.state; 

        return (
            <div>
                
                <Header/>
                <LoadingPage loading={loading} />
                <div className='container' id="supplierContainer" >
                    <div id="notification-icon">


</div>


                    <div id="lineChartContainer" style={{marginBottom:"5%"}}>
                    <div  style={{marginBottom:"2%"}}>
                    <span id='graph'>New and Existing Suppliers Amount 📢 📶 📈  </span>
                    </div>
                        <canvas id="lineChart"></canvas>
                    </div>

                    <div className='col-lg-3 mt-2 mb-2' id="searchDiv">
                        <input  
                            className="form-control"
                            type='search'
                            id="searchSupplier"
                            placeholder='Search'
                            name="serchQuery"
                            style={{marginLeft:"50px", borderRadius:"20px"}}
                            onChange={this.handleSearchArea}
                        />
                    </div>
                    
                    <div className='row' id="BtnRow">
                        <div className='col' id="newCol">
                            <button className='btn btn-success' id="supplierAdd">
                                <a href='add/supplier' style={{textDecoration:"none", color:"white"}}>
                                    <i className='fas fa-plus'></i>&nbsp;Add New
                                </a>
                            </button>
                        </div>

                        <div className='col' id="oldCol">
                            <button className='btn btn-info' id="supplierAddLod" >
                                <a href='/Old Supplier' style={{textDecoration:"none", color:"white"}}>
                                    <i className='fas fa-plus'></i>&nbsp;Add Old
                                </a>
                            </button>
                        </div>
                    </div> 
                    <div id="supplierCount">
                                    <div className='card-body'>
                                        <h5 className='card-title' id="SupplierCardTitile" >✅ No. OF SUPPLIERS : <span id="cardText"> {this.state.supplierCount} </span></h5>        
                            </div>
                        </div>

                       

                    <h2 id="AllSupplier">All Suppliers</h2>
                    <br></br>       
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope='col'><i className='fas fa-list'></i></th>
                                <th scope='col'>Supplier Code</th>
                                <th scope='col'>Supplier Name</th>
                                <th scope='col'>Address</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentSuppliers.map((supplier, index) =>(
                                <tr key={index}>
                                    <th scope='row'>{index+1}</th>
                                    <td id='supplier'>{supplier.sid}</td>
                                    <td id='supplier'>{supplier.name}</td>
                                    <td id='supplier'>{supplier.address}</td>
                                    <td>
                                        <a className='btn' id="editBtn" href={`/editsupplier/${supplier._id}`}>
                                            <i className='fas fa-edit' id="editIcon"></i>
                                        </a>
                                        &nbsp;
                                        <a className='btn' href='# ' id="editDelete" onClick={() => this.onDelete(supplier._id)}>
                                            <i className='fas fa-trash-alt' id="DeleteIcon"></i>&nbsp;
                                        </a>
                                        &nbsp;<PdfButton supplier={supplier} />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <a href={`/supplier/${supplier._id}`} id="view">VIEW</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
                    <div id="Extisting">
                        <div className='row'>
                            <div className='col' id="Extisting">
                        <h2 id="AllSupplier">Existing Record</h2>
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
                                    <th scope='col'>Product</th>
                                    <th scope='col'>Amount</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentOldSuppliers.map((oldsupplier, index) =>(
                                    <tr key={index}>
                                        <th scope='row'>{index+1}</th>
                                        <td id='supplier'>{oldsupplier.sid}</td>
                                        <td id='supplier'>{oldsupplier.product}</td>
                                        <td id='supplier'>{oldsupplier.amount}</td>
                                        <td>
                                            <a className='btn' id="editBtn" href={`/editOldSupplier/${oldsupplier._id}`}>
                                                <i className='fas fa-edit' id="editIcon"></i>
                                            </a>
                                            &nbsp;
                                            <a className='btn' href='# ' id="editDelete" onClick={() => this.onDelete1(oldsupplier._id)}>
                                                <i className='fas fa-trash-alt' id="DeleteIcon"></i>&nbsp;
                                            </a>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <a href={`/view/Oldsupplier/${oldsupplier._id}`} id="view">VIEW</a>
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
