import React, { createContext, useEffect, useState } from 'react'
import {faMoon, faSun,} from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal'
import Naber from './Naber'
import Tabs from './Tabs'
import ChateBox from './ChateBox'
const UserContext = createContext();
// "proxy":"http://localhost:5000",
const Dashboard = () => {
    let [userData,setUserData] = useState('');
    let [haveNotification,sethaveNotification] = useState('user-status');
    const [selectedUser,setSelectedUser] =  useState({
        fullname:"",
        profilepic:"",
        userId:""
    });
    const [chates , setChates] = useState([]);
    useEffect(()=>{
        getUserInfo();
        getChates();
        
    },[]);
    const getChates = () =>{
        fetch("/api/chats",{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
        }).then(async(res)=>{
            if(res.status === 200){
                res =  await res.json();
                setChates(res);
                let user = res[0];
                if(res.length != 0){
                    setTimeout(() => {
                          setSelectedUser({fullname:user.fullname, profilepic:user.profilepic,userId:user._id,index:0});
                        console.log(selectedUser)
                    }, 1500);          
                }
                else{
                    setSelectedUser({fullname:'Add friend ', profilepic:'../assets/images/avatar-1.png',userId:'1',index:0});
                }
            }
        });
    }
    const getUserInfo = () =>{
        fetch("/api/userdata",{
            method:"GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(async(res)=>{
            res = await res.json();
            setUserData(res);
            if(res.friendsrequests.length == 0){
                sethaveNotification('')
            }
            else{          
                sethaveNotification('user-status notification')
            }
        })
    }
    let [navActive, setnavActive] = useState({
        navUser: "nav-link",
        navChat: "active nav-link",
        navFriends: "nav-link",
        tapUser: "tab-pane",
        tapChat: "tab-pane active",
        tapFirends: "tab-pane"
    });
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
    let [nightDarkMode, setNightDarkMode] = useState(faMoon);
    let [showHideChate, setShowHideChate] = useState("user-chat w-100");
    const [modalActiv, setModalActiv] = useState(false);
    const [userInfor,setUserInfor] = useState({
        profilepic:"",
        fullname:"",
        userId:""
    });
    const [messages,setMessages] =  useState();
    const getMessages = (id,index) =>{
        fetch("/api/messages/"+id,{
            method:"GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(async(res)=>{
            res = await res.json();
            setMessages(res);
            setTimeout(() => {
                document.getElementById(`conversation${index}`).classList.add('active');               
            }, 100);
        });
    }
   
    const showModal = (profilepic,fullname,userId) => {
        setUserInfor({
            profilepic:profilepic,
            fullname:fullname,
            userId:userId 
        });
        setModalActiv(true);
    }
    return (
        <>
            <UserContext.Provider value={{userData,getUserInfo}}>
                <div className="layout-wrapper d-lg-flex">
                    <Naber navActive={navActive} setnavActive={setnavActive} setNightAndDarkMode={setNightAndDarkMode} nightDarkMode={nightDarkMode} />
                    <Tabs navActive={navActive} setShowHideChate={setShowHideChate} showModal={showModal} setSelectedUser={setSelectedUser}  getMessages={getMessages} chates={chates}/>
                    <ChateBox showHideChate={showHideChate} setShowHideChate={setShowHideChate} haveNotification={haveNotification} selectedUser={selectedUser} getMessages={getMessages} messages={messages} getChates={getChates} setChates={setChates} sethaveNotification={sethaveNotification} chates={chates} setSelectedUser={setSelectedUser}/>
                </div>
                {modalActiv ?<Modal modal={setModalActiv} userInfor={userInfor} />: ''}
            </UserContext.Provider>
        </>
    )
}

export default Dashboard;
export {UserContext}
