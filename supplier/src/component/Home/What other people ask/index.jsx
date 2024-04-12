import React, { Component } from 'react';
import "./style.css";

export default class index extends Component {
  render() {
    return (
      <div className='container' id="whatOtherContainer">
        <h2 id="otherPeopleTitle">What other people ask?</h2>

        <div className="accordion" id="accordionExample">

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button id="dropDownTitle" className="accordion-button  collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                How does this app work?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body" id="bodyTitle">
                Facial recognition uses technology and biometrics — typically through AI — to identify human faces. It maps facial features from a photograph or video and then compares the information with a database of known faces to find a match. Facial recognition can help verify a person's identity but also raises privacy issues. <span id="learnMore">Learn more </span> 
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button id="dropDownTitle" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Is this app secure?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div  className="accordion-body" id="bodyTitle">
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button id="dropDownTitle" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                What type of facial emotion can this app detect?
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body" id="bodyTitle">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button id="dropDownTitle" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                How long will it take to generate a report?
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body" id="bodyTitle">
                Facial recognition uses technology and biometrics — typically through AI — to identify human faces. It maps facial features from a photograph or video and then compares the information with a database of known faces to find a match. Facial recognition can help verify a person's identity but also raises privacy issues. Learn more
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button id="dropDownTitle" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                How many exams can I create per month?
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body" id="bodyTitle">
                Facial recognition uses technology and biometrics — typically through AI — to identify human faces. It maps facial features from a photograph or video and then compares the information with a database of known faces to find a match. Facial recognition can help verify a person's identity but also raises privacy issues. Learn more
              </div>
            </div>
          </div>

        </div>

      </div>
    )
  }
}
