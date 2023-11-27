import React, { useRef,useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBell,faClock,faEllipsisVertical,faPaperPlaneTop, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { NotificationModal, RemoveUser } from './Modal'
import { UserContext } from './Dashboard'
import io from "socket.io-client"
import Swal from 'sweetalert2'
const ENDPOINT = 'https://chaterbackend2.onrender.com'
var socket
let deleteUser =  true;
let acpteUser =  true;
let getino =  true;
const Messages =({time, profilepic,fullname,message,from,id,getMessages}) =>{
    const user = useContext(UserContext);
    let fromWhere = ''
    var currentDate = new Date(time);
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var date = currentDate.getDate();
    var month = currentDate.getMonth() + 1;

    // Format the time with leading zeros if needed
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;

    // Concatenate the time values in a 24-hour format
    var currentTime = hours + ":" + minutes + " " + date + "/" + month;
    if(from == user.userData._id){
        fromWhere = 'right';
    };

    const showHideDeleteDropdown = (id) => {
        if(document.getElementById(id).classList.contains('show')){
            document.getElementById(id).classList.remove('show');
        }
        else{
            document.getElementById(id).classList.add('show');
        }
    }
    const deleteMessage = (id) =>{
        fetch("/api/messages/"+id,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res)=>{
            if(res.status == 200){
                // getMessages()
                document.getElementById('message'+id).classList.add('d-none');
            }
        })
    }
    return(
        <li class={fromWhere} id={"message"+id}>
            <div class="conversation-list">
                <div class="chat-avatar"><img src={profilepic} alt="chatvia"/></div>
                <div class="user-chat-content">
                <div class="ctext-wrap">
                    <div class="ctext-wrap-content">
                        <p class="mb-0">{message}</p>
                        <p class="chat-time mb-0"><FontAwesomeIcon icon={faClock} /> <span
                            class="align-middle">{currentTime}</span></p>
                    </div>
                    <div class="align-self-start dropdown show m-1" onClick={()=>{showHideDeleteDropdown(id)}}><a aria-haspopup="true" class="" aria-expanded="true"><FontAwesomeIcon icon={faEllipsisVertical} /></a>
                        <div tabindex="-1" id={id} role="menu" aria-hidden="false" class="dropdown-menu " data-popper-placement="bottom-start"
                            style={{"position": "absolute"," inset":" 0px auto auto 0px"," transform":" translate(0px, 22.5px)"}}><button onClick={()=>{deleteMessage(id)}} type="button" tabindex="0"
                            role="menuitem" class="dropdown-item">Delete <FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                </div>
                <div class="conversation-name">{fullname}</div>
                </div>
            </div>
        </li>
    )
}

