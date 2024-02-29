import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../NavBar/NavBar';

export default class DiscountDetails extends Component {

    constructor(props){
        super(props)
    
        this.state = {
          discount:{}
        }
      }

      componentDidMount(){
 
        const id = this.props.match.params.id;
    
        axios.get(`http://localhost:8070/discount/${id}`).then((res) =>{
          if(res.data.success){
            this.setState({
              discount:res.data.discount
            })
    
            console.log(this.state.discount)
          }
        })
    
      }
  render() {

    const {name, category, pdiscount, date, time, note, _id } = this.state.discount;

    return (
      <div>
        <NavBar/>
        <div style={{marginTop:"40px"}} className='container'>
          <h4>{name}</h4>
          <hr/>
      <dl className='row'>
       <dt className='col-sm-3'>Discount Tempory ID</dt>
        <dd className='col-sm-9'>{_id}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Category</dt>
        <dd className='col-sm-9'>{category}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Discount</dt>
        <dd className='col-sm-9'>{pdiscount}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Start Date</dt>
        <dd className='col-sm-9'>{date}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Time Duration</dt>
        <dd className='col-sm-9'>{time}</dd>
        <br></br><br></br>
        <dt className='col-sm-3'>Additional Comment</dt>
        <dd className='col-sm-9'>{note}</dd>
        
      </dl>
      </div>

      <div style={{marginLeft:"30px", marginTop:"20px"}}>
      <button className='btn btn-dark'><a href='/discount' style={{textDecoration:"none", color:"white"}}>
      <i className='fas fa-arrow-left'></i></a></button>
      </div>
      </div>
    )
  }
}
