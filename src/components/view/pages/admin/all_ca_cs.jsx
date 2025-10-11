import React, { useState, useContext, useEffect } from 'react';
import '../agent_page.css'
import { AppContext } from '../../../provider.jsx'

export const AllCACS = () => {
    const { pageIndex, setPageIndex, setSelectedCaCsId } = useContext(AppContext);
    const [caList, setCaList] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sample static data based on register_ca_cs.jsx fields
    const sampleData = [
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

    useEffect(() => {
        // simulate fetch
        setCaList(sampleData);
        setLoading(false);
    }, []);

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
        // if (setSelectedCaCsId) setSelectedCaCsId(item.id);
        // setPageIndex(1);
    }

    if (loading) return <p>Loading...</p>;

    if (pageIndex == 1 && currentItem) {
        return (
            <div>
                <p className='title-demo'>CA/CS Details</p>
                <div style={{ width: '100%', minHeight: '80%', display: 'flex', justifyContent: 'center' }}>
                    <div className='content-div-demo' style={{ padding: '20px' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Name:</strong> {currentItem.name}
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Email:</strong> {currentItem.email}
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Phone:</strong> {currentItem.phone}
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Role:</strong> {currentItem.role}
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Specialization:</strong> {currentItem.specialization}
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Registration Number:</strong> {currentItem.registrationNumber}
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>Certificate:</strong> {currentItem.certificate}
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong>ID Proof:</strong> {currentItem.idProof}
                        </div>
                        <div style={{ marginTop: '20px' }} className='submit-button' onClick={() => setPageIndex(0)}>
                            Back
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <p className='title-demo'>All CA / CS</p>
            <div style={{ width: '100%', minHeight: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className='content-div-demo'>
                    <div style={{ display: 'flex' }}>
                        <div className='request-count-div'>
                            <p className='requets-count'>{caList.length}</p>
                            <p className='request-count-type'>Registered CA/CS</p>
                        </div>
                    </div>
                </div>
                <div className='content-div-demo' style={{ marginTop: '20px', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyItems: 'space-around' }}>
                        <div className='request-table-item'>Name</div>
                        <div className='request-table-item'>Email</div>
                        <div className='request-table-item'>Phone</div>
                        <div className='request-table-item'>Role</div>
                        <div className='request-table-item'>Specialization</div>
                        <div className='request-table-item'>Reg No</div>
                        <div className='request-table-item'>Action</div>
                    </div>
                    <hr style={{ margin: '10px 20px' }} />
                    {caList.map((item, index) => (
                        <div key={item.id}>
                            <div style={{ display: 'flex', justifyItems: 'space-around' }}>
                                <div className='request-table-item'>{item.name}</div>
                                <div className='request-table-item'>{item.email}</div>
                                <div className='request-table-item'>{item.phone}</div>
                                <div className='request-table-item'>{item.role}</div>
                                <div className='request-table-item'>{item.specialization}</div>
                                <div className='request-table-item'>{item.registrationNumber}</div>
                                <div onClick={() => showDetails(item)} className='request-table-item' style={{ color: 'blue' }}>View Details</div>
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
