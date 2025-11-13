import React, { useState } from 'react';
import { useParams, useNavigate,useLocation } from 'react-router-dom';
import './login.css'
import login from '../assets/login4.svg'
import Logo from '../assets/Logo.png'
import { reset_password } from './authenticationLogic'
import hideIcon from '../assets/Hide Icon.png'
import unHideIcon from '../assets/unhide.svg'
import successImg from '../assets/success.svg'
export const ResetPassword = () => {
     const { search } = useLocation();
     const query = new URLSearchParams(search);
     const email = query.get("email");
     const token = query.get("token");
     console.log(email,token)
    const [resetSuccess, setResetSuccess] = useState(false)
    // const { email, token } = useParams();
    // const email='sawantsanket855@gmail.com'
    // const token ='UulhXBMM-pXyA9v3XpF4tBZUxKSF9eRttXcWkhqzWIQ'
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);
    const [inputError, setInputError] = useState([false, false])
    const [hidePassword, setHidePassword] = useState(true)
    const [hideConPassword, setHideConPassword] = useState(true)
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    return (
        <div className='container'>
            <div className='loginImageDiv'><img style={{ height: '40%', width: '80%' }} src={login} alt="login image" /></div>
            <div className="loginPage">
                <div className="logoDiv">
                    <img src={Logo} alt="Logo" />
                </div>
                <div>
                    <p className="startLine" style={{ marginBottom: '40px' }}>Hi, Welcome to GST Portal!</p>

                    <div className="inputs">
                        <div className='input' style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{marginLeft:'15px'}}>{email}</span>
                        </div>

                        {resetSuccess ?
                            <div style={{position:'relative', width:'460px', display:'flex', alignItems:'center',marginBottom:'10px',marginTop:'20px'}}> <img src={successImg} style={{height:'20px',marginRight:'5px'}} alt="" /> <span>Password updated successfully</span>
                          <a style={{position:'absolute',right:'10px', fontSize: '14', fontWeight: '500', color: 'rgba(54, 59, 186, 1)', marginRight: '7px' }} href="" onClick={()=>{navigate("/login",{replace:true})}}>
                                Go to login
                            </a>
                        
                        </div> :

                            <div>
                                <div className="input" style={{ position: 'relative' }}>
                                    <input style={{ border: inputError[0] ? '2px solid red' : '' ,paddingLeft:'15px'}} placeholder='Password' className='input' type={hidePassword ? "password" : "text"} value={password} onChange={(e) => { setInputError([false, false, false, false]); setPassword(e.target.value.trim()) }} />
                                    <div onClick={() => { setHidePassword(!hidePassword) }} style={{ width: '20px', position: 'absolute', right: '20px', top: '20px', display: 'flex', alignItems: 'center' }}> <img src={hidePassword ? hideIcon : unHideIcon} alt="" /></div>
                                </div>
                                <div className="input" style={{ position: 'relative' }}>
                                    <input style={{ border: inputError[1] ? '2px solid red' : '' ,paddingLeft:'15px'}} placeholder='Confirm Password' className='input' type={hideConPassword ? "password" : "text"} value={confirmPass} onChange={(e) => { setInputError([false, false, false, false]); setConfirmPass(e.target.value.trim()) }} />
                                    <div onClick={() => { setHideConPassword(!hideConPassword) }} style={{ width: '20px', position: 'absolute', right: '20px', top: '20px', display: 'flex', alignItems: 'center' }}> <img src={hideConPassword ? hideIcon : unHideIcon} alt="" /></div>
                                </div>

                                <div onClick={async () => {
                                    setLoader(true)
                                    setLoader(true);
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
                                    let result = await reset_password(email, password, token);
                                    console.log(`function called ${result}`)
                                    if (result === 'password changed') {
                                        alert('password changed successfully')
                                        setResetSuccess(true)
                                        setLoader(false);
                                    } else if (result === 'token expired') {
                                        alert('token expired');
                                        setLoader(false);
                                    } else {
                                        alert(result)
                                        setLoader(false)
                                    }
                                    setLoader(false);

                                }} className='input signin'> {loader ? <div className='loader'></div> : <span>Reset Password</span>}
                                </div>
                            </div>}


                    </div>
                </div>
            </div>

        </div>
    )
}
