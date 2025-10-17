import React, { useState, useEffect,useContext} from 'react';
import '../agent_page.css'
import { getPaymentRequestData } from '../../../controller/agent_data_controller';
import { AppContext } from '../../../provider.jsx'
import { PaymentDetails } from './payment_details.jsx';

export const PaymentDetailsList = () => {
    const [currentItem, setCurrentItem] = useState(null);
    const {pageIndex, setPageIndex } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [paymentRequestList, setPaymentRequestList] = useState([]);
    const [pendingPaymentRequestCount , setPendingPaymentRequestCount]=useState(0);
    const [assignedPaymentRequestCount , setAssignedPaymentRequestCount]=useState(0);
    const [completedPaymentRequestCount , setCompletedPaymentRequestCount]=useState(0);


    const handleBack = () => {
        setPageIndex(0);
    }
    const fetchData = async () => {
            try {
                let result = await getPaymentRequestData();
                setPaymentRequestList(result);
                // setFilteredRequestList(result);
                console.log('result:', result)
            } catch (err) {
                console.error("Error fetching:", err);
            } finally {
                setLoading(false);
            }
            const pendingCount = paymentRequestList.filter(item => item[6] === 'Under Review').length;
            const assignedCount = paymentRequestList.filter(item => item[6] === 'Assigned').length;
            const completedCount = paymentRequestList.filter(item => item[6] === 'Completed').length;
            setPendingPaymentRequestCount(pendingCount);
            setAssignedPaymentRequestCount(assignedCount);
            setCompletedPaymentRequestCount(completedCount);
        };
    
        useEffect(() => {
            fetchData();
        }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Verified':
                return { color: 'green', backgroundColor: '#d4edda' };
            case 'Pending':
                return { color: 'orange', backgroundColor: '#fff3cd' };
            case 'Failed':
                return { color: 'red', backgroundColor: '#f8d7da' };
            default:
                return { color: 'gray', backgroundColor: '#e9ecef' };
        }
    };

    if (loading) return <p>Loading...</p>;
    if(pageIndex==1) return <PaymentDetails
     currentItem={currentItem}
    onBack={handleBack}/> ;
    return (
        <div>
            <p className='title-demo'>Payment Details</p>
            <div style={{ width: '100%', minHeight: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className='content-div-demo'>
                    <div style={{ display: 'flex' }}>
                        <div className='request-count-div'>
                            <p className='requets-count'>{paymentRequestList.length}</p>
                            <p className='request-count-type'>Total Payments</p>
                        </div>
                        <div className='request-count-div'>
                            <p className='requets-count'>{completedPaymentRequestCount}</p>
                            <p className='request-count-type'>Completed</p>
                        </div>
                        <div className='request-count-div'>
                            <p className='requets-count'>{pendingPaymentRequestCount}</p>
                            <p className='request-count-type'>Pending</p>
                        </div>
                    </div>
                </div>
                
                <div className='content-div-demo' style={{ marginTop: '20px', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyItems: 'space-around' }}>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Request ID">Request ID</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Customer Name">Customer</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Amount">Amount</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Payment Method">Method</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Status">Status</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Date">Date</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Action">Action</div>
                    </div>
                    <hr style={{ margin: '10px 20px' }} />
                    {paymentRequestList.map((payment, index) => (
                        <div key={payment[0]}>
                            <div style={{ display: 'flex', justifyItems: 'space-around' }}>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={payment[0]}>{payment[0]}</div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={payment[1]}>{payment[1]}</div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={formatAmount(payment[2])}>{formatAmount(payment[2])}</div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={payment[3]}>{payment[3]}</div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    <span 
                                        style={{ 
                                            padding: '4px 8px', 
                                            borderRadius: '4px', 
                                            fontSize: '12px',
                                            ...getStatusColor(payment[8])
                                        }}
                                        title={payment[8]}
                                    >
                                        {payment[8]}
                                    </span>
                                </div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={formatDate(payment[10])}>{formatDate(payment[10])}</div>
                                <div
                                onClick={()=>{
                            setCurrentItem(payment)
                            setPageIndex(1);
                        }}
                                 className='request-table-item' style={{ color: 'blue', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }} title="View Details">View Details</div>
                            </div>
                            {paymentRequestList.length !== index + 1 ? <hr style={{ margin: '10px 20px' }} /> : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

