import React, { use, useState, useEffect, useContext } from 'react';
import './../agent_page.css'
import dayjs from "dayjs";
import { AppContext } from '../../../provider.jsx'
import { getRequestData } from '../../../controller/agent_data_controller';
import { RequestDetails } from './request_details.jsx';
export const AllRequests = () => {
    const [pendingRequestCount, setPendingRequestCount] = useState(0);
    const [assignedRequestCount, setAssignedRequestCount] = useState(0);
    const [completedRequestCount, setCompletedRequestCount] = useState(0);
    const { pageIndex, setPageIndex } = useContext(AppContext);
    const [currentItemData, setCurrentItemData] = useState([]);
    const [requestList, setRequestList] = useState([]);
    const [filteredRequestList, setFilteredRequestList] = useState([]);
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

    const filterRequests = (requests, statusFilter) => {
        if (statusFilter === 'All') {
            return requests;
        }
        return requests.filter(item => item[6] === statusFilter);
    }

    const fetchData = async () => {
        try {
            let result = await getRequestData();
            setRequestList(result);
            setFilteredRequestList(result);
            console.log('result:', result)
            const pendingCount = result.filter(item => item[6] === 'Under Review').length;
            const assignedCount = result.filter(item => item[6] === 'Assigned').length;
            const completedCount = result.filter(item => item[6] === 'Completed').length;
            setPendingRequestCount(pendingCount);
            setAssignedRequestCount(assignedCount);
            setCompletedRequestCount(completedCount);
        } catch (err) {
            console.error("Error fetching:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = filterRequests(requestList, filter);
        setFilteredRequestList(filtered);
    }, [filter, requestList]);

    if (loading) return <p>Loading...</p>;
    if (pageIndex == 1) return <RequestDetails requestData={currentItemData} />;
    return <div style={{ backgroundColor: 'rgba(246, 246, 249, 1)' }}>
        <p className='title-demo'>All Requests</p>
        <div style={{ width: '100%', minHeight: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center  ' }}>
            <div className='content-div-demo'>
                <div style={{ display: 'flex' }}>
                    <div className='request-count-div'>
                        <p className='requets-count'>{assignedRequestCount}</p>
                        <p className='request-count-type'>Assigned Requests</p>
                    </div>
                    <div className='request-count-div'>
                        <p className='requets-count'>{pendingRequestCount}</p>
                        <p className='request-count-type'>Pending Requests</p>
                    </div>
                    <div className='request-count-div'>
                        <p className='requets-count'>{completedRequestCount}</p>
                        <p className='request-count-type'>Completed Requests</p>
                    </div>
                </div>
            </div>
            {filteredRequestList.length == 0 ? <></> :
            <div className='content-div-demo' style={{ marginTop: '20px', paddingBottom: '20px' }}>
                <div style={{ display: 'flex', padding: '30px 20px' }}>
                    <span style={{ fontSize: '20px', fontWeight: '500', marginRight: '10px' }}>Status</span>
                    <select name="status" id="status" style={{ border: '1px solid grey', borderRadius: '5px', textAlign: 'center' }} onChange={(e) => { setFilter(e.target.value) }}>
                        <option value="All">All</option>
                        <option value="Under Review">Under Review</option>
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
                {filteredRequestList.map((item, index) => (
                    <div key={index}>
                        <div style={{ display: 'flex', justifyItems: 'space-around' }}>
                            <div className='request-table-item'>{item[0]}</div>
                            <div className='request-table-item'>{dateFormat(item[8])}</div>
                            <div className='request-table-item'>{item[1]}</div>
                            <div className='request-table-item'>{item[2]}</div>
                            <div className='request-table-item'>{item[6]}</div>
                            <div onClick={
                                () => { showRequestDetails(item) }
                            }
                                className='request-table-item' style={{ color: 'blue' }}>View Details</div>
                        </div>
                        {filteredRequestList.length != index + 1 ? <hr style={{ margin: '10px 20px' }} /> : ''}
                    </div>
                ))}
            </div>
            }
                    <div style={{height:'100px'}}></div>

        </div>
    </div>

}





