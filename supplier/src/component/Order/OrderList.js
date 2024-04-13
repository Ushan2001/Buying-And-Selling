import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Dashboard/Header/Header';
import PdfButton from './PdfButton';
import './order.css';
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2';

export default class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      token: ""
    };
  }

  componentDidMount() {
    this.fetchToken();
    this.retrieveOrder();
    this.initializeChart(this.state.orders); // Initialize chart with initial order data
    
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
        this.setState({
          orders: res.data.existingOrder,
        }, () => {
          // Call initializeChart after setting state
          this.initializeChart(this.state.orders);
        });
  
        console.log(this.state.orders);
      }
    });
  }
  

  onDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this Order?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8070/order/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${this.state.token}`
          }
          })
          .then((res) => {
            this.retrieveOrder();
            Swal.fire(
                'Deleted!',
                'The Order has been deleted.',
                'success'
            );
        })
        .catch((err) => {
            console.error(err);
            Swal.fire(
                'Error!',
                'Failed to delete the Order.',
                'error'
            );
        });
      }
    });
  };
  
  filterData(orders, searchKey){
    const result = orders.filter((order) =>
        order.name.toLowerCase().includes(searchKey) ||
        order.number.toLowerCase().includes(searchKey) || 
        order.oid.toLowerCase().includes(searchKey) 
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

  initializeChart(orders) {
    const ctxB = document.getElementById('barChart');

    if (!ctxB || !orders) return;

    if (this.chartInstance) {
      this.chartInstance.destroy(); // Destroy existing chart instance
    }

    const labels = orders.map((order) => order.oid);
    const data = orders.map((order) => order.quantity);

    this.chartInstance = new Chart(ctxB, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Quantity',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue background
            fill:true,
            borderColor: 'rgba(54, 162, 235, 1)', // Blue border
            borderWidth: 2,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Blue points
            pointBorderColor: '#fff', // White points border
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.3
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Product Code',
              color: "#333",
              font: {
                weight:1000,
              }
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              color: "#333"
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Quantity',
              color: "#333",
              font: {
                weight:1000,
              }
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              color: "#333"
            }
          },
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart',
        }
      },
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className='container' id='orderContainer'>
            
          <div id='barChartContainer' style={{ marginBottom: '5%' }}>
            <canvas id='barChart'></canvas>

          </div>

          <div className='col-lg-3 mt-2 mb-2'>
            <input
              className='form-control'
              type='search'
              placeholder='Search'
              name='serchQuery'
              style={{ marginLeft: '20px', borderRadius: '20px' }}
              onChange={this.handleSearchArea}
            />
          </div>

          <button className='btn btn-success' id='btnAddNew'>
            <a href='add/order' style={{ textDecoration: 'none', color: 'white' }}>
              <i className='fas fa-plus'></i>&nbsp;Add New
            </a>
          </button>

          <h2 id='btnAllOrder'>Customer Orders</h2>
          <br></br>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>
                  <i className='fas fa-list'></i>
                </th>
                <th scope='col'>Customer Name</th>
                <th scope='col'>Contact Number</th>
                <th scope='col'>Product Code</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.orders.map((order, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td id='order'>{order.name}</td>
                  <td id='order'>{order.number}</td>
                  <td id='order'>{order.oid}</td>
                  <td>
                    <a className='btn' id='btnEdit' href={`/editorder/${order._id}`}>
                      <i className='fas fa-edit' id='EditIcon'></i>
                    </a>
                    &nbsp;
                    <a className='btn' id='btnDelete' href='# ' onClick={() => this.onDelete(order._id)}>
                      <i className='fas fa-trash-alt' id='DeleteIcon'></i>
                    </a>
                    &nbsp;<PdfButton order={order} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href={`/order/${order._id}`} id='view'>
                      VIEW
                    </a>
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
