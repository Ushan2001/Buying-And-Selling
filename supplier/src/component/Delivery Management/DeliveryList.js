import React, { Component } from 'react'
import axios from "axios";
import Header from '../Dashboard/Header/Header';
import PdfButton from './PdfButton';
import Swal from 'sweetalert2';

export default class DeliveryList extends Component {

    constructor(props){
        super(props)

        this.state = {
            deliverys:[],
            deliveryCount:0,
            currentPage: 1,
            itemsPerPage: 10,
            token: ""
      
        }
    } 

    componentDidMount(){
        this.fetchToken();
        this.retriveDelivery();
    }

    fetchToken() {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            this.setState({ token: storedToken });
        }
    }
    retriveDelivery(){
        axios.get("http://localhost:8070/deliverys").then((res) =>{
            if(res.data.success){
                const existingDelivery = res.data.existingDelivery;

                this.setState({
                    deliverys:existingDelivery,
                    deliveryCount:existingDelivery.length

                })

                console.log(this.state.deliverys)
            }
        });
    }

    // onDelete = (id) =>{
    //     const isConfirmed = window.confirm('Are you sure you want to delete this delivery details?');

    //     if (isConfirmed) {
    //         axios.delete(`http://localhost:8070/delivery/delete/${id}`)
    //             .then((res) => {
    //                 this.retriveDelivery();
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             });
    //     }
    // }

    onDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this delivery details?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8070/delivery/delete/${id}`)
                .then((res) => {
                    this.retriveDelivery();
                    Swal.fire(
                        'Deleted!',
                        'The delivery details has been deleted.',
                        'success'
                    );
                })
                .catch((err) => {
                    console.error(err);
                    Swal.fire(
                        'Error!',
                        'Failed to delete the delivery details.',
                        'error'
                    );
                });
            }
        });
    }

    filterData(deliverys, searchKey){
   
        const result =  deliverys.filter((delivery) =>
           delivery.name.toLowerCase().includes(searchKey) ||
           delivery.number.toLowerCase().includes(searchKey) ||
           delivery.code.toLowerCase().includes(searchKey)
    
        )
      
        this.setState({deliverys:result,deliveryCount:result.length})
      
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/deliverys").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingDelivery, searchKey)
     
                    
                 }
             })
     }

//   handlePageChange = (pageNumber) => {
//     this.setState({
//       currentPage: pageNumber
//     });
//   };

  render() {
    // const { orders, currentPage, itemsPerPage } = this.state;

    // Pagination logic
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    return (
      <div>
        <Header/>
        <div className='container' id="supplierContainer" style={{width:"78%"}}>
        <div className='col-lg-3 mt-2 mb-2'>
                        <input  
                            className="form-control"
                            type='search'
                            placeholder='Search'
                            name="serchQuery"
                            style={{marginLeft:"50px", borderRadius:"20px"}}
                            onChange={this.handleSearchArea}
                        />
         </div>
        
         <div className='row' id="BtnRow">
                        <div className='col' id="newCol">
                        <button className='btn btn-success' id="supplierAdd">
                            <a href='add/delivery' style={{textDecoration:"none", color:"white"}}>
                        <i className='fas fa-plus'></i>&nbsp;Add New</a>
                        </button>
                        </div>
        </div> 
        <div className='row' style={{marginTop:"1%"}}>
                        <div className='col' >
                        <button className='btn btn-dark'>
                            <a href='/requeste/order' style={{textDecoration:"none", color:"white"}}>
                            <i class="bi bi-truck"></i>&nbsp;Requested Order</a>
                        </button>
                        </div>
        </div>
        
        <div id="supplierCount">
                <div className='card-body'>
                    <h5 className='card-title' id="SupplierCardTitile" >✅ No. OF DELIVERIES : <span id="cardText"> {this.state.deliveryCount} </span></h5>        
                </div>
        </div>
        <h2 id="AllSupplier">All Delivery Details</h2>
        <br></br>
         <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'><i className='fas fa-list'></i></th>
                    <th scope='col'>Customer Name</th>
                    <th scope='col'>Contact Number</th>
                    <th scope='col'>Delivey Code</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>

        <tbody>
            {this.state.deliverys.map((deliverys, index) =>(
                <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>
                        <a href= {`/delivery/${deliverys._id}`} style={{textDecoration:"none"}}>
                        {deliverys.name}
                        </a>
                        </td>
                    <td>{deliverys.number}</td>
                    <td>{deliverys.code}</td>
                    <td>
                        <a className='btn' id="editBtn" href={`/editdelivery/${deliverys._id}`}>
                            <i className='fas fa-edit' id="editIcon"></i>&nbsp;
                        </a>
                        &nbsp;
                        <a className='btn ' id="editDelete" href='# ' onClick={() => this.onDelete(deliverys._id)}>
                            <i className='fas fa-trash-alt' id="DeleteIcon"></i>&nbsp;
                        </a>
                        &nbsp;<PdfButton delivery={deliverys} />
                           
                    </td>
                </tr>
            ))}
    
        </tbody>
         </table>
 {/* Pagination */}
 {/* <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => this.handlePageChange(currentPage - 1)}><i class="bi bi-skip-backward"></i></button>
              </li>
              {Array.from({length: Math.ceil(deliverys.length / itemsPerPage)}, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => this.handlePageChange(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === Math.ceil(deliverys.length / itemsPerPage) ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => this.handlePageChange(currentPage + 1)}><i class="bi bi-skip-forward"></i></button>
              </li>
            </ul>
          </nav> */}
        
        
      </div>
      </div>
    );
  }
}
