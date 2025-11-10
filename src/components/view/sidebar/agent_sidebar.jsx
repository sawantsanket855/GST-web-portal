import React, { useContext } from "react";
import './sidebar.css'
import homeIcon from '../../assets/Home.svg'
import payment from '../../assets/payment.svg'
import agents from '../../assets/agents.svg'
import setting from '../../assets/setting.svg'
import request from '../../assets/request.svg'
import { AppContext } from '../../provider'
import { useNavigate } from "react-router-dom";

export const AgentSidebar=()=>{
    const navigate = useNavigate();
    const loginType = localStorage.getItem('loginType');
    const {sidebarIndex,setSidebarIndex,setPageIndex,p_getBalance} = useContext(AppContext);
    return <div className='sidebar-div'>
        <div className='sidebar-content'>
            <div onClick={
                ()=>{
                    setPageIndex(0);
                    setSidebarIndex(0);
                    p_getBalance();
                }
            } className= {sidebarIndex===0?'sidebar-option selected':'sidebar-option'}>
                <img src={homeIcon} alt="home" style={{marginRight:'16px'}}/>
                Dashboard
            </div>
            <div onClick={
                ()=>{
                    setPageIndex(0);
                    setSidebarIndex(1);
                    p_getBalance();
                }
            } className= {sidebarIndex===1?'sidebar-option selected':'sidebar-option'}>
                <img src={request} alt="home" style={{marginRight:'16px'}}/>
                Submit Request
            </div>
            <div onClick={
                ()=>{
                    setPageIndex(0);
                    setSidebarIndex(2);
                    p_getBalance();
                }
            } className= {sidebarIndex===2?'sidebar-option selected':'sidebar-option'}>
                <img src={request} alt="home" style={{marginRight:'16px'}}/>
                All Requests
            </div>
            <div onClick={
                ()=>{
                    setPageIndex(0);
                    setSidebarIndex(3);
                    p_getBalance();
                }
            } className= {sidebarIndex===3?'sidebar-option selected':'sidebar-option'}>
                <img src={payment} alt="home" style={{marginRight:'16px'}}/>
                Payment Request
            </div>
            <div onClick={
                ()=>{
                    setPageIndex(0);
                    setSidebarIndex(4);
                    p_getBalance();
                }
            } className= {sidebarIndex===4?'sidebar-option selected':'sidebar-option'}>
                <img src={payment} alt="home" style={{marginRight:'16px'}}/>
                Payment Details
            </div>
            <div onClick={
                ()=>{
                    setPageIndex(0);
                    setSidebarIndex(5);
                    p_getBalance();
                }
            } className= {sidebarIndex===5?'sidebar-option selected':'sidebar-option'}>
                <img src={request} alt="home" style={{marginRight:'16px'}}/>
                Transaction History
            </div>
            <div onClick={
                ()=>{
                    setPageIndex(0);
                    setSidebarIndex(6);
                    p_getBalance();
                }
            } className= {sidebarIndex===6?'sidebar-option selected':'sidebar-option'}>
                <img src={setting} alt="home" style={{marginRight:'16px'}}/>
                Settings
            </div>
            <div 
            onClick={() => {
                        if (loginType) {
                            localStorage.clear();
                        }
                        setPageIndex(0);
                        setSidebarIndex(0);
                        navigate('/login', { replace: true })
                    }}
            className='sidebar-option login' style={{position:'absolute',bottom:'30px'}}>
                <img src={homeIcon} alt="home" style={{marginRight:'16px'}}/>
                {loginType ? 'Log Out' : "Log In"}
            </div>
        </div>
    </div>
}




