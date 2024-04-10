import React, { Component } from 'react'
import axios from "axios";
import Header from '../Dashboard/Header/Header';

export default class DeliveryList extends Component {

    constructor(props){
        super(props)

        this.state = {
            deliverys:[]
        }
    } 

    componentDidMount(){
        this.retriveDelivery()
    }

    retriveDelivery(){
        axios.get("http://localhost:8070/deliverys").then((res) =>{
            if(res.data.success){
                this.setState({
                    deliverys:res.data.existingDelivery
                })

                console.log(this.state.deliverys)
            }
        })
    }

    onDelete = (id) =>{
        const isConfirmed = window.confirm('Are you sure you want to delete this delivery details?');

        if (isConfirmed) {
            axios.delete(`http://localhost:8070/delivery/delete/${id}`)
                .then((res) => {
                    this.retriveDelivery();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    filterData(deliverys, searchKey){
   
        const result =  deliverys.filter((delivery) =>
           delivery.name.toLowerCase().includes(searchKey) ||
           delivery.number.toLowerCase().includes(searchKey) ||
           delivery.code.toLowerCase().includes(searchKey)
    
        )
      
        this.setState({deliverys:result})
      
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/deliverys").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingDelivery, searchKey)
     
                    
                 }
             })
     }

  render() {
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
                        <a className='btn btn-warning' id="editBtn" href={`/editdelivery/${deliverys._id}`}>
                            <i className='fas fa-edit' id="editIcon"></i>&nbsp;
                        </a>
                        &nbsp;
                        <a className='btn btn-danger' id="editDelete" href='# ' onClick={() => this.onDelete(deliverys._id)}>
                            <i className='fas fa-trash-alt' id="DeleteIcon"></i>&nbsp;
                        </a>
                       
                           
                    </td>
                </tr>
            ))}
    
        </tbody>
         </table>

        
        
      </div>
      </div>
    )
  }
}
