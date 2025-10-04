import React, { useState,useContext } from 'react';
import { useNavigate } from "react-router-dom";
import './homePage.css'
import {CaCsRegistration} from './ca_cs_registration'
import {storeRequest} from './homepage_logic'
import WhiteLogo from '../assets/logo_white.svg'
import { ShowMyRequest } from './showRequest';
import { AppContext } from '../provider'
import { VerifyRequestList } from './verify_request/verify_request_list';
import { ShowVerifiedRequestList } from './assign_ca_cs/show_verified_request';
export const Homepage = () => {
    const navigate=useNavigate();
    const loginType=localStorage.getItem('loginType');
    const { setRequestPageIndex } = useContext(AppContext);
    const [selectedOption, setSelectedOption] = useState(0);
    return (
        <div style={{ display: 'flex' }}>
            <div className='navBar'>
                <img className="logoDivHome" src={WhiteLogo} alt="Logo" />
                <div
                    onClick={() => {
                        setSelectedOption(0);
                    }} className={selectedOption === 0 ? 'selectedNavOptions' : 'navOptions'}>
                    Homepage
                </div>
                {loginType!=='Agent'?<></>:
                    <div
                    onClick={() => {
                        setSelectedOption(1);
                    }}
                    className={selectedOption === 1 ? 'selectedNavOptions' : 'navOptions'} >
                    Submit Request
                </div>
                }

                {loginType!=='Agent'?<></>:
                <div
                    onClick={() => {
                        setRequestPageIndex(0)
                        setSelectedOption(2);
                    }} className={selectedOption === 2 ? 'selectedNavOptions' : 'navOptions'}>
                    My Request
                </div>}

                {loginType!=='Admin'?<></>:
                <div
                    onClick={() => {
                        setSelectedOption(3);
                    }} className={selectedOption === 3 ? 'selectedNavOptions' : 'navOptions'}>
                    CA/CS Registration
                </div>}


                {loginType!=='Admin'?<></>:
                <div
                    onClick={() => {
                        setRequestPageIndex(0);
                        setSelectedOption(4);
                    }} className={selectedOption === 4 ? 'selectedNavOptions' : 'navOptions'}>
                    Request Verification
                </div>}


                {loginType!=='Admin'?<></>:
                <div
                    onClick={() => {
                        setRequestPageIndex(0);
                        setSelectedOption(5);
                    }} className={selectedOption === 5 ? 'selectedNavOptions' : 'navOptions'}>
                    Assign Request
                </div>}
                
                <div 
                    onClick={() => {

                        if(loginType){
                            localStorage.clear();    
                        }
                        navigate('/login',{replace:true})
                    }} className='navOptions' style={{fontSize:'18px',fontWeight:'bolder', position: 'absolute', bottom: '0px', width: '95%' }}>
                    {loginType?'Log Out':"Log In"}
                </div>
            </div>
            <div className='content'>
                {selectedOption === 1 && <SubmitRequest />}
                {selectedOption === 2 && <ShowMyRequest />}
                {selectedOption === 3 && <CaCsRegistration />}
                {selectedOption === 4 && <VerifyRequestList />}
                {selectedOption === 5 && <ShowVerifiedRequestList/>}
               
            </div>
        </div>
    )
}


const SubmitRequest=()=> {
    function validateEmail(str) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str.trim());
    }
    function isAlphabetWithSpace(str){
        return /^[A-Za-z\s]+$/.test(str);
    }
    const [type,setType]=useState('Accounting and Audit');
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [mobile,setMobile]=useState('');
    const [description,setDescription]=useState('');
    const [files,setMyFiles]=useState([]);
    function clear (){
        setType('Accounting and Audit')
                        setName('');
                        setEmail('');
                        setMobile('');
                        setDescription('');
                        document.getElementById("MyFiles").value = "";    
    }
    return (
        <div className='sumbitRequest'>
            <span className='sectionTitle'>
                Submit new request
            </span>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <div className='inputLabel'>
                        Service
                    </div>
                    <select className='inputItem' style={{ height: '5vh' }} name="type" id="type" onClick={(e)=>{setType(e.target.value)}}>
                        <option value="Accounting and Audit">Accounting and Audit</option>
                        <option value="Taxation">Taxation</option>
                        <option value="Corporate Compliance">Corporate Compliance</option>
                        <option value="Corporate Governance and Legal">Corporate Governance and Legal</option>
                        <option value="Taxation">Taxation</option>
                        <option value="Financial and Business Advisory">Financial and Business Advisory</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div style={{ marginLeft: '0%', width: '50%' }}>
                    <div className='inputLabel'>
                        Customer Name
                    </div>
                    <input className='inputItem' type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </div>

            </div>

            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                        <div className='inputLabel'>
                            Email
                        </div>
                        <input className='inputItem' type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>

                <div style={{ marginLeft: '0%', width: '50%' }}>
                    <div className='inputLabel'>
                        Phone
                    </div>
                    <input className='inputItem' type="number" value={mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
                </div>

            </div>
                <div style={{ width: '50%' }}>
                        <div className='inputLabel'>
                            Description
                        </div>
                        <textarea style={{height:'10vh'}} className='inputItem' name="dexcription" id="dexcription" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                </div>

                <div style={{ width: '50%' }}>
                        <div className='inputLabel'>
                            Upload Documents
                        </div>
                        <input onChange={(e)=>{setMyFiles(e.target.files)}} type="file" id='MyFiles' multiple className='inputItem' />
                        <p style={{fontSize:'10px'}}>You can upload multiple files(PDF, JPG, PNG)</p>
                </div>

                <div style={{display:'flex' ,marginTop:'20px'}}>
                    <div onClick={async()=>{
                        if(name===''|| email==='' || mobile==='' ){
                            alert('Fill mandatory data');
                            return
                        }
                        if(!validateEmail(email)){
                            alert ('Enter valid eamil ID');
                            return
                        }
                        if(!isAlphabetWithSpace(name)){
                            alert('Enter valid name')
                            return
                        }
                        if(mobile.length!==10){
                            alert('Enter 10 digit mobile number');
                            return
                        }
                        const result =await storeRequest(type,name,email,mobile,description,files)
                         if(result==='submitted'){
                                clear();
                            }
                    }} className='button' style={{backgroundColor:'blue ',color:'white'}}>
                        Submit Request
                    </div>
                    <div onClick={()=>{
                        clear();
                    }} className='button' style={{backgroundColor:'white',color:'black'}}>
                        Clear
                    </div>
                </div>
        </div>
    )
}