import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import ReactDOM from 'react-dom'
import { UserContext } from './Dashboard'
import { Link, json } from 'react-router-dom'
import io from "socket.io-client"
const ENDPOINT = 'localhost:5000'
var socket
const Modal = ({ modal, userInfor }) => {
    const user = useContext(UserContext);
    
    useEffect(() => {
        setModalClasses({
            classOne: 'modal fade show',
            classTwo: 'modal-backdrop fade show',
        });
    }, [])
    const [modalClasses, setModalClasses] = useState({
        classOne: 'modal fade',
        classTwo: 'modal-backdrop fade',
    })
    const closeModal = () => {
        setModalClasses({
            classOne: 'modal fade',
            classTwo: 'modal-backdrop fade',
        });
        setTimeout(() => {
            modal(false)
        }, 300);
    }
    const sendFriendRequest = async () => {
        let userFound = false;
        let firendRequest = false;
        user.userData.friends.forEach(element => {
            if(element._id == userInfor.userId){
                userFound = true;
            }
        });
        console.log(user.userData.friends,userInfor.userId,userFound)
        await fetch('/api/searchfriendrequest',{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: userInfor.userId})
        }).then(async(res)=>{
            res = await res.json();
            console.log(res)
            if(res.message == 'Requset there'){
                firendRequest =  true
            }
            if(!userFound && !firendRequest){
                let res = await fetch("/api/sendfriendrequest", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: userInfor.userId})
                })
                if (res.status == 200) {
                    closeModal();
                    socket = io(ENDPOINT);
                    socket.emit('friend request send',userInfor.userId)
                    user.getUserInfo();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Friend request has be send',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                else {
                    res = await res.json()
                    Swal.fire({
                        title: 'Oops...',
                        text: res.error,
                        icon: 'error',
                        confirmButtonText: 'Cool',
                        confirmButtonText: `Retry`,
                    })
                }
            }
            else{
                closeModal();
                // console.log(userFound,)
               
                if(firendRequest){
                    Swal.fire({
                        title: 'Oops...',
                        text: 'You already sended firend request to this user',
                        icon: 'error',
                        confirmButtonText: 'Cool',
                        confirmButtonText: `Retry`,
                    });
                }
                if(userFound){
                    Swal.fire({
                        title: 'Oops...',
                        text: 'This user already your firend',
                        icon: 'error',
                        confirmButtonText: 'Cool',
                        confirmButtonText: `Retry`,
                    })     
                }
                
            }
        })
       
    }
    return ReactDOM.createPortal(
        <>
            <div tabindex="-1" style={{ "position": "relative", "zIndex": "1050", "display": " block" }} onClick={() => closeModal()}>
                <div class="" >
                    <div class={modalClasses.classOne} role="dialog" tabindex="-1" style={{ "display": "block" }}  >
                        <div tabindex="-1" class="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div class="text-center p-4">
                                        <div class="avatar-lg mx-auto mb-4">
                                            <img src={userInfor.profilepic} alt="" class="img-thumbnail rounded-circle" /></div>
                                        <h5 class="text-truncate">{userInfor.fullname}</h5>
                                        <p class="text-muted">Send Friend Request</p>
                                        <div class="mt-5">
                                            <ul class="list-inline mb-1">
                                                <li class="list-inline-item px-2 me-2 ms-0"><button onClick={() => {
                                                    setModalClasses({
                                                        classOne: 'modal fade',
                                                        classTwo: 'modal-backdrop fade',
                                                    });
                                                    setTimeout(() => {
                                                        modal(false)
                                                    }, 300);
                                                }} type="button"
                                                    class="btn btn-danger avatar-sm rounded-circle"><span
                                                        class="avatar-title bg-transparent font-size-20"><FontAwesomeIcon icon={faXmark} /></span></button></li>
                                                <li class="list-inline-item px-2"><button type="button" onClick={sendFriendRequest}
                                                    class="btn btn-success avatar-sm rounded-circle"><span
                                                        class="avatar-title bg-transparent font-size-20"><FontAwesomeIcon icon={faCheck} /></span></button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class={modalClasses.classTwo}></div>
                </div>
            </div>
        </>, document.body
    )
}

