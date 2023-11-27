import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import "../css/style.css"  
import { Link, json, useNavigate } from 'react-router-dom'

const Login = () => {
    let navigate = useNavigate();
    const login = (e) =>{
        e.preventDefault();
        let loginInfo = {}
        loginInfo.username = document.getElementById('username').value;
        loginInfo.password = document.getElementById('password').value;

        fetch("/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body  :JSON.stringify(loginInfo)
        }).then(async (res)=>{
            if(res.status != 401){
                navigate('/dashboard');
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
    }

    return (
        <>
            <div className="account-pages my-2 pt-sm-5">
                <div className="container">
                    <div className="justify-content-center row">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="text-center">
                                <a className="auth-logo  d-block" href="/"/>
                                    <h1 className='mb-5' >Chatter</h1>
                                <h4>Sign in</h4>
                                <p className="text-muted mb-4">Sign in to continue to Chatter.</p>
                            </div>
                            <div className="card">
                                <div className="p-4 card-body">
                                    <div className="p-3">
                                        <form className="">
                                            <div className="mb-3"><label className="form-label form-label">Username</label>
                                                <div className="mb-3 bg-soft-light rounded-3 input-group"><span className="input-group-text text-muted"
                                                    id="basic-addon3"><FontAwesomeIcon icon={faUser} /></span><input id="username" name="username"
                                                        placeholder="Enter User Name" type="text"
                                                        className="form-control form-control-lg border-light bg-soft-light form-control"
                                                        aria-invalid="false"/></div>
                                            </div>
                                            <div className="mb-4 mb-3">
                                                <label className="form-label form-label">Password</label>
                                                <div className="mb-3 bg-soft-light rounded-3 input-group"><span className="input-group-text text-muted"><FontAwesomeIcon icon={faLock} /></span><input id="password" name="password"
                                                        placeholder="Enter Password" type="password"
                                                        className="form-control form-control-lg border-light bg-soft-light form-control"
                                                        aria-invalid="false"  /></div>
                                            </div>
                                            <div className="form-check mb-4"><input id="remember-check" type="checkbox"
                                                className="form-check-input form-check-input" /><label for="remember-check"
                                                    className="form-check-label form-label">Remember me</label></div>
                                            <div className="d-grid"><button type="submit" onClick={login}
                                                className=" waves-effect waves-light btn btn-primary d-block w-100">Sign in</button></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 text-center">
                                <p>Don't have an account ? <Link className="font-weight-medium text-primary" to="/register"> Signup now </Link>
                                </p>
                                <p>© 2023 Cahtter. with <FontAwesomeIcon icon={faHeart} style={{color: "#ba2121",}} /> by Pranit Uchil</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
