import React, { Component } from 'react'
import axios from 'axios';
import UserNavBar from '../NavBar/UserNavBar';

export default class UserDiscountList extends Component {

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
        <UserNavBar/>
         <div className="container" style={{ marginTop: '40px' }}>
          <div className="col-lg-3 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              style={{ marginLeft: '1000px' }}
              onChange={this.handleSearchArea}
            />
          </div>

          <h2><b>𝚃𝚘𝚍𝚊𝚢 𝙳𝚒𝚜𝚌𝚘𝚞𝚗𝚝 𝙾𝚏𝚏𝚎𝚛</b></h2>
          <br></br>
          <div className="row">
            {this.state.discounts.map((discount, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card animated-card" style={{ width: '18rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', overflow: 'hidden', backgroundImage: 'url("/images/back.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="card-body" style={{ backgroundColor: 'rgba(255, 255, 255, 0)', padding: '16px' }}>
    <h5 className="card-title" style={{ color: '#343a40', fontSize: '1.5rem', marginBottom: '8px' }}>{discount.name}</h5>
    <p className="card-text" style={{ color: '#000', fontSize: '1rem', marginBottom: '4px' }}>Category: {discount.category}</p>
    <p className="card-text" style={{ color: '#28a745', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>Discount: {discount.pdiscount}</p>
    <a href={`/userdiscount/${discount._id}`} className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff', borderRadius: '4px' }}>
      View Details
    </a>
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
