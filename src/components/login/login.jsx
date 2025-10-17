import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './login.css'
import login from '../assets/login.png'
import Logo from '../assets/Logo.png'
import hideIcon from '../assets/hide.svg'
import unhideIcon from '../assets/unhide.svg'
import unselectIcon from '../assets/unselect.svg'
import selectIcon from '../assets/select.svg'
import google from '../assets/google.png'
import apple from '../assets/apple.png'
import facebook from '../assets/Facebook.png'
import { checkuser } from './authenticationLogic'
export const Login = () => {
    const [loader,setLoader] = useState(false);
    const [remPass, setRemPass] = useState(true);
    const [emailInputError,setEmailInputError]=useState(false)
    const [passwordInputError,setPasswordInputError]=useState(false)
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginType, setLoginType] = useState("Agent");
    return (
        <div className='container'>
            <div className='loginImageDiv'><img className='loginImage' src={login} alt="login image" /></div>
            <div className="loginPage">
                <div className="logoDiv" style={{margin:'0px'}}>
                    <img src={Logo} alt="Logo" />
                </div>
                <div>
                    <p className="startLine">Hi, Welcome to GST Portal!</p>
                    <p className='secondLine'>Enter your credentials to access your account</p>

                    <div className="inputs">
                        <div className='input'>
                            <input style={{border:emailInputError?'2px solid red':''}} placeholder='Enter your email ID' className='input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='input-link-div'><a className='input-link' href='/sendotp'>Login with OTP</a></div>
                        <div className="input" style={{position:'relative'}}>
                            <input style={{ border:passwordInputError?'2px solid red':''}} placeholder='Password' className='input' type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div style={{ width: '20px', position: 'absolute', top: '20px',right:'20px', display: 'flex', alignItems: 'center' }}>
                                <img onClick={() => setShow(!show)} src={show ? unhideIcon : hideIcon} alt="" />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => { setRemPass(!remPass) }}>
                                <img src={remPass ? selectIcon : unselectIcon} alt="" />
                                <div style={{ size: '14px', marginLeft: '10px' }}>Remember Me</div>
                            </div>
                            <div className='input-link-div'><a className='input-link' href='/sendresetpassword'>Forgot Password</a></div>
                        </div>
                        <div className='input signin'>
                            <select className='select' onClick={(e)=>{setLoginType(e.target.value)}}>
                                <option className='select-option' value="Agent">Agent</option>
                                <option className='select-option' value="Admin">Admin</option>
                            </select>
                        
                        </div>
                        <div onClick={async() =>{
                            console.log(loginType)
                            if(email===''){
                                setEmailInputError(true);
                                return
                            }else if(password===''){
                                setPasswordInputError(true);
                                return
                            }
                            setLoader(true);  
                           let result = await checkuser(email, password ,loginType)
                           if(result==='invalid credentials'){
                                setEmailInputError(true);
                                setPasswordInputError(true);
                                alert('invalid credentials');
                                setLoader(false);  
                           }else if(result==='correct credentials'){
                            // alert('Login successfull')
                            setLoader(false);  
                            navigate('/homepage',{replace:true})
                            window.location.reload();
                           }else{
                            alert(result)
                           }
                           setLoader(false);
                            }
                            
                        } 
                            className='input signin'>{loader?<span className='loader'></span>: <span>Login</span> } </div>

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
                            <a style={{ fontSize: '14', fontWeight: '500', color: 'rgba(54, 59, 186, 1)', marginRight: '7px' }} href='/register'>
                                Create An Account
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}