import React, { Component } from 'react'
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import PdfButton from './PdfButton';

export default class OrderList extends Component {

    constructor(props){
        super(props)

        this.state = {
            orders:[]
        }
    }

    componentDidMount(){
        this.retriveOrder()
    }

    retriveOrder(){
        axios.get("http://localhost:8070/orders").then((res) =>{
            if(res.data.success){
                this.setState({
                    orders:res.data.existingOrder
                })

                console.log(this.state.orders)
            }
        })
    }

    
    onDelete = (id) =>{
        const isConfirmed = window.confirm('Are you sure you want to delete this Order?');

        if (isConfirmed) {
            axios.delete(`http://localhost:8070/order/delete/${id}`)
                .then((res) => {
                    this.retriveOrder();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    filterData(orders, searchKey){
   
        const result =  orders.filter((order) =>
           order.name.toLowerCase().includes(searchKey) ||
           order.number.toLowerCase().includes(searchKey) ||
           order.oid.toLowerCase().includes(searchKey)
        )
      
        this.setState({orders:result})
      
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/orders").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingOrder, searchKey)
     
                    
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
        

        <h2>All Orders</h2>
        <br></br>
         <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'><i className='fas fa-list'></i></th>
                    <th scope='col'>Customer Name</th>
                    <th scope='col'>Contact Number</th>
                    <th scope='col'>Product Code</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>

        <tbody>
            {this.state.orders.map((orders, index) =>(
                <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>
                        <a href= {`/order/${orders._id}`} style={{textDecoration:"none"}}>
                        {orders.name}
                        </a>
                        </td>
                    <td>{orders.number}</td>
                    <td>{orders.oid}</td>
                    <td>
                        <a className='btn btn-warning' href={`/editorder/${orders._id}`}>
                            <i className='fas fa-edit'></i>&nbsp;Edit
                        </a>
                        &nbsp;
                        <a className='btn btn-danger' href='# ' onClick={() => this.onDelete(orders._id)}>
                            <i className='fas fa-trash-alt'></i>&nbsp;Delete
                        </a>
                        &nbsp;<PdfButton order={orders} />
                    </td>
                </tr>
            ))}
    
        </tbody>
         </table>

         <button className='btn btn-success'><a href='add/order' style={{textDecoration:"none", color:"white"}}>
         <i className='fas fa-plus'></i>&nbsp;Add New</a></button>
        
      </div>
        
      </div>
    )
  }
}
