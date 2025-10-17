import React, { useState } from 'react';
import '../agent_page.css'
import CancleSvg from '../../../assets/cancle.svg'
import { storeCaCsDetails } from '../../../homepage/homepage_logic'

export const RegisterCACS = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('CA');
    const [specialization, setSpecialization] = useState('Accounting and Audit');
    const [regNumber, setRegNumber] = useState('');
    const [certificate, setCertificate] = useState([]);
    const [idProof, setIdProof] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    function validateEmail(str) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str.trim());
    }

    function isAlphabetWithSpace(str) {
        return /^[A-Za-z\s]+$/.test(str);
    }

    async function validate_and_submit() {
        if (name === '' || email === '' || phone === '' || regNumber === '') {
            alert('Fill all mandatory fields');
            return;
        }
        if (!validateEmail(email)) {
            alert('Enter valid email ID');
            return;
        }
        if (!isAlphabetWithSpace(name)) {
            alert('Enter valid name');
            return;
        }
        if (phone.length !== 10) {
            alert('Enter 10 digit mobile number');
            return;
        }
        if (certificate.length === 0) {
            alert('Please upload certificate');
            return;
        }
        if (idProof.length === 0) {
            alert('Please upload ID proof');
            return;
        }

        const workingDays = 'Monday-Friday'; // Constant working days
        const result = await storeCaCsDetails(name, specialization, role, email, phone, regNumber, workingDays, certificate[0], idProof[0]);
        if (result) {
            clear();
        }
    }

    function clear() {
        setName('');
        setEmail('');
        setPhone('');
        setRole('CA');
        setSpecialization('Accounting and Audit');
        setRegNumber('');
        setCertificate([]);
        setIdProof([]);
        document.getElementById("certificate").value = "";
        document.getElementById("idProof").value = "";
    }

    return <div>
        <p className='title-demo'>Register CA/CS</p>
        <div style={{ width: '100%', minHeight: '80%', display: 'flex', justifyContent: 'center' }}>
            <div className='content-div-demo'>
                <div style={{ marginTop: '57px', marginLeft: '28px' }}>
                    <p className='form-header-demo'>CA/CS Information</p>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Name</span>
                        <input className='input-box-demo' type='text' value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Email</span>
                        <input className='input-box-demo' type='text' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Phone</span>
                        <input className='input-box-demo' type='text' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Role</span>
                        <select className='input-box-demo' style={{ width: '410px' }} value={role} onChange={(e) => { setRole(e.target.value) }}>
                            <option value="CA">CA</option>
                            <option value="CS">CS</option>
                        </select>
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Specialization</span>
                        <select className='input-box-demo' style={{ width: '410px' }} value={specialization} onChange={(e) => { setSpecialization(e.target.value) }}>
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
                        <input className='input-box-demo' type='text' value={regNumber} onChange={(e) => { setRegNumber(e.target.value) }} />
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Upload Certificate</span>
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
                        <div className='submit-button' onClick={validate_and_submit}>
                            Submit
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

}





