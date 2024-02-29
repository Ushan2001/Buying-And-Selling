import React, { Component } from 'react'
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import PdfButton from './PdfButton';


export default class productList extends Component {

    constructor(props){
        super(props)

        this.state = {
            products:[]
        }
    }

    componentDidMount(){
        this.retriveProduct()
    }

    retriveProduct(){
        axios.get("http://localhost:8070/products").then((res) =>{
            if(res.data.success){
                this.setState({
                    products:res.data.existingProduct
                })

                console.log(this.state.products)
            }
        })
    }

    onDelete = (id) =>{
        const isConfirmed = window.confirm('Are you sure you want to delete this product?');

        if (isConfirmed) {
            axios.delete(`http://localhost:8070/product/delete/${id}`)
                .then((res) => {
                    this.retriveProduct();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    filterData(products, searchKey){
   
        const result =  products.filter((product) =>
           product.name.toLowerCase().includes(searchKey) ||
           product.pid.toLowerCase().includes(searchKey) ||
           product.price.toLowerCase().includes(searchKey)
        )
      
        this.setState({products:result})
      
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/products").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingProduct, searchKey)
     
                    
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
        

        <h2>All Products</h2>
        <br></br>
         <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'><i className='fas fa-list-ol'></i></th>
                    <th scope='col'>Product Code</th>
                    <th scope='col'>Product Name</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>

        <tbody>
            {this.state.products.map((products, index) =>(
                <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>
                        <a href= {`/product/${products._id}`} style={{textDecoration:"none"}}>
                        {products.pid}
                        </a>
                        </td>
                    <td>{products.name}</td>
                    <td>{products.price}</td>
                    <td>
                        <a className='btn btn-warning' href={`/editproduct/${products._id}`}>
                            <i className='fas fa-edit'></i>&nbsp;Edit
                        </a>
                        &nbsp;
                        <a className='btn btn-danger' href='# ' onClick={() => this.onDelete(products._id)}>
                            <i className='fas fa-trash-alt'></i>&nbsp;Delete
                        </a>
                        &nbsp;<PdfButton product={products} />
                    </td>
                </tr>
            ))}
    
        </tbody>
         </table>

         <button className='btn btn-success'><a href='add/product' style={{textDecoration:"none", color:"white"}}>
         <i className='fas fa-plus'></i>&nbsp;Add New</a></button>
        
      </div>
      </div>
    )
  }
}
