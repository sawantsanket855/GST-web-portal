import React, { useState, useEffect ,useContext } from 'react';
import { AppContext } from '../../provider'
import { getRequestDocument,showRequestDocument,updateRequestStatus } from '../homepage_logic';
import '../homePage.css'
import backArrow from '../../assets/arrow_back.svg'

export const VerifyRequestDetail = ({requestData}) => {
    console.log(`this is data : ${requestData}`)
    const [status,setStatus]=useState(requestData[6]);
    const [instruction,setInstruction]=useState('');
    const {setRequestPageIndex} = useContext(AppContext);
    const [documents, setDocumnets] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
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
        fetchData();
    }, []);
    if (loading) return <p>Loading...</p>;

    return <div style={{ margin: '30px' }}>
        <div className='sumbitRequest'>
            <span onClick={()=>{setRequestPageIndex(0)}} style={{marginRight:'10px'}}><img src={backArrow} alt="" /></span>
            <span className='sectionTitle'>
                Request Details
            </span>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <div className='inputLabel'>
                        Request Type
                    </div>
                    <p className='dataItem'>{requestData[2]}</p>
                </div>

                <div style={{ marginLeft: '0%', width: '50%' }}>
                    <div className='inputLabel'>
                        Customer Name
                    </div>
                    <p className='dataItem'>{requestData[1]}</p>
                </div>

            </div>

            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <div className='inputLabel'>
                        Email
                    </div>
                    <p className='dataItem'>{requestData[3]}</p>
                </div>

                <div style={{ marginLeft: '0%', width: '50%' }}>
                    <div className='inputLabel'>
                        Phone
                    </div>
                    <p className='dataItem'>{requestData[4]}</p>
                </div>

            </div>
            <div style={{ width: '50%' }}>
                <div className='inputLabel'>
                    Description
                </div>
                <p className='dataItem'>{requestData[5]}</p>
            </div>

            <div style={{ width: '100%' }}>
                <div className='inputLabel'>
                    Uploaded Documents
                </div>
                <div style={{ display: 'flex' }}>
                    {documents.map((document, index) => (
                        <div onClick={()=>{showRequestDocument(document[0])}} className='documentLabelDiv'>
                            <p>
                                {document[1]}
                            </p>
                        </div>


                    ))

                    }
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                        <div style={{ width: '50%' }}>
                                <div className='inputLabel'>
                                    Update Status
                                </div>
                                <select style={{color:status=='Under Review'?'blue':status=='Rejected'?'red':'green'}}className='dataItem' name="status" id="status"  value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                                    <option style={{color:'blue'}} value="Under Review">Under Review</option>
                                    <option style={{color:'red'}} value="Rejected">Rejected</option>
                                    <option style={{color:'green'}} value="Verified">Verified</option>
                                </select>
                                
                        </div>
        
                        <div style={{ marginLeft: '0%', width: '40%' }}>
                            <div className='inputLabel'>
                               Add Instruction
                            </div>
                            <textarea value={instruction} style={{height:'80px'}} className='dataItem' onChange={(e)=>{setInstruction(e.target.value)}}></textarea>
                        </div>
        
                    </div>
                    <div onClick={()=>{
                        updateRequestStatus(requestData[0],status,instruction)
                        alert('changes saved');
                        setRequestPageIndex(0);
                        }} className='saveButton'>Save Changes</div>
        </div>
    </div>
}