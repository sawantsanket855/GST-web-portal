import React, { useState,useContext } from 'react';
import '../agent_page.css'
import { AppContext } from '../../../provider'
import CancleSvg from '../../../assets/cancle.svg'
import { storeRequest } from '../../../controller/agent_data_controller';
export const SubmitRequest = () => {
    const [loading, setLoading]=useState(false);
    const {setSidebarIndex ,p_getBalance} = useContext(AppContext);
    const [files, setMyFiles] = useState([]);
    const [type, setType] = useState('Accounting and Audit');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [description, setDescription] = useState('');
    function validateEmail(str) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str.trim());
    }
    function isAlphabetWithSpace(str) {
        return /^[A-Za-z\s]+$/.test(str);
    }
    async function validate_request_data() {
        if (name === '' || email === '' || mobile === '') {
            alert('Fill mandatory data');
            return
        }
        if (!validateEmail(email)) {
            alert('Enter valid eamil ID');
            return
        }
        if (!isAlphabetWithSpace(name)) {
            alert('Enter valid name')
            return
        }
        if (mobile.length !== 10) {
            alert('Enter 10 digit mobile number');
            return
        }
        if(files.length===0){
            alert('Upload minimun 1 document');
            return
        }
        setLoading(true);
        const result = await storeRequest(type, name, email, mobile, description, files)
        if (result === 'submitted') {
            clear();
            setSidebarIndex(2)
            p_getBalance();
        }
        setLoading(false);
    }
    function clear() {
        setType('Accounting and Audit')
        setName('');
        setEmail('');
        setMobile('');
        setDescription('');
        document.getElementById("MyFiles").value = "";
    }
    return <div>
        <p className='title-demo'>Create New Request</p>
        <div style={{ width: '100%', minHeight: '80%', display: 'flex', justifyContent: 'center' }}>
            <div className='content-div-demo'>
                <div style={{ marginTop: '57px', marginLeft: '28px' }}>
                    <p className='form-header-demo'>Customer Information</p>
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
                        <input className='input-box-demo' type='number' value={mobile} onChange={(e) => {
                            if (e.target.value.length <= 10) {
                                setMobile(e.target.value)
                            }
                        }} />
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Service</span>
                        {/* <input className='input-box-demo' type='text'/> */}
                        <select className='input-box-demo' style={{ width: '410px' }} name="type" id="type" onClick={(e) => { setType(e.target.value) }}>
                            <option value="Accounting and Audit">Accounting and Audit</option>
                            <option value="Taxation">Taxation</option>
                            <option value="Corporate Compliance">Corporate Compliance</option>
                            <option value="Corporate Governance and Legal">Corporate Governance and Legal</option>
                            <option value="Financial and Business Advisory">Financial and Business Advisory</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo' >Description</span>
                        <textarea className='input-box-demo' name="description" id="description" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    </div>
                    <div className='input-div-demo' style={{height:'50px'}}>
                        <span className='input-label-demo'>Upload Documents</span>
                        <div className='input-file-box-demo' style={{ border: 'none'}}>
                            <label
                                htmlFor="MyFiles"
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    padding: "2px 16px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                }}
                            >
                                Select File
                            </label>
                            <input
                                style={{ height: '25px', marginBottom: '5px',display:'none' }}
                                onChange={(e) => {
                                    console.log('in on change');
                                    const maxFileLimit = 4
                                    const maxFileSize = 5 * 1024 * 1024;
                                    if (e.target.files.length > maxFileLimit) {
                                        alert('you can select maximun 4 files')
                                        document.getElementById("MyFiles").value = "";
                                        return
                                    } else {
                                        for (let file of e.target.files) {
                                            // console.log(file.name)
                                            // console.log(file.size)
                                            if (file.size > maxFileSize) {
                                                alert(`File "${file.name}" is too large. Max size is 5 MB.`);
                                                document.getElementById("MyFiles").value = "";
                                                return
                                            }
                                        }
                                        for (let file of e.target.files) {
                                            const isDuplicate = files.some(f => f.name === file.name && f.size === file.size);
                                            let newFilesCount = 0;
                                            if (!isDuplicate) {
                                                newFilesCount++;
                                                if (files.length + newFilesCount > maxFileLimit) {
                                                    alert('you can select maximun 4 files')
                                                    return
                                                }
                                                setMyFiles(prev => [...prev, file]);

                                            }
                                        }
                                        e.target.value = "";
                                        // setMyFiles(Array.from(e.target.files))
                                    }

                                    // setMyFiles(e.target.files)

                                }} type="file" id='MyFiles' multiple />
                            <div style={{ display: 'flex' ,marginTop:'10px' }}>
                                {
                                    files.length == 0 ? <span>No file selected</span> :
                                        files.map((item, index) => (
                                            <div style={{ display: 'flex' }}>
                                                <div style={{ width: '70px', overflow: 'clip', height: '20px' }}>
                                                    {item.name}
                                                </div>
                                                <img
                                                    onClick={
                                                        () => {
                                                            setMyFiles(files => files.filter((_, i) => i !== index))
                                                        }
                                                    }
                                                    style={{ height: '20px', marginRight: '15px' }}
                                                    src={CancleSvg} alt="" />
                                            </div>

                                        ))}

                            </div>
                        </div>
                    </div>
                    <div className='input-div-demo'>
                        <div className='submit-button' onClick={validate_request_data}>
                           {loading? <div className='loader'></div>:<span>Submit</span> }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

}





