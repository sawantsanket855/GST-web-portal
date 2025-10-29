import React, { useState, useEffect} from 'react';
import '../agent_page.css'
import {getTransactionData } from '../../../controller/agent_data_controller';



export const TransactionHistory = () => {
    const [transactionList, setTransactionList] = useState([]);

    const fetchData = async () => {
        try {
            let result = await getTransactionData();
            setTransactionList(result);
            console.log('result:', result)
        } catch (err) {
            console.error("Error fetching:", err);
        } 
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
            case 'credit':
                return { color: 'green', backgroundColor: '#d4edda' };
            case 'debit':
                return { color: 'orange', backgroundColor: '#fff3cd' };
            // case 'Failed':
            //     return { color: 'red', backgroundColor: '#f8d7da' };
            default:
                return { color: 'gray', backgroundColor: '#e9ecef' };
        }
    };


    return (
        <div>
            <p className='title-demo'>Payment Details</p>
            <div style={{ width: '100%', minHeight: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className='content-div-demo' style={{ marginTop: '20px', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyItems: 'space-around' }}>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Transaction ID">Transaction ID</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Purpose">Purpose</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Amount">Amount</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Transaction Type">Type</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Payment/Request ID">Payment/Request ID</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Date">Date</div>
                    </div>
                    <hr style={{ margin: '10px 20px' }} />
                    {transactionList.map((payment, index) => (
                        <div key={payment[0]}>
                            <div style={{ display: 'flex', justifyItems: 'space-around' }}>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={payment[0]}>{payment[0]}</div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={payment[4]}>{payment[4]}</div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={formatAmount(payment[1])}>{formatAmount(payment[1])}</div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    <span
                                        style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            ...getStatusColor(payment[2])
                                        }}
                                        title={payment[2]}
                                    >
                                        {payment[2]}
                                    </span>
                                </div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={payment[5]}>{payment[5]}</div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={formatDate(payment[6])}>{formatDate(payment[6])}</div>

                            </div>
                            {transactionList.length !== index + 1 ? <hr style={{ margin: '10px 20px' }} /> : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

