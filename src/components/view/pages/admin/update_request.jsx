import React, { useState ,useEffect,useContext} from 'react';
import './../agent_page.css'
import dayjs from "dayjs";
import backArrow from '../../../assets/arrow_back.svg'
import { AppContext } from '../../../provider.jsx'
import { getRequestDocument, showRequestDocument } from '../../../controller/agent_data_controller';
import { assignCaCs, updateRequestStatus } from '../../../homepage/homepage_logic.js';
import { ShowCaCsList } from '../../../homepage/assign_ca_cs/show_ca_cs_list.jsx';
export const UpdateRequest = ({requestData}) => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [documents, setDocumnets] = useState([]);
    const {selectedCaCsId ,setSelectedCaCsId} = useContext(AppContext);
    const {pageIndex, setPageIndex } = useContext(AppContext);
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
    }, []);
    if (loading) return <p>Loading...</p>;
    return <div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '30px 50px 17px 42px', justifyContent: 'space-between' }}>
            <p className='title-demo' style={{ margin: '0' }}>Request Details</p>
            <div style={{ display: 'flex' }}>
                <div 
                onClick={()=>{
                    if(requestData[6] === 'Under Review'){
                        updateRequestStatus(requestData[0],'Approved','none');
                        alert('changes saved');
                        setPageIndex(2);
                    }if(requestData[6]==='Approved'){
                        setShowPopUp(true);
                    }if(requestData[6]=='Assigned'){

                    }
                }}
                 className='submit-button-variable' style={{ marginRight: '30px' }}>
                    {requestData[6] === 'Under Review' ? 'Approve Request' :requestData[6] === 'Approved'? 'Assign CA/CS':'Assigned'}
                </div>
                <div className='submit-button-variable'>Close Request</div>
            </div>
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
                                <div onClick={() => { showRequestDocument(item[0]) }}
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
    
    {/* show popup */}
    
    {showPopUp ?
                        <div style={{
                            border: '1px solid black',
                            borderRadius: '10px',
                            position: "fixed", top: "10%", right: '50px', width: "25%", height: "80%",
                            backgroundColor: "aliceblue",  justifyContent: "center", alignItems: "center"
                        }}>
                            <h2 style={{margin:'10px'}}>
                                Select CA/CS
                            </h2>
                            <div style={{height:'80%', overflowY: 'auto', backgroundColor:'white', border:'1px solid black',margin:'0px 15px',borderRadius:'5px'}}>
                                <ShowCaCsList/>
                            </div>
                            <div style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
                                <div onClick={
                                    ()=>{
                                        setShowPopUp(false);
                                    }
                                } className="button">Cancel</div>
                                <div onClick={
                                    async()=>{
                                        if(selectedCaCsId===0){
                                            alert('Select CA/CS')
                                            return
                                        }
                                       const response=await assignCaCs(selectedCaCsId,requestData[0]);
                                       if(response==='success'){
                                        requestData[6]='Assigned';
                                        alert('Request Assigned Successfully!')
                                       }else{
                                        alert(response);
                                       }
                                       
                                       fetchData();
                                       setShowPopUp(false);
                                    }
                                }
                                 className="button">Assign</div>
                            </div>
                            
                        </div>
                    : <div></div>}

    {/* show PopUp */}



    </div>

}





