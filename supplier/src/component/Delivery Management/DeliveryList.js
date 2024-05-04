import React, { Component } from 'react'
import axios from "axios";
import PdfButton from './PdfButton';
import Header from '../Dashboard/Header/Header';
import Swal from 'sweetalert2';

export default class DeliveryList extends Component {

    constructor(props){
        super(props)

        this.state = {
            deliverys:[],
            deliveryCount:0,
            currentPage: 1,
            itemsPerPage: 10,
            token: "",
            statusFilter: "all" // Initialize status filter to "all"
        };
    } 

    componentDidMount(){
        this.fetchToken();
        this.retriveDelivery();
        this.retrieveOrder();
    }

    fetchToken() {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            this.setState({ token: storedToken });
        }
    }

    retrieveOrder() {
        axios.get('http://localhost:8070/orders').then((res) => {
          if (res.data.success) {
            const existingOrder = res.data.existingOrder;
            const pendingCount = existingOrder.filter(order => order.send === "Pending").length;
            const deliveredCount = existingOrder.filter(order => order.send === "Delivered").length;
            this.setState({
              orders: existingOrder,
              orderCount: existingOrder.length,
              pendingCount,
              deliveredCount,
            });
          }
        });
      }

    retriveDelivery() {
        const { statusFilter } = this.state;
        let url = `http://localhost:8070/deliverys?status=${statusFilter}`;
        axios.get(url)
            .then((res) => {
                if (res.data.success) {
                    const existingDelivery = res.data.existingDelivery;
                    this.setState({
                        deliverys: existingDelivery,
                        deliveryCount: existingDelivery.length
                    });
                    this.countPdendingAndSDelivered(existingDelivery);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
    
    countPdendingAndSDelivered(deliverys){
        let pending = 0;
        let delivered = 0;
        
        deliverys.forEach(delivery => {
            if (delivery.ctype === "Pending") {
                pending++;
            }else if (delivery.ctype === "Delivered") {
                delivered++;
            }
            
        });
        this.setState({
            pendingCount: pending,
            deliveredCount: delivered,
            
        });
    }

  

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
        this.countPdendingAndSDelivered(result);
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/deliverys").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingDelivery, searchKey)
     
                    
                 }
             })
     }

     handleStatusFilterChange = (event) => {
        const statusFilter = event.target.value;
        this.setState({ statusFilter }, () => {
            this.retriveDelivery();
        });
    }
    

  render() {
    const {pendingCount, deliveredCount} = this.state;
    return (
      <div>
        <Header/>
        <div className='container' id="deliveryContainer" style={{width:"78%"}}>
        <div className='row' style={{marginTop:"1%",marginLeft:"50px"}}>
                        <div className='col' >
                        <button className='btn btn-warning'>
                            <a href='/requeste/order' style={{textDecoration:"none", color:"black"}}>
                            <i class="bi bi-truck"></i>&nbsp;Requested Order</a>
                        </button>
                        </div>
        </div>
        <div className='row' id="customerRow">
        <div className='col-md-2'>
                            <div className='col-md-3' id="card">
                                <div className='card' id="card1" style={{ width: '15rem', backgroundColor: 'lightblue'}}>
                                    <div className='card-body'>
                                        <h5 className='card-title' id="cardTitile">Pending</h5>
                                        <p className='card-text' id="cardText">{pendingCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2' id="customerCol1">
                            <div className='col-md-3' id="card">
                                <div className='card' id="card1" style={{ width: '15rem', backgroundColor: 'lightblue'}}>
                                    <div className='card-body'>
                                        <h5 className='card-title' id="cardTitile">Delivered</h5>
                                        <p className='card-text' id="cardText">{deliveredCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
        </div>
        <div className='col-lg-3 mt-2 mb-2'>
                        <input  
                            className="form-control"
                            type='search'
                            placeholder='Search'
                            name="serchQuery"
                            style={{marginLeft:"50px",marginTop:"50px", borderRadius:"20px"}}
                            onChange={this.handleSearchArea}
                        />
         </div>
     
         <div className='row' id="BtnRow">
                        <div className='col' id="newCol">
                        <button className='btn btn-success' id="btnAddNew">
                            <a href='add/delivery' style={{textDecoration:"none", color:"white"}}>
                        <i className='fas fa-plus'></i>&nbsp;Add New</a>
                        </button>
                        </div>
                        
        </div> 
       
        <div id="supplierCount">
                <div className='card-body'>
                    <h5 className='card-title' id="DeliveryCardTitile" >✅ No. OF DELIVERIES : <span id="cardText"> {this.state.deliveryCount} </span></h5>        
                </div>
        </div>
        <h2 id="AllDelivery">All Delivery Details</h2>
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
        
      </div>
      </div>
    );
  }
}
