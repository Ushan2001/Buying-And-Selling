import React, { Component } from 'react';
import axios from "axios";
import Header from "../Dashboard/Header/Header";
import PdfButton from './PdfButton';
import "./product.css";
import { orderCount } from '../Order/OrderList';


export default class productList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            products: [],
            initialProductCount:0,
            productCount: 0,
            stockInRate: 0, 
            stockOutRate:0,
        }
    }

    componentDidMount() {
        this.retriveProduct();
    }

    retrieveOrder() {
        axios.get('http://localhost:8070/orders').then((res) => {
          if (res.data.success) {
            const existingOrder = res.data.existingOrder;

            this.setState({
              orders:existingOrder,
              orderCount:existingOrder.length
             
            }, () => {
              // Call initializeChart after setting state
              this.initializeChart(this.state.orders);
            });
      
            console.log(this.state.orders);
          }
        });
      }

    retriveProduct() {

        axios.get("http://localhost:8070/products")
            .then((res) => {
                if (res.data.success) {
                    const existingProduct = res.data.existingProduct;
                    const productCount = existingProduct.length;

                
                    const stockInRate = (productCount/24) * 100;

                    const stockOutRate = (orderCount/24) * 100;

                    this.setState({
                        products: existingProduct,
                        initialProductCount: productCount,
                        productCount,
                        stockInRate,
                        stockOutRate,
                    });
                }
            })
            .catch((error) => console.error(error));
    }


    onDelete = (id) => {
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

    filterData(products, searchKey) {

        const result = products.filter((product) =>
            product.name.toLowerCase().includes(searchKey) ||
            product.pid.toLowerCase().includes(searchKey) ||
            product.price.toLowerCase().includes(searchKey)
        )

        this.setState({ products: result })

    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value

        axios.get("http://localhost:8070/products").then((res) => {
            if (res.data.success) {

                this.filterData(res.data.existingProduct, searchKey)

            }
        })
    }

  render() {
    return (
      <div>
       <Header/>
        <div className='container' id="productContainer">
         <div className='col-lg-3 mt-2 mb-2'>
            <input  className="form-control"
            type='search'
            placeholder='Search'
            name="serchQuery"
            style={{marginLeft:"0px", borderRadius:"20px"}}
            onChange={this.handleSearchArea}/>
         </div>
         <div className='row' style={{marginTop:"2%",marginBottom:"2%"}} >
            <div className='col-md-2'>

         <div style={{marginTop:"3%", marginBottom:"3%"}}>
         <button className='btn btn-dark'><a href='/RequestedProduct' style={{textDecoration:"none", color:"white"}}>
         <i class="bi bi-bag-plus-fill"></i>&nbsp;Requested Product</a></button>
         </div>
         </div>
         <div className='col-md-2'>

         <div style={{marginTop:"3%", marginBottom:"3%"}}>
         <button className='btn btn-warning'><a href='/inventory/requeste/order' style={{textDecoration:"none", color:"white"}}>
         <i class="bi bi-bag-plus-fill"></i>&nbsp;Inventory  Orders</a></button>
         </div>
         </div>
         </div>

         <div style={{marginBottom:"3%"}}>
         <button className='btn btn-success'><a href='add/product' style={{textDecoration:"none", color:"white"}}>
         <i className='fas fa-plus'></i>&nbsp;Add New</a></button>
         </div>

                    <div id="productCount" style={{ marginBottom: "20px" }}>
                        <div className='card-body'>
                            <h5 className='card-title' id="ProductCardTitile" >
                                ✅ No. OF PRODUCTS : <span id="cardText">{this.state.productCount}</span>
                            </h5>
                    
                        </div>
                    </div>
                    <h2>All Products</h2>

<button className='btn btn-success' id="addBtn"><a href='add/product' style={{ textDecoration: "none", color: "white" }}>
    <i className='fas fa-plus'></i>&nbsp;Add New</a></button>
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
        {this.state.products.map((products, index) => (
            <tr key={index}>
                <th scope='row'>{index + 1}</th>

                <td>{products.pid}</td>
                <td>{products.name}</td>
                <td>{products.price}</td>
                <td>
                    <a className='btn' id="editBtn" href={`/editproduct/${products._id}`}>
                        <i className='fas fa-edit' id="editIcon"></i>&nbsp;
                    </a>
                    &nbsp;
                    <a className='btn' href='# ' id="editDelete" onClick={() => this.onDelete(products._id)}>
                        <i className='fas fa-trash-alt' id="DeleteIcon"></i>&nbsp;
                    </a>
                    &nbsp;<PdfButton product={products} />&nbsp;

                    <a href={`/product/${products._id}`} id="view">VIEW</a>
                </td>
            </tr>
        ))}

    </tbody>
</table>

            <div className="rate-display">
            <label className="rate-label" htmlFor="exampleInputPassword1" id='product'>Stock In Rate Per Day</label>
            <div className="rate-value">{this.state.stockInRate.toFixed(2)}% </div>
          </div>
          <div className="rate-display">
            <label className="rate-label" htmlFor="exampleInputPassword1" id='product'>Stock Out Rate Per Day</label>
            <div className="rate-value">{this.state.stockOutRate.toFixed(2)}% </div>
          </div>
                </div>
            </div>
        );
  }
}
