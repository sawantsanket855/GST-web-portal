import React, { useState, useEffect ,useContext } from 'react';
import { AppContext } from '../provider'
import { getRequestDocument,showRequestDocument } from './homepage_logic';
import { format } from "date-fns";
import { useParams, useLocation } from 'react-router-dom';
import './homePage.css'
import backArrow from '../assets/arrow_back.svg'

export const ShowRequestDetails = ({requestData}) => {
    console.log(`this is data : ${requestData}`)
    const {setRequestPageIndex} = useContext(AppContext);
    const { data } = useParams();
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
                                    Status
                                </div>
                                <p className='dataItem'>Under Review</p>
                        </div>
        
                        <div style={{ marginLeft: '0%', width: '40%' }}>
                            <div className='inputLabel'>
                                Instruction
                            </div>
                            <p className='dataItem'>None</p>
                        </div>
        
                    </div>
        </div>
    </div>
}