import React, { useRef, useState } from 'react';
import './login.css'
import { send_otp } from './authenticationLogic'
import login from '../assets/login2.svg'
import Logo from '../assets/Logo.png'
import google from '../assets/google.png'
import apple from '../assets/apple.png'
import facebook from '../assets/Facebook.png'
import {useNavigate } from 'react-router-dom';
import select from '../assets/select.svg'

export const SendOtp = () => {
    const [loader,setLoader] = useState(false);
    const [policy, setPolicy]=useState(false)
    const navigator=useNavigate();
    
    const [email, setEmail] = useState('')
    function validateEmail(str) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str.trim());
    }

    return (
        <div className='container'>
            <div className='loginImageDiv'><img style={{ height: '40%', width: '80%' }} src={login} alt="login image" /></div>
            <div className="loginPage">
                <div className="logoDiv">
                    <img src={Logo} alt="Logo" />
                </div>
                <div>
                    <p className="startLine" style={{ marginBottom: '40px' }}>Login with OTP</p>

                    <div className="inputs">
                        <div className='input'>
                            <input placeholder='Enter your email ID' className='input' type="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div onClick={()=>{setPolicy(!policy)}} style={{ display: 'flex' ,alignItems:'center'}}>
                            {policy?<img height={28} src= {select} alt="" />:<div style={{ height: '28px', width: '28px', backgroundColor: 'rgba(245, 249, 254, 1)', borderRadius: '8px' }}></div>} 
                            <p style={{ fontSize: '14px', fontWeight: '400', marginLeft: '15px' }}> <span style={{ color: 'rgba(97, 103, 125, 1)' }}>I’m agree to the </span> <span style={{ color: 'rgba(54, 59, 186, 1)' }}> Terms of Service</span> <span style={{ color: 'rgba(97, 103, 125, 1)' }}>and </span><span style={{ color: 'rgba(54, 59, 186, 1)' }}> Privacy Policy</span> </p>
                        </div>
                        <div className='input signin' onClick={ async() => {
                            setLoader(true)
                            if (!policy){
                                alert('please accept terms of condition')
                                setLoader(false)
                                return
                            }
                            if (validateEmail(email)) {
                                console.log('valid email')
                                const response=await send_otp(email.trim());
                                if(response=='otp sent'){
                                    navigator(`/submitotp/${email}`);
                                    setLoader(false)
                                }else{
                                    alert(response)
                                    setLoader(false)
                                }
                            } else {
                                alert('failed to send otp, invalid email')
                                console.log('invalid email')
                                setLoader(false)
                            }
                        }}>  
                        {!loader? <span>Send OTP</span> : <div className='loader'></div> } </div>
                        {/* <div className='signin-options'>
                            <div className='input' style={{ width: '303px', display: 'flex', alignItems: 'center' }}>
                                <div style={{ height: '32', marginLeft: '30px', marginRight: '20px' }}> <img src={google} alt="" /></div>
                                <span style={{ color: 'rgba(79, 79, 79, 1)', fontSize: '14', fontWeight: '500' }}>Sign In with Google</span>
                            </div>
                            <div className='input hcenter vcenter' style={{ width: '51px' }}>

                                <img src={facebook} alt="" />

                            </div>
                            <div className='input hcenter vcenter' style={{ width: '51px' }}>
                                <img src={apple} alt="" /></div>
                        </div> */}
                        <div style={{ display: 'flex', justifyContent: 'right' }}>
                            <span style={{ fontSize: '14', fontWeight: '500', color: 'rgba(79, 79, 79, 1)', marginRight: '7px' }}>
                                Not Registered Yet?
                            </span>
                            <a style={{ fontSize: '14', fontWeight: '500', color: 'rgba(54, 59, 186, 1)', marginRight: '7px' }} href="/register">
                                Create An Account
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
