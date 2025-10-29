

// let server_address = 'http://127.0.0.1:8000/';
let server_address='https://etymo-5cpb.onrender.com/';


// export async function storeRequest(type, name, email, mobile, description, documents) {
//     console.log('in storeRequest')
//     const token=localStorage.getItem('token');
//     if(!token){
//         alert('please login');
//         return
//     }
//     console.log(`token : ${token}`)
//     let formData = new FormData()
//     for (let i = 0; i < documents.length; i++) {
//         formData.append('documents', documents[i]);
//     }
//     formData.append('type', type);
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('mobile', mobile);
//     formData.append('description', description);
//     formData.append('token', token);
//     console.log('in storeRequest1');
//     try {
//         const response = await fetch(`${server_address}submit_request/`,
//             {
//                 method: 'POST',
//                 body: formData,
//             }
//         )
//         const data=await response.json();
//         alert(data.message)
//         return data.message
//     } catch (error) {
//         console.log('error')
//         alert("can't reach server")

//     }

// }

export async function getRequestDocument(id) {
    try {
        // console.log('in getRequestDocument')
        console.log('id in getRequestDocument:', id)
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
        if(!data.result || data.result.length==0){
            console.log("returning empty data")
           return []
        }
        console.log("returning data")
         return data.result
        
    } catch (error) {
        console.log(error)
    }
}

export async function getRequestData() {
    try {
        const response = await fetch(`${server_address}get_request_data/`,
            { method: 'POST' }
        );
        const data = await response.json()
        console.log(data)
        console.log(data.result)
        return data.result
    } catch (error) {
        console.log(error)
    }
}

export async function getVerifiedRequestData() {
    try {
        const response = await fetch(`${server_address}get_verified_request_data/`,
            { method: 'POST' }
        );
        const data = await response.json()
        console.log(data)
        console.log(data.result)
        return data.result
    } catch (error) {
        console.log(error)
    }
}



export async function showRequestDocument1(id) {
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
        // start
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = filename; // You can also dynamically set this from the response
        // document.body.appendChild(link);
        // link.click();
        // end
    } catch (error) {
        console.log(error)

    }
}

export async function storeCaCsDetails(name,specialization,role,email,mobile,regNumber,workingDays,certificate,IdProof) {
    console.log('in storeCaCsDetails')
    let formData = new FormData()
    formData.append('name', name);
    formData.append('specialization', specialization);
    formData.append('role', role);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('regNumber', regNumber);
    formData.append('workingDays', workingDays);
    formData.append('certificate', certificate);
    formData.append('IdProof', IdProof);
    console.log('in storeCaCsDetails')
    try {
        const response = await fetch(`${server_address}submit_ca_cs_details/`,
            {
                method: 'POST',
                body: formData,
            }

        )
        const data = await response.json()
        console.log(`success ${data.message}`)
        alert(data.message)
        if(data.message==='submitted'){
            return 'success';
        }
    } catch (error) {
        alert("can't reach to server");
        console.log('error',error)
    }

}

export async function updateRequestStatus(requestID,requestStatus,requestInstruction){
    try{
        const respose= await fetch(`${server_address}update_request_status/`,
            {
                headers:{
                    'Content-Type':'application/json'
                },
                method:'POST',
                body: JSON.stringify({requestID:requestID,requestStatus:requestStatus,requestInstruction:requestInstruction})

            }
        )
        const data=await respose.json()
        console.log(data)
    }catch(error){
        console.log(error)
    }
}


// export async function getCaCsData(){
//     try {
//         const response = await fetch(`${server_address}get_ca_cs_data/`,
//             { method: 'POST' }
//         );
//         const data = await response.json()
//         console.log(data)
//         console.log(data.result)
//         return data.result
//     } catch (error) {
//         console.log(error)
//     }
// }

export async function assignCaCs(caCsId,requestId){
    try{
        const response= await fetch(`${server_address}assign_ca_cs/`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(
                    {
                        ca_cs_id : caCsId,
                        request_id : requestId,
                    }
                )
            }
        )
        const data=await response.json()
        console.log(`result in asssignCaCs ${data.result}`)
        return data.result
    }
    catch(e){
        console.log(`error in asssignCaCs ${e}`)
        return 'unable fetch server'
    }
}


export async function getPaymentRequestDocument(id) {
    try {
        // console.log('in getRequestDocument')
        console.log('id in getPaymentRequestDocument:', id)
        const response = await fetch(`${server_address}get_payment_request_document/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ id: id })
            }
        );
        const data = await response.json()
        if(!data.result || data.result.length==0){
            console.log("returning empty data")
           return []
        }
        console.log("returning data")
         return data.result
        
    } catch (error) {
        console.log(error)
    }
}


export async function verifyPaymentRequest(paymentRequestID,requestInstruction){
    try{
        const respose= await fetch(`${server_address}verifyPaymentRequest/`,
            {
                headers:{
                    'Content-Type':'application/json'
                },
                method:'POST',
                body: JSON.stringify({paymentRequestID:paymentRequestID,requestInstruction:requestInstruction})

            }
        )
        const data=await respose.json()
        console.log(data.message)
        return data.message
    }catch(error){
        console.log(error)
        return 'error'
    }
}