import React, { Component} from 'react'
import axios from "axios";
import PdfButton from './PdfButton';
import Chart from 'chart.js/auto'; 
import Header from '../Dashboard/Header/Header';
import Swal from 'sweetalert2';


export default class HistoryList extends Component {

    constructor(props){
        super(props)

        this.state = {
            historys:[],
            historyCount:0,
        }
    }

    componentDidMount(){
        this.retriveHistory()
        this.initializeChart(this.state.historys);

    }

    retriveHistory(){
        axios.get("http://localhost:8070/history").then((res) =>{
            if(res.data.success){
                const existingHistory = res.data.existingHistory;
                this.setState({
                    historys:existingHistory,
                    historyCount:existingHistory.length
            
                }, () =>{
                this.initializeChart(this.state.historys);
                }
            )

                console.log(this.state.historys)
            }
        })
    }

    onDelete = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You want to delete this history?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://localhost:8070/history/delete/${id}`)
              .then((res) => {
                this.retriveHistory();
                Swal.fire(
                  'Deleted!',
                  'The history has been deleted.',
                  'success'
                );
              })
              .catch((err) => {
                console.error(err);
                Swal.fire(
                  'Error!',
                  'Failed to delete the history.',
                  'error'
                );
              });
          }
        });
      }

    filterData(historys, searchKey){
   
        const result =  historys.filter((history) =>
           history.tid.toLowerCase().includes(searchKey) ||
           history.bname.toLowerCase().includes(searchKey) ||
           history.sname.toLowerCase().includes(searchKey)
        )
      
        this.setState({historys:result, historyCount:result.length});
      
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/history").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingHistory, searchKey)
     
                    
                 }
             })
     }

     initializeChart(historys) {
        const ctxB = document.getElementById('barChart');
    
        if (!ctxB || !historys) return;
    
        if (this.chartInstance) {
          this.chartInstance.destroy(); // Destroy existing chart instance
        }
    
        const labels = historys.map((history) => history.pname);
        const data = historys.map((history) => history.quantity);
    
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
                tension: 0.4
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
                  text: 'Product Name',
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
        <Header/>
        <div className='container' id="supplierContainer">
        
        
        <div id='barChartContainer' style={{ marginBottom: '5%' }}>
            <canvas id='barChart'></canvas>

          </div>

         <div className='col-lg-3 mt-2 mb-2'>
            <input  className="form-control"
            type='search'
            placeholder='Search'
            name="serchQuery"
            style={{marginLeft:"10px", borderRadius:"20px"}}
            onChange={this.handleSearchArea}/>
         </div>
         <div className='row' id="BtnRow">
                        <div className='col' id="newCol" style={{marginLeft:"-15%"}}>
                        <button className='btn btn-success' id="supplierAdd">
                            <a href='add/history' style={{textDecoration:"none", color:"white"}}>
                        <i className='fas fa-plus'></i>&nbsp;Add New</a>
                        </button>
                        </div>
        </div> 

        <div className='card-body'>
              <h5 className='card-title' id="SupplierCardTitile" >✅ Number of Transactions : <span id="cardText"> {this.state.historyCount} </span></h5>        
            </div>


        <h2 style={{marginTop:"2%"}}>Transaction History</h2>
        <br></br>
         <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'><i className='fas fa-list'></i></th>
                    <th scope='col'>Transaction Code</th>
                    <th scope='col'>Buyer Name</th>
                    <th scope='col'>Seller Name</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>

        <tbody>
            {this.state.historys.map((historys, index) =>(
                <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>
                        <a href= {`/history/${historys._id}`} style={{textDecoration:"none"}}>
                        {historys.tid}
                        </a>
                        </td>
                    <td>{historys.bname}</td>
                    <td>{historys.sname}</td>
                    <td>
                        <a className='btn' id="editBtn" href={`/edithistory/${historys._id}`}>
                            <i className='fas fa-edit' id="editIcon"></i>
                        </a>
                        &nbsp;
                        <a className='btn' id="editDelete" href='# ' onClick={() => this.onDelete(historys._id)}>
                            <i className='fas fa-trash-alt' id="DeleteIcon"></i>
                        </a>
                        &nbsp;<PdfButton history={historys} />
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
