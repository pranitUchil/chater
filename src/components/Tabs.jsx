import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserGroup, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import defaultProfileImage from '../assets/images/avatar-1.png'
import { Form, Link, useNavigate } from 'react-router-dom'
import { UserContext } from './Dashboard'
import Swal from 'sweetalert2'


const Tabs = ({ navActive, setShowHideChate, showModal ,setSelectedUser,getMessages,chates}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [showUserData , setShowUserData] = useState('');
    const _user = useContext(UserContext)
    useEffect(() => {
        async function fetchData() {
            let userList = await fetch("/api/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (userList.status == 200) {
                userList = await userList.json();
                setUser(userList);
            }
            else if (userList.error = 'Unauthorized access') {
                navigate('/')
            }
        }
        fetch("/api/userdata",{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
        }).then(async(res)=>{
            res =  await res.json();
            setShowUserData({
                username:res.username,
                fullname:res.fullname,
                fullname2:res.fullname,
                url     :res.profilepic
            });
        });
        
        fetchData();
    }, []);

    const Users = ({ username, fullname, profilepic,userId }) => {
        return (
            <>
                <li>
                    <Link to="/dashboard" onClick={() => { showModal(profilepic,fullname,userId) }}>
                        <div class="d-flex align-items-center">
                            <div class="chat-user-img me-3 ms-0">
                                <div class="chat-user-img away align-self-center me-3 ms-0">
                                    <img class="rounded-circle avatar-lg img-thumbnail" style={{width:"50px",height:"50px"}} src={profilepic} alt="" />
                                </div>
                            </div>
                            <div class="flex-grow-1 overflow-hidden">
                                <h5 class="text-truncate font-size-14 mb-1">{username}</h5>
                                <h6 class="text-truncate font-size-12 mb-0">{fullname}</h6>
                            </div>
                        </div>
                        
                    </Link>
                    {/* <Link  onClick={() => { showModal() }} id="conversation0" class="">
                        <div class="d-flex">
                            <div class="chat-user-img online align-self-center me-3 ms-0">
                                <img src={profilepic}  class="rounded-circle avatar-xs" alt="chatvia"/>
                            </div>
                            <div class="flex-grow-1 overflow-hidden">
                                <h5 class="text-truncate font-size-15 mb-1">{username}</h5>
                                <p class="chat-user-message text-truncate mb-0">{fullname}</p>
                            </div>
                        </div>
                    </Link> */}
                </li>
            </>
        )
    }
    const searchUser = async (e) => {
        let value = e.target.value.replaceAll(" ", '');
        let searchResult = await fetch("/api/searchusername", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: value })
        });
        searchResult = await searchResult.json();
        setUser(searchResult);
    }
   
    
    const setData = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setShowUserData({...showUserData,[name]:value})
    }
    const [imageChange , setImageChange] = useState(false);
    function displayImage(file) {
        const reader = new FileReader();
      
        reader.onload = function(event) {
        //   img.src = event.target.result;
          document.getElementById('profile_tab_profilepic').src = event.target.result
          document.getElementById('nav_profile_pic').src = event.target.result
        };
      
        reader.readAsDataURL(file);
      }
      
    const editUserData =  (e) =>{
        e.preventDefault();
        if(!imageChange){
            fetch("/api/updateuser",{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(showUserData)
            }).then(async(res)=>{
                res = await res.json()
                setShowUserData({...showUserData,fullname2:showUserData.fullname});
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Changes has be save',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
        }
        else{
            // fetch("/api/updateuser",{
            //     method:"PUT",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body:JSON.stringify(showUserData)
            // }).then(async(res)=>{
            //     res = await res.json()
            //     console.log(res)
            // });
            var formData = new FormData();
            var inpFile = document.getElementById("fileInput");   
            formData.append("avatar", inpFile.files[0]);
            fetch('/api/uploadprofilepic',{
                method:"POST",
                body:formData
            }).then(async(res)=>{
                displayImage(inpFile.files[0])
                e.preventDefault();
                res = await res.json();
                console.log(res)
                _user.getUserInfo();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Changes has be save',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        }
    }

    const Chate = ({fullname,profilepic,index,userId}) =>{
        const activeChate = (userId,index) =>{
            setSelectedUser({fullname, profilepic,userId,index});
        }
        return(
            <li id={"conversation"+index} class={`${userId}`} onClick={() => { setShowHideChate("user-chat w-100 user-chat-show") }} >
                <Link to="#" onClick={()=>activeChate(userId,index)}> 
                    <div class="d-flex">
                        <div class="chat-user-img online align-self-center me-3 ms-0"><img
                            src={profilepic} class="rounded-circle avatar-xs"
                            alt="chatvia" /></div>
                        <div class="flex-grow-1 overflow-hidden">
                            <h5 class="text-truncate font-size-15 mb-1">{fullname}</h5>
                            {/* <p class="chat-user-message text-truncate mb-0">okay sure😄👍</p> */}
                        </div>
                    </div>
                </Link>
            </li>
        )
    }   
    return (
        <>
            <div className="chat-leftsidebar me-lg-1">
                <div className="tab-content">
                    <div id="pills-user" class={navActive.tapUser}>
                        <div>
                            <div class="px-4 pt-4">
                                <h4 class="mb-0">My Profile</h4>
                            </div>
                            <div class="text-center p-4 border-bottom">
                                <div class="mb-4 profile-user">
                                    <img id="profile_tab_profilepic" src={_user.userData.profilepic} class="rounded-circle avatar-lg img-thumbnail" />
                                    {/* <button type="button" class="avatar-xs p-0 rounded-circle profile-photo-edit btn btn-light"> */}
                                    {/* <FontAwesomeIcon icon={faPen} />    */}
                                    {/* </button> */}
                                </div>
                                <h5 class="font-size-16 mb-1 text-truncate">{showUserData.fullname2}</h5>
                            </div>
                            <div class="p-4 user-profile-desc">
                                <div id="profile-user-accordion-1" class="custom-accordion">
                                    <div class="shadow-none border mb-2 card">
                                        <div id="profile-user-headingOne" class="card-header">
                                            <h5 class="font-size-14 m-0"><FontAwesomeIcon icon={faUser} className='mx-2' />About</h5>
                                        </div>
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="">
                                                    <form onSubmit={editUserData} class="">
                                                        <div class="mb-3">
                                                            <label class="form-label form-label">Username</label>
                                                            <div class="mb-3 bg-soft-light rounded-3 input-group">
                                                                <input id="username" onChange={setData} name="username" placeholder="Enter email" type="text" class="form-control form-control-lg border-light bg-soft-light form-control" aria-invalid="false" value={showUserData.username} />
                                                            </div>
                                                        </div>
                                                        <div class="mb-4 mb-3"><label class="form-label form-label">Full Name</label>
                                                            <div class="mb-3 bg-soft-light rounded-3 input-group">
                                                                <input id="fullname" onChange={setData}  name="fullname" placeholder="Enter Password" type="test" class="form-control form-control-lg border-light bg-soft-light form-control" aria-invalid="false" value={showUserData.fullname} />
                                                            </div>
                                                        </div>
                                                        <div class="mb-4 mb-3"><label class="form-label form-label">Profile image</label>
                                                            <div class="mb-3 bg-soft-light rounded-3 input-group">
                                                                <input id="fileInput" onChange={()=>{setImageChange(true)}}  size="60" type="file" class="form-control"></input>
                                                            </div>
                                                        </div>
                                                        <div class="d-grid">
                                                            <button type="submit"  class=" waves-effect waves-light btn btn-primary d-block w-100">Save Changes</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="pills-groups" class={navActive.tapFirends}>
                        <div>
                            <div class="p-4">
                                <div class="user-chat-nav float-end">
                                    <div id="create-group"></div>
                                </div>
                                <h4 class="mb-4">Add Friends</h4>
                                <div class="search-box chat-search-box">
                                    <div class="bg-light rounded-lg input-group input-group-lg"><button type="button"
                                        class="text-decoration-none text-muted pr-1 btn btn-link"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                                        <input placeholder="Search friends..." onChange={searchUser} type="text" class="form-control bg-light form-control" /></div>
                                </div>
                            </div>
                            <div data-simplebar="init" class="p-4 chat-message-list chat-group-list simplebar-scrollable-y"
                                style={{ "maxHeight": "100%" }}>
                                <div class="simplebar-wrapper" style={{ "margin": "-24px" }}>
                                    <div class="simplebar-height-auto-observer-wrapper">
                                        <div class="simplebar-height-auto-observer"></div>
                                    </div>
                                    <div class="simplebar-mask">
                                        <div class="simplebar-offset" style={{ "right": "0px", "bottom": " 0px" }}>
                                            <div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content"
                                                style={{ "height": " 100%", "overflow": "hidden scroll" }}>
                                                <div class="simplebar-content" style={{ "padding": " 24px" }}>
                                                    <ul class="list-unstyled chat-list">
                                                        {
                                                            user.map((e, i) => {
                                                                return (<Users username={e.username} fullname={e.fullname} profilepic={e.profilepic} userId={e._id}/>)
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="simplebar-placeholder" style={{ "width": "380px", "height": "445px" }}></div>
                                </div>
                                <div class="simplebar-track simplebar-horizontal" style={{ "visibility": "hidden" }}>
                                    <div class="simplebar-scrollbar" style={{ "width": "0px", "display": "none" }}></div>
                                </div>
                                <div class="simplebar-track simplebar-vertical" style={{ "visibility": "visible" }}>
                                    <div class="simplebar-scrollbar"
                                        style={{ "height": " 129px", " display": "block", "transform": "translate3d(0px, 0px, 0px)" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="pills-chat" class={navActive.tapChat}>
                        <div>
                            <div class="px-4 pt-4">
                                <h4 class="mb-4">Chats</h4>
                            </div>
                            
                            <div class="px-2">
                                <div data-simplebar="init" class="chat-message-list simplebar-scrollable-y" style={{ "maxHeight": "100%" }}>
                                    <div class="simplebar-wrapper" style={{ "margin": "0px" }}>
                                        <div class="simplebar-height-auto-observer-wrapper">
                                            <div class="simplebar-height-auto-observer"></div>
                                        </div>
                                        <div class="simplebar-mask">
                                            <div class="simplebar-offset" style={{ "right": "0px", "bottom": "0px" }}>
                                                <div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content"
                                                    style={{ "height": "100%", "overflow": "hidden scroll" }}>
                                                    <div class="simplebar-content" style={{ "padding": " 0px" }}>
                                                        <ul class="list-unstyled chat-list chat-user-list" id="chat-list">
                                                            {
                                                                chates.map((e,i)=>{
                                                                    return(
                                                                        <Chate fullname={e.fullname} profilepic={e.profilepic} index={i} userId={e._id}/>
                                                                    )
                                                                })                        
                                                            }
                                                            
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="simplebar-placeholder" style={{ "width": "364px", "height": "890px" }}></div>
                                    </div>
                                    <div class="simplebar-track simplebar-horizontal" style={{ "visibility": "hidden" }}>
                                        <div class="simplebar-scrollbar" style={{ "width": "0px", "display": "none" }}></div>
                                    </div>
                                    <div class="simplebar-track simplebar-vertical" style={{ "visibility": "visible" }}>
                                        <div class="simplebar-scrollbar"
                                            style={{ "height": "62px", "transform": "translate3d(0px, 0px, 0px)", "display": "block" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tabs
