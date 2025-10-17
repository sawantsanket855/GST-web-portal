import React, { useState, useContext, useEffect } from 'react';
import '../agent_page.css'
import { AppContext } from '../../../provider.jsx'
import { getPaymentRequestDocument, verifyPaymentRequest } from '../../../homepage/homepage_logic.js';
import { showPaymentRequestDocument, showRequestDocument } from '../../../controller/agent_data_controller.js';

export const PaymentDetailsVerify = ({ currentItem, onBack }) => {
    const { setPageIndex } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [documents, setDocumnets] = useState([]);
    const [status, setStatus] = useState('');
    useEffect(() => {
        setStatus(currentItem[8])
        const fetchData = async () => {
            try {
                let result = await getPaymentRequestDocument(currentItem[0]);
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
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
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };
    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            setPageIndex(0);
        }
    }

    if (!currentItem) {
        return <div>No payment data available</div>;
    }
    if (loading) return <p>Loading...</p>;
    return (
        <div>
            <p className='title-demo'>Payment Details</p>
            <div style={{ width: '100%', minHeight: '80%', display: 'flex', justifyContent: 'center' }}>
                <div className='content-div-demo' style={{ padding: '20px' }}>
                    <div style={{ borderBottom: '1px solid black', padding: '10px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '22px', fontWeight: '600' }}>Payment Information</p>
                        {status == 'Pending' ?
                            <div onClick={async() => {
                                const response=await verifyPaymentRequest(currentItem[0],'verified by admin');
                                if(response==='success'){
                                    setStatus('Verified');
                                    alert('Payment Request Verified');
                                }else{
                                    alert('Unable to verify request')
                                }
                                
                            }}
                                className='submit-button-variable'>Verify</div>
                            : <></>
                        }

                    </div>

                    {/* Row 1: Name - Role */}
                    <div style={{ display: 'flex', gap: '40px', padding: '20px 0 10px 20px' }}>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Name</p>
                            <p style={{ fontSize: '20px', fontWeight: '600' }}>{currentItem[1]}</p>

                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Payment Method</p>

                            <p style={{ fontSize: '20px', fontWeight: '600' }}>{currentItem[3]}</p>

                        </div>
                    </div>

                    {/* Row 2: Bank/UPI - Amount */}
                    <div style={{ display: 'flex', gap: '40px', padding: '20px 0 10px 20px' }}>
                        <div style={{ flex: 1 }}>
                            {currentItem[3] == 'Bank Transfer' ? <div>
                                <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Bank Name</p>
                                <p style={{ fontSize: '20px', fontWeight: '600' }}>{currentItem[4]}</p>
                            </div> :
                                <div>
                                    <p style={{ fontSize: '15px', paddingBottom: '10px' }}>UPI ID</p>
                                    <p style={{ fontSize: '20px', fontWeight: '600' }}>{currentItem[7]}</p>
                                </div>
                            }



                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Amount</p>
                            <p style={{ fontSize: '20px', fontWeight: '600' }}>{formatAmount(currentItem[2])}</p>
                        </div>
                    </div>

                    {/* Row 2: Date - Status */}
                    <div style={{ display: 'flex', gap: '40px', padding: '20px 0 10px 20px' }}>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Date</p>

                            <p style={{ fontSize: '20px', fontWeight: '600' }}>{formatDate(currentItem[10])}</p>

                        </div>
                        <div style={{ justifyContent: 'start', flex: '1' }}>
                            <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Status</p>
                            <span
                                style={{
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    ...getStatusColor(status)
                                }}
                                title={status}
                            >
                                {status}
                            </span>

                        </div>
                    </div>

                    {/* Row 3: Account - IFSC */}
                    {currentItem[3] == 'Bank Transfer' ?
                        <div style={{ display: 'flex', gap: '40px', padding: '20px 0 10px 20px' }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Account Number</p>
                                <p style={{ fontSize: '20px', fontWeight: '600' }}>{currentItem[5]}</p>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '15px', paddingBottom: '10px' }}>IFSC Code</p>
                                <p style={{ fontSize: '20px', fontWeight: '600' }}>{currentItem[6]}</p>
                            </div>
                        </div> : <></>
                    }


                    {/* Row 4: Certificate */}
                    <div style={{ padding: '20px 0 10px 20px' }}>
                        <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Certificate</p>
                        <p style={{ fontSize: '17px', fontWeight: '600' }}>{documents[0][1]}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div 
                             onClick={()=>{showPaymentRequestDocument(documents[0][0])}}
                             className='view-button' style={{ color: 'blue', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}>view</div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

