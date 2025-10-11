import React, { use, useState, useEffect, useContext } from 'react';
import './../agent_page.css'
import dayjs from "dayjs";
import { AppContext } from '../../../provider.jsx'
import { getRequestData } from '../../../controller/agent_data_controller';
import { UpdateRequest } from './update_request.jsx';
export const AllRequestsAdmin = () => {
    const {pageIndex, setPageIndex } = useContext(AppContext);
    const [currentItemData, setCurrentItemData] = useState([]);
    const [requestList, setRequestList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const showRequestDetails = (item) => {
        setCurrentItemData(item)
        console.log(item)
        setPageIndex(1)
    }
    const dateFormat = (timestamp) => {
        // return 6
        return dayjs(timestamp).format("DD MMM YYYY")
    }
    const fetchData = async () => {
        try {
            let result = await getRequestData();
            setRequestList(result);
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
    if (pageIndex==1) return <UpdateRequest requestData={currentItemData}/>;
    return <div>
        <p className='title-demo'>All Requests</p>
        <div style={{ width: '100%', minHeight: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center  ' }}>
            <div className='content-div-demo'>
                <div style={{ display: 'flex' }}>
                    <div className='request-count-div'>
                        <p className='requets-count'>25</p>
                        <p className='request-count-type'>Assigned Requests</p>
                    </div>
                    <div className='request-count-div'>
                        <p className='requets-count'>08</p>
                        <p className='request-count-type'>Pending Requests</p>
                    </div>
                    <div className='request-count-div'>
                        <p className='requets-count'>15</p>
                        <p className='request-count-type'>Completed Requests</p>
                    </div>
                </div>
            </div>
            <div className='content-div-demo' style={{ marginTop: '20px', paddingBottom: '20px' }}>
                <div style={{ display: 'flex', padding: '30px 20px' }}>
                    <span style={{ fontSize: '20px', fontWeight: '500', marginRight: '10px' }}>Status</span>
                    <select name="status" id="status" style={{ border: '1px solid grey', borderRadius: '5px', textAlign: 'center' }} onClick={(e) => { setFilter(e.target.value) }}>
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div style={{ display: 'flex', justifyItems: 'space-around' }}>
                    <div className='request-table-item'>Request ID</div>
                    <div className='request-table-item'>Date</div>
                    <div className='request-table-item'>Customer</div>
                    <div className='request-table-item'>Product/Service</div>
                    <div className='request-table-item'>Status</div>
                    <div className='request-table-item'>Action</div>
                </div>
                <hr style={{ margin: '10px 20px' }} />
                {requestList.map((item, index) => (
                    false ? <div></div> :
                        <div>
                            <div style={{ display: 'flex', justifyItems: 'space-around' }}>
                                <div className='request-table-item'>{item[0]}</div>
                                <div className='request-table-item'>{dateFormat(item[8])}</div>
                                <div className='request-table-item'>{item[1]}</div>
                                <div className='request-table-item'>{item[2]}</div>
                                <div className='request-table-item'>{item[6]}</div>
                                <div onClick={
                                    () => {showRequestDetails(item)}
                                }
                                    className='request-table-item' style={{ color: 'blue' }}>View Details</div>
                            </div>
                            {requestList.length != index + 1 ? <hr style={{ margin: '10px 20px' }} /> : ''}
                        </div>


                ))}
            </div>
        </div>
    </div>

}





