import React, { useState } from 'react';
import './homePage.css'
import Logo from '../assets/Logo.png'
export const Homepage = () => {
    const [selectedOption, setSelectedOption] = useState(0);
    return (
        <div style={{ display: 'flex' }}>
            <div className='navBar'>
                <img className="logoDivHome" src={Logo} alt="Logo" />
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
                        setSelectedOption(2);
                    }} className={selectedOption === 2 ? 'selectedNavOptions' : 'navOptions'}>
                    My Request
                </div>
                <div
                    onClick={() => {
                        setSelectedOption(3);
                    }} className={selectedOption === 3 ? 'selectedNavOptions' : 'navOptions'}>
                    Balance
                </div>
                <div
                    onClick={() => {
                        setSelectedOption(4);
                    }} className={selectedOption === 4 ? 'selectedNavOptions' : 'navOptions'} style={{ position: 'absolute', bottom: '0px', width: '95%' }}>
                    login
                </div>
            </div>
            <div className='content'>
                {submitRequest()}
            </div>
        </div>
    )
}


function submitRequest() {
    return (
        <div className='sumbitRequest'>
            <span className='sectionTitle'>
                Submit new request
            </span>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <div className='inputLabel'>
                        Request Type
                    </div>
                    <select className='inputItem' style={{ height: '5vh' }} name="type" id="type">
                        <option value="type1">Type1</option>
                        <option value="type2">Type2</option>
                        <option value="type3">Type3</option>
                        <option value="type4">Type4</option>
                    </select>
                </div>

                <div style={{ marginLeft: '0%', width: '50%' }}>
                    <div className='inputLabel'>
                        Customer Name
                    </div>
                    <input className='inputItem' type="text" />
                </div>

            </div>

            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                        <div className='inputLabel'>
                            Email
                        </div>
                        <input className='inputItem' type="email" />
                </div>

                <div style={{ marginLeft: '0%', width: '50%' }}>
                    <div className='inputLabel'>
                        Phone
                    </div>
                    <input className='inputItem' type="number" />
                </div>

            </div>
                <div style={{ width: '50%' }}>
                        <div className='inputLabel'>
                            Description
                        </div>
                        <textarea style={{height:'10vh'}} className='inputItem' name="dexcription" id="dexcription"></textarea>
                </div>

                <div style={{ width: '50%' }}>
                        <div className='inputLabel'>
                            Upload Documents
                        </div>
                        <input type="file" multiple className='inputItem' />
                        <p style={{fontSize:'10px'}}>You can upload multiple files(PDF, JPG, PNG)</p>
                </div>

                <div style={{display:'flex' ,marginTop:'20px'}}>
                    <div className='button' style={{backgroundColor:'blue '}}>
                        Submit Request
                    </div>
                    <div className='button' style={{backgroundColor:'white',color:'black'}}>
                        Clear
                    </div>
                </div>

            
        </div>
    )
}