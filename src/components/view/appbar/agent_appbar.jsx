import React ,{useContext,useEffect,useState} from 'react'
import './appbar.css'
import Logo from '../../assets/new_logo.svg'
import Search from '../../assets/search.svg'
import Notification from '../../assets/Notification.svg'
import Profile from '../../assets/user_default.png'
import { AppContext } from '../../provider'
export const AgentAppbar=()=>{
    const {p_balance,p_getBalance} = useContext(AppContext);
    useEffect(()=>{
        p_getBalance(); 
    },[]);
    return <div className='appbar-div'>
        <div style={{display:'flex', alignItems:'center',marginLeft:'36px',marginTop:'10px',marginBottom:'15px'}}>
        <img style={{paddingRight:'10px'}} src={Logo} alt="" />
       <span className='title'>
        GST Web Portal</span> 
        </div>

        <div className='searchbar'>
            <img src={Search} alt="" />
            <span className='search-text'>Search agents, CAs, customers, or services...</span>
        </div>
        <div style={{display:'flex', alignItems:'center'}}>
        <span style={{fontFamily:'Roboto',fontSize:'20',fontWeight:'bolder', marginLeft:'10px',marginRight:'20px'}}>Balance: {p_balance}</span>
        <img style={{marginLeft:'20px',height:'25px',width:'25px'}} src={Profile} alt="" />
        <span style={{fontFamily:'Roboto',fontSize:'20',fontWeight:'bolder', marginLeft:'10px',marginRight:'20px'}}>Agent</span>
        </div>
            </div>
        
}