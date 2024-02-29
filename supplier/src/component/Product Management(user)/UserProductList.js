import React, { Component } from 'react'
import axios from 'axios';
import UserNavBar from '../NavBar/UserNavBar';
import "./card.css"

export default class UserProductList extends Component {

    constructor(props){
        super(props)

        this.state = {
            products:[]
        }
    }

    componentDidMount(){
        this.retriveProduct()
    }

    retriveProduct(){
        axios.get("http://localhost:8070/products").then((res) =>{
            if(res.data.success){
                this.setState({
                    products:res.data.existingProduct
                })

                console.log(this.state.products)
            }
        })
    }

    filterData(products, searchKey){
   
        const result =  products.filter((product) =>
           product.name.toLowerCase().includes(searchKey) ||
           product.pid.toLowerCase().includes(searchKey) ||
           product.price.toLowerCase().includes(searchKey)
        )
      
        this.setState({products:result})
      
      }

      handleSearchArea = (e) =>{
        const searchKey =  e.currentTarget.value
     
        axios.get("http://localhost:8070/products").then((res) =>{
                 if(res.data.success){
                     
                   this.filterData(res.data.existingProduct, searchKey)
     
                    
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

          <h2>𝓐𝓵𝓵 𝓟𝓻𝓸𝓭𝓾𝓬𝓽 𝓛𝓲𝓼𝓽</h2>
          <br></br>
          <div className="row">
            {this.state.products.map((product, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card animated-card" style={{ width: '18rem' }}>
                  <img src={`http://localhost:8070/uploads/${product.image}`} className="card-img-top" alt="Product Cover" />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: {product.price}</p>
                    <a href={`/userproduct/${product._id}`} className="btn btn-primary">
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
