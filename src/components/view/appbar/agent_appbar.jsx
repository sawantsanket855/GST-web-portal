import React ,{useContext,useEffect,useState} from 'react'
import './appbar.css'
import Logo from '../../assets/new_logo.svg'
import Search from '../../assets/search.svg'
import Notification from '../../assets/Notification.svg'
import Profile from '../../assets/profile.svg'
import { getBalance } from '../../controller/agent_data_controller'
export const AgentAppbar=()=>{
    const [balance,setBalance]=useState(0)
    useEffect(()=>{
        const result=getBalance();
        setBalance(result)
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
        <span style={{fontFamily:'Roboto',fontSize:'20',fontWeight:'bolder', marginLeft:'10px',marginRight:'20px'}}>Balance: {balance}</span>
        <img style={{marginLeft:'20px'}} src={Profile} alt="" />
        <span style={{fontFamily:'Roboto',fontSize:'20',fontWeight:'bolder', marginLeft:'10px',marginRight:'20px'}}>Agent</span>
        </div>
            </div>
        
}