import React, { useEffect, useState } from 'react'
import  ReactDOM  from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faMoon, faUser, faSun, faPen, faArrowLeft, faUserGroup, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import defaultProfileImage from '../assets/images/avatar-1.png'
import { Link } from 'react-router-dom'
import Modal from './Modal'


const Dashboard = () => {

    let [navActive, setnavActive] = useState({
        navUser: "nav-link",
        navChat: "active nav-link",
        navFriends: "nav-link",
        tapUser: "tab-pane",
        tapChat: "tab-pane active",
        tapFirends: "tab-pane"
    })
    let [nightDarkMode, setNightDarkMode] = useState(faMoon);
    let [showHideChate, setShowHideChate] = useState("user-chat w-100");
    const setNightAndDarkMode = () => {
        if (nightDarkMode == faMoon) {
            setNightDarkMode(faSun);
            document.body.setAttribute("data-layout-mode", "dark");
        }
        else {
            setNightDarkMode(faMoon);
            document.body.setAttribute("data-layout-mode", "ligh");
        }
    }
   
    const [modalActiv ,setModalActiv] = useState(false);

    const showModal = () => {
        setModalActiv(true)     
    }
    return (
        <>
            <div className="layout-wrapper d-lg-flex">
                <div class="side-menu flex-lg-column me-lg-1">
                    <div class="navbar-brand-box">
                        <a class="logo logo-dark" href="/">
                            <span class="logo-sm">
                                <img src="http://chatvia-light.react.themesbrand.com/static/media/logo.e41f6087382055646c1c02d0a63583d5.svg" alt="logo" height="30" />
                            </span>
                        </a>
                        <a class="logo logo-light" href="/">
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
                </div>
                <div className="chat-leftsidebar me-lg-1">
                    <div className="tab-content">
                        <div id="pills-user" class={navActive.tapUser}>
                            <div>
                                <div class="px-4 pt-4">
                                    <h4 class="mb-0">My Profile</h4>
                                </div>
                                <div class="text-center p-4 border-bottom">
                                    <div class="mb-4 profile-user">
                                        <img src={defaultProfileImage} class="rounded-circle avatar-lg img-thumbnail" alt="chatvia" />
                                        {/* <button type="button" class="avatar-xs p-0 rounded-circle profile-photo-edit btn btn-light"> */}
                                        {/* <FontAwesomeIcon icon={faPen} />    */}
                                        {/* </button> */}
                                    </div>
                                    <h5 class="font-size-16 mb-1 text-truncate">Patricia Smith</h5>
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
                                                        <form class="">
                                                            <div class="mb-3">
                                                                <label class="form-label form-label">Username</label>
                                                                <div class="mb-3 bg-soft-light rounded-3 input-group">
                                                                    <input id="email" name="email" placeholder="Enter email" type="text" class="form-control form-control-lg border-light bg-soft-light form-control" aria-invalid="false" value="admin@themesbrand.com" />
                                                                </div>
                                                            </div>
                                                            <div class="mb-4 mb-3"><label class="form-label form-label">Full Name</label>
                                                                <div class="mb-3 bg-soft-light rounded-3 input-group">
                                                                    <input id="password" name="password" placeholder="Enter Password" type="password" class="form-control form-control-lg border-light bg-soft-light form-control" aria-invalid="false" value="123456" />
                                                                </div>
                                                            </div>
                                                            <div class="mb-4 mb-3"><label class="form-label form-label">Profile image</label>
                                                                <div class="mb-3 bg-soft-light rounded-3 input-group">
                                                                    <input name="fileInput" size="60" type="file" class="form-control"></input>

                                                                </div>
                                                            </div>
                                                            <div class="d-grid">
                                                                <button type="submit" class=" waves-effect waves-light btn btn-primary d-block w-100">Save Changes</button>
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
                                        <div id="create-group"><button type="button"
                                            class="text-decoration-none text-muted font-size-18 py-0 btn btn-link">  <FontAwesomeIcon icon={faUserGroup} /></button></div>
                                    </div>
                                    <h4 class="mb-4">Add Friends</h4>
                                    <div class="search-box chat-search-box">
                                        <div class="bg-light rounded-lg input-group input-group-lg"><button type="button"
                                            class="text-decoration-none text-muted pr-1 btn btn-link"><FontAwesomeIcon icon={faMagnifyingGlass} /></button><input placeholder="Search friends..."
                                                type="text" class="form-control bg-light form-control" /></div>
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
                                                            <li>
                                                                <Link to="/dashboard" onClick={() => { showModal() }}>
                                                                    <div class="d-flex align-items-center">
                                                                        <div class="chat-user-img me-3 ms-0">
                                                                            <div class="avatar-xs"><span
                                                                                class="avatar-title rounded-circle bg-soft-primary text-primary">G</span></div>
                                                                        </div>
                                                                        <div class="flex-grow-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-14 mb-0">#General</h5>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                            <li><a href="/dashboard">
                                                                <div class="d-flex align-items-center">
                                                                    <div class="chat-user-img me-3 ms-0">
                                                                        <div class="avatar-xs"><span
                                                                            class="avatar-title rounded-circle bg-soft-primary text-primary">R</span></div>
                                                                    </div>
                                                                    <div class="flex-grow-1 overflow-hidden">
                                                                        <h5 class="text-truncate font-size-14 mb-0">#Reporting<span
                                                                            class="badge-soft-danger float-end badge bg-none rounded-pill">23+</span></h5>
                                                                    </div>
                                                                </div>
                                                            </a></li>
                                                            <li><a href="/dashboard">
                                                                <div class="d-flex align-items-center">
                                                                    <div class="chat-user-img me-3 ms-0">
                                                                        <div class="avatar-xs"><span
                                                                            class="avatar-title rounded-circle bg-soft-primary text-primary">D</span></div>
                                                                    </div>
                                                                    <div class="flex-grow-1 overflow-hidden">
                                                                        <h5 class="text-truncate font-size-14 mb-0">#Designer<span
                                                                            class="badge-soft-danger float-end badge bg-none rounded-pill">New</span></h5>
                                                                    </div>
                                                                </div>
                                                            </a></li>
                                                            <li><a href="/dashboard">
                                                                <div class="d-flex align-items-center">
                                                                    <div class="chat-user-img me-3 ms-0">
                                                                        <div class="avatar-xs"><span
                                                                            class="avatar-title rounded-circle bg-soft-primary text-primary">D</span></div>
                                                                    </div>
                                                                    <div class="flex-grow-1 overflow-hidden">
                                                                        <h5 class="text-truncate font-size-14 mb-0">#Developers</h5>
                                                                    </div>
                                                                </div>
                                                            </a></li>
                                                            <li><a href="/dashboard">
                                                                <div class="d-flex align-items-center">
                                                                    <div class="chat-user-img me-3 ms-0">
                                                                        <div class="avatar-xs"><span
                                                                            class="avatar-title rounded-circle bg-soft-primary text-primary">P</span></div>
                                                                    </div>
                                                                    <div class="flex-grow-1 overflow-hidden">
                                                                        <h5 class="text-truncate font-size-14 mb-0">#Project-aplha<span
                                                                            class="badge-soft-danger float-end badge bg-none rounded-pill">New</span></h5>
                                                                    </div>
                                                                </div>
                                                            </a></li>
                                                            <li><a href="/dashboard">
                                                                <div class="d-flex align-items-center">
                                                                    <div class="chat-user-img me-3 ms-0">
                                                                        <div class="avatar-xs"><span
                                                                            class="avatar-title rounded-circle bg-soft-primary text-primary">S</span></div>
                                                                    </div>
                                                                    <div class="flex-grow-1 overflow-hidden">
                                                                        <h5 class="text-truncate font-size-14 mb-0">#Snacks</h5>
                                                                    </div>
                                                                </div>
                                                            </a></li>
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
                                    <div class="search-box chat-search-box">
                                        <div class="mb-3 rounded-lg input-group input-group-lg"><span
                                            class="input-group-text text-muted bg-light pe-1 ps-3" id="basic-addon1"><i
                                                class="ri-search-line search-icon font-size-18"></i></span><input
                                                placeholder="Search messages or users" type="text" class="form-control bg-light form-control" value="" />
                                        </div>
                                    </div>
                                </div>
                                <div class="px-4 pb-4 dot_remove" dir="ltr">
                                    <div class="alice-carousel">
                                        <ul class="alice-carousel__dots">
                                            <li class="alice-carousel__dots-item"></li>
                                            <li class="alice-carousel__dots-item __active"></li>
                                        </ul>
                                        <div class="alice-carousel__prev-btn">
                                            <div class="alice-carousel__prev-btn-wrapper">
                                                <p class="alice-carousel__prev-btn-item __inactive"><span data-area="<"></span></p>
                                            </div>
                                        </div>
                                        <div class="alice-carousel__next-btn">
                                            <div class="alice-carousel__next-btn-wrapper">
                                                <p class="alice-carousel__next-btn-item __inactive"><span data-area=">"></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="px-2">
                                    <h5 class="mb-3 px-3 font-size-16">Recent</h5>
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
                                                                <li id="conversation0" onClick={() => { setShowHideChate("user-chat w-100 user-chat-show") }} class=""><Link to="/dashboard">
                                                                    <div class="d-flex">
                                                                        <div class="chat-user-img online align-self-center me-3 ms-0"><img
                                                                            src="/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" class="rounded-circle avatar-xs"
                                                                            alt="chatvia" /><span class="user-status"></span></div>
                                                                        <div class="flex-grow-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-15 mb-1">Patrick Hendricks</h5>
                                                                            <p class="chat-user-message text-truncate mb-0">okay sure😄👍</p>
                                                                        </div>
                                                                        <div class="font-size-11">02:50</div>
                                                                    </div>
                                                                </Link></li>
                                                                <li id="conversation1" class="unread"><a href="/dashboard">
                                                                    <div class="d-flex">
                                                                        <div class="chat-user-img away align-self-center me-3 ms-0"><img
                                                                            src="/static/media/avatar-3.2cfd5ba6f0dee8d1d076.jpg" class="rounded-circle avatar-xs"
                                                                            alt="chatvia" /><span class="user-status"></span></div>
                                                                        <div class="flex-grow-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-15 mb-1">Mark Messer</h5>
                                                                            <p class="chat-user-message text-truncate mb-0"><i
                                                                                class="ri-image-fill align-middle me-1"></i>images</p>
                                                                        </div>
                                                                        <div class="font-size-11">10:30</div>
                                                                        <div class="unread-message" id="unRead1"><span
                                                                            class="badge badge-soft-danger rounded-pill">2</span></div>
                                                                    </div>
                                                                </a></li>
                                                                <li id="conversation2" class=""><a href="/dashboard">
                                                                    <div class="d-flex">
                                                                        <div class="chat-user-img undefined align-self-center me-3 ms-0">
                                                                            <div class="avatar-xs"><span
                                                                                class="avatar-title rounded-circle bg-soft-primary text-primary">G</span></div>
                                                                        </div>
                                                                        <div class="flex-grow-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-15 mb-1">General</h5>
                                                                            <p class="chat-user-message text-truncate mb-0">This theme is Awesome!</p>
                                                                        </div>
                                                                        <div class="font-size-11">2:06</div>
                                                                    </div>
                                                                </a></li>
                                                                <li id="conversation3" class="typing active"><a href="/dashboard">
                                                                    <div class="d-flex">
                                                                        <div class="chat-user-img online align-self-center me-3 ms-0"><img
                                                                            src="/static/media/avatar-4.b23e41d9c09997efbc21.jpg" class="rounded-circle avatar-xs"
                                                                            alt="chatvia" /><span class="user-status"></span></div>
                                                                        <div class="flex-grow-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-15 mb-1">Doris Brown</h5>
                                                                            <p class="chat-user-message text-truncate mb-0">typing<span class="animate-typing"><span
                                                                                class="dot ms-1"></span><span class="dot ms-1"></span><span
                                                                                    class="dot ms-1"></span></span></p>
                                                                        </div>
                                                                        <div class="font-size-11">10:05</div>
                                                                    </div>
                                                                </a></li>
                                                                <li id="conversation4" class="unread"><a href="/dashboard">
                                                                    <div class="d-flex">
                                                                        <div class="chat-user-img undefined align-self-center me-3 ms-0">
                                                                            <div class="avatar-xs"><span
                                                                                class="avatar-title rounded-circle bg-soft-primary text-primary">D</span></div>
                                                                        </div>
                                                                        <div class="flex-grow-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-15 mb-1">Designer</h5>
                                                                            <p class="chat-user-message text-truncate mb-0">Next meeting tomorrow 10.00AM</p>
                                                                        </div>
                                                                        <div class="font-size-11">2:10</div>
                                                                        <div class="unread-message" id="unRead5"><span
                                                                            class="badge badge-soft-danger rounded-pill">1</span></div>
                                                                    </div>
                                                                </a></li>
                                                                <li id="conversation5" class=""><a href="/dashboard">
                                                                    <div class="d-flex">
                                                                        <div class="chat-user-img away align-self-center me-3 ms-0"><img
                                                                            src="/static/media/avatar-6.dc44eabff29dbd9780cb.jpg" class="rounded-circle avatar-xs"
                                                                            alt="chatvia" /><span class="user-status"></span></div>
                                                                        <div class="flex-grow-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-15 mb-1">Steve Walker</h5>
                                                                            <p class="chat-user-message text-truncate mb-0">Okay 👍, let me check it and get back to
                                                                                you soon</p>
                                                                        </div>
                                                                        <div class="font-size-11">01:16</div>
                                                                    </div>
                                                                </a></li>
                                                                <li id="conversation6" class="typing"><a href="/dashboard">
                                                                    <div class="d-flex">
                                                                        <div class="chat-user-img online align-self-center me-3 ms-0">
                                                                            <div class="avatar-xs"><span
                                                                                class="avatar-title rounded-circle bg-soft-primary text-primary">A</span></div><span
                                                                                    class="user-status"></span>
                                                                        </div>
                                                                        <div class="flex-grow-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-15 mb-1">Albert Rodarte</h5>
                                                                            <p class="chat-user-message text-truncate mb-0">typing<span class="animate-typing"><span
                                                                                class="dot ms-1"></span><span class="dot ms-1"></span><span
                                                                                    class="dot ms-1"></span></span></p>
                                                                        </div>
                                                                        <div class="font-size-11">01:05</div>
                                                                    </div>
                                                                </a></li>
                                                                <li id="conversation7" class=""><a href="/dashboard">
                                                                    <div class="d-flex">
                                                                        <div class="chat-user-img online align-self-center me-3 ms-0">
                                                                            <div class="avatar-xs"><span
                                                                                class="avatar-title rounded-circle bg-soft-primary text-primary">M</span></div><span
                                                                                    class="user-status"></span>
                                                                        </div>
                                                                        <div class="flex-grow-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-15 mb-1">Mirta George</h5>
                                                                            <p class="chat-user-message text-truncate mb-0">Yeah, Everything is fine👍</p>
                                                                        </div>
                                                                        <div class="font-size-11">02:50</div>
                                                                    </div>
                                                                </a></li>
                                                                <li id="conversation8" class=""><a href="/dashboard">
                                                                    <div class="d-flex">
                                                                        <div class="chat-user-img away align-self-center me-3 ms-0"><img
                                                                            src="/static/media/avatar-7.5ba5195e48f4c2c3c3fa.jpg" class="rounded-circle avatar-xs"
                                                                            alt="chatvia" /><span class="user-status"></span></div>
                                                                        <div class="flex-grow-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-15 mb-1">Paul Haynes</h5>
                                                                            <p class="chat-user-message text-truncate mb-0">Good Morning😄</p>
                                                                        </div>
                                                                        <div class="font-size-11">02:50</div>
                                                                    </div>
                                                                </a></li>
                                                                <li id="conversation9" class=""><a href="/dashboard">
                                                                    <div class="d-flex">
                                                                        <div class="chat-user-img online align-self-center me-3 ms-0"><img
                                                                            src="/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" class="rounded-circle avatar-xs"
                                                                            alt="chatvia" /><span class="user-status"></span></div>
                                                                        <div class="flex-grow-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-15 mb-1">Jonathan Miller</h5>
                                                                            <p class="chat-user-message text-truncate mb-0">Hi, How are You?</p>
                                                                        </div>
                                                                        <div class="font-size-11">08:00</div>
                                                                    </div>
                                                                </a></li>
                                                                <li id="conversation10" class=""><a href="/dashboard">
                                                                    <div class="d-flex">
                                                                        <div class="chat-user-img away align-self-center me-3 ms-0"><img
                                                                            src="/static/media/avatar-3.2cfd5ba6f0dee8d1d076.jpg" class="rounded-circle avatar-xs"
                                                                            alt="chatvia" /><span class="user-status"></span></div>
                                                                        <div class="flex-grow-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-15 mb-1">Ossie Wilson</h5>
                                                                            <p class="chat-user-message text-truncate mb-0"><i
                                                                                class="ri-image-fill align-middle me-1"></i>I've finished it! See you so</p>
                                                                        </div>
                                                                        <div class="font-size-11">12:05</div>
                                                                    </div>
                                                                </a></li>
                                                                <li id="conversation11" class=""><a href="/dashboard">
                                                                    <div class="d-flex">
                                                                        <div class="chat-user-img offline align-self-center me-3 ms-0">
                                                                            <div class="avatar-xs"><span
                                                                                class="avatar-title rounded-circle bg-soft-primary text-primary">S</span></div><span
                                                                                    class="user-status"></span>
                                                                        </div>
                                                                        <div class="flex-grow-1 overflow-hidden">
                                                                            <h5 class="text-truncate font-size-15 mb-1">Sara Muller</h5>
                                                                            <p class="chat-user-message text-truncate mb-0">Wow that's great</p>
                                                                        </div>
                                                                        <div class="font-size-11">12:00</div>
                                                                    </div>
                                                                </a></li>
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
                <div class={showHideChate}>
                    <div class="d-lg-flex">
                        <div class="w-100">
                            <div class="p-3 p-lg-4 border-bottom">
                                <div class="align-items-center row">
                                    <div class="col-8 col-sm-4" >
                                        <div class="d-flex align-items-center">
                                            <div class="d-block d-lg-none me-2 ms-0"  ><Link class="user-chat-remove text-muted font-size-16 p-2"
                                                to="/dashboard"><FontAwesomeIcon icon={faArrowLeft} onClick={() => setShowHideChate("user-chat w-100")} /></Link></div>
                                            <div class="me-3 ms-0"><img src="/static/media/avatar-4.b23e41d9c09997efbc21.jpg"
                                                class="rounded-circle avatar-xs" alt="chatvia" /></div>
                                            <div class="flex-grow-1 overflow-hidden">
                                                <h5 class="font-size-16 mb-0 text-truncate"><a class="text-reset user-profile-show"
                                                    href="/dashboard">Doris Brown</a><i
                                                        class="ri-record-circle-fill font-size-10 text-success d-inline-block ms-1"></i></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-simplebar="init" class="chat-conversation p-3 p-lg-4 simplebar-scrollable-y" id="messages"
                                style={{ "maxHeight": "100%" }}>
                                <div class="simplebar-wrapper" style={{ "margin": "-124px" }}>
                                    <div class="simplebar-height-auto-observer-wrapper">
                                        <div class="simplebar-height-auto-observer"></div>
                                    </div>
                                    <div class="simplebar-mask">
                                        <div class="simplebar-offset" style={{ "right": "0px", "bottom": "0px" }}>
                                            <div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content"
                                                style={{ "height": "100%", "overflow": "hidden scroll" }}>
                                                <div class="simplebar-content" style={{ "padding": "24px" }}>
                                                    <ul class="list-unstyled mb-0">
                                                        <li class="">
                                                            <div class="conversation-list">
                                                                <div class="chat-avatar"><img src="/static/media/avatar-4.b23e41d9c09997efbc21.jpg"
                                                                    alt="chatvia" /></div>
                                                                <div class="user-chat-content">
                                                                    <div class="ctext-wrap">
                                                                        <div class="ctext-wrap-content">
                                                                            <p class="mb-0">Good Morning</p>
                                                                            <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span
                                                                                class="align-middle">10:00</span></p>
                                                                        </div>
                                                                        <div class="align-self-start dropdown"><a aria-haspopup="true" class=""
                                                                            aria-expanded="false"><i class="ri-more-2-fill"></i></a>
                                                                            <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu"><button
                                                                                type="button" tabindex="0" role="menuitem" class="dropdown-item">Copy <i
                                                                                    class="ri-file-copy-line float-end text-muted"></i></button><button
                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Save <i
                                                                                            class="ri-save-line float-end text-muted"></i></button><button type="button"
                                                                                                tabindex="0" role="menuitem" class="dropdown-item">Forward <i
                                                                                                    class="ri-chat-forward-line float-end text-muted"></i></button><button
                                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Delete <i
                                                                                                            class="ri-delete-bin-line float-end text-muted"></i></button></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="conversation-name">Doris Brown</div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li class="right">
                                                            <div class="conversation-list">
                                                                <div class="chat-avatar"><img src="/static/media/avatar-1.3921191a8acf79d3e907.jpg"
                                                                    alt="chatvia" /></div>
                                                                <div class="user-chat-content">
                                                                    <div class="ctext-wrap">
                                                                        <div class="ctext-wrap-content">
                                                                            <p class="mb-0">Good morning, How are you? What about our next meeting?</p>
                                                                            <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span
                                                                                class="align-middle">10:02</span></p>
                                                                        </div>
                                                                        <div class="align-self-start dropdown"><a aria-haspopup="true" class=""
                                                                            aria-expanded="false"><i class="ri-more-2-fill"></i></a>
                                                                            <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu"><button
                                                                                type="button" tabindex="0" role="menuitem" class="dropdown-item">Copy <i
                                                                                    class="ri-file-copy-line float-end text-muted"></i></button><button
                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Save <i
                                                                                            class="ri-save-line float-end text-muted"></i></button><button type="button"
                                                                                                tabindex="0" role="menuitem" class="dropdown-item">Forward <i
                                                                                                    class="ri-chat-forward-line float-end text-muted"></i></button><button
                                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Delete <i
                                                                                                            class="ri-delete-bin-line float-end text-muted"></i></button></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="conversation-name">Patricia Smith</div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="chat-day-title"><span class="title">Today</span></div>
                                                        </li>
                                                        <li class="">
                                                            <div class="conversation-list">
                                                                <div class="chat-avatar">
                                                                    <div class="blank-div"></div>
                                                                </div>
                                                                <div class="user-chat-content">
                                                                    <div class="ctext-wrap">
                                                                        <div class="ctext-wrap-content">
                                                                            <p class="mb-0">Yeah everything is fine</p>
                                                                            <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span
                                                                                class="align-middle">10:05</span></p>
                                                                        </div>
                                                                        <div class="align-self-start dropdown"><a aria-haspopup="true" class=""
                                                                            aria-expanded="false"><i class="ri-more-2-fill"></i></a>
                                                                            <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu"><button
                                                                                type="button" tabindex="0" role="menuitem" class="dropdown-item">Copy <i
                                                                                    class="ri-file-copy-line float-end text-muted"></i></button><button
                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Save <i
                                                                                            class="ri-save-line float-end text-muted"></i></button><button type="button"
                                                                                                tabindex="0" role="menuitem" class="dropdown-item">Forward <i
                                                                                                    class="ri-chat-forward-line float-end text-muted"></i></button><button
                                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Delete <i
                                                                                                            class="ri-delete-bin-line float-end text-muted"></i></button></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li class="">
                                                            <div class="conversation-list">
                                                                <div class="chat-avatar"><img src="/static/media/avatar-4.b23e41d9c09997efbc21.jpg"
                                                                    alt="chatvia" /></div>
                                                                <div class="user-chat-content">
                                                                    <div class="ctext-wrap">
                                                                        <div class="ctext-wrap-content">
                                                                            <p class="mb-0">&amp; Next meeting tomorrow 10.00AM</p>
                                                                            <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span
                                                                                class="align-middle">10:05</span></p>
                                                                        </div>
                                                                        <div class="align-self-start dropdown"><a aria-haspopup="true" class=""
                                                                            aria-expanded="false"><i class="ri-more-2-fill"></i></a>
                                                                            <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu"><button
                                                                                type="button" tabindex="0" role="menuitem" class="dropdown-item">Copy <i
                                                                                    class="ri-file-copy-line float-end text-muted"></i></button><button
                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Save <i
                                                                                            class="ri-save-line float-end text-muted"></i></button><button type="button"
                                                                                                tabindex="0" role="menuitem" class="dropdown-item">Forward <i
                                                                                                    class="ri-chat-forward-line float-end text-muted"></i></button><button
                                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Delete <i
                                                                                                            class="ri-delete-bin-line float-end text-muted"></i></button></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="conversation-name">Doris Brown</div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li class="right">
                                                            <div class="conversation-list">
                                                                <div class="chat-avatar"><img src="/static/media/avatar-1.3921191a8acf79d3e907.jpg"
                                                                    alt="chatvia" /></div>
                                                                <div class="user-chat-content">
                                                                    <div class="ctext-wrap">
                                                                        <div class="ctext-wrap-content">
                                                                            <p class="mb-0">Wow that's great</p>
                                                                            <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span
                                                                                class="align-middle">10:06</span></p>
                                                                        </div>
                                                                        <div class="align-self-start dropdown"><a aria-haspopup="true" class=""
                                                                            aria-expanded="false"><i class="ri-more-2-fill"></i></a>
                                                                            <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu"><button
                                                                                type="button" tabindex="0" role="menuitem" class="dropdown-item">Copy <i
                                                                                    class="ri-file-copy-line float-end text-muted"></i></button><button
                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Save <i
                                                                                            class="ri-save-line float-end text-muted"></i></button><button type="button"
                                                                                                tabindex="0" role="menuitem" class="dropdown-item">Forward <i
                                                                                                    class="ri-chat-forward-line float-end text-muted"></i></button><button
                                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Delete <i
                                                                                                            class="ri-delete-bin-line float-end text-muted"></i></button></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="conversation-name">Patricia Smith</div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li class="">
                                                            <div class="conversation-list">
                                                                <div class="chat-avatar"><img src="/static/media/avatar-4.b23e41d9c09997efbc21.jpg"
                                                                    alt="chatvia" /></div>
                                                                <div class="user-chat-content">
                                                                    <div class="ctext-wrap">
                                                                        <div class="ctext-wrap-content">
                                                                            <p class="mb-0">images</p>
                                                                            <ul class="list-inline message-img  mb-0">
                                                                                <li class="list-inline-item message-img-list">
                                                                                    <div><a class="popup-img d-inline-block m-1" title="Project 1"
                                                                                        href="/dashboard"><img src="/static/media/img-4.c7a84ad5058b9382090e.jpg"
                                                                                            alt="chat" class="rounded border" /></a></div>
                                                                                    <div class="message-img-link">
                                                                                        <ul class="list-inline mb-0">
                                                                                            <li class="list-inline-item"><a href="/dashboard"><i
                                                                                                class="ri-download-2-line"></i></a></li>
                                                                                            <li class="list-inline-item dropdown"><a aria-haspopup="true" class=""
                                                                                                aria-expanded="false"><i class="ri-more-fill"></i></a>
                                                                                                <div tabindex="-1" role="menu" aria-hidden="true"
                                                                                                    class="dropdown-menu-end dropdown-menu"><button type="button" tabindex="0"
                                                                                                        role="menuitem" class="dropdown-item">Copy <i
                                                                                                            class="ri-file-copy-line float-end text-muted"></i></button><button
                                                                                                                type="button" tabindex="0" role="menuitem" class="dropdown-item">Save <i
                                                                                                                    class="ri-save-line float-end text-muted"></i></button><button
                                                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Forward
                                                                                                        <i
                                                                                                            class="ri-chat-forward-line float-end text-muted"></i></button><button
                                                                                                                type="button" tabindex="0" role="menuitem" class="dropdown-item">Delete
                                                                                                        <i class="ri-delete-bin-line float-end text-muted"></i></button></div>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </li>
                                                                                <li class="list-inline-item message-img-list">
                                                                                    <div><a class="popup-img d-inline-block m-1" title="Project 1"
                                                                                        href="/dashboard"><img src="/static/media/img-7.c1d24290e482cebe87d1.jpg"
                                                                                            alt="chat" class="rounded border" /></a></div>
                                                                                    <div class="message-img-link">
                                                                                        <ul class="list-inline mb-0">
                                                                                            <li class="list-inline-item"><a href="/dashboard"><i
                                                                                                class="ri-download-2-line"></i></a></li>
                                                                                            <li class="list-inline-item dropdown"><a aria-haspopup="true" class=""
                                                                                                aria-expanded="false"><i class="ri-more-fill"></i></a>
                                                                                                <div tabindex="-1" role="menu" aria-hidden="true"
                                                                                                    class="dropdown-menu-end dropdown-menu"><button type="button" tabindex="0"
                                                                                                        role="menuitem" class="dropdown-item">Copy <i
                                                                                                            class="ri-file-copy-line float-end text-muted"></i></button><button
                                                                                                                type="button" tabindex="0" role="menuitem" class="dropdown-item">Save <i
                                                                                                                    class="ri-save-line float-end text-muted"></i></button><button
                                                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Forward
                                                                                                        <i
                                                                                                            class="ri-chat-forward-line float-end text-muted"></i></button><button
                                                                                                                type="button" tabindex="0" role="menuitem" class="dropdown-item">Delete
                                                                                                        <i class="ri-delete-bin-line float-end text-muted"></i></button></div>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                            <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span
                                                                                class="align-middle">10:30</span></p>
                                                                        </div>
                                                                        <div class="align-self-start dropdown"><a aria-haspopup="true" class=""
                                                                            aria-expanded="false"><i class="ri-more-2-fill"></i></a>
                                                                            <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu"><button
                                                                                type="button" tabindex="0" role="menuitem" class="dropdown-item">Copy <i
                                                                                    class="ri-file-copy-line float-end text-muted"></i></button><button
                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Save <i
                                                                                            class="ri-save-line float-end text-muted"></i></button><button type="button"
                                                                                                tabindex="0" role="menuitem" class="dropdown-item">Forward <i
                                                                                                    class="ri-chat-forward-line float-end text-muted"></i></button><button
                                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Delete <i
                                                                                                            class="ri-delete-bin-line float-end text-muted"></i></button></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="conversation-name">Doris Brown</div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li class="right">
                                                            <div class="conversation-list">
                                                                <div class="chat-avatar"><img src="/static/media/avatar-1.3921191a8acf79d3e907.jpg"
                                                                    alt="chatvia" /></div>
                                                                <div class="user-chat-content">
                                                                    <div class="ctext-wrap">
                                                                        <div class="ctext-wrap-content">
                                                                            <p class="mb-0">Files</p>
                                                                            <div class="p-2 mb-2 card">
                                                                                <div class="d-flex align-items-center">
                                                                                    <div class="avatar-sm me-3 ms-0">
                                                                                        <div class="avatar-title bg-soft-primary text-primary rounded font-size-20"><i
                                                                                            class="ri-file-text-fill"></i></div>
                                                                                    </div>
                                                                                    <div class="flex-grow-1">
                                                                                        <div class="text-start">
                                                                                            <h5 class="font-size-14 mb-1">admin_v1.0.zip</h5>
                                                                                            <p class="text-muted font-size-13 mb-0">12.5 MB</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="ms-4">
                                                                                        <ul class="list-inline mb-0 font-size-20">
                                                                                            <li class="list-inline-item"><a class="text-muted" href="/dashboard"><i
                                                                                                class="ri-download-2-line"></i></a></li>
                                                                                            <li class="list-inline-item dropdown"><a aria-haspopup="true"
                                                                                                class="dropdown-toggle text-muted" aria-expanded="false"><i
                                                                                                    class="ri-more-fill"></i></a>
                                                                                                <div tabindex="-1" role="menu" aria-hidden="true"
                                                                                                    class="dropdown-menu-end dropdown-menu"><button type="button" tabindex="0"
                                                                                                        role="menuitem" class="dropdown-item">Share <i
                                                                                                            class="ri-share-line float-end text-muted"></i></button><button
                                                                                                                type="button" tabindex="0" role="menuitem" class="dropdown-item">Delete
                                                                                                        <i class="ri-delete-bin-line float-end text-muted"></i></button></div>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span
                                                                                class="align-middle">01:30</span></p>
                                                                        </div>
                                                                        <div class="align-self-start dropdown"><a aria-haspopup="true" class=""
                                                                            aria-expanded="false"><i class="ri-more-2-fill"></i></a>
                                                                            <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu"><button
                                                                                type="button" tabindex="0" role="menuitem" class="dropdown-item">Copy <i
                                                                                    class="ri-file-copy-line float-end text-muted"></i></button><button
                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Save <i
                                                                                            class="ri-save-line float-end text-muted"></i></button><button type="button"
                                                                                                tabindex="0" role="menuitem" class="dropdown-item">Forward <i
                                                                                                    class="ri-chat-forward-line float-end text-muted"></i></button><button
                                                                                                        type="button" tabindex="0" role="menuitem" class="dropdown-item">Delete <i
                                                                                                            class="ri-delete-bin-line float-end text-muted"></i></button></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="conversation-name">Patricia Smith</div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li class="">
                                                            <div class="conversation-list">
                                                                <div class="chat-avatar"><img src="/static/media/avatar-4.b23e41d9c09997efbc21.jpg"
                                                                    alt="chatvia" /></div>
                                                                <div class="user-chat-content">
                                                                    <div class="ctext-wrap">
                                                                        <div class="ctext-wrap-content">
                                                                            <p class="mb-0">typing<span class="animate-typing"><span class="dot ms-1"></span><span
                                                                                class="dot ms-1"></span><span class="dot ms-1"></span></span></p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="conversation-name">Doris Brown</div>
                                                                </div>
                                                            </div>
                                                        </li>
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
                                <form class="">
                                    <div class="g-0 row">
                                        <div class="col">
                                            <div><input placeholder="Enter Message..." type="text"
                                                class="form-control form-control-lg bg-light border-light form-control" value="" /></div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="chat-input-links ms-md-2">
                                                <ul class="list-inline mb-0 ms-0">
                                                    <li class="list-inline-item"><button type="submit"
                                                        class="font-size-16 btn-lg chat-send waves-effect waves-light btn btn-primary"><i
                                                            class="ri-send-plane-2-fill"></i></button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalActiv? 
            <Modal modal={setModalActiv}/>
            :''}
        </>
    )
}

export default Dashboard
