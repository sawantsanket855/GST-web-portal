import React, { useRef, useState } from 'react';
import { replace, useNavigate } from "react-router-dom";
import './login.css'
import login from '../assets/login2.svg'
import Logo from '../assets/Logo.png'
import google from '../assets/google.png'
import apple from '../assets/apple.png'
import facebook from '../assets/Facebook.png'
import { send_reset_password_email } from './authenticationLogic';
import successImg from '../assets/success.svg'


export const SendResetPasswordEmail = () => {
    const navigate = useNavigate();
    const [loader,setLoader] = useState(false);
    const [emailStatus,setEmailStatus] = useState(false);
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
                    <p className="startLine" style={{ marginBottom: '40px' }}>Reset Password</p>

                    <div className="inputs">
                        <div className='input'>
                            <input style={{paddingLeft:'15px'}} placeholder='Enter your email ID' className='input' type="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        
                        {emailStatus? <div style={{position:'relative', width:'460px', display:'flex', alignItems:'center',marginBottom:'10px'}}> <img src={successImg} style={{height:'20px',marginRight:'5px'}} alt="" /> <span>Password reset link sent to your Email Id </span>
                          <a style={{position:'absolute',right:'10px', fontSize: '14', fontWeight: '500', color: 'rgba(54, 59, 186, 1)', marginRight: '7px' }} href="" onClick={()=>{navigate("/login",{replace:true})}}>
                                Go to login
                            </a>
                         </div>  :

                        <div className='input signin' onClick={ async() => {
                            setLoader(true)
                            if (validateEmail(email)) {
                                console.log('valid email')
                                const response=await send_reset_password_email(email.trim());
                                if(response=='reset password email sent'){
                                    setEmailStatus(true)
                                    setLoader(false)
                                }else{
                                    alert(response)
                                    setLoader(false)
                                }
                            } else {
                                alert('Failed to send mail, invalid email Id')
                                console.log('invalid email')
                                setLoader(false)
                            }
                        }}>  
                        {!loader? <span>Send Password Reset Link</span> : <div className='loader'></div> } </div>
}
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
