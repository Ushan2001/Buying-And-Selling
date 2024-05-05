import React, { Component} from 'react'
import axios from "axios";
import Header from '../Dashboard/Header/Header';

export default class HighestSelling extends Component {

    constructor(props){
        super(props)

        this.state = {
            Sumhistorys:[],
        }
    }

    componentDidMount(){
        this.retriveSumHistory()

    }

    retriveSumHistory(){
        axios.get("http://localhost:8070/summary").then((res) =>{
            if(res.data.success){
                const existingSumHistory = res.data.existingSumHistory;
                this.setState({
                    Sumhistorys:existingSumHistory,
                }
            )

                console.log(this.state.Sumhistorys)
            }
        })
    }

    

    filterData(Sumhistorys, searchKey){
   
        const result =  Sumhistorys.filter((history) =>
           history.sid.toLowerCase().includes(searchKey) ||
           history.date.toLowerCase().includes(searchKey) ||
           history.item.toLowerCase().includes(searchKey)
        )
      
        this.setState({historys:result});
      
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/summary").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingSumHistory, searchKey)
     
                    
                 }
             })
     }

     
      
  render() {
    return (
      <div>
        <Header/>
        <div className='container' id="supplierContainer">
        
         <div className='col-lg-3 mt-2 mb-2'>
            <input  className="form-control"
            type='search'
            placeholder='Search'
            name="serchQuery"
            style={{marginLeft:"10px", borderRadius:"20px"}}
            onChange={this.handleSearchArea}/>
         </div>
    
        <div style={{marginBottom:"2%"}}>

                
        <h2 style={{marginTop:"2%"}}>Highest Selling Items</h2>
        <br></br>
         <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'><i className='fas fa-list'></i></th>
                    <th scope='col'>Summary Code</th>
                    <th scope='col'>Date</th>
                    <th scope='col'>Item Code</th>
                </tr>
            </thead>

        <tbody>
            {this.state.Sumhistorys.map((Sumhistorys, index) =>(
                <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>{Sumhistorys.sid}</td>
                    <td>{Sumhistorys.date}</td>
                    <td>{Sumhistorys.item}</td>
                </tr>
            ))}
    
        </tbody>
         </table>

         
      </div>

     
      </div>
      </div>
     
    )
  }
}

