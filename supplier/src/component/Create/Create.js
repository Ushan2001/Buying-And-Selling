import React from 'react'
import "./Create.css"
import Header from '../Dashboard/Header/Header'

export default function Create() {
  return (
    <div>
       <Header/>
      <div className="container" id="cardCreate" >
  <div className="row">
    <div className="col-md-3 mb-3">
      <div className="card animated-card" style={{width: "18rem"}}>
        <img src="/images/order.jpg" class="card-img-top" alt="..."/>
        <div class="card-body" style={{marginLeft:"50px"}}>
          <a href="/order" class="btn btn-primary" style={{borderRadius:"20px"}} id="click">Click Here !</a>
        </div>
      </div>
    </div>

    <div className="col-md-3 mb-4">
      <div className="card animated-card" style={{width: "18rem"}}>
        <img src="/images/supplier.jpg" class="card-img-top" alt="..."/>
        <div class="card-body" style={{marginLeft:"50px"}}>
          <a href="/supplier" class="btn btn-primary" style={{borderRadius:"20px"}} id="click">Click Here !</a>
        </div>
      </div>
    </div>

    <div className="col-md-3 mb-4">
      <div className="card animated-card" style={{width: "18rem"}}>
        <img src="/images/inventory.jpg" class="card-img-top" alt="..."/>
        <div class="card-body" style={{marginLeft:"50px"}}>
          <a href="/product" class="btn btn-primary" style={{borderRadius:"20px"}} id="click">Click Here !</a>
        </div>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col-md-3 mb-4">
      <div className="card animated-card" style={{width: "18rem"}}>
        <img src="/images/payment.jpg" class="card-img-top" alt="..."/>
        <div class="card-body" style={{marginLeft:"50px"}}>
          <a href="/payment" class="btn btn-primary" style={{borderRadius:"20px"}} id="click">Click Here !</a>
        </div>
      </div>
    </div>

    <div className="col-md-3 mb-4">
      <div className="card animated-card" style={{width: "18rem"}} >
        <img src="/images/delivery.jpg" class="card-img-top" alt="..."/>
        <div class="card-body" style={{marginLeft:"50px"}}>
          <a href="/delivery" class="btn btn-primary" style={{borderRadius:"20px"}} id="click">Click Here !</a>
        </div>
      </div>
    </div>

    <div className="col-md-3 mb-4">
      <div className="card animated-card" style={{width: "18rem"}}>
        <img src="/images/discount.jpg" class="card-img-top" alt="..."/>
        <div class="card-body" style={{marginLeft:"50px"}}>
          <a href="/discount" class="btn btn-primary" style={{borderRadius:"20px"}} id="click">Click Here !</a>
        </div>
      </div>
    </div>
    </div>
</div>

    </div>
  )
}
