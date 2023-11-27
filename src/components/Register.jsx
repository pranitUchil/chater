import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHeart, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import Swal from 'sweetalert2'
import { useNavigate  } from 'react-router-dom';

function Register() {
  let validate = ['email','username','fullname','password','cpassword'];
  let isValid = true;
  let [userData , setUserData] = useState({
    email    :"",
    username :"",
    fullname :"",
    password :"",
    cpassword:""
  });
  let navigate = useNavigate();

  const inputValue =  (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    if(name == "email"){
      if(!EmailValidator.validate(value) && value != ''){
        document.getElementById("email").classList.add("is-invalid");
        document.getElementById("email").nextSibling.innerHTML = "Email is not valid";
      }
      else{
        if(value != '')       
            document.getElementById("email").classList.remove("is-invalid");
        document.getElementById("email").nextSibling.innerHTML = "Required";
      }
    }
    if(name == "cpassword"){
      console.log(value ,userData.password)
      if(value != userData.password){
        document.getElementById("cpassword").classList.add("is-invalid");
        document.getElementById("cpassword").nextSibling.innerHTML = "Confirm password not match";
      }
      else{
        if(value != '')       
             document.getElementById("cpassword").classList.remove("is-invalid");
        document.getElementById("cpassword").nextSibling.innerHTML = "Required";
      }
    }
    setUserData({...userData,[name]:value})
  }
  
  const saveUser =  (e) =>{
    e.preventDefault();
    validation();
    console.log(userData)
    if(isValid){
      fetch('/api/register',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
      }).then(async (res)=>{
        if(res.status != 500){
          Swal.fire({
            title: 'success',
            text: 'You hed be register',
            icon: 'success',
            confirmButtonText: 'Cool',
            confirmButtonText:`Login`,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/');
            } 
          })
        }
        else{     
          res = await res.json()    
          Swal.fire({
            title: 'Oops...',
            text: res.error,
            icon: 'error',
            confirmButtonText: 'Cool',
            confirmButtonText:`Retry`,
          })
        }
      })
    };
  };

  const validation = () =>{
    isValid = true;
    validate.forEach((e,i)=>{
      if(document.getElementById(e).value == ''){
        document.getElementById(e).classList.add("is-invalid");
        isValid = false;
      }
      else{
        document.getElementById(e).classList.remove("is-invalid");
      }
    })
  }
  return (
    <>
        <div class="account-pages  ">
      <div class="container">
        <div class="justify-content-center row">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="text-center mb-3"><a class="auth-logo mb-3 d-block" href="/"></a>
              <h4>Sign up</h4>
              <p class="text-muted mb-3">Get your Chatter account now.</p>
            </div>
            <div class="card">
              <div class="p-4 card-body">
                <div class="p-3">
                  <form  onSubmit={saveUser} class="">
                    <div class="mb-3"><label class="form-label form-label">Email</label>
                      <div class="input-group bg-soft-light rounded-3 mb-3 input-group">
                        <span class="input-group-text text-muted"><FontAwesomeIcon icon={faEnvelope} /></span><input id="email"
                          name="email" placeholder="Enter Email" type="text"
                          class="form-control form-control-lg bg-soft-light border-light form-control"
                          aria-invalid="false" onChange={inputValue} value={userData.email}/>
                          <div type="invalid" class="invalid-feedback">Required</div>
                      </div>
                    </div>
                    <div class="mb-3"><label class="form-label form-label">Username</label>
                      <div class="mb-3 bg-soft-light input-group-lg rounded-lg input-group"><span
                          class="input-group-text border-light text-muted"><FontAwesomeIcon icon={faUser} /></span><input
                          id="username" name="username" placeholder="Enter Username" type="text"
                          class="form-control form-control-lg bg-soft-light border-light form-control"
                          aria-invalid="false" onChange={inputValue} value={userData.username}/>
                          <div type="invalid" class="invalid-feedback">Required</div>
                      </div>
                    </div>
                    <div class="mb-3"><label class="form-label form-label">Full Name</label>
                      <div class="mb-3 bg-soft-light input-group-lg rounded-lg input-group"><span
                          class="input-group-text border-light text-muted"><FontAwesomeIcon icon={faUser} /></span><input
                          id="fullname" name="fullname" placeholder="Enter Full Name" type="text"
                          class="form-control form-control-lg bg-soft-light border-light form-control"
                          aria-invalid="false" onChange={inputValue} value={userData.fullname}/>
                          <div type="invalid" class="invalid-feedback">Required</div>
                      </div>
                    </div>
                    <div class="mb-4 mb-3"><label class="form-label form-label">Password</label>
                      <div class="mb-3 bg-soft-light input-group-lg rounded-lg input-group"><span
                          class="input-group-text border-light text-muted"><FontAwesomeIcon icon={faLock} /></span><input
                          id="password" name="password" placeholder="Enter Password" type="password"
                          class="form-control form-control-lg bg-soft-light border-light form-control"
                          aria-invalid="false" onChange={inputValue} value={userData.password}/>
                          <div type="invalid" class="invalid-feedback">Required</div>
                      </div>
                    </div>
                    <div class="mb-3 mb-3"><label class="form-label form-label">Confirm Password</label>
                      <div class="mb-3 bg-soft-light input-group-lg rounded-lg input-group"><span
                          class="input-group-text border-light text-muted"><FontAwesomeIcon icon={faLock} /></span><input
                          id="cpassword" name="cpassword" placeholder="Enter Confirm Password" type="password"
                          class="form-control form-control-lg bg-soft-light border-light form-control"
                          aria-invalid="false" onChange={inputValue} value={userData.cpassword}/>
                          <div type="invalid" class="invalid-feedback">Required</div>
                      </div>
                    </div>
                    <div class="d-grid"><button type="submit"
                        class=" waves-effect waves-light btn btn-primary d-block w-100" >Sign up</button></div>
                  </form>
                </div>
              </div>
            </div>
            <div class=" text-center">
              <p>Already have an account ? <Link class="font-weight-medium text-primary" to="/"> Signin </Link> </p>
              <p>© 2023 Chatter with <FontAwesomeIcon icon={faHeart} style={{color: "#a32424",}} /> by Pranit Uchil</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register
