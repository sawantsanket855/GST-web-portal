import React, { useState, useContext } from 'react';
import '../agent_page.css'
import { AppContext } from '../../../provider.jsx'
import { getCaCsDocument, showCaCsDocument } from '../../../controller/agent_data_controller.js';

export const CaCsDetails = ({ currentItem, onBack, onUpdate }) => {
    const { setPageIndex } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [documents, setDocumnets] = useState([]);     
    const [loading, setLoading] = useState(true);
            React.useEffect(() => {
                const fetchData = async () => {
                    try {
                        let result = await getCaCsDocument(currentItem.id);
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

    // Initialize edited data when currentItem changes
    // React.useEffect(() => {
    //     if (currentItem) {
    //         setEditedData({ ...currentItem });
    //         setIsEditing(false);
    //     }
    // }, [currentItem]);

    // const handleEdit = () => {
    //     setIsEditing(true);
    // }

    const handleInputChange = (field, value) => {
        setEditedData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const handleUpdate = () => {
        // Collect all data in map format
        const updatedDataMap = new Map();
        Object.keys(editedData).forEach(key => {
            updatedDataMap.set(key, editedData[key]);
        });
        
        console.log('Updated CA/CS Data Map:', updatedDataMap);
        console.log('Updated CA/CS Data Object:', editedData);
        
        // Call the parent's update function if provided
        if (onUpdate) {
            onUpdate(editedData);
        }
        
        setIsEditing(false);
        alert('CA/CS data updated successfully!');
    }

    const handleCancel = () => {
        setEditedData({ ...currentItem });
        setIsEditing(false);
    }

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            setPageIndex(0);
        }
    }

    if (!currentItem) {
        return <div>No CA/CS data available</div>;
    }

    return (
        <div>
            <p className='title-demo'>CA/CS Details</p>
            <div style={{ width: '100%', minHeight: '80%', display: 'flex', justifyContent: 'center' }}>
                <div className='content-div-demo' style={{ padding: '20px' }}>
                    <div style={{ borderBottom: '1px solid black', padding: '10px 20px', marginBottom: '20px' }}>
                        <p style={{ fontSize: '22px', fontWeight: '600' }}>CA/CS Information</p>
                    </div>
                    
                    {/* Row 1: Name - Role */}
                    <div style={{ display: 'flex', gap: '40px', padding: '20px 0 10px 20px' }}>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Name</p>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={editedData.name || ''} 
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    style={{ fontSize: '20px', fontWeight: '600', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            ) : (
                                <p style={{ fontSize: '20px', fontWeight: '600' }}>{currentItem.name}</p>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Role</p>
                            {isEditing ? (
                                <select 
                                    value={editedData.role || ''} 
                                    onChange={(e) => handleInputChange('role', e.target.value)}
                                    style={{ fontSize: '20px', fontWeight: '600', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                                >
                                    <option value="CA">CA</option>
                                    <option value="CS">CS</option>
                                </select>
                            ) : (
                                <p style={{ fontSize: '20px', fontWeight: '600' }}>{currentItem.role}</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Row 2: Email - Phone */}
                    <div style={{ display: 'flex', gap: '40px', padding: '20px 0 10px 20px' }}>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Email</p>
                            {isEditing ? (
                                <input 
                                    type="email" 
                                    value={editedData.email || ''} 
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    style={{ fontSize: '20px', fontWeight: '600', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            ) : (
                                <p style={{ fontSize: '20px', fontWeight: '600' }}>{currentItem.email}</p>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Phone</p>
                            {isEditing ? (
                                <input 
                                    type="tel" 
                                    value={editedData.phone || ''} 
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    style={{ fontSize: '20px', fontWeight: '600', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            ) : (
                                <p style={{ fontSize: '20px', fontWeight: '600' }}>{currentItem.phone}</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Row 3: Specialization - Registration Number */}
                    <div style={{ display: 'flex', gap: '40px', padding: '20px 0 10px 20px' }}>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Specialization</p>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={editedData.specialization || ''} 
                                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                                    style={{ fontSize: '20px', fontWeight: '600', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            ) : (
                                <p style={{ fontSize: '20px', fontWeight: '600' }}>{currentItem.specialization}</p>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Registration Number</p>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={editedData.registrationNumber || ''} 
                                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                                    style={{ fontSize: '20px', fontWeight: '600', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            ) : (
                                <p style={{ fontSize: '20px', fontWeight: '600' }}>{currentItem.registrationNumber}</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Row 4: Certificate */}
                    <div style={{ padding: '20px 0 10px 20px' }}>
                        <p style={{ fontSize: '15px', paddingBottom: '10px' }}>Certificate</p>
                        {isEditing ? (
                            // <input 
                            //     type="text" 
                            //     value={editedData.certificate || ''} 
                            //     onChange={(e) => handleInputChange('certificate', e.target.value)}
                            //     style={{ fontSize: '20px', fontWeight: '600', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            // />
                            <input
                                style={{ height: '25px', marginBottom: '5px', }}
                                onChange={(e) => {
                                    console.log('in on change');
                                    const maxFileSize = 5 * 1024 * 1024;
                                    for (let file of e.target.files) {
                                        if (file.size > maxFileSize) {
                                            alert(`File "${file.name}" is too large. Max size is 5 MB.`);
                                            document.getElementById("certificate").value = "";
                                            return
                                        }
                                    }
                                    handleInputChange('certificate', e.target.value)
                                }
                                } type="file" id='certificate' />
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <p style={{ fontSize: '20px', fontWeight: '600' }}>{documents.length>0? documents[0][1]:'none'}</p>
                                <div className='view-button' style={{ color: 'blue', cursor: 'pointer', fontSize: '16px' }}
                                onClick={()=>{
                                    if(documents.length>0){
                                        showCaCsDocument(documents[0][0])
                                    }
                                }
                                }
                                >view</div>
                            </div>
                        )}
                    </div>
                    
                    {/* Row 5: ID Proof */}
                    <div style={{ padding: '20px 0 10px 20px' }}>
                        <p style={{ fontSize: '15px', paddingBottom: '10px' }}>ID Proof</p>
                        {isEditing ? (
                            // <input 
                            //     type="text" 
                            //     value={editedData.idProof || ''} 
                            //     onChange={(e) => handleInputChange('idProof', e.target.value)}
                            //     style={{ fontSize: '20px', fontWeight: '600', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            // />
                            <input
                                style={{ height: '25px', marginBottom: '5px', }}
                                onChange={(e) => {
                                    console.log('in on change');
                                    const maxFileSize = 5 * 1024 * 1024;
                                    for (let file of e.target.files) {
                                        if (file.size > maxFileSize) {
                                            alert(`File "${file.name}" is too large. Max size is 5 MB.`);
                                            document.getElementById("idProof").value = "";
                                            return
                                        }
                                    }
                                    handleInputChange('idProof', e.target.value)
                                }


                                } type="file" id='idProof' />
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <p style={{ fontSize: '20px', fontWeight: '600' }}>{documents.length>0?documents[1][1]:0}</p>
                                <div className='view-button' style={{ color: 'blue', cursor: 'pointer', fontSize: '16px' }}
                                onClick={()=>{
                                    if(documents.length>0){
                                        showCaCsDocument(documents[1][0])
                                    }
                                }
                                    
                                }
                                >view</div>
                            </div>
                        )}
                    </div>
                    
                    <div style={{ marginTop: '30px', display: 'flex', gap: '10px', padding: '20px' }}>
                        {!isEditing ? (
                            <>
                                {/* <div className='submit-button' onClick={handleEdit} style={{ fontSize: '14px', padding: '8px 16px' }}>
                                    Edit
                                </div> */}
                                <div className='submit-button' onClick={handleBack} style={{ fontSize: '14px', padding: '8px 16px' }}>
                                    Back
                                </div>
                            </>
                        ) : (
                            <>
                                {/* <div className='submit-button' onClick={handleUpdate} style={{ fontSize: '14px', padding: '8px 16px', backgroundColor: '#28a745' }}>
                                    Update
                                </div> */}
                                <div className='submit-button' onClick={handleCancel} style={{ fontSize: '14px', padding: '8px 16px', backgroundColor: '#dc3545' }}>
                                    Cancel
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaCsDetails;
