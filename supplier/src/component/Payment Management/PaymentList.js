import React, { Component } from 'react'
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import PdfButton from './PdfButton';


export default class PaymentList extends Component {

    constructor(props){
        super(props)

        this.state = {
            payments:[]
        }
    } 

    componentDidMount(){
        this.retrivePayment()
    }

    retrivePayment(){
        axios.get("http://localhost:8070/payments").then((res) =>{
            if(res.data.success){
                this.setState({
                    payments:res.data.existingPayment
                })

                console.log(this.state.payments)
            }
        })
    }

    onDelete = (id) =>{
        const isConfirmed = window.confirm('Are you sure you want to delete this payment?');

        if (isConfirmed) {
            axios.delete(`http://localhost:8070/payment/delete/${id}`)
                .then((res) => {
                    this.retrivePayment();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    filterData(payments, searchKey){
   
        const result =  payments.filter((payment) =>
           payment.customer.toLowerCase().includes(searchKey) ||
           payment.phone.toLowerCase().includes(searchKey) ||
           payment.pid.toLowerCase().includes(searchKey)
    
        )
      
        this.setState({payments:result})
      
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/payments").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingPayment, searchKey)

                 }
             })
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
        

        <h2>All Payments</h2>
        <br></br>
         <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'><i className='fas fa-list'></i></th>
                    <th scope='col'>Customer Name</th>
                    <th scope='col'>Phone</th>
                    <th scope='col'>Product Code</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>

        <tbody>
            {this.state.payments.map((payments, index) =>(
                <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>
                        <a href= {`/payment/${payments._id}`} style={{textDecoration:"none"}}>
                        {payments.customer}
                        </a>
                        </td>
                    <td>{payments.phone}</td>
                    <td>{payments.pid}</td>
                    <td>
                        <a className='btn btn-warning' href={`/editpayment/${payments._id}`}>
                            <i className='fas fa-edit'></i>&nbsp;Edit
                        </a>
                        &nbsp;
                        <a className='btn btn-danger' href='# ' onClick={() => this.onDelete(payments._id)}>
                            <i className='fas fa-trash-alt'></i>&nbsp;Delete
                        </a>
                        &nbsp;<PdfButton payment={payments} />
                    </td>
                </tr>
            ))}
    
        </tbody>
         </table>

         <button className='btn btn-success'><a href='add/payment' style={{textDecoration:"none", color:"white"}}>
         <i className='fas fa-plus'></i>&nbsp;Add New</a></button>
        
      </div>
      </div>
    )
  }
}
