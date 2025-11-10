let server_address = 'http://127.0.0.1:8000/';
// let server_address='https://etymo-5cpb.onrender.com/';

export async function storeRequest(type, name, email, mobile, description, documents) {
    console.log('in storeRequest')
    const token = localStorage.getItem('token');
     let balance = 0;
    if (!token) {
        alert('please login');
        return
    }
    console.log(`token : ${token}`)


    try {
        const response = await fetch(`${server_address}get_agent_balance/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            }
        )
        const data = await response.json()
        if (data.result === 'success') {
            balance = data.balance
            console.log(balance)
        } else {
            alert(data.result)
            return
        }
    } catch (error) {
        console.log(error)
        alert("can't reach server")
        return
    }

    if (balance < 500) {
        alert('Request submission failed due to insufficient tokens.')
        return
    }

    let formData = new FormData()
    for (let i = 0; i < documents.length; i++) {
        formData.append('documents', documents[i]);
    }
    formData.append('type', type);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('description', description);
    formData.append('token', token);
    console.log('in storeRequest1');
    try {
        const response = await fetch(`${server_address}submit_request/`,
            {
                method: 'POST',
                body: formData,
            }
        )
        const data = await response.json();
        alert(data.message)
        return data.message
    } catch (error) {
        console.log('error')
        alert("can't reach server")
    }
}

export async function getRequestData() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('please login');
        return
    }
    try {
        const response = await fetch(`${server_address}get_request_data/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            }
        );
        const data = await response.json()
        console.log(data)
        console.log(data.result)
        if (data.message === 'success') {
            return data.result
        } else {
            alert(data.message);
            return [];

        }

    } catch (error) {
        console.log(error)
        alert('can\'t reach server');
        return [];

    }
}

export async function getRequestDocument(id) {
    try {
        const response = await fetch(`${server_address}get_request_document/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ id: id })
            }
        );
        const data = await response.json()
        console.log(data)
        if (!data.result || data.result.length === 0) {
            console.log("returning empty data")
            return []
        }
        console.log("returning data")
        return data.result

    } catch (error) {
        console.log(error)
    }
}

export async function showRequestDocument(id) {
    try {
        const response = await fetch(`${server_address}get_request_document_data/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })

            }
        );
        const blob = await response.blob();
        console.log(blob)
        const url = URL.createObjectURL(blob);
        window.open(url);
        //start
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = 'example'; // You can also dynamically set this from the response
        // document.body.appendChild(link);
        // link.click();
        //end
    } catch (error) {
        console.log(error)

    }
}

export async function downloadRequestDocument(id,name) {
    try {
        const response = await fetch(`${server_address}get_request_document_data/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })

            }
        );
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        
    } catch (error) {
        console.log(error);
        alert("error while downloading document");

    }
}

export async function downloadRequestCompletionDocument(id,name) {
    try {
        const response = await fetch(`${server_address}get_request_completion_document_data/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })

            }
        );
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        
    } catch (error) {
        console.log(error);
        alert("error while downloading document");

    }
}

