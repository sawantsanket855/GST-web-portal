import React from 'react'
import './footer.css'
import FooterLogo from '../../assets/footer_logo.svg'
export const Footer=()=>{
    return <div className='footer-div'>
        <span>© 2025 GST Web Portal</span>
        <div style={{display:'flex'}}>
            <span style={{marginLeft:'48px'}}>Version 1.0</span>
            <span style={{marginLeft:'10px'}}>Powered by </span>
            <img style={{marginRight:'30px',height:'30px',marginBottom:'20px'}} src={FooterLogo} alt="" />
        </div>
    </div>
}