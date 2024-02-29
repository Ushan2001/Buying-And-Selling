import React, { Component } from 'react'
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import PdfButton from './PdfButton';



export default class SupplierList extends Component {

    constructor(props){
        super(props)

        this.state = {
            suppliers:[]
        }
    }

    componentDidMount(){
        this.retriveSupplier()
    }

    retriveSupplier(){
        axios.get("http://localhost:8070/supplier").then((res) =>{
            if(res.data.success){
                this.setState({
                    suppliers:res.data.existingSupplier
                })

                console.log(this.state.suppliers)
            }
        })
    }

    onDelete = (id) =>{
        const isConfirmed = window.confirm('Are you sure you want to delete this supplier?');

        if (isConfirmed) {
            axios.delete(`http://localhost:8070/supplier/delete/${id}`)
                .then((res) => {
                    this.retriveSupplier();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    filterData(suppliers, searchKey){
   
        const result =  suppliers.filter((supplier) =>
           supplier.sid.toLowerCase().includes(searchKey) ||
           supplier.name.toLowerCase().includes(searchKey) 
    
        )
      
        this.setState({suppliers:result})
      
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/supplier").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingSupplier, searchKey)
     
                    
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
        

        <h2>All Suppliers</h2>
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
            {this.state.suppliers.map((suppliers, index) =>(
                <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>
                        <a href= {`/supplier/${suppliers._id}`} style={{textDecoration:"none"}}>
                        {suppliers.sid}
                        </a>
                        </td>
                    <td>{suppliers.name}</td>
                    <td>{suppliers.address}</td>
                    <td>
                        <a className='btn btn-warning' href={`/editsupplier/${suppliers._id}`}>
                            <i className='fas fa-edit'></i>&nbsp;Edit
                        </a>
                        &nbsp;
                        <a className='btn btn-danger' href='# ' onClick={() => this.onDelete(suppliers._id)}>
                            <i className='fas fa-trash-alt'></i>&nbsp;Delete
                        </a>
                        &nbsp;<PdfButton supplier={suppliers} />
                    </td>
                </tr>
            ))}
    
        </tbody>
         </table>

         <button className='btn btn-success'><a href='add/supplier' style={{textDecoration:"none", color:"white"}}>
         <i className='fas fa-plus'></i>&nbsp;Add New</a></button>
        
      </div>
        
      </div>
    )
  }
}
