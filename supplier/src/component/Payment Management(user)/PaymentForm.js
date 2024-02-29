import React, { Component } from 'react';
import UserNavBar from '../NavBar/UserNavBar';
import "./paymentForm.css"

class PaymentForm extends Component {
  render() {
    return (
      <div>
        <UserNavBar />
        <div className="container">
          <div className='row'>
            <div className='col-md-4'></div>
            <div className='col-md-4'>
              <script src='https://js.stripe.com/v2/' type='text/javascript'></script>
              <form
                acceptCharset="UTF-8"
                action="/"
                className="require-validation"
                data-cc-on-file="false"
                data-stripe-publishable-key="pk_bQQaTxnaZlzv4FnnuZ28LFHccVSaj"
                id="payment-form"
                method="post"
              >
                <div style={{ margin: '0', padding: '0', display: 'inline' }}>
                  <input name="utf8" type="hidden" value="✓" />
                  <input name="_method" type="hidden" value="PUT" />
                  <input
                    name="authenticity_token"
                    type="hidden"
                    value="qLZ9cScer7ZxqulsUWazw4x3cSEzv899SP/7ThPCOV8="
                  />
                </div>
                <div class="paymentWrap">
							<div class="btn-group paymentBtnGroup btn-group-justified" data-toggle="buttons">
					            <label class="btn paymentMethod">
					            	<div class="method visa"></div>
					                
					            </label>
					            <label class="btn paymentMethod">
					            	<div class="method master-card"></div>
					               
					            </label>
					            <label class="btn paymentMethod">
				            		<div class="method amex"></div>
					                
					            </label>
					             <label class="btn paymentMethod">
				             		<div class="method vishwa"></div>
					                
					            </label>
					            
					         
					        </div>        
						</div>
                
                <div className='form-row'>
                  <div className='col-xs-12 form-group required'>
                    <label className='control-label'>Name on Card</label>
                    <input className='form-control' size='4' type='text' />
                  </div>
                </div>

                <div className='form-row' >
                  <div className='col-xs-12 form-group required'>
                    <label className='control-label'>Amount</label>
                    <input autoComplete='off' className='form-control amount' type='number' />
                  </div>
                </div>

                <div className='form-row' >
                  <div className='col-xs-12 form-group card required' style={{border:"none"}}>
                    <label className='control-label'>Card Number</label>
                    <input autoComplete='off' className='form-control card-number' size='20' type='text' />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='col-xs-4 form-group cvc required'>
                    <label className='control-label'>CVC</label>
                    <input autoComplete='off' className='form-control card-cvc' placeholder='ex. 311' size='4' type='text' />
                  </div>
                  <div className='col-xs-4 form-group expiration required'>
                    <label className='control-label'>Expiration</label>
                    <input className='form-control card-expiry-month' placeholder='MM' size='2' type='text' />
                  </div>
                  <div className='col-xs-4 form-group expiration required'>
                    <label className='control-label'> </label>
                    <input className='form-control card-expiry-year' placeholder='YYYY' size='4' type='text' />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='col-md-12 form-group'>
                    <button className='form-control btn btn-primary submit-button' type='submit' style={{ marginTop: '10px' }}>
                      Pay
                    </button>
                  </div>
                </div>
                
              </form>
            </div>
            <div className='col-md-4'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentForm;