const FriendRequests = ({ id, username, fullname,closeModal,getChates}) => {
    const user = useContext(UserContext);
    console.log(user)
    const accpetFirendRequset = async (id) =>{
        let res = await fetch("/api/accpectfriendrequest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id:id })
        })
        if(res.status == 200){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Friend request has be accpeted',
                showConfirmButton: false,
                timer: 1500
            });
            getChates();
            socket = io(ENDPOINT);
            socket.emit("friend request accpect",user.userData,id)
        }
        res = await res.json();
        if(user.userData.friendsrequests.length == 1){
            closeModal()
        }
        user.getUserInfo();
    }

    const rejectFirendRequset = async () =>{
        let res = await fetch("/api/rejectfriendrequest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id:id })
        })
        if(res.status == 200){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Friend request has be rejected',
                showConfirmButton: false,
                timer: 1500
            })
        }
        res = await res.json();
        user.getUserInfo();
    }
    return <>
        <li><Link to="/dashboard">
            <div class="d-flex align-items-center mt-2">
                <div class="chat-user-img me-3 ms-0">
                    <div class="chat-user-img away align-self-center me-3 ms-0"><img
                        class="rounded-circle avatar-lg img-thumbnail" src="../assets/images/avatar-1.png" alt=""
                        style={{ "width": " 50px", "height": "50px" }} /></div>
                </div>
                <div class="flex-grow-1 overflow-hidden">
                    <h5 class="text-truncate font-size-14 mb-1">{username}</h5>
                    <h6 class="text-truncate font-size-12 mb-0">{fullname}</h6>
                </div>
                <li class="list-inline-item px-2 me-2 ms-0"><button type="button" onClick={()=>rejectFirendRequset(id)}
                    class="btn btn-danger avatar-sm rounded-circle"><span
                        class="avatar-title bg-transparent font-size-20"><FontAwesomeIcon icon={faXmark} /></span></button></li>
                <li class="list-inline-item px-2"><button type="button" onClick={()=>accpetFirendRequset(id)}
                    class="btn btn-success avatar-sm rounded-circle"><span
                        class="avatar-title bg-transparent font-size-20"><FontAwesomeIcon icon={faCheck} /></span></button></li>
            </div>
        </Link></li>
    </>
}

const NotificationModal = ({ modal,getChates }) => {
    const user = useContext(UserContext);
    useEffect(() => {
        setModalClasses({
            classOne: 'modal fade show',
            classTwo: 'modal-backdrop fade show',
        });
    }, [])
    const [modalClasses, setModalClasses] = useState({
        classOne: 'modal fade',
        classTwo: 'modal-backdrop fade',
    })
    const closeModal = () => {
        setModalClasses({
            classOne: 'modal fade',
            classTwo: 'modal-backdrop fade',
        });
        setTimeout(() => {
            modal(false)
        }, 300);
    }
    return ReactDOM.createPortal(
        <>
            <div tabindex="-1" style={{ "position": "relative", "zIndex": "1050", "display": " block" }} onClick={() => closeModal()}>
                <div class="" >
                    <div class={modalClasses.classOne} role="dialog" tabindex="-1" style={{ "display": "block" }}  >
                        <div tabindex="-1" class="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div class="text-center p-4">
                                        <p class="text-muted">Friend Requests</p>
                                        <div class="mt-2">
                                            <ul class="list-inline mb-1">
                                                {
                                                    user.userData.friendsrequests.map((e, i) => {
                                                        return <FriendRequests id={e._id} username={e.username} fullname={e.fullname} closeModal={closeModal} getChates={getChates} />
                                                    })
                                                }
                                                {user.userData.friendsrequests.length == 0? <h3>No Friend Request</h3>:''}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class={modalClasses.classTwo}></div>
                </div>
            </div>
        </>, document.body
    )
}

const RemoveUser = ({ modal,getChates }) => {
    const user = useContext(UserContext);
    useEffect(() => {
        setModalClasses({
            classOne: 'modal fade show',
            classTwo: 'modal-backdrop fade show',
        });
    }, [])
    const [modalClasses, setModalClasses] = useState({
        classOne: 'modal fade',
        classTwo: 'modal-backdrop fade',
    })
    const closeModal = () => {
        setModalClasses({
            classOne: 'modal fade',
            classTwo: 'modal-backdrop fade',
        });
        setTimeout(() => {
            modal(false)
        }, 300);
    }

    const removefriend = () =>{
        fetch("/api/removefriend",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({id:localStorage.getItem('selectedUserId')})
        }).then( async (res)=>{
            if(res.status == 200){
                res = await res.json();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Friend has be remove',
                    showConfirmButton: false,
                    timer: 1500
                });
                socket = io(ENDPOINT);
                socket.emit("remove friend",localStorage.getItem('selectedUserId'))
                closeModal();
                getChates();
                user.getUserInfo();
                // document.getElementsByClassName(localStorage.getItem('selectedUserId')).classList.add('d-none')

            }

        })
    }
    return ReactDOM.createPortal(
        <>
            <div tabindex="-1" style={{ "position": "relative", "zIndex": "1050", "display": " block" }} onClick={() => closeModal()}>
                <div class="" >
                    <div class={modalClasses.classOne} role="dialog" tabindex="-1" style={{ "display": "block" }}  >
                        <div tabindex="-1" class="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div class="text-center p-4">
                                        <h4 class="text-muted">Are you sure you want to remove this user</h4>
                                        <div class="mt-4">
                                        <li class="list-inline-item px-2 me-2 ms-0"><button type="button" 
                                            class="btn btn-danger avatar-sm rounded-circle"><span
                                                class="avatar-title bg-transparent font-size-20"><FontAwesomeIcon icon={faXmark} onClick={()=>{closeModal()}}/></span></button></li>
                                        <li class="list-inline-item px-2"><button type="button" onClick={()=>{removefriend()}}
                                            class="btn btn-success avatar-sm rounded-circle"><span
                                                class="avatar-title bg-transparent font-size-20"><FontAwesomeIcon icon={faCheck}  /></span></button></li>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class={modalClasses.classTwo}></div>
                </div>
            </div>
        </>, document.body
    )
}

export default Modal;

export { NotificationModal,RemoveUser };
