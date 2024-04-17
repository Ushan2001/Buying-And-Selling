import React, { Component } from 'react'
import "./style.css"

export default class feedback extends Component {
  render() {
    return (
      <div>
        <div className='container' id="TeacherContainer">
        <h1 id="WhyTeacherTitle">Why People like to use BuySell Nexus?</h1>
        <div className='row'>

            <div className='col'>
            <div class="card" id="techerCard" >
  <div class="card-body">
    <h5 class="card-title"><img src="/images/dinesh.png" alt="" id="star"></img></h5>
    <p class="card-text" id="teacherText">“With real-time insights into user sentiments, we tailor our management strategies, fostering a supportive environment for buyers and sellers. This boosts satisfaction and strengthens our community.”</p>
    <div className='row'>
        <div className='col-md-2'>
        <img src="/images/pi1.png" alt="" id="tracherlogo"></img>
        </div>
        <div className='col-md-6'>
            <span id="teacherName">Michael Brown</span><br></br>
            <span id="subject">Full Stack web developer</span>
        </div>
    </div>

   
  </div>
</div>
            </div>


            <div className='col'>
            <div class="card" id="techerCard" >
  <div class="card-body">
    <h5 class="card-title"><img src="/images/amith.png" alt="" id="star"></img></h5>
    <p class="card-text" id="teacherText">“With real-time insights into user sentiments, we tailor our management strategies, fostering a supportive environment for buyers and sellers. This boosts satisfaction and strengthens our community.”</p>
    <div className='row'>
        <div className='col-md-2'>
        <img src="/images/pi.jpg" alt="" id="tracherlogo"></img>
        </div>
        <div className='col-md-6'>
            <span id="teacherName">John Smith</span><br></br>
            <span id="subject">Retail Customer</span>
        </div>
    </div>

   
  </div>
</div>
            </div>


            <div className='col'>
            <div class="card" id="techerCard" >
  <div class="card-body">
    <h5 class="card-title"><img src="/images/dinesh.png" alt="" id="star"></img></h5>
    <p class="card-text" id="teacherText">“With real-time insights into user sentiments, we tailor our management strategies, fostering a supportive environment for buyers and sellers. This boosts satisfaction and strengthens our community.”</p>
    <div className='row'>
        <div className='col-md-2'>
        <img src="/images/pf2.png" alt="" id="tracherlogo"></img>
        </div>
        <div className='col-md-6'>
            <span id="teacherName">David Taylor</span><br></br>
            <span id="subject">Bank Client</span>
        </div>
    </div>

   
  </div>
</div>
            </div>
        </div>
        
      </div>
      </div>
    )
  }
}
