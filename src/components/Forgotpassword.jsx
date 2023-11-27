import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHeart, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Forgotpassword() {
  const [cardTitle , setCardTitle] = useState({
    titleOne : 'Reset Password',
    titleTwo : 'We will send OTP to your email address',
    cardOne  : 'card',
    cardTwo  : 'card d-none',
    btnText  : 'Send OTP'
  });

  const sendOTP = (e) =>{
    e.preventDefault();
    setCardTitle({
      titleOne : 'Enter OTP',
      titleTwo : 'We had send OTP to your email address',
      cardOne  : 'card d-none',
      cardTwo  : 'card',
      btnText  : 'Reset Password'
    });

  }
  return (
    <>
        <div class="account-pages  pt-sm-5">
      <div class="container">
        <div class="justify-content-center row">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="text-center mb-4"><a class="auth-logo mb-5 d-block" href="/"></a>
              <h4>{cardTitle.titleOne}</h4>
              <p class="text-muted mb-4">{cardTitle.titleTwo}</p>
            </div>
            <div class={cardTitle.cardOne}>
              <div class="p-4 card-body">
                <div class="p-3">
                  <form class="">
                    <div class="mb-3"><label class="form-label form-label">Email</label>
                      <div class="input-group bg-soft-light rounded-3 mb-3 input-group"><span
                          class="input-group-text text-muted"><FontAwesomeIcon icon={faEnvelope} /></span><input id="email"
                          name="email" placeholder="Enter Email" type="text"
                          class="form-control form-control-lg bg-soft-light border-light form-control"
                          aria-invalid="false" value=""/></div>
                    </div>
                    <div class="mb-3"><label class="form-label form-label">Password</label>
                      <div class="mb-3 bg-soft-light input-group-lg rounded-lg input-group"><span
                          class="input-group-text border-light text-muted"><FontAwesomeIcon icon={faLock} /></span><input
                          id="username" name="username" placeholder="Enter Password" type="text"
                          class="form-control form-control-lg bg-soft-light border-light form-control"
                          aria-invalid="false" value=""/></div>
                    </div>
                    <div class="mb-4 mb-3"><label class="form-label form-label">Comfirm Password</label>
                      <div class="mb-3 bg-soft-light input-group-lg rounded-lg input-group"><span
                          class="input-group-text border-light text-muted"><FontAwesomeIcon icon={faLock} /></span><input
                          id="password" name="password" placeholder="Enter Comfirm Password" type="password"
                          class="form-control form-control-lg bg-soft-light border-light form-control"
                          aria-invalid="false" value=""/></div>
                    </div>
                    <div class="d-grid"><button type="submit"
                        class=" waves-effect waves-light btn btn-primary d-block w-100" onClick={sendOTP}>Send OTP</button></div>
                  </form>
                </div>
              </div>
            </div>
            <div class={cardTitle.cardTwo}>
              <div class="p-4 card-body">
                <div class="p-3">
                  <form class="">
                    <div class="mb-3"><label class="form-label form-label">OTP</label>
                      <div class="input-group bg-soft-light rounded-3 mb-3 input-group"><span
                          class="input-group-text text-muted"><FontAwesomeIcon icon={faLock} /></span><input id="email"
                          name="number" placeholder="Enter OTP" type="text"
                          class="form-control form-control-lg bg-soft-light border-light form-control"
                          aria-invalid="false" value=""/></div>
                    </div>
                    <div class="d-grid"><button 
                        class=" waves-effect waves-light btn btn-primary d-block w-100" onClick={sendOTP}>{cardTitle.btnText}</button></div>
                  </form>
                </div>
              </div>
            </div>
            <div class="mt-5 text-center">
              <p>© 2023 Chatter with <FontAwesomeIcon icon={faHeart} style={{color: "#a32424",}} /> by Pranit Uchil</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Forgotpassword
