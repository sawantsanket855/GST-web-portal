import React, { useState, useContext, useEffect } from 'react';
import '../agent_page.css'
import { AppContext } from '../../../provider.jsx'
import { getPaymentRequestDocument } from '../../../homepage/homepage_logic.js';
import { showPaymentRequestDocument } from '../../../controller/agent_data_controller.js';

export const PaymentDetails = ({ currentItem, onBack }) => {
    const { setPageIndex } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [documents, setDocumnets] = useState([]);
    useEffect(() => {
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
            case 'Completed':
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
 

    if (!currentItem) {
        return <div>No payment data available</div>;
    }
    if (loading) return <p>Loading...</p>;
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', margin: '30px 50px 17px 42px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div onClick={() => { setPageIndex(0) }} className='submit-button-variable' style={{ marginRight: '30px' }}>
                    <span>🡐 back</span>
                </div>
                <p className='title-demo' style={{ margin: '0' }}>Payment Details</p>
            </div>
            {/* {requestData[6] === "Under Review" ? <div className='submit-button-variable' style={{ marginRight: '30px' }}>Cancel Request</div> : <></>} */}

        </div>
            
            <div style={{ width: '100%', minHeight: '80%', display: 'flex', justifyContent: 'center' }}>
                <div className='content-div-demo' style={{ padding: '20px' }}>
                    <div style={{ borderBottom: '1px solid black', padding: '10px 20px', marginBottom: '20px' }}>
                        <p style={{ fontSize: '22px', fontWeight: '600' }}>Payment Information</p>

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
                                    ...getStatusColor(currentItem[8])
                                }}
                                title={currentItem[8]}
                            >
                                {currentItem[8]}
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
    

                    {/* Row 4: Document */}
                    <div style={{ padding: '20px 0 10px 20px' }}>
                        <p style={{ fontSize: '15px', paddingBottom: '10px' }}>document</p>
                        <p style={{ fontSize: '17px', fontWeight: '600' }}>{documents[0][1]}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div 
                            onClick={()=>{
                                showPaymentRequestDocument(documents[0][0])
                            }}
                            className='view-button' style={{ color: 'blue', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}>view</div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

