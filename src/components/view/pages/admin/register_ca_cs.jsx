import React, { useState } from 'react';
import '../agent_page.css'
import CancleSvg from '../../../assets/cancle.svg'
export const RegisterCACS = () => {
    const [files, setMyFiles] = useState([]);
    const [certificate, setCertificate] = useState([]);
    const [idProof, setIdProof] = useState([]);
    return <div>
        <p className='title-demo'>Register CA/CS</p>
        <div style={{ width: '100%', minHeight: '80%', display: 'flex', justifyContent: 'center' }}>
            <div className='content-div-demo'>
                <div style={{ marginTop: '57px', marginLeft: '28px' }}>
                    <p className='form-header-demo'>CA/CS Information</p>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Name</span>
                        <input className='input-box-demo' type='text' />
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Email</span>
                        <input className='input-box-demo' type='text' />
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Phone</span>
                        <input className='input-box-demo' type='text' />
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Role</span>
                        {/* <input className='input-box-demo' type='text'/> */}
                        <select className='input-box-demo' style={{ width: '410px' }} name="type" id="type">
                            <option value="CA">CA</option>
                            <option value="Taxation">CS</option>
                        </select>
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Specialization</span>
                        {/* <input className='input-box-demo' type='text'/> */}
                        <select className='input-box-demo' style={{ width: '410px' }} name="type" id="type">
                            <option value="Accounting and Audit">Accounting and Audit</option>
                            <option value="Taxation">Taxation</option>
                            <option value="Corporate Compliance">Corporate Compliance</option>
                            <option value="Corporate Governance and Legal">Corporate Governance and Legal</option>
                            <option value="Financial and Business Advisory">Financial and Business Advisory</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Registration Number</span>
                        <input className='input-box-demo' type='text' />
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Upload Cetificate</span>
                        <div className='input-file-box-demo' style={{ border: 'none' }}>
                            <input
                                style={{ height: '25px', marginBottom: '5px', }}
                                onChange={(e) => {
                                    console.log('in on change');
                                    const maxFileSize = 5 * 1024 * 1024;
                                    for (let file of e.target.files) {
                                        if (file.size > maxFileSize) {
                                            alert(`File "${file.name}" is too large. Max size is 5 MB.`);
                                            document.getElementById("certificate").value = "";
                                            return
                                        }
                                    }
                                    setCertificate(e.target.files)
                                }


                                } type="file" id='certificate' />
                            <div style={{ display: 'flex' }}>
                                {
                                    certificate.length == 0 ? <span>No file selected</span> :
                                        <p>{certificate[0].name}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Upload ID Proof</span>
                        <div className='input-file-box-demo' style={{ border: 'none' }}>
                            <input
                                style={{ height: '25px', marginBottom: '5px', }}
                                onChange={(e) => {
                                    console.log('in on change');
                                    const maxFileSize = 5 * 1024 * 1024;
                                    for (let file of e.target.files) {
                                        if (file.size > maxFileSize) {
                                            alert(`File "${file.name}" is too large. Max size is 5 MB.`);
                                            document.getElementById("idProof").value = "";
                                            return
                                        }
                                    }
                                    setIdProof(e.target.files)
                                }


                                } type="file" id='idProof' />
                            <div style={{ display: 'flex' }}>
                                {
                                    idProof.length == 0 ? <span>No file selected</span> :
                                        <p>{idProof[0].name}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='input-div-demo'>
                        <div className='submit-button'>
                            Submit
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

}





