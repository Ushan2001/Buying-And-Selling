import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Dashboard/Header/Header';
import "./style.css"

export default class RequestedOrder extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          orders: [],
          currentPage: 1,
          itemsPerPage: 10,
         
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


  handlePageChange = (pageNumber) => {
    this.setState({
      currentPage: pageNumber
    });
  };


  requestedorderColor=(send)=>{
    let color;
    if(send==="Delivered"){
      color="blue"
    }
    else{
      color="tomato"
    }
    return {color};
  }

  render() {

    const { orders, currentPage, itemsPerPage } = this.state;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    return (
      <div>
        <Header />
        <div className='container' id="supplierContainer" style={{maxWidth:"80%"}}>
            
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
          </div><br></br>

        
          <h2 id='btnAllOrder'>Requested Orders</h2>
          <br></br>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>
                  <i className='fas fa-list'></i>
                </th>
                <th scope='col'>Customer Name</th>
                <th scope='col'>Contact Number</th>
                <th scope='col'>Delivery Status</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>

            <tbody>
            {currentItems.map((order, index) => (
             
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td id='order'>{order.name}</td>
                  <td id='order'>{order.number}</td>
                  <td id='order' style={this.requestedorderColor(order.send)}>{order.send}</td>
                  <td>
                    <a className='btn' id='btnEdit' href={`/edit/request/order/${order._id}`}>
                      <i className='fas fa-edit' id='EditIcon'></i>
                    </a>
                  </td>
                </tr>
              ))}
          
            </tbody>
          </table>

          

         {/* Pagination */}
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => this.handlePageChange(currentPage - 1)}><i class="bi bi-skip-backward"></i></button>
              </li>
              {Array.from({length: Math.ceil(orders.length / itemsPerPage)}, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => this.handlePageChange(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === Math.ceil(orders.length / itemsPerPage) ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => this.handlePageChange(currentPage + 1)}><i class="bi bi-skip-forward"></i></button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
