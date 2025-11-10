import React, { useContext} from 'react';
import { AgentSidebar } from '../sidebar/agent_sidebar';
import { AgentAppbar } from '../appbar/agent_appbar';
import { Footer } from '../footer/footer';
import './agent_page.css'
import { SubmitRequest } from './agent/submit_request';
import { AllRequests } from './agent/all_requests';
import { PaymentRequest } from './agent/payment_request';
import { PaymentDetailsList } from './agent/payment_details_list';
import { RegisterCACS } from './admin/register_ca_cs';
import { AppContext } from '../../provider'
import { AllRequestsAdmin } from './admin/all_request_admin';
import { AllCACS } from './admin/all_ca_cs';
import { AdminSidebar } from '../sidebar/admin_sidebar';
import { PaymentDetailsVerifyList } from './admin/payment_details_list_verify';
import { AdminAppbar } from '../appbar/admin_appbar';
import { TransactionHistory } from './agent/transaction_history';
import { TransactionHistoryAdmin } from './admin/transaction_history_admin';
const loginType = localStorage.getItem('loginType');
console.log('logintype from homepage');
console.log(loginType);

export const Homepage = () => {
    const getScreen=()=>{
        if(loginType==='Agent'){
            if(sidebarIndex === 1) return <SubmitRequest />
            if(sidebarIndex === 2 ) return <AllRequests />
            if(sidebarIndex === 3 ) return <PaymentRequest />
            if(sidebarIndex === 4 ) return <PaymentDetailsList />
            if(sidebarIndex === 5 ) return <TransactionHistory/>
        }else if(loginType==='Admin'){
            if(sidebarIndex === 1) return <AllRequestsAdmin/>
            if(sidebarIndex === 2 ) return <AllCACS/>
            if(sidebarIndex === 3 ) return <RegisterCACS/>
            if(sidebarIndex === 4 ) return <PaymentDetailsVerifyList/>
            if(sidebarIndex === 5 ) return <TransactionHistoryAdmin/>
            
        }
    }
    const {sidebarIndex} = useContext(AppContext);
    return <div>
        <div style={{ height: '70px', width: '100%', position: 'fixed', top: '0', zIndex: '1000' }}>
            {loginType==='Agent' ?<AgentAppbar />:<AdminAppbar/>}</div>
        <div style={{ display: 'flex', height: '82vh' }}>
            <div style={{ width: '20%', height: '85%', minHeight: '400px', position: 'fixed', top: '70px' }}>
                {loginType==='Agent' ? <AgentSidebar /> : <AdminSidebar/>}
            </div>
            <div style={{ backgroundColor: 'rgba(246, 246, 249, 1)', width: '100%', marginTop: '70px', marginLeft: '20%' ,height:'150%'}}>
                {
                    getScreen()
                }
               
            </div>
        </div>
        <div style={{ height: '40px', position: 'fixed', bottom: '0px', width: '100%', backgroundColor: 'white' }}>
            <Footer />
        </div>
    </div>

}