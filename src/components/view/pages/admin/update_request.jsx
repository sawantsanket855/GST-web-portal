import React, { useState, useEffect, useContext } from 'react';
import './../agent_page.css'
import CancleSvg from '../../../assets/cancle.svg'
import dayjs from "dayjs";
import backArrow from '../../../assets/arrow_back.svg'
import { AppContext } from '../../../provider.jsx'
import { completeWork, downloadRequestDocument, getRequestDocument, showRequestDocument } from '../../../controller/agent_data_controller';
import { assignCaCs, updateRequestStatus } from '../../../homepage/homepage_logic.js';
import { ShowCaCsList } from '../../../homepage/assign_ca_cs/show_ca_cs_list.jsx';
export const UpdateRequest = ({ requestData }) => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [files, setMyFiles] = useState([]);
    const [description,setDescription]=useState('');
    const [showCompleteWorkPopup, setShowCompleteWorkPopup] = useState(false);
    const [documents, setDocumnets] = useState([]);
    const { selectedCaCsId } = useContext(AppContext);
    const { pageIndex, setPageIndex } = useContext(AppContext);
    const [assignLoading, setAssignLoading] = useState(false);
    const [completeLoading, setCompleteLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    // const documents = [['102', 'Form15.pdf'], ['102', 'Form18.jpg']];
    const activityLog = [['request assigned to Anil Mehta', '05 oct 25'], ['request accepted by Admin', '05 oct 25']]

    const dateFormat = (timestamp) => {
        // return 6
        return dayjs(timestamp).format("DD MMM YYYY")
    }
    const fetchData = async () => {
        try {
            let result = await getRequestDocument(requestData[0]);
            setDocumnets(result);
            console.log('result:', result)
        } catch (err) {
            console.error("Error fetching:", err);
        } finally {
            setLoading(false);
        }
    };
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    if (loading) return <p>Loading...</p>;
    return <div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '30px 50px 17px 42px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <div onClick={() => { setPageIndex(0) }} className='submit-button-variable' style={{ marginRight: '30px' }}>
                    <span>🡐 back</span>
                </div>
            <p className='title-demo' style={{ margin: '0' }}>Request Details</p>
            </div>
            {
                requestData[6] === 'Completed' ? <p></p> : 
                 <div style={{ display: 'flex' }}>
                <div
                    onClick={async() => {
                        if(verifyLoading){
                            return
                        }
                        if (requestData[6] === 'Under Review') {
                            setVerifyLoading(true);
                            const response =await updateRequestStatus(requestData[0], 'Approved', 'none');
                            if(response==='success'){
                                 alert('request verified');
                                requestData[6] = 'Approved';
                                fetchData();
                            }else{
                                alert(response);
                            }
                            setVerifyLoading(false);
                        }else if (requestData[6] === 'Approved') {
                            setShowPopUp(true);
                        }else if (requestData[6] == 'Assigned') {
                            setShowCompleteWorkPopup(true);
                        }
                    }}
                    className='submit-button-variable' style={{ marginRight: '30px',width:'120px' }}>
                    {requestData[6] === 'Under Review' ? verifyLoading?<div style={{width:'12px',height:'12px'}} className='loader'></div>:'Approve Request' : requestData[6] === 'Approved' ? 'Assign CA/CS' :  'Complete'}
                </div>
                {requestData[6] === 'Under Review'?<div className='submit-button-variable'>Close Request</div>:<></>}
                
            </div>
            }
           
        </div>

        <div style={{ width: '100%', minHeight: '80%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '30%', display: 'flex', flexDirection: 'column', alignSelf: 'flex-start' }}>
                <div className='content-div-demo' style={{ width: '100%', paddingBottom: '20px' }}>
                    <div style={{ borderBottom: '1px solid black', padding: '10px 20px' }}>
                        <p style={{ fontSize: '22px', fontWeight: '600' }}>Request Summary</p>
                    </div>
                    <div style={{ padding: '20px 0 10px 20px' }}>
                        <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Request ID</p>
                        <p style={{ fontSize: '20px', fontWeight: '600' }}>{requestData[0]}</p>
                    </div>
                    <div style={{ padding: '20px 0 10px 20px' }}>
                        <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Date</p>
                        <p style={{ fontSize: '20px', fontWeight: '600' }}>{dateFormat(requestData[8])}</p>
                    </div>
                    <div style={{ padding: '20px 0 10px 20px' }}>
                        <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Product Service</p>
                        <p style={{ fontSize: '20px', fontWeight: '600' }}>{requestData[2]}</p>
                    </div>
                    <div style={{ padding: '20px 0 10px 20px' }}>
                        <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Status</p>
                        <p style={{ fontSize: '20px', fontWeight: '600', color: 'green' }}>{requestData[6]}</p>
                    </div>

                </div>
                <div className='content-div-demo' style={{ width: '100%', paddingBottom: '20px', marginTop: '20px' }}>
                    <div style={{ borderBottom: '1px solid black', padding: '10px 20px' }}>
                        <p style={{ fontSize: '22px', fontWeight: '600' }}>Customer Details</p>
                    </div>
                    <div style={{ padding: '20px 0 10px 20px' }}>
                        <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Name</p>
                        <p style={{ fontSize: '20px', fontWeight: '600' }}>{requestData[1]}</p>
                        <p style={{ fontSize: '16px', fontWeight: '400', marginTop: '5px' }}>{requestData[3]}</p>
                        <p style={{ fontSize: '16px', fontWeight: '400', marginTop: '5px' }}> <span>+91</span> {requestData[4]}</p>
                    </div>
                   
                </div>
            </div>
            <div style={{ width: '60%', display: 'flex', flexDirection: 'column', marginLeft: '20px', alignSelf: 'flex-start' }}>
                {/* <div className='content-div-demo' style={{ width: '100%', paddingBottom: '20px' }}>
                           <div style={{ borderBottom: '1px solid black', padding: '10px 20px' }}>
                               <p style={{ fontSize: '22px', fontWeight: '600' }}>Assigned CA/CS</p>
                           </div>
                           <div style={{ padding: '20px 0 10px 20px' }}>
                               <p style={{ fontSize: '20px', fontWeight: '600' }}>Anil Mehta</p>
                               <p style={{ fontSize: '17px', fontWeight: '100', marginTop: '5px' }}>anilmehta@gmail.com</p>
                           </div>
                       </div> */}
                <div className='content-div-demo' style={{ width: '100%', paddingBottom: '20px' }}>
                    <div style={{ borderBottom: '1px solid black', padding: '10px 20px' }}>
                        <p style={{ fontSize: '22px', fontWeight: '600' }}>Uploaded Documents</p>
                    </div>
                    {documents.map((item, index) => (
                        <div>
                            <div style={{ padding: '20px 30px 10px 20px', display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{ fontSize: '18px', fontWeight: '600' }}>{item[1]}</p>
                                <div style={{display:'flex'}}>
                                    <div onClick={() => { showRequestDocument(item[0]) }}
                                        className='view-button'>view</div>
                                    <div  style={{marginLeft:'10px'}} onClick={() => { downloadRequestDocument(item[0],item[1]) }}
                                        className='view-button'>download</div>
                                </div>
                            </div>
                            {documents.length != index + 1 ? <hr style={{ margin: '0 30px', }} /> : ''}
                        </div>
                    ))}
                </div>
                <div className='content-div-demo' style={{ width: '100%', paddingBottom: '20px', marginTop: '20px' }}>
                    <div style={{ borderBottom: '1px solid black', padding: '10px 20px' }}>
                        <p style={{ fontSize: '22px', fontWeight: '600' }}>Activity Log</p>
                    </div> 
                    <div style={{ padding: '20px 30px 10px 20px', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '18px', fontWeight: '500' }}>request created by {requestData[16]}</p>
                        <p style={{ fontSize: '15px', fontWeight: '400' }}>{dateFormat(requestData[8])}</p>
                    </div>

                    {requestData[6] === 'Approved' || requestData[6] === 'Assigned' || requestData[6] === 'Completed' ? <div style={{ padding: '20px 30px 10px 20px', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '18px', fontWeight: '500' }}>request verified by admin</p>
                        <p style={{ fontSize: '15px', fontWeight: '400' }}>{dateFormat(requestData[14])}</p>
                    </div> : <div></div>
                    }
                    {requestData[6] === 'Assigned' || requestData[6] === 'Completed' ? <div style={{ padding: '20px 30px 10px 20px', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '18px', fontWeight: '500' }}>request assigned to CA/CS</p>
                        <p style={{ fontSize: '15px', fontWeight: '400' }}>{dateFormat(requestData[15])}</p>
                    </div> : <div></div>
                    }
                    {requestData[6] === 'Completed' ? <div style={{ padding: '20px 30px 10px 20px', display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '18px', fontWeight: '500' }}>request completed by CA/CS</p>
                        <p style={{ fontSize: '15px', fontWeight: '400' }}>{dateFormat(requestData[12])}</p>
                    </div> : <div></div>
                    }

                    <div style={{ height: '10px' }}></div>
                </div>
            </div>
        </div>

        {/* show popup ca/cs*/}

        {showPopUp ?
            <div style={{
                border: '1px solid black',
                borderRadius: '10px',
                position: "fixed", top: "10%", right: '50px', width: "25%", height: "80%",
                backgroundColor: "aliceblue", justifyContent: "center", alignItems: "center"
            }}>
                <h2 style={{ margin: '10px' }}>
                    Select CA/CS
                </h2>
                <div style={{ height: '80%', overflowY: 'auto', backgroundColor: 'white', border: '1px solid black', margin: '0px 15px', borderRadius: '5px' }}>
                    <ShowCaCsList />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <div onClick={
                        () => {
                            setShowPopUp(false);
                        }
                    } className="button">Cancel</div>
                    <div onClick={
                        async () => {
                            if(assignLoading){
                                return
                            }
                            setAssignLoading(true);
                            if (selectedCaCsId === 0) {
                                alert('Select CA/CS')
                                setAssignLoading(false);
                                return
                            }
                            const response = await assignCaCs(selectedCaCsId, requestData[0]);
                            if (response === 'success') {
                                requestData[6] = 'Assigned';
                                alert('Request Assigned Successfully!')
                            } else {
                                alert(response);
                            }

                            fetchData();
                            setShowPopUp(false);
                            setAssignLoading(false);
                        }
                    }
                        className="button">
                            {assignLoading ? <div style={{width:'12px',height:'12px'}} className='loader'></div>:<span>Assign</span>}
                            </div>
                </div>

            </div>
            : <div></div>}

        {/* show PopUp ca/cs*/}


        {/* show popup complete work*/}

        {showCompleteWorkPopup ?
            <div style={{
                border: '1px solid black',
                borderRadius: '10px',
                position: "fixed", top: "10%", right: '50px', width: "25%", height: "80%",
                backgroundColor: "aliceblue", justifyContent: "center", alignItems: "center"
            }}>
                <h2 style={{ margin: '10px' }}>
                    Submit Completed Work
                </h2>
                <div style={{ alignContent:'start',justifyItems:'start', height: '80%', overflowY: 'auto', backgroundColor: 'white', border: '1px solid black', margin: '0px 15px', borderRadius: '5px', }}>
                    <div style={{flexDirection:'column', display:'flex',justifyContent:'center',margin:'40px 20px',height:'50%',width:'80%'}}>
                        <span className='input-label-demo' >Description</span>
                        <textarea style={{width:'100%',height:'60%',padding:'10px'}} name="description" id="description" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    </div>
                    <div style={{display:'flex', flexDirection:'column',justifyContent:'center',margin:'40px 20px'}}>
                        <span className='input-label-demo'>Upload Documents</span>
                        <div  style={{ border: 'none' ,marginTop:'10px'}}>
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
                                style={{ height: '25px', marginBottom: '5px',display:'none'}}
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
                            <div style={{ display: 'flex' ,marginTop:'10px'}}>
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
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <div onClick={
                        () => {
                            setShowCompleteWorkPopup(false);
                        }
                    } className="button">Cancel</div>
                    <div onClick={
                        async () => {
                            if(completeLoading){
                                return
                            }
                            setCompleteLoading(true)
    
                            const response = await completeWork(requestData[0],description,files);
                            if (response === 'submitted') {
                                requestData[6] = 'Completed';
                                alert('Request Status changed')
                            } else {
                                alert(response);
                            }
                            fetchData();
                            setShowCompleteWorkPopup(false);
                            setCompleteLoading(false)
                        }
                    }
                        className="button">{completeLoading?<div style={{width:'12px',height:'12px'}} className='loader'></div>:<div>Submit</div>} </div>
                </div>

            </div>
            : <div></div>}

        {/* show PopUp complete work*/}


    </div>

}





