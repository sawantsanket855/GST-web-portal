import React, { useState, useContext, useEffect } from 'react';
import '../agent_page.css'
import { AppContext } from '../../../provider.jsx'
import { CaCsDetails } from './ca_cs_details'
import { getCaCSData } from '../../../controller/agent_data_controller.js';

export const AllCACS = () => {
    const { pageIndex, setPageIndex } = useContext(AppContext);
    const [caList, setCaList] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sample static data based on register_ca_cs.jsx fields
    var sampleData = [
        {
            id: 1,
            name: 'Amit Sharma',
            email: 'amit.sharma@example.com',
            phone: '+91-9876543210',
            role: 'CA',
            specialization: 'Taxation',
            registrationNumber: 'CA12345',
            certificate: 'amit_certificate.pdf',
            idProof: 'amit_id.pdf',
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
        },
        {
            id: 2,
            name: 'Priya Desai',
            email: 'priya.desai@example.com',
            phone: '+91-9123456780',
            role: 'CS',
            specialization: 'Corporate Compliance',
            registrationNumber: 'CS98765',
            certificate: 'priya_certificate.pdf',
            idProof: 'priya_id.pdf',
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
        },
        {
            id: 3,
            name: 'Rahul Verma',
            email: 'rahul.verma@example.com',
            phone: '+91-9988776655',
            role: 'CA',
            specialization: 'Accounting and Audit',
            registrationNumber: 'CA54321',
            certificate: 'rahul_certificate.pdf',
            idProof: 'rahul_id.pdf',
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
        },
    ];


    const fetchData = async () => {
        try {
            let result = await getCaCSData();
            console.log('result:', result)
            sampleData = [];
            for (const item of result) {
                console.log('in loop')
                sampleData.push({
                    id: item[0],
                    name: item[1],
                    email: item[4],
                    phone: item[5],
                    role: item[2],
                    specialization: item[3],
                    registrationNumber: item[6],
                    certificate: 'amit_certificate.pdf',
                    idProof: 'amit_id.pdf',
                    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
                });
            }
            setCaList(sampleData);
        } catch (err) {
            console.error("Error fetching:", err);
            setCaList(sampleData);
        } finally {
            setLoading(false);
        }

    };

    React.useEffect(() => {
        fetchData();
    }, [])


    const dateFormat = (ts) => {
        try {
            const d = new Date(ts);
            return d.toLocaleDateString();
        } catch (e) {
            return '';
        }
    }

    const showDetails = (item) => {
        setCurrentItem(item);
        setPageIndex(1);
    }

    const handleBack = () => {
        setPageIndex(0);
    }

    const handleUpdate = (updatedData) => {
        // Update the current item and list
        setCurrentItem(updatedData);
        setCaList(prev => prev.map(item =>
            item.id === updatedData.id ? updatedData : item
        ));
    }

    if (loading) return <p>Loading...</p>;

    if (pageIndex == 1 && currentItem) {
        return (
            <CaCsDetails
                currentItem={currentItem}
                onBack={handleBack}
                onUpdate={handleUpdate}
            />
        )
    }

    return (
        <div>
            <p className='title-demo'>All CA / CS</p>
            <div style={{ width: '100%', minHeight: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className='content-div-demo'>
                    <div style={{ display: 'flex' }}>
                        <div className='request-count-div' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={`Total Registered CA/CS: ${caList.length}`}>
                            <p className='requets-count' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={`Count: ${caList.length}`}>{caList.length}</p>
                            <p className='request-count-type' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Registered CA/CS">Registered CA/CS</p>
                        </div>
                    </div>
                </div>
                <div className='content-div-demo' style={{ marginTop: '20px', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyItems: 'space-around' }}>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Name">Name</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Email">Email</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Phone">Phone</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Role">Role</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Specialization">Specialization</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Registration Number">Reg No</div>
                        <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Action">Action</div>
                    </div>
                    <hr style={{ margin: '10px 20px' }} />
                    {caList.map((item, index) => (
                        <div key={item.id}>
                            <div style={{ display: 'flex', justifyItems: 'space-around' }}>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.name}>{item.name}</div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.email}>{item.email}</div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.phone}>{item.phone}</div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.role}>{item.role}</div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.specialization}>{item.specialization}</div>
                                <div className='request-table-item' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.registrationNumber}>{item.registrationNumber}</div>
                                <div onClick={() => showDetails(item)} className='request-table-item' style={{ color: 'blue', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title="Click to view full details">View Details</div>
                            </div>
                            {caList.length != index + 1 ? <hr style={{ margin: '10px 20px' }} /> : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllCACS;
