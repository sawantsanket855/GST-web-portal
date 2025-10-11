import React, { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import login from '../assets/login.png'
import Logo from '../assets/Logo.png'
import unselectIcon from '../assets/unselect.svg'
import selectIcon from '../assets/select.svg'
import hideIcon from '../assets/Hide Icon.png'
import unHideIcon from '../assets/unhide.svg'
import google from '../assets/google.png'
import apple from '../assets/apple.png'
import facebook from '../assets/Facebook.png'
import { registerUser } from './authenticationLogic'
export const Registration = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);
    const [policy, setPolicy] = useState(false);
    const [remPass, setRemPass] = useState(true);
    const [inputError, setInputError] = useState([false, false, false, false])
    const [hidePassword, setHidePassword] = useState(true)
    const [hideConPassword, setHideConPassword] = useState(true)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    function validateEmail(str) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str.trim());
    }
    function isAlphabetWithSpace(str) {
        return /^[A-Za-z\s]+$/.test(str);
    }
    async function validateUser(username, email, password, confirmPass) {
        setLoader(true);
        if (username.length == 0 || !isAlphabetWithSpace(username)) {
            console.log('enter valid username');
            setInputError([true, false, false, false])
            alert('enter valid username')
            setLoader(false);
            return;
        }
        if (email.length == 0) {
            console.log('enter email');
            setInputError([false, true, false, false])
            alert('enter email id')
            setLoader(false);
            return;
        }
        if (!validateEmail(email)) {
            console.log('enter valide email');
            setInputError([false, true, false, false])
            alert('enter valid email id')
            setLoader(false);
            return;
        }
        if (password.length == 0) {
            console.log('enter password');
            setInputError([false, false, true, false])
            alert('enter password')
            setLoader(false);
            return;
        }
        if (password !== confirmPass) {
            console.log('enter same password to confirm');
            setInputError([false, false, false, true])
            alert('enter same password to confirm')
            setLoader(false);
            return;
        }
        if (!policy) {
            alert('please accept terms of service')
            setLoader(false);
            return;
        }
        let result = await registerUser(username, email, password);
        console.log(`function called ${result}`)
        if (result === 'registered') {
            alert('registration successfull')
            navigate('/homepage', { replace: true });
            setLoader(false);
        } else if (result === 'email already exist') {
            alert('email already registered, login with password');
            navigate('/login')
            setLoader(false);
        } else {
            alert(result)
        }
        setLoader(false);
    }
    return (
        <div className='container'>
            <div className="loginPage">
                <div className="logoDiv">
                    <img style={{}} src={Logo} alt="Logo" />
                </div>
                <div>
                    <p className="startLine">Hi, Welcome to GST Portal!</p>
                    <p className='secondLine'>Enter your credentials to create your account</p>

                    <div className="inputs">
                        <div className='input'>
                            <input style={{ border: inputError[0] ? '2px solid red' : '' }} placeholder='Enter your name' className='input' type="text" value={username} onChange={(e) => { setInputError([false, false, false, false]); setUsername(e.target.value) }} />
                        </div>
                        <div className='input'>
                            <input style={{ border: inputError[1] ? '2px solid red' : '' }} placeholder='Enter your email ID' className='input' type="email" value={email} onChange={(e) => { setInputError([false, false, false, false]); setEmail(e.target.value.trim()) }} />
                        </div>
                        <div className='input-link-div'><a className='input-link' href='/sendotp'>Login with OTP</a></div>
                        <div className="input" style={{ position: 'relative' }}>
                            <input style={{ border: inputError[2] ? '2px solid red' : '' }} placeholder='Password' className='input' type={hidePassword ? "password" : "text"} value={password} onChange={(e) => { setInputError([false, false, false, false]); setPassword(e.target.value.trim()) }} />
                            <div onClick={() => { setHidePassword(!hidePassword) }} style={{ width: '20px', position: 'absolute', right: '20px', top: '20px', display: 'flex', alignItems: 'center' }}> <img src={hidePassword ? hideIcon : unHideIcon} alt="" /></div>
                        </div>
                        <div className="input" style={{ position: 'relative' }}>
                            <input style={{ border: inputError[3] ? '2px solid red' : '' }} placeholder='Confirm Password' className='input' type={hideConPassword ? "password" : "text"} value={confirmPass} onChange={(e) => { setInputError([false, false, false, false]); setConfirmPass(e.target.value.trim()) }} />
                            <div onClick={() => { setHideConPassword(!hideConPassword) }} style={{ width: '20px', position: 'absolute', right: '20px', top: '20px', display: 'flex', alignItems: 'center' }}> <img src={hideConPassword ? hideIcon : unHideIcon} alt="" /></div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img onClick={() => { setRemPass(!remPass) }} src={remPass ? selectIcon : unselectIcon} alt="" />
                            <div style={{ size: '14px', marginLeft: '10px', color: 'rgba(79, 79, 79, 1)' }}>Remember Me</div>
                        </div>
                        <div style={{ display: 'flex', marginTop: '16px', alignItems: 'center' }}>
                            {/* <div style={{ height: '26px', width: '26px', backgroundColor: 'rgba(245, 249, 254, 1)', borderRadius: '8px' }}></div> */}
                            <img onClick={() => { setPolicy(!policy) }} src={policy ? selectIcon : unselectIcon} alt="" />
                            <p style={{ fontSize: '14px', fontWeight: '400', marginLeft: '15px' }}> <span style={{ color: 'rgba(97, 103, 125, 1)' }}>I’m agree to the </span> <span style={{ color: 'rgba(54, 59, 186, 1)' }}> Terms of Service</span> <span style={{ color: 'rgba(97, 103, 125, 1)' }}>and </span><span style={{ color: 'rgba(54, 59, 186, 1)' }}> Privacy Policy</span> </p>
                        </div>
                        <div onClick={() => {
                            setLoader(true)
                            validateUser(username.trim(), email, password, confirmPass);


                        }} className='input signin'> {loader ? <div className='loader'></div> : <span>Sign In</span>} </div>
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
                                Already have an Account?
                            </span>
                            <a style={{ fontSize: '14', fontWeight: '500', color: 'rgba(54, 59, 186, 1)', marginRight: '7px' }} href="/login">
                                Register
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='loginImageDiv'><img className='loginImage' src={login} alt="login image" /></div>

        </div>

    )
}