export async function showPaymentRequestDocument(id) {
    console.log(`document:${id}`)
    try {
        const response = await fetch(`${server_address}get_payment_request_document_data/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })

            }
        );
        const blob = await response.blob();
        console.log(blob)
        const url = URL.createObjectURL(blob);
        window.open(url);
    } catch (error) {
        console.log(error)

    }
}


export async function storePaymentRequest(paymentMethod, name, amount, bankName, accountNumber, ifscCode, upiId, document) {
    console.log('in storePaymentRequest')
    const token = localStorage.getItem('token');
   
    if (!token) {
        alert('please login');
        return
    }
    console.log(`token : ${token}`)

    let formData = new FormData()  //paymentMethod, name, bankName, accountNumber, ifscCode, upiId, document
    for (let i = 0; i < document.length; i++) {
        formData.append('documents', document[i]);
    }
    formData.append('paymentMethod', paymentMethod);
    formData.append('name', name);
    formData.append('amount', amount);
    formData.append('bankName', bankName);
    formData.append('accountNumber', accountNumber);
    formData.append('ifscCode', ifscCode);
    formData.append('token', token);
    formData.append('upiId', upiId);
    console.log('in storeRequest1');
    try {
        const response = await fetch(`${server_address}submit_payment_request/`,
            {
                method: 'POST',
                body: formData,
            }
        )
        const data = await response.json();
        alert(data.message)
        return data.message
    } catch (error) {
        console.log('error')
        alert("can't reach server")
        return('error')
    }
}

// getPaymentRequestData

export async function getPaymentRequestData() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${server_address}get_payment_request_data/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            }
        );
        const data = await response.json()
        if(data.message==="success"){
            return data.result
        }else{
            alert(data.message)
            return [];
        }
        
    } catch (error) {
        console.log(error)
        return [];
    }
}

export async function getCaCSData() {
    console.log('in getCaCSData')
    const token = localStorage.getItem('token');
    if (!token) {
        alert('please login');
        return
    }
    console.log(token)
    try {
        const response = await fetch(`${server_address}get_ca_cs_data/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            }
        );
        const data = await response.json()
        console.log('in getCACSdata')
        console.log(data.result)
        console.log(data.message)
        if (data.message === 'success') {
            return data.result
        } else {
            alert(data.message);
            return [];

        }

    } catch (error) {
        console.log(error)
        alert('can\'t reach server');
        return [];

    }
}


export async function getCaCsDocument(id) {
    try {
        const response = await fetch(`${server_address}get_ca_cs_document/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ id: id })
            }
        );
        const data = await response.json()
        console.log(data)
        if (!data.result || data.result.length === 0) {
            console.log("returning empty data")
            return []
        }
        console.log("returning data")
        return data.result

    } catch (error) {
        console.log(error)
    }
}

export async function showCaCsDocument(id) {
    try {
        const response = await fetch(`${server_address}get_ca_cs_document_data/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })

            }
        );
        const blob = await response.blob();
        console.log(blob)
        const url = URL.createObjectURL(blob);
        window.open(url);
    } catch (error) {
        console.log(error)

    }
}

export async function getBalance() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('please login');
            return
        }
        const response = await fetch(`${server_address}get_agent_balance/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            }
        )
        const data = await response.json()
        if (data.result === 'success') {
            return data.balance
        } else {
            alert(data.result)
            return data.balance
        }
    }
    catch (error) {
        console.log(error)

    }
}


export async function getTransactionData() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${server_address}get_transaction_data/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            }
        );
        const data = await response.json()
        if(data.message==='success'){
            return data.result
        }else{
            alert(data.message);
            return [];
        }
        
    } catch (error) {
        console.log(error)
        alert('server not responding')
        return [];
    }
}




export async function completeWork(request_id, description, documents) {
    console.log('in completeWork')
    console.log(documents)
    const token = localStorage.getItem('token');
   
    let formData = new FormData()
    for (let i = 0; i < documents.length; i++) {
        formData.append('documents', documents[i]);
        console.log('document uploaded');
    }

    formData.append('description', description);
    formData.append('request_id', request_id);
    formData.append('token', token);
    console.log('in completeWork1');
    try {
        const response = await fetch(`${server_address}complete_request/`,
            {
                method: 'POST',
                body: formData,
            }
        )
        const data = await response.json();
       
        return data.message
    } catch (error) {
        console.log('error')
        
    }
}

export async function getRequestCompletionDocument(id) {
    try {
        const response = await fetch(`${server_address}get_request_completion_document/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ id: id })
            }
        );
        const data = await response.json()
        console.log(data)
        if (!data.result || data.result.length === 0) {
            console.log("returning empty data")
            return []
        }
        console.log("returning data")
        return data.result

    } catch (error) {
        console.log(error)
    }
}


export async function showRequestCompletionDocument(id) {
    try {
        const response = await fetch(`${server_address}get_request_completion_document_data/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })

            }
        );
        const blob = await response.blob();
        console.log(blob)
        const url = URL.createObjectURL(blob);
        window.open(url);
    } catch (error) {
        console.log(error)

    }
}