import React, { Component } from 'react'
import axios from "axios";
import Header from '../Dashboard/Header/Header';
import "./complain.css"



export default class compaintlist extends Component {

    constructor(props){
        super(props)

        this.state = {
            complains:[]
        }
    }

    componentDidMount(){
        this.retrivecomplain()
    }

    retrivecomplain(){
        axios.get("http://localhost:8070/complains").then((res) =>{
            if(res.data.success){
                this.setState({
                    complains:res.data.existingComplain
                })

                console.log(this.state.complains)
            }
        })
    }

    onDelete = (id) =>{
        const isConfirmed = window.confirm('Are you sure you want to delete this discount?');

        if (isConfirmed) {
            axios.delete(`http://localhost:8070/complain/delete/${id}`)
                .then((res) => {
                    this.retrivecomplain();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    filterData(complains, searchKey){
   
        const result =  complains.filter((complain) =>
           complain.name.toLowerCase().includes(searchKey) ||
           complain.email.toLowerCase().includes(searchKey) ||
           complain.message.toLowerCase().includes(searchKey)
        )
      
        this.setState({complains:result})
      
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/complains").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingComplain, searchKey)
     
                    
                 }
             })
     }

  render() {
    return (
      <div>
        <Header/>
        <div className='container' id="ComplainContainer">
         <div className='col-lg-3 mt-2 mb-2'>
            <input  className="form-control"
            type='search'
            placeholder='Search'
            name="serchQuery"
            style={{marginLeft:"100px"}}
            onChange={this.handleSearchArea}/>
         </div>
        

        <h2>All Complain</h2>
        <br></br>
         <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'><i className='fas fa-list-ol'></i></th>
                    <th scope='col'>Name</th>
                    <th scope='col'>E-mail</th>
                    <th scope='col'>Message</th>
                    
                </tr>
            </thead>

        <tbody>
            {this.state.complains.map((complain, index) =>(
                <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>
                        <a href= {`/Complains/${complain._id}`} style={{textDecoration:"none"}}>
                        {complain.name}
                        </a>
                        </td>
                    <td>{complain.email}</td>
                    <td>{complain.message}</td>
                    <td>
                        
                        <a className='btn btn-danger' href='# ' onClick={() => this.onDelete(complain._id)}>
                            <i className='fas fa-trash-alt'></i>&nbsp;Delete
                        </a>
                        
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
