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
                How does BuySell Nexus ensure secure transactions for buyers and sellers?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body" id="bodyTitle">
              BuySell Nexus employs advanced encryption techniques to secure all transactions, providing a safe environment for both buyers and sellers. Additionally, our platform verifies the identity of users to prevent fraudulent activities.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button id="dropDownTitle" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Can sellers manage their inventory easily on BuySell Nexus?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div  className="accordion-body" id="bodyTitle">
              Yes, BuySell Nexus offers intuitive inventory management tools for sellers, allowing them to easily add, edit, and remove listings. Sellers can also track their inventory levels in real-time and receive notifications for low stock.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button id="dropDownTitle" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              What payment options are available on BuySell Nexus?
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body" id="bodyTitle">
              BuySell Nexus supports various payment methods including credit/debit cards, PayPal, and bank transfers. Our system ensures seamless payment processing, giving buyers and sellers flexibility in conducting transactions.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button id="dropDownTitle" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              How does BuySell Nexus handle disputes between buyers and sellers?
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body" id="bodyTitle">
              BuySell Nexus provides a structured dispute resolution process to address any conflicts between buyers and sellers. Our team mediates disputes impartially, striving to achieve fair resolutions that satisfy both parties.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button id="dropDownTitle" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
              Does BuySell Nexus offer any analytics tools for sellers to track their performance?
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body" id="bodyTitle">
              Yes, BuySell Nexus provides comprehensive analytics tools for sellers to monitor their performance. Sellers can access detailed reports on sales, customer behavior, and market trends, enabling them to make informed business decisions.
              </div>
            </div>
          </div>

        </div>

      </div>
    )
  }
}
