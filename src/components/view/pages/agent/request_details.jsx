import React, { useState ,useEffect,useContext} from 'react';
import './../agent_page.css'
import dayjs from "dayjs";
import backArrow from '../../../assets/arrow_back.svg'
import { AppContext } from '../../../provider.jsx'
import { getRequestDocument, showRequestDocument } from '../../../controller/agent_data_controller';
export const RequestDetails = ({requestData}) => {
    const [documents, setDocumnets] = useState([]);
    const {pageIndex, setPageIndex } = useContext(AppContext);
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
                } catch (err) {
                    console.error("Error fetching:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }, []);
        if (loading) return <p>Loading...</p>;
    return <div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '30px 50px 17px 42px', justifyContent: 'space-between' }}>
            <div style={{display:'flex',alignItems:'center'}}>
                <span onClick={()=>{setPageIndex(0)}} style={{marginRight:'10px'}}><img src={backArrow} alt="" /></span>
            <p className='title-demo' style={{ margin: '0' }}>Request Details</p>
            </div>
            <div className='submit-button-variable' style={{ marginRight: '30px' }}>Cancel Request</div>
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
                    <div style={{ padding: '20px 0 10px 20px' }}>
                        <p style={{ fontSize: '15px', paddingBottom: '10px' }}>PAN/GST Number</p>
                        <p style={{ fontSize: '20px', fontWeight: '600' }}>PNTS0134F</p>
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
                                <div onClick={()=>{showRequestDocument(item[0])}}
                                 className='view-button'>view</div>
                            </div>
                            {documents.length != index + 1 ? <hr style={{ margin: '0 30px', }} /> : ''}
                        </div>
                    ))}
                </div>
                <div className='content-div-demo' style={{ width: '100%', paddingBottom: '20px', marginTop: '20px' }}>
                    <div style={{ borderBottom: '1px solid black', padding: '10px 20px' }}>
                        <p style={{ fontSize: '22px', fontWeight: '600' }}>Activity Log</p>
                    </div>
                    {activityLog.map((item, index) => (
                        <div>
                            <div style={{ padding: '20px 30px 10px 20px', display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{ fontSize: '18px', fontWeight: '500' }}>{item[0]}</p>
                                <p style={{ fontSize: '15px', fontWeight: '400' }}>{item[1]}</p>

                            </div>
                            {documents.length != index + 1 ? <hr style={{ margin: '0 30px', }} /> : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    </div>

}





