import React, { Component} from 'react'
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import PdfButton from './PdfButton';
import Chart from 'chart.js/auto'; 


export default class HistoryList extends Component {

    constructor(props){
        super(props)

        this.state = {
            historys:[]
        }
    }

    componentDidMount(){
        this.retriveHistory()
        this.initializeChart();
    }

    retriveHistory(){
        axios.get("http://localhost:8070/history").then((res) =>{
            if(res.data.success){
                this.setState({
                    historys:res.data.existingHistory
                })

                console.log(this.state.historys)
            }
        })
    }

    onDelete = (id) =>{
        const isConfirmed = window.confirm('Are you sure you want to delete this histry?');

        if (isConfirmed) {
            axios.delete(`http://localhost:8070/history/delete/${id}`)
                .then((res) => {
                    this.retriveHistory();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    filterData(historys, searchKey){
   
        const result =  historys.filter((history) =>
           history.tid.toLowerCase().includes(searchKey) ||
           history.bname.toLowerCase().includes(searchKey) ||
           history.sname.toLowerCase().includes(searchKey)
        )
      
        this.setState({historys:result})
      
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/history").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingHistory, searchKey)
     
                    
                 }
             })
     }

     initializeChart() {
        const ctxL = document.getElementById("lineChart");
    
        if (!ctxL) return;
    
        if (this.chartInstance) {
            this.chartInstance.destroy(); // Destroy existing chart instance
        }
    
        this.chartInstance = new Chart(ctxL, {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: 'rgba(105, 0, 132, .2)',
                    borderColor: 'rgba(200, 99, 132, .7)',
                    borderWidth: 2,
                    fill:true,
                },
                {
                    label: "My Second dataset",
                    data: [28, 48, 40, 19, 86, 27, 90],
                    backgroundColor: 'rgba(0, 137, 132, .2)',
                    borderColor: 'rgba(0, 10, 130, .7)',
                    borderWidth: 2,
                    fill:true,
                }]
            },
            options: {
                responsive: true
            }
        });
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
        
         <canvas id="lineChart"></canvas>

        <h2 style={{marginTop:"10%"}}>Transaction History</h2>
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
                        <a className='btn btn-warning' href={`/edithistory/${historys._id}`}>
                            <i className='fas fa-edit'></i>&nbsp;Edit
                        </a>
                        &nbsp;
                        <a className='btn btn-danger' href='# ' onClick={() => this.onDelete(historys._id)}>
                            <i className='fas fa-trash-alt'></i>&nbsp;Delete
                        </a>
                        &nbsp;<PdfButton history={historys} />
                    </td>
                </tr>
            ))}
    
        </tbody>
         </table>

         <button className='btn btn-success'><a href='add/history' style={{textDecoration:"none", color:"white"}}>
         <i className='fas fa-plus'></i>&nbsp;Add New</a></button>
        
      </div>

     
      </div>
    )
  }
}
