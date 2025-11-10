import React, { useState, useEffect, useContext } from 'react';
import './../agent_page.css'
import dayjs from "dayjs";
import backArrow from '../../../assets/arrow_back.svg'
import { AppContext } from '../../../provider.jsx'
import { downloadRequestCompletionDocument, getRequestCompletionDocument, getRequestDocument, showRequestCompletionDocument, showRequestDocument } from '../../../controller/agent_data_controller';
export const RequestDetails = ({ requestData }) => {
    const [documents, setDocumnets] = useState([]);
    const [completionDocuments, setCompletionDocumnets] = useState([]);
    const { pageIndex, setPageIndex } = useContext(AppContext);
    // const documents = [['102', 'Form15.pdf'], ['102', 'Form18.jpg']];
    const activityLog = [['request assigned to Anil Mehta', '05 oct 25'], ['request accepted by Admin', '05 oct 25']]
    const dateFormat = (timestamp) => {
        // return 6
        return dayjs(timestamp).format("DD MMM YYYY")
    }
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await getRequestDocument(requestData[0]);
                setDocumnets(result);
                console.log('result:', result)
                if (requestData[6] === 'Completed') {
                    let result1 = await getRequestCompletionDocument(requestData[0]);
                    setCompletionDocumnets(result1);
                }
            } catch (err) {
                console.error("Error fetching:", err);
            } finally {
                setLoading(false);
            }
        };
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
            {requestData[6] === "Under Review" ? <div className='submit-button-variable' style={{ marginRight: '30px' }}>Cancel Request</div> : <></>}

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
                                <div onClick={() => { showRequestDocument(item[0]) }}
                                    className='view-button'>view</div>
                            </div>
                            {documents.length != index + 1 ? <hr style={{ margin: '0 30px', }} /> : ''}
                        </div>
                    ))}
                </div>

                {
                    requestData[6] === 'Completed' ? <div
                        className='content-div-demo' style={{ width: '100%', paddingBottom: '20px', marginTop: '20px' }}>
                        <div style={{ borderBottom: '1px solid black', padding: '10px 20px' }}>
                            <p style={{ fontSize: '22px', fontWeight: '600' }}>Completion Details</p>
                        </div>
                        {completionDocuments.map((item, index) => (
                            <div>
                                <div style={{ padding: '20px 30px 10px 20px', display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ fontSize: '18px', fontWeight: '600' }}>{item[1]}</p>
                                    <div style={{ display: 'flex' }}>
                                        <div onClick={() => { showRequestCompletionDocument(item[0]) }}
                                            className='view-button'>view</div>
                                        <div style={{ marginLeft: '10px' }} onClick={() => { downloadRequestCompletionDocument(item[0], item[1]) }}
                                            className='view-button'>download</div>
                                    </div>
                                </div>
                                {documents.length != index + 1 ? <hr style={{ margin: '0 30px', }} /> : ''}
                            </div>

                        ))}
                        <div style={{ padding: '20px 30px 10px 20px' }}>
                            <p style={{ fontWeight: '600' }}>Description :</p>
                            <p style={{ margin: '10px', fontWeight: '400' }}>{requestData[11]}</p>
                        </div>
                        <p></p>
                    </div> : <div></div>
                } 

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

    </div>

}





