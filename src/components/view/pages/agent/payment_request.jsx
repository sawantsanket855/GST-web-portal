import React, { useState ,useContext} from 'react';
import '../agent_page.css'
import CancleSvg from '../../../assets/cancle.svg'
import { storePaymentRequest } from '../../../controller/agent_data_controller';
import { AppContext } from '../../../provider'
export const PaymentRequest = () => {
    const {setSidebarIndex ,p_getBalance} = useContext(AppContext);
    const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
    const [amount,setAmount]=useState('');
    const [name, setName] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [upiId, setUpiId] = useState('');
    const [document, setDocument] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading]=useState(false);

    function isAlphabetWithSpace(str) {
        return /^[A-Za-z\s]+$/.test(str);
    }

    function validateIFSC(str) {
        return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(str);
    }

    function validateAccountNumber(str) {
        return /^\d{9,18}$/.test(str);
    }

    function validateUPI(str) {
        if (str === '') return true; // UPI is optional
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{1,}$/.test(str);
    }

    async function validate_payment_data() {
        if (name === '') {
            alert('Fill the name');
            return;
        }
        if (!isAlphabetWithSpace(name)) {
            alert('Enter valid name');
            return;
        }
        if (amount === '') {
            alert('Fill amount');
            return;
        }

        if (paymentMethod === 'Bank Transfer') {
            if (bankName === '' || accountNumber === '' || ifscCode === '') {
                alert('Fill all bank transfer details');
                return;
            }
            if (!isAlphabetWithSpace(bankName)) {
                alert('Enter valid bank name');
                return;
            }
            if (!validateAccountNumber(accountNumber)) {
                alert('Enter valid account number (9-18 digits)');
                return;
            }
            if (!validateIFSC(ifscCode)) {
                alert('Enter valid IFSC code');
                return;
            }
        } else if (paymentMethod === 'UPI') {
            if (upiId === '') {
                alert('Enter UPI ID');
                return;
            }
            if (!validateUPI(upiId)) {
                alert('Enter valid UPI ID');
                return;
            }
        }

        if (document.length === 0) {
            alert('Please upload a document');
            return;
        }
        setLoading(true)
        const result=await storePaymentRequest(paymentMethod, name,amount, bankName, accountNumber, ifscCode, upiId, document)
        console.log('Payment details submitted:', {paymentMethod, name, bankName, accountNumber, ifscCode, upiId, document });
        console.log(result)
        if(result==='submitted'){
            setSubmitted(true);
            setSidebarIndex(4)
            p_getBalance();
            clear();
        }
        setLoading(false)
        
    }

    function clear() {
        setPaymentMethod('Bank Transfer');
        setName('');
        setBankName('');
        setAccountNumber('');
        setIfscCode('');
        setUpiId('');
        setDocument([]);
        setAmount('');
    }

    return <div>
        <p className='title-demo'>Payment Request</p>
        <div style={{ width: '100%', minHeight: '80%', display: 'flex', justifyContent: 'center' }}>
            <div className='content-div-demo'>
                <div style={{ marginTop: '57px', marginLeft: '28px' }}>
                    <p className='form-header-demo'>Payment Information</p>
                    {submitted ? (
                        <div style={{ color: 'green', fontSize: '18px', marginBottom: '20px' }}>
                            Payment details submitted successfully!
                        </div>
                    ) : null}
                    
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Payment Method</span>
                        <select 
                            className='input-box-demo' 
                            style={{ width: '410px' }} 
                            value={paymentMethod} 
                            onChange={(e) => { setPaymentMethod(e.target.value) }}
                        >
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="UPI">UPI</option>
                        </select>
                    </div>
                    
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Full Name</span>
                        <input 
                            className='input-box-demo' 
                            type='text' 
                            value={name} 
                            onChange={(e) => { setName(e.target.value) }}
                            placeholder="Enter account holder name"
                        />
                    </div>
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Amount (INR)</span>
                        <input 
                            className='input-box-demo' 
                            type='number' 
                            value={amount} 
                            onChange={(e) => { setAmount(e.target.value) }}
                            placeholder="Enter Amount (INR)"
                        />
                    </div>
                    
                    {paymentMethod === 'Bank Transfer' && (
                        <>
                            <div className='input-div-demo'>
                                <span className='input-label-demo'>Bank Name</span>
                                <input 
                                    className='input-box-demo' 
                                    type='text' 
                                    value={bankName} 
                                    onChange={(e) => { setBankName(e.target.value) }}
                                    placeholder="Enter bank name"
                                />
                            </div>
                            
                            <div className='input-div-demo'>
                                <span className='input-label-demo'>Account Number</span>
                                <input 
                                    className='input-box-demo' 
                                    type='number' 
                                    value={accountNumber} 
                                    onChange={(e) => {
                                        if (e.target.value.length <= 18) {
                                            setAccountNumber(e.target.value);
                                        }
                                    }}
                                    placeholder="Enter account number"
                                />
                            </div>
                            
                            <div className='input-div-demo'>
                                <span className='input-label-demo'>IFSC Code</span>
                                <input 
                                    className='input-box-demo' 
                                    type='text' 
                                    value={ifscCode} 
                                    onChange={(e) => { setIfscCode(e.target.value.toUpperCase()) }}
                                    placeholder="Enter IFSC code"
                                    style={{ textTransform: 'uppercase' }}
                                />
                            </div>
                        </>
                    )}
                    
                    {paymentMethod === 'UPI' && (
                        <div className='input-div-demo'>
                            <span className='input-label-demo'>UPI ID</span>
                            <input 
                                className='input-box-demo' 
                                type='text' 
                                value={upiId} 
                                onChange={(e) => { setUpiId(e.target.value) }}
                                placeholder="example@upi"
                            />
                        </div>
                    )}
                    
                    <div className='input-div-demo'>
                        <span className='input-label-demo'>Upload Document</span>
                        <div className='input-file-box-demo' style={{ border: 'none' }}>
                            <label
                                htmlFor="paymentDocument"
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    padding: "2px 16px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    
                                }}
                            >
                                Select File
                            </label>
                            <input
                                style={{ height: '25px', marginBottom: '5px', display:'none'}}
                                onChange={(e) => {
                                    console.log('in on change');
                                    const maxFileSize = 5 * 1024 * 1024;
                                    for (let file of e.target.files) {
                                        if (file.size > maxFileSize) {
                                            alert(`File "${file.name}" is too large. Max size is 5 MB.`);
                                            document.getElementById("paymentDocument").value = "";
                                            return
                                        }
                                    }
                                    setDocument(e.target.files)
                                }
                                } type="file" id='paymentDocument' />
                            <div style={{ display: 'flex',marginTop:'10px'  }}>
                                {
                                    document.length == 0 ? <span>No file selected</span> :
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: '70px', overflow: 'clip', height: '20px' }}>
                                                {document[0].name}
                                            </div>
                                            <img
                                                onClick={() => {
                                                    setDocument([]);
                                                    // document.getElementById("paymentDocument").value = "";
                                                }}
                                                style={{ height: '20px', marginRight: '15px', cursor: 'pointer' }}
                                                src={CancleSvg} alt="Remove file" />
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    
                    <div className='input-div-demo'>
                        <div className='submit-button' onClick={
                            validate_payment_data
                            }>
                            {loading?<div className='loader'></div>:<span>Submit Payment Details</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
