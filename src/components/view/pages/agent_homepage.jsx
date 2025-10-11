import React, { useState, useContext} from 'react';
import { AgentSidebar } from '../sidebar/agent_sidebar';
import { AgentAppbar } from '../appbar/agent_appbar';
import { Footer } from '../footer/footer';
import './agent_page.css'
import { SubmitRequest } from './agent/submit_request';
import { AllRequests } from './agent/all_requests';
import { RegisterCACS } from './admin/register_ca_cs';
import { UpdateRequest } from './admin/update_request';
import { AppContext } from '../../provider'
import { AllRequestsAdmin } from './admin/all_request_admin';
import { AdminSidebar } from '../sidebar/admin_sidebar';
const loginType = localStorage.getItem('loginType');




export const Homepage = () => {
    const getScreen=()=>{
        if(loginType==='Agent'){
            if(sidebarIndex === 1) return <AllRequests />
            if(sidebarIndex === 2 ) return <SubmitRequest />
        }else{
            if(sidebarIndex === 1) return <AllRequestsAdmin />
            if(sidebarIndex === 2 ) return <RegisterCACS/>
        }
    }
    const {sidebarIndex} = useContext(AppContext);
    return <div>
        <div style={{ height: '70px', width: '100%', position: 'fixed', top: '0', zIndex: '1000' }}>
            {<AgentAppbar />}</div>
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