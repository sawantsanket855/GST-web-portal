import React, { useState,useContext } from 'react';
import './homePage.css'
import {CaCsRegistration} from './ca_cs_registration'
import {storeRequest,getRequestDocument} from './homepage_logic'
import Logo from '../assets/Logo.png'
import WhiteLogo from '../assets/logo_white.svg'
import { ShowMyRequest } from './showRequest';
import { AppContext } from '../provider'
import { VerifyRequestList } from './verify_request/verify_request_list';
import { ShowVerifiedRequestList } from './assign_ca_cs/show_verified_request'
export const Homepage = () => {
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
                <div
                    onClick={() => {
                        setSelectedOption(1);
                    }}
                    className={selectedOption === 1 ? 'selectedNavOptions' : 'navOptions'} >
                    Submit Request
                </div>
                <div
                    onClick={() => {
                        setRequestPageIndex(0)
                        setSelectedOption(2);
                    }} className={selectedOption === 2 ? 'selectedNavOptions' : 'navOptions'}>
                    My Request
                </div>
                <div
                    onClick={() => {
                        setSelectedOption(3);
                    }} className={selectedOption === 3 ? 'selectedNavOptions' : 'navOptions'}>
                    CA/CS Registration
                </div>
                <div
                    onClick={() => {
                        setRequestPageIndex(0);
                        setSelectedOption(4);
                    }} className={selectedOption === 4 ? 'selectedNavOptions' : 'navOptions'}>
                    Request Verification
                </div>
                <div
                    onClick={() => {
                        setRequestPageIndex(0);
                        setSelectedOption(5);
                    }} className={selectedOption === 5 ? 'selectedNavOptions' : 'navOptions'}>
                    Assign Request
                </div>
                {/* <div 
                    onClick={() => {
                        setSelectedOption(5);
                    }} className={selectedOption === 5 ? 'selectedNavOptions' : 'navOptions'} style={{ position: 'absolute', bottom: '0px', width: '95%' }}>
                    login
                </div> */}
            </div>
            <div className='content'>
                {selectedOption === 1 && <SubmitRequest />}
                {selectedOption === 2 && <ShowMyRequest />}
                {selectedOption === 3 && <CaCsRegistration />}
                {selectedOption === 4 && <VerifyRequestList />}
                {selectedOption === 5 && <ShowVerifiedRequestList/>}
                {/* {SubmitRequest()} */}
            </div>
        </div>
    )
}


const SubmitRequest=()=> {
    const [type,setType]=useState('others');
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [mobile,setMobile]=useState('');
    const [description,setDescription]=useState('');
    const [files,setMyFiles]=useState([]);
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
                        <input onChange={(e)=>{setMyFiles(e.target.files)}} type="file" multiple className='inputItem' />
                        <p style={{fontSize:'10px'}}>You can upload multiple files(PDF, JPG, PNG)</p>
                </div>

                <div style={{display:'flex' ,marginTop:'20px'}}>
                    <div onClick={()=>{
                        {
                        storeRequest(type,name,email,mobile,description,files)}
                    }} className='button' style={{backgroundColor:'blue ',color:'white'}}>
                        Submit Request
                    </div>
                    <div onClick={()=>{
                        // {getRequestDocument();}
                    }} className='button' style={{backgroundColor:'white',color:'black'}}>
                        Clear
                    </div>
                </div>
        </div>
    )
}