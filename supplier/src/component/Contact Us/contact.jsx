import React from 'react'
import NavBar from '../NavBar/NavBar'
import './style.css';


export default function contact() {
  return (
    <div>
        <NavBar/>
        <div class="container" style={{marginTop:"50px"}}>
<h1 class="text-center">Contact US</h1>
<hr/>
  <div class="row" style={{marginTop:"30px"}}>
    <div class="col-sm-8">
    <iframe
    title="Google Map Colombo"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9711392740137!2d79.9585206147693!3d6.927078195022608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25951b2de24c5%3A0xd69e9ed91bd654b5!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1644727440144!5m2!1sen!2sus"
    style={{ width: "100%", height: "390px", frameborder: "0", border: "0" }}
    allowFullScreen=""
    loading="lazy"
></iframe>

    </div>

    <div class="col-sm-4" id="contact2">
        <h3>Buying & Selling</h3>
        <hr align="left" width="50%"/>
        <h4 class="pt-2">Ushan Mihiranga</h4>
        <i class="fas fa-globe" style={{color:"#000"}}></i>Colombo, Sri Lanka<br/><br/>
        <h4 class="pt-2">Contact</h4>
        <i class="fas fa-phone" style={{color:"#000"}}></i>&nbsp;0761234567<br/>
        <i class="fab fa-whatsapp" style={{color:"#000"}}></i>&nbsp;0741234567<br/><br/>
        <h4 class="pt-2">Email</h4>
        <i class="fa fa-envelope" style={{color:"#000"}}></i>&nbsp;test@test.com<br/>
      </div>
  </div>
</div>
    </div>
  )
}
