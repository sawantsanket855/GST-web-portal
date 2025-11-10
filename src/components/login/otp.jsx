import React, { useRef, useState } from 'react';
import './login.css'
import { submitOTP } from './authenticationLogic'
import login2 from '../assets/login2.svg'
import Logo from '../assets/Logo.png'
import google from '../assets/google.png'
import apple from '../assets/apple.png'
import facebook from '../assets/Facebook.png'
import select from '../assets/select.svg'
import unselect from '../assets/unselect.svg'
import { useParams, useNavigate } from 'react-router-dom';


export const Otp = () => {
    const [loader, setLoader] = useState(false);
    const [policy, setPolicy] = useState(false)
    const navigate = useNavigate();
    const { email } = useParams();
    const inputRef = useRef([]);
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value.length === 1) {
            if (index < 3) {
                inputRef.current[index + 1].focus();
            } else {
                console.log('submit option')
            }
        }
    }
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRef.current[index - 1]?.focus();
        }
    };

    async function joinOTP() {
        // if(!policy){
        //     alert('please accept terms of service')
        //     return
        // }
        setLoader(true)
        let otp = inputRef.current[0].value + inputRef.current[1].value + inputRef.current[2].value + inputRef.current[3].value
        const response = await submitOTP(email, otp)
        if (response === 'correct otp') {
            navigate('/homepage', { replace: true });
            window.location.reload();
            setLoader(false)
        } else {
            alert(response);
            setLoader(false);
        }

    }
    return (
        <div className='container'>
            <div className='loginImageDiv'><img style={{ height: '40%', width: '80%' }} src={login2} alt="login image" /></div>
            <div className="loginPage">
                <div className="logoDiv">
                    <img src={Logo} alt="Logo" />
                </div>
                <div>
                    <p className="startLine" style={{ marginBottom: '40px' }}>Login with OTP</p>

                    <div className="inputs">
                        <div className='input' style={{ alignItems: 'center' }}>
                            <span style={{marginLeft:'15px'}}>{email}</span>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(79, 79, 79, 1)', marginBottom: '6px' }}>Enter OTP</div>
                        <div style={{ display: 'flex' }}>
                            <input maxLength={1} type='text' key={0} className="otp-div" ref={(el) => inputRef.current[0] = el} onChange={(e) => handleChange(e, 0)} onKeyDown={(e) => handleKeyDown(e, 0)} />
                            <input maxLength={1} type='text' key={1} className="otp-div" ref={(el) => inputRef.current[1] = el} onChange={(e) => handleChange(e, 1)} onKeyDown={(e) => handleKeyDown(e, 1)} />
                            <input maxLength={1} type='text' key={2} className="otp-div" ref={(el) => inputRef.current[2] = el} onChange={(e) => handleChange(e, 2)} onKeyDown={(e) => handleKeyDown(e, 2)} />
                            <input maxLength={1} type='text' key={3} className="otp-div" ref={(el) => inputRef.current[3] = el} onChange={(e) => handleChange(e, 3)} onKeyDown={(e) => handleKeyDown(e, 3)} />
                        </div>
                        {/* <div onClick={()=>{setPolicy(!policy)}} style={{ display: 'flex', alignItems: 'center' }}> */}
                        {/* <img src={policy?select:unselect} alt="" /> */}
                        {/* <p style={{ fontSize: '14px', fontWeight: '400', marginLeft: '15px' }}> <span style={{ color: 'rgba(97, 103, 125, 1)' }}>I’m agree to the </span> <span style={{ color: 'rgba(54, 59, 186, 1)' }}> Terms of Service</span> <span style={{ color: 'rgba(97, 103, 125, 1)' }}>and </span><span style={{ color: 'rgba(54, 59, 186, 1)' }}> Privacy Policy</span> </p> */}
                        {/* </div> */}
                        <div className='input signin' onClick={() => {
                            joinOTP();
                        }}>{loader ? <div className='loader'></div> : <span>Submit</span>} </div>
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
