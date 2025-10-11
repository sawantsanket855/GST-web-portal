import React, { useState, useEffect,useContext } from 'react';
import { getRequestData } from '../homepage_logic';
import { format } from "date-fns";
import { useNavigate} from 'react-router-dom';
import { AppContext } from '../../provider'
import { ShowRequestDetails } from '../showRequestDetailsPage';
import { VerifyRequestDetail } from './verify_request_detail';

export const VerifyRequestList = () => {
    const {requestPageIndex,setRequestPageIndex} = useContext(AppContext);
    const [currentItemData,setCurrentItemData]=useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPageVisited,setNextPageVisited]=useState(false);
    const fetchData = async () => {
            try {
                let result = await getRequestData();
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
    {requestPageIndex==0?(showRequestList(data)) : (<VerifyRequestDetail requestData={currentItemData}/>)}
    </>
    
    function showRequestList(data){
        if(nextPageVisited){
            fetchData();
            setNextPageVisited(false);
        }
        
    // fetchData();
    return <div>
        {data.map((item, index) => ( 
            <div className='requestCard' onClick={()=>{
                // navigate(`/requestdetails/${item}`)
                setCurrentItemData(item)
                console.log(item)
                setRequestPageIndex(1)
                setNextPageVisited(true);
                
            }
                }>
            <div>
                            <p><span className='requestCardLabel'>Request ID :  </span><span className='requestCardItem'>{item[0]}</span></p>
                            <p><span className='requestCardLabel'>Customer Name :  </span><span className='requestCardItem'>{item[1]}</span></p>
                            <p><span className='requestCardLabel'>Request Type :  </span><span className='requestCardItem'>{item[2]}</span></p>
                            <p><span className='requestCardLabel'>Customer Email :  </span><span className='requestCardItem'>{item[3]}</span></p>
                            <p style={{fontSize:'small',color:'blue',fontWeight:'bold',marginTop:'10px'}}>{format(item[8],"dd/MM/yyyy HH:mm a") }</p>
                            </div>
            
                            <div>
                                <div className='statusDiv' style={{backgroundColor:item[6]==='Under Review'?'rgba(253, 253, 102, 1)':item[6]==='Rejected'?'rgba(253, 113, 113, 1)':item[6]==='Assigned'?'rgba(145, 213, 250, 1)':'rgba(191, 225, 123, 1)'}}>
                                    {item[6]}
                                </div>
                            </div>
            </div>
        )

        )}
    </div>
}


}

