import React from 'react';
import './login.css'

import login from '../assets/login3.svg'
import Logo from '../assets/Logo.png'
import tickSquare from '../assets/Select Button.png'
import hideIcon from '../assets/Hide Icon.png'
import google from '../assets/google.png'
import apple from '../assets/apple.png'
import facebook from '../assets/Facebook.png'
import Verify from '../assets/Verify.svg'
export const VerifyEmail = () =>{
    return (
        <div className='container'>
            <div className='loginImageDiv'><img style={{height:'40%',width:'80%'}} src={login} alt="login image" /></div>
            <div className="loginPage">
                <div className="logoDiv">
                    <img src={Logo} alt="Logo" />
                </div>
                <div>
                    <p className="startLine" style={{marginBottom:'40px'}}>Verify your Email!</p>

                    <div className="inputs">
                        <div className='input'>
                            <input placeholder='Enter your email ID' className='input' type="email" />
                        </div>
                        <div style={{display:'flex',justifyContent:'end',marginBottom:'16px'}}>
                           <div style={{height:'22px',marginRight:'10px'}}> <img src={Verify} alt="" /></div>
                            <span style={{fontSize:'12',fontWeight:'400',textDecoration:'underline',color:'rgba(97, 103, 125, 1)'}}>Verification Link sent on mail</span>
                        </div>
                        <div className='signin-options'>
                            <div className='input' style={{ width: '303px', display: 'flex', alignItems: 'center' }}>
                                <div style={{ height: '32', marginLeft: '30px', marginRight: '20px' }}> <img src={google} alt="" /></div>
                                <span style={{ color: 'rgba(79, 79, 79, 1)', fontSize: '14', fontWeight: '500' }}>Sign In with Google</span>
                            </div>
                            <div className='input hcenter vcenter' style={{ width: '51px' }}>

                                <img src={facebook} alt="" />

                            </div>
                            <div className='input hcenter vcenter' style={{ width: '51px' }}>
                                <img src={apple} alt="" /></div>
                        </div>
                        <div style={{display:'flex',justifyContent:'right'}}>
                            <span style={{fontSize:'14',fontWeight:'500',color:'rgba(79, 79, 79, 1)',marginRight:'7px'}}>
                                Not Registered Yet?
                            </span>
                            <a  style={{fontSize:'14',fontWeight:'500',color:'rgba(54, 59, 186, 1)',marginRight:'7px'}} href="">
                                Create An Account
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
