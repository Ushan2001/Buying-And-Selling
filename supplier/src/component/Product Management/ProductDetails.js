import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../NavBar/NavBar';
import Header from "../Dashboard/Header/Header";
export default class ProductDetails extends Component {

    constructor(props){
        super(props)
    
        this.state = {
          product:{},
          imageUrl: ''
        }
      }

      componentDidMount(){
 
        const id = this.props.match.params.id;
    
        axios.get(`http://localhost:8070/product/${id}`).then((res) =>{
          if(res.data.success){
            this.setState({
              product:res.data.product,
              imageUrl: `http://localhost:8070/uploads/${res.data.product.image}`
            })
    
            console.log(this.state.product)
          }
        })
    
      }
  render() {

    const {pid, name, type, description, price, quantity, date, sname, contact,  _id } = this.state.product;
    return (
      <div>
        <Header />
        <div className='container' id="productContainer">
          <h4>{name}</h4>
          <hr/>
      <dl className='row'>
        <dt className='col-sm-3' id="product">Product Tempory ID</dt>
        <dd className='col-sm-9'>{_id}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="product">Product Code</dt>
        <dd className='col-sm-9'>{pid}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="product">Product Category</dt>
        <dd className='col-sm-9'>{type}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="product">Description</dt>
        <dd className='col-sm-9' id="details">{description}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="product">Price</dt>
        <dd className='col-sm-9' id="details">{price}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="product">Quantity</dt>
        <dd className='col-sm-9' id="details">{quantity}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="product">Add Date</dt>
        <dd className='col-sm-9' id="details">{date}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="product">Seller Name</dt>
        <dd className='col-sm-9' id="details">{sname}</dd>
        <br></br><br></br>
        <dt className='col-sm-3' id="product">Seller Contact Number</dt>
        <dd className='col-sm-9' id="details">{contact}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Image</dt>
        <dd className='col-sm-9'>
        <img src={this.state.imageUrl} alt="Product" style={{ maxWidth: '100%', maxHeight: '400px' }} /> </dd>
     
      </dl>
      </div>

      <div style={{marginLeft:"30px", marginTop:"20px"}}>
      <button className='btn btn-dark'><a href='/product' style={{textDecoration:"none", color:"white"}}>
      <i className='fas fa-arrow-left'></i></a></button>
      </div>
      </div>
    )
  }
}
