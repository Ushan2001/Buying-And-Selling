import React, { Component } from 'react';
import axios from 'axios';
import UserNavBar from '../NavBar/UserNavBar';

export default class UserProductDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      product: {},
      imageUrl: ''
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:8070/product/${id}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            product: res.data.product,
            imageUrl: `http://localhost:8070/uploads/${res.data.product.image}`
          });
        }
      });
  }


  

  render() {
    const { pid, name, type, description, price, quantity, date, _id } = this.state.product;

    return (
      <div>
        <UserNavBar />
        <div style={{ marginTop: '40px' }} className='container'>
          <h2 className="mb-4">{name}</h2>
          <div className='row'>
            <div className='col-md-6'>
              <img src={this.state.imageUrl} alt="Product" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }} />
            </div>
            <div className='col-md-6'>
              <dl className='row'>
                <div className='col-sm-6'>
                  <dt>Product Tempory ID:</dt>
                  <dd>{_id}</dd>

                  <dt>Product Code:</dt>
                  <dd>{pid}</dd>

                  <dt>Product Category:</dt>
                  <dd>{type}</dd>
                </div>

                <div className='col-sm-6'>
                  <dt>Description:</dt>
                  <dd>{description}</dd>

                  <dt>Price:</dt>
                  <dd>{price}</dd>

                  <dt>Quantity:</dt>
                  <dd>{quantity}</dd>

                  <dt>Add Date:</dt>
                  <dd>{date}</dd>
                </div>
              </dl>
           <div>
            <p>You Can Choose Cash on Delivery Method Click This Button</p>
              <button className='btn btn-dark'>
            <a href='/user/add/order' target='_black' style={{ textDecoration: "none", color: "white" }}>
              Order Item&nbsp;<i className='fas fa-arrow-right'></i>
            </a>
          </button>

          </div>

          <div style={{marginTop:"30px"}}>
          <p>You Can Choose Online Payment Method Click This Button</p>
          <button className='btn btn-dark mr-2'>
               <a href='/user/payment' target='_black' style={{ textDecoration: "none", color: "white" }}>
               Proceed to Payment&nbsp;<i className='fas fa-credit-card'></i>
            </a>
          </button>

          </div>

            </div>
          </div>
        </div>

        <div className="ml-3 mt-3">
          <button className='btn btn-dark'>
            <a href='/userproduct' style={{ textDecoration: "none", color: "white" }}>
              <i className='fas fa-arrow-left'></i> Back to Products
            </a>
          </button>
        </div>
      </div>
    );
  }
}
