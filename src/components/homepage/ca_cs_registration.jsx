import React ,{useState} from 'react';
import './homePage.css'
import {storeCaCsDetails} from './homepage_logic';

export const CaCsRegistration = () => {
        const [role,setRole]=useState('CA');
        const [specialization,setSpecialization]=useState('Taxation')
        const [name,setName]=useState('');
        const [email,setEmail]=useState('');
        const [mobile,setMobile]=useState('');
        const [regNumber,setRegNumber]=useState('');
        const [checkMon,setCheckMon] = useState(false);
        const [checkTue,setCheckTue] = useState(false);
        const [checkWed,setCheckWed] = useState(false);
        const [checkThur,setCheckThur] = useState(false);
        const [checkFri,setCheckFri] = useState(false);
        const [checkSat,setCheckSat] = useState(false);
        const [checkSun,setCheckSun] = useState(false);
        const [myCertificate,setMyCertificate]=useState([]);
        const [myIdProof,setMyIdProof]=useState([]);
    return <div className='sumbitRequest'>
                <span className='sectionTitle'>
                    CA/CS Registration
                </span>
                <div style={{ display: 'flex' }}>
                    <div style={{ marginLeft: '0%', width: '50%' }}>
                        <div className='inputLabel'>
                            Customer Name
                        </div>
                        <input className='inputItem' type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    </div>
                    <div style={{ width: '50%' }}>
                        <div className='inputLabel'>
                            Role
                        </div>
                        <select className='inputItem' style={{ height: '5vh' }} name="type" id="type" onClick={(e)=>{setRole(e.target.value)}}>
                            <option value="CA">CA</option>
                            <option value="CS">CS</option>
                        </select>
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
                <div style={{display:'flex'}}>
                    <div style={{ width: '50%' }}>
                            <div className='inputLabel'>
                                Registration Number
                            </div>
                            <input className='inputItem' type="number" value={regNumber} onChange={(e)=>{setRegNumber(e.target.value)}}/>
                    </div>
                    <div style={{ width: '50%' }}>
                        <div className='inputLabel'>
                            Specialization
                        </div>
                        <select className='inputItem' style={{ height: '5vh' }} name="type" id="type" onClick={(e)=>{setSpecialization(e.target.value)}}>
                            <option value="Taxation">Taxation</option>
                            <option value="Audit">Audit</option>
                            <option value="Company Law">Company Law</option>
                        </select>
                    </div>

                </div>
                    
    
                <div style={{display:'flex'}}>
                
                    <div style={{ width: '50%' }}>
                            <div className='inputLabel'>
                                Upload Certificate
                            </div>
                            <input onChange={(e)=>{setMyCertificate(e.target.files)}} type="file" className='inputItem' />
                            <p style={{fontSize:'10px'}}>You can upload only one file(PDF, JPG, PNG)</p>
                            <div className='inputLabel'>
                                Upload ID Proof
                            </div>
                            <input onChange={(e)=>{setMyIdProof(e.target.files)}} type="file" className='inputItem' />
                            <p style={{fontSize:'10px'}}>You can upload only one file(PDF, JPG, PNG)</p>
                    </div>
                    <div style={{ width: '50%' }}>
                            <div className='inputLabel'>
                                Working Days
                            </div>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <input type="checkbox"  checked={checkMon} onChange={(e)=>{setCheckMon(!checkMon)}} />
                                <span style={{margin:'0px 15px 0px 5px',}}>Mon</span>
                                <input type="checkbox" checked={checkTue} onChange={(e)=>{setCheckTue(!checkTue)}}/>
                                <span style={{margin:'0px 15px 0px 5px',}}>Tue</span>
                                <input type="checkbox" checked={checkWed} onChange={(e)=>{setCheckWed(!checkWed)}}/>
                                <span style={{margin:'0px 15px 0px 5px',}}>Wed</span>
                                <input type="checkbox" checked={checkThur} onChange={(e)=>{setCheckThur(!checkThur)}}/>
                                <span style={{margin:'0px 15px 0px 5px',}}>Thur</span>
                                <input type="checkbox" checked={checkFri} onChange={(e)=>{setCheckFri(!checkFri)}}/>
                                <span style={{margin:'0px 15px 0px 5px',}}>Fri</span>
                                <input type="checkbox" checked={checkSat} onChange={(e)=>{setCheckSat(!checkSat)}}/>
                                <span style={{margin:'0px 15px 0px 5px',}}>Sat</span>
                                <input type="checkbox" checked={checkSun} onChange={(e)=>{setCheckSun(!checkSun)}}/>
                                <span style={{margin:'0px 15px 0px 5px',}}>Sun</span>
                            </div>     
                    </div>
                </div>

                    <div style={{display:'flex' ,marginTop:'20px'}}>
                        <div onClick={()=>{
                            {
                            storeCaCsDetails(name,specialization,role,email,mobile,regNumber,['mon','tue','thus'],myCertificate,myIdProof)
                        }
                        }} className='button' style={{backgroundColor:'blue ',color:'white'}}>
                            Register
                        </div>
                        <div onClick={()=>{
                            // {getRequestDocument();}
                        }} className='button' style={{backgroundColor:'white',color:'black'}}>
                            Clear
                        </div>
                    </div>
            </div>
}