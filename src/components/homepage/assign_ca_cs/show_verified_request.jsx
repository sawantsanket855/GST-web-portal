import React, { useState, useEffect, useContext } from 'react';
import { getVerifiedRequestData,assignCaCs } from '../homepage_logic';
import { format } from "date-fns";
import { AppContext } from '../../provider'
import { ShowRequestDetails } from '../showRequestDetailsPage';
import { ShowCaCsList } from './show_ca_cs_list'


export const ShowVerifiedRequestList = () => {
    const {selectedCaCsId ,setSelectedCaCsId} = useContext(AppContext);
    const { requestPageIndex, setRequestPageIndex } = useContext(AppContext);
    const [currentItemData, setCurrentItemData] = useState([]);
    const [data, setData] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
            try {
                let result = await getVerifiedRequestData();
                setData(result);
                console.log('result:', result)
            } catch (err) {
                console.error("Error fetching:", err);
            } finally {
                setLoading(false);
            }
        };
    useEffect(() => {
        fetchData();
    }, []);
    if (loading) return <p>Loading...</p>;

    return <>
        {requestPageIndex == 0 ? (showRequestList(data))  : (<ShowRequestDetails requestData={currentItemData} />)}
    </>

    function showRequestList(data) {
        return <div>
            {data.map((item, index) => (
                <div className='requestCard'>
                    <div>
                        <p><span className='requestCardLabel'>Request ID :  </span><span className='requestCardItem'>{item[0]}</span></p>
                        <p><span className='requestCardLabel'>Customer Name :  </span><span className='requestCardItem'>{item[1]}</span></p>
                        <p><span className='requestCardLabel'>Request Type :  </span><span className='requestCardItem'>{item[2]}</span></p>
                        <p><span className='requestCardLabel'>Customer Email :  </span><span className='requestCardItem'>{item[3]}</span></p>
                        <p style={{ fontSize: 'small', color: 'blue', fontWeight: 'bold', marginTop: '10px' }}>{format(item[8], "dd/MM/yyyy HH:mm a")}</p>
                    </div>
                    <div >
                        <div onClick={() => {
                            // navigate(`/requestdetails/${item}`)
                            setCurrentItemData(item)
                            console.log(item)
                            setRequestPageIndex(1)

                        }} className='button' style={{ backgroundColor: 'aliceblue', marginBottom: '10px' }}>
                            Details
                        </div>
                        <div onClick={() => {
                            setCurrentItemData(item)
                            setSelectedCaCsId(0);
                            setShowPopUp(true)
                        }} className='button' style={{ backgroundColor: 'aliceblue' }}>
                            Assign
                        </div>
                    </div>
                </div>
            )

            )}

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
                            <ShowCaCsList />
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
                                   const response=await assignCaCs(selectedCaCsId,currentItemData[0]);
                                   if(response==='success'){
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
        </div>
    }


}