const ChateBox = ({ showHideChate, setShowHideChate,haveNotification ,selectedUser,getChates,setChates,sethaveNotification,chates,setSelectedUser}) => {
    const [notificationModal,setNotificationModal] = useState(false);
    const [removeUserModal,setRemoveUserModal] = useState(false);
    const [messages , setMessage] = useState([]);
    const user = useContext(UserContext);

    let seletedUserId = ''
    const getMessages = () =>{
        fetch("/api/messages/"+selectedUser.userId,{
            method:"GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(async(res)=>{
            res = await res.json();
            setMessage(res);   
            document.getElementById(`conversation${selectedUser.index}`).classList.add('active');
            socket.emit("join chat",selectedUser.userId)
            localStorage.setItem("selectedUserId",selectedUser.userId);
        }); 
    }
    useEffect(()=>{
        getMessages()
        seletedUserId = selectedUser.userId
         deleteUser =  true;
         acpteUser =  true;
         getino =  true;
    },[selectedUser]);
    useEffect(()=>{
        divRef.current.scrollTop = divRef.current.scrollHeight;
    },[messages]);
    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("setup",user.userData._id);
        socket.on('connected',()=>{
            console.log('connected');
        })
    },[user]);


    useEffect(()=>{
        socket.on("message recieved",(message)=>{
            if(message.from == localStorage.getItem('selectedUserId')){
                console.log(message.from,localStorage.getItem('selectedUserId'));
                // getMessages();
                console.log(messages)
                setMessage([...messages,{to:message.to,message:message.message,from:message.from,time:message.time,profilepic:message.profilepic}]);   
            }
            else{
                console.log(message,user.userData)
                if(message.from != user.userData._id){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      });                    
                      Toast.fire({
                        title: message.fullname,
                        text:message.message
                      });
                }
            }
        })
        socket.on("firend request recieved",(id)=>{
            if(getino){
                user.getUserInfo();
                getino = false;
            }
        })
        socket.on("firend request accpected",(user2,id)=>{
            if(acpteUser){
                getChates()   
                acpteUser = false
                console.log('this is working')           
            }           
        })
        socket.on("firend has be remove",(id)=>{
            if(deleteUser){
                getChates()
                user.getUserInfo();
                deleteUser = false;
            };
        })
    })
    
    const openNotificationModel = () =>{
        setNotificationModal(true);
    }
    const openRemoveUserModal = () =>{
        setRemoveUserModal(true);
    }
    const sendMessage = (e) => {
        e.preventDefault();
        let message = document.getElementById('message_box').value;
        if(selectedUser.userId != '1'){
            fetch("/api/messages",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({to:selectedUser.userId,message,time:new Date()})
            }).then(async(res)=>{
                res = await res.json();
                document.getElementById('message_box').value = '';
                socket.emit('new message',{to:selectedUser.userId,message:message,from:user.userData._id,time:new Date(),profilepic:user.userData.profilepic,fullname:user.userData.fullname})
                // getMessages();
                setMessage([...messages,{to:selectedUser.userId,message:message,from:user.userData._id,time:new Date(),profilepic:user.userData.profilepic}]);   
            });
        }
        else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please add a friend befor messageing',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    const divRef = useRef(null);
    return (
        <>
           {notificationModal? <NotificationModal modal={setNotificationModal} getChates={getChates}  />:''}
           {removeUserModal? <RemoveUser modal={setRemoveUserModal} getChates={getChates}  />:''}
            <div class={showHideChate}>
                <div class="d-lg-flex">
                    <div class="w-100">
                        <div class="p-3 p-lg-4 border-bottom">
                            <div class="align-items-center row">
                                <div class="col-8 col-sm-4" >
                                    <div class="d-flex align-items-center">
                                        <div class="d-block d-lg-none me-2 ms-0"  ><Link class="user-chat-remove text-muted font-size-16 p-2"
                                            to="/dashboard"><FontAwesomeIcon icon={faArrowLeft} onClick={() => setShowHideChate("user-chat w-100")} /></Link></div>
                                        <div class="me-3 ms-0"><img src={selectedUser.profilepic}
                                            class="rounded-circle avatar-xs" alt="chatvia" /></div>
                                        <div class="flex-grow-1 overflow-hidden">
                                            <h5 class="font-size-16 mb-0 text-truncate"><a class="text-reset user-profile-show"
                                                href="/dashboard">{selectedUser.fullname}</a></h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 col-sm-8">
                                    <ul class="list-inline user-chat-nav text-end mb-0">
                                        <li class="list-inline-item">
                                            <div class="dropdown">
                                                <button  type="button" aria-haspopup="true" aria-expanded="false" class="btn nav-btn  btn btn-none" style={{ zIndex: 9,position: "relative"}}>
                                                    <div  class="chat-user-img away align-self-center me-3 ms-0">
                                                    <FontAwesomeIcon icon={faTrash} onClick={openRemoveUserModal}/>
                                                    </div>
                                                </button>
                                                <button  type="button" aria-haspopup="true" aria-expanded="false" class="btn nav-btn  btn btn-none" style={{ zIndex: 9,position: "relative"}}>
                                                    <div  class="chat-user-img away align-self-center me-3 ms-0">
                                                        <FontAwesomeIcon icon={faBell} onClick={openNotificationModel}/>
                                                         <span class={haveNotification}></span>
                                                    </div>
                                                </button>
                                                         
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div data-simplebar="init" class="chat-conversation p-3 p-lg-4 simplebar-scrollable-y" id="messages"
                            style={{ "maxHeight": "100%" }}>
                            <div class="simplebar-wrapper" style={{ "margin": "-124px" }}>
                                <div class="simplebar-height-auto-observer-wrapper">
                                    <div class="simplebar-height-auto-observer"></div>
                                </div>
                                <div id="chate_box" class="simplebar-mask">
                                    <div class="simplebar-offset" style={{ "right": "0px", "bottom": "0px" }}>
                                        <div ref={divRef}  class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content"
                                            style={{ "height": "100%", "overflow": "hidden scroll" }}>
                                            <div class="simplebar-content" style={{ "padding": "24px" }}>
                                                <ul class="list-unstyled mb-0">
                                                    {
                                                        messages.map((e,i)=>{
                                                            return  <Messages time={e.time} profilepic={e.profilepic} fullname={e.fullname} message={e.message} from={e.from} id={e._id} getMessages={getMessages}/>
                                                        })                                                        
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="simplebar-placeholder" style={{ "width": "1137px", "height": "1225px" }}></div>
                            </div>
                            <div class="simplebar-track simplebar-horizontal" style={{ "visibility": "hidden" }}>
                                <div class="simplebar-scrollbar" style={{ "width": "0px", "display": "none" }}></div>
                            </div>
                            <div class="simplebar-track simplebar-vertical" style={{ "visibility": "visible" }}>
                                <div class="simplebar-scrollbar"
                                    style={{ "height": "67px", "transform": "translate3d(0px, 130px, 0px)", "display": "block" }}></div>
                            </div>
                        </div>
                        <div class="p-3 p-lg-4 border-top mb-0">
                            <form onSubmit={sendMessage} class="">
                                <div class="g-0 row">
                                    <div class="col">
                                        <div><input id="message_box" placeholder="Enter Message..." type="text"
                                            class="form-control form-control-lg bg-light border-light form-control"  /></div>
                                    </div>
                                    <div class="col-auto">
                                        <div class="chat-input-links ms-md-2">
                                            <ul class="list-inline mb-0 ms-0">
                                                <li class="list-inline-item"><button type="submit"
                                                    class="font-size-16 btn-lg chat-send waves-effect waves-light btn btn-primary"><img src="../assets/images/send.png" height={"20px"} alt="" /></button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChateBox
