import React, { createContext, useContext, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faMoon, faUser, faSun, faPen, faArrowLeft, faUserGroup, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from './Dashboard';
import { useNavigate } from 'react-router-dom';
const Naber = ({ navActive, setnavActive, setNightAndDarkMode, nightDarkMode }) => {
    const user = useContext(UserContext);
    const divRef = useRef(null);
    const showLogoutDropdow = (a) => {
        if (document.getElementById("profile_dropdwn").classList.contains("show"))
            if(a == undefined)
                document.getElementById("profile_dropdwn").classList.remove('show')
            else{
                setTimeout(() => {
                    try {
                        document.getElementById("profile_dropdwn").classList.remove('show');           
                    } catch (error) {
                        // console.log(error)
                    }
                }, 100);
            }
        else
            document.getElementById("profile_dropdwn").classList.add('show')
    }
    let navigate = useNavigate();
    const logout = () =>{
        fetch("/api/logout",{
            method:'GET',
            headers:{
                "Content-Type":"application-json"
            }
        }).then((res)=>{
            if(res.status == 200){
                navigate('/');
            }
        })
    }
    return (
        <>
            <div class="side-menu flex-lg-column me-lg-1">
                <div class="navbar-brand-box">
                    <a class="logo logo-dark" to="/">
                        <span class="logo-sm">
                            <img src="http://chatvia-light.react.themesbrand.com/static/media/logo.e41f6087382055646c1c02d0a63583d5.svg" alt="logo" height="30" />
                        </span>
                    </a>
                    <a class="logo logo-light" to="/">
                        <span class="logo-sm">
                            <img src="http://chatvia-light.react.themesbrand.com/static/media/logo.e41f6087382055646c1c02d0a63583d5.svg" alt="logo" height="30" />
                        </span>
                    </a>
                </div>
                <div class="flex-lg-column">
                    <ul role="tablist" class="side-menu-nav justify-content-center nav nav-pills">
                        <li id="profile" class="nav-item">
                            <a id="pills-user-tab" onClick={() => { setnavActive({ navUser: "active nav-link", navChat: "nav-link", navFriends: "nav-link", tapUser: "tab-pane active", tapChat: "tab-pane", tapFirends: "tab-pane" }) }} class={navActive.navUser}>
                                <FontAwesomeIcon icon={faUser} />
                            </a>
                        </li>
                        <li id="Chats" class="nav-item">
                            <a id="pills-chat-tab" onClick={() => { setnavActive({ navUser: "nav-link", navChat: "active nav-link", navFriends: "nav-link", tapUser: "tab-pane", tapChat: "tab-pane active", tapFirends: "tab-pane" }) }} class={navActive.navChat}>
                                <FontAwesomeIcon icon={faComment} />
                            </a>
                        </li>
                        <li id="Friends" class="nav-item">
                            <a id="pills-firiends-tab" onClick={() => { setnavActive({ navUser: "nav-link", navChat: "nav-link", navFriends: "active nav-link", tapUser: "tab-pane", tapChat: "tab-pane", tapFirends: "tab-pane active" }) }} class={navActive.navFriends}>
                                <FontAwesomeIcon icon={faUserGroup} />
                            </a>
                        </li>
                        <li class="nav-item">
                            <a id="light-dark" onClick={() => { setNightAndDarkMode(faSun) }} class="nav-link">
                                <FontAwesomeIcon icon={nightDarkMode} />
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="flex-lg-column d-none d-lg-block">
                    <ul class="side-menu-nav justify-content-center nav" >
                        <li class="nav-item btn-group dropup profile-user-dropdown dropdown  nav-item"   ><a tabIndex={0} ref={divRef} onBlur={() => showLogoutDropdow('close')} onClick={() => showLogoutDropdow()}  aria-haspopup="true" class="nav-link" aria-expanded="false"><img id="nav_profile_pic"  src={user.userData.profilepic} alt="" class="profile-user rounded-circle" /></a>
                            <div id="profile_dropdwn"  role="menu" aria-hidden="true" class="dropdown-menu">
                            <button onClick={() => { setnavActive({ navUser: "active nav-link", navChat: "nav-link", navFriends: "nav-link", tapUser: "tab-pane active", tapChat: "tab-pane", tapFirends: "tab-pane" })}} type="button" role="menuitem" class="dropdown-item">Profile <FontAwesomeIcon icon={faUser} />
                            </button>
                            <div tabindex="0" class="dropdown-divider"></div><a  onClick={()=>{logout()}} role="menuitem" class="dropdown-item">Log out <FontAwesomeIcon icon={faRightFromBracket} /></a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Naber
