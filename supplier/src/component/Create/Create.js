import React from 'react'
import NavBar from '../NavBar/NavBar';
import "./Create.css"

export default function Create() {
  return (
    <div>
        <NavBar/>
      <div className="container" style={{marginTop:"50px"}}>
  <div className="row">
    <div className="col-md-4 mb-4">
      <div className="card animated-card" style={{width: "18rem"}}>
        <img src="/images/order.png" class="card-img-top" alt="..."/>
        <div class="card-body" style={{marginLeft:"50px"}}>
          <a href="/order" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
      <div className="card animated-card" style={{width: "18rem"}}>
        <img src="/images/supplier.png" class="card-img-top" alt="..."/>
        <div class="card-body" style={{marginLeft:"50px"}}>
          <a href="/supplier" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
      <div className="card animated-card" style={{width: "18rem"}}>
        <img src="/images/inventory.png" class="card-img-top" alt="..."/>
        <div class="card-body" style={{marginLeft:"50px"}}>
          <a href="/product" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col-md-4 mb-4">
      <div className="card animated-card" style={{width: "18rem"}}>
        <img src="/images/payment.png" class="card-img-top" alt="..."/>
        <div class="card-body" style={{marginLeft:"50px"}}>
          <a href="/payment" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
      <div className="card animated-card" style={{width: "18rem"}} >
        <img src="/images/delivery.png" class="card-img-top" alt="..."/>
        <div class="card-body" style={{marginLeft:"50px"}}>
          <a href="/delivery" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
      <div className="card animated-card" style={{width: "18rem"}}>
        <img src="/images/discount.png" class="card-img-top" alt="..."/>
        <div class="card-body" style={{marginLeft:"50px"}}>
          <a href="/discount" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
    </div>
</div>

    </div>
  )
}
