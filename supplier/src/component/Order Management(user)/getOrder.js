import React, { Component } from 'react'
import axios from 'axios';
import UserNavBar from '../NavBar/UserNavBar'
import "./order.css"

export default class getOrder extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          orders: [],
         
        };
      }
    
      componentDidMount() {
        this.retrieveOrder();   
      }
    
      retrieveOrder() {
        axios.get('http://localhost:8070/orders').then((res) => {
          if (res.data.success) {
            this.setState({
              orders: res.data.existingOrder,
            });
            console.log(this.state.orders);
          }
        });
      }
       
      
      filterData(orders, searchKey){
        const result = orders.filter((order) =>
            order.name.toLowerCase().includes(searchKey) ||
            order.number.toLowerCase().includes(searchKey) || 
            order.send.toLowerCase().includes(searchKey) 
        );
    
        this.setState({orders: result});
    }
    
      handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
    
        axios.get('http://localhost:8070/orders').then((res) => {
          if (res.data.success) {
            this.filterData(res.data.existingOrder, searchKey);
          }
        });
      };
    
  render() {
    return (
      <div>
        <UserNavBar/>
        <div className='container'>

          <div className='row' id="getOrderRow">

          <div className='col-md-4'>
         <div>
          <h2 id='btnAllOrder'>Customer Orders</h2>
          </div>
          </div>
            <div className='col-md-7' id="searchCol">
        <div className='col-lg-3 mt-2 mb-2'>
            <input
              className='form-control'
              type='search'
              id="orderSearch"
              placeholder='Search'
              name='serchQuery'
              style={{ marginLeft: '20px', borderRadius: '20px' }}
              onChange={this.handleSearchArea}
            />
          </div>
          </div>
          </div>

          <div className="row">
            {this.state.orders.map((order, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card animated-card" id="orderCard" style={{backgroundImage: 'url("/images/back.jpg")'}}>
  <div className="card-body" id="orderBody">
    <h5 className="card-title" id="orderTitle">{order.name}</h5>
    <p className="card-text" id="orderText2">Delivery Status: <span id="status"> {order.send} </span></p>
    
  </div>
</div>


              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
