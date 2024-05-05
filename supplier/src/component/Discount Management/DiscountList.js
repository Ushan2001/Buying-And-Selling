import React, { Component } from 'react';
import axios from "axios";
import Header from '../Dashboard/Header/Header';



export default class DiscountList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discounts: []
           
        };
    }

    componentDidMount() {
        this.retrieveDiscount();
    }

    retrieveDiscount() {
        axios.get("http://localhost:8070/discounts").then((res) => {
            if (res.data.success) {
                const discounts = res.data.existingDiscount.map(discount => ({
                    ...discount,
                    newPrice: 
                    this.calculateNewPrice(discount.price, discount.pdiscount)
                    
                }));
                const discountCount = discounts.length; // Get the number of discounts
            this.setState({ discounts, discountCount });
            }
        }).catch(err => console.log(err));
    }

    calculateNewPrice(price, pdiscount) {
        const discountPercentage = parseFloat(pdiscount) / 100;
        const discountedAmount = parseFloat(price) * discountPercentage;
        return (parseFloat(price) - discountedAmount).toFixed(2);
    }

    onDelete = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this discount?');

        if (isConfirmed) {
            axios.delete(`http://localhost:8070/discount/delete/${id}`)
                .then(() => {
                    this.retrieveDiscount();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }
    filterData(discounts, searchKey){
   
        const result =  discounts.filter((discount) =>
           discount.name.toLowerCase().includes(searchKey) ||
           discount.category.toLowerCase().includes(searchKey)|| 
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
                <Header />
                
                <div className='container' id="discountContainer" style={{maxWidth:"80%"}}>
                    <div className='col-lg-3 mt-2 mb-2'>
                        <input className="form-control" id="serchbar"
                            type='search'
                            placeholder='Search'
                            name="serchQuery"
                            style={{ borderRadius: "20px", width: "300px", marginBottom: "30px" }}
                            onChange={this.handleSearchArea} />
                    </div>
                    <div id="paymentCount">
                        <div className='card-body'>
                            <h5 className='card-title' id="PaymentCardTitile" >✅ NO.OF Discounts : <span id="cardText"> {this.state.discountCount} </span></h5>
                        </div>
                    </div>

                
                    <h2 id="AllSupplier" style={{ marginTop: "30px", marginBottom: "30px" }}>All Discounts</h2>
                    
                    <button className='btn btn-success' id="disAdd">
                        <a href='add/discount'  style={{ textDecoration: "none", color: "white", paddingRight:"8px",paddingLeft:"8px"}}>
                            <i className='fas fa-plus'></i>&nbsp;Add New
                        </a>
                    </button>


                    <br></br>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope='col'><i className='fas fa-list-ol'></i></th>
                                <th scope='col'>Product ID</th>
                                <th scope='col'>Category</th>
                                <th scope='col'>Discount%</th>
                                <th scope='col'>Price(Rs:)</th>
                                <th scope='col'>New Price(Rs:)</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.discounts.map((discount, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td href={`/discount/${discount._id}`} style={{ textDecoration: "none" }}>
                                        {discount.name}
                                    </td>
                                    <td id="dayment">{discount.category}</td>
                                    <td id="newprice">{discount.pdiscount}</td>
                                    <td>{discount.price}</td>
                                    <td id="newprice">{discount.newPrice}</td>
                                    <td>
                                        <a className='btn' id="editBtn" href={`/editdiscount/${discount._id}`}>
                                            <i className='fas fa-edit' id="editIcon"></i>
                                        </a>
                                        &nbsp;&nbsp;&nbsp;
                                        <a className='btn' id="editDelete" href='# ' onClick={() => this.onDelete(discount._id)}>
                                            <i className='fas fa-trash-alt ' id ="DeleteIcon"></i>
                                        </a>
                                        &nbsp;&nbsp;&nbsp;
                                        <a href={`/discount/${discount._id}`} id="view">VIEW</a>&nbsp; &nbsp;&nbsp;
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
