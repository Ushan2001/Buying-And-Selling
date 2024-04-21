import React, { Component } from 'react'
import axios from "axios";
import Header from '../Dashboard/Header/Header';


export default class DiscountList extends Component {

    constructor(props){
        super(props)

        this.state = {
            discounts:[]
        }
    }

    componentDidMount(){
        this.retriveDiscount()
    }

    retriveDiscount(){
        axios.get("http://localhost:8070/discounts").then((res) =>{
            if(res.data.success){
                this.setState({
                    discounts:res.data.existingDiscount
                })

                console.log(this.state.discounts)
            }
        })
    }

    onDelete = (id) =>{
        const isConfirmed = window.confirm('Are you sure you want to delete this discount?');

        if (isConfirmed) {
            axios.delete(`http://localhost:8070/discount/delete/${id}`)
                .then((res) => {
                    this.retriveDiscount();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    filterData(discounts, searchKey){
   
        const result =  discounts.filter((discount) =>
           discount.name.toLowerCase().includes(searchKey) ||
           discount.category.toLowerCase().includes(searchKey) ||
           discount.pdiscount.toLowerCase().includes(searchKey)
        )
      
        this.setState({discounts:result})
      
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/discounts").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingDiscount, searchKey)
     
                    
                 }
             })
     }

  render() {
    return (
      <div>
        <Header/>
        <div className='container' id="discountContainer">
         <div className='col-lg-3 mt-2 mb-2'>
            <input  className="form-control"
            type='search'
            placeholder='Search'
            name="serchQuery"
            style={{marginLeft:"1000px"}}
            onChange={this.handleSearchArea}/>
         </div>
        

         

        <h2 id="AllSupplier">All Discount</h2>

        <button className='btn btn-success' id="disAdd"><a href='add/discount' style={{textDecoration:"none", color:"white"}}>
         <i className='fas fa-plus'></i>&nbsp;Add New</a></button>

        <br></br>
         <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'><i className='fas fa-list-ol'></i></th>
                    <th scope='col'>Product Name</th>
                    <th scope='col'>Category</th>
                    <th scope='col'>Discount</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>

        <tbody>
            {this.state.discounts.map((discounts, index) =>(
                <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>
                        <a href= {`/discount/${discounts._id}`} style={{textDecoration:"none"}}>
                        {discounts.name}
                        </a>
                        </td>
                    <td id="dayment">{discounts.category}</td>
                    <td id="dayment">{discounts.pdiscount}</td>
                    <td>
                        <a className='btn' id="editBtn" href={`/editdiscount/${discounts._id}`}>
                            <i className='fas fa-edit' id="editIcon"></i>&nbsp;
                        </a>
                        &nbsp;
                        <a className='btn' id="editDelete" href='# ' onClick={() => this.onDelete(discounts._id)}>
                            <i className='fas fa-trash-alt' id="DeleteIcon"></i>&nbsp;
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
