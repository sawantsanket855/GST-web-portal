import React ,{useContext} from 'react'
import './appbar.css'
import Logo from '../../assets/new_logo.svg'
import Search from '../../assets/search.svg'
import Notification from '../../assets/Notification.svg'
import Profile from '../../assets/profile.svg'
export const AdminAppbar=()=>{
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
        <img src={Notification} alt="" />
        <img style={{marginLeft:'20px'}} src={Profile} alt="" />
        <span style={{fontFamily:'Roboto',fontSize:'20',fontWeight:'bolder', marginLeft:'10px',marginRight:'20px'}}>Admin</span>
        </div>
            </div>
        
}