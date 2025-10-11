import logo from './logo.svg';
import './App.css';
import {Login} from './components/login/login.jsx'
import {Registration} from './components/login/registration.jsx'
import {Otp} from './components/login/otp.jsx'
import {VerifyEmail} from './components/login/verify_email.jsx'
import {ResetPassword} from './components/login/reset_password.jsx'

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from './components/view/pages/agent_homepage.jsx';
import { SendOtp } from './components/login/send_otp.jsx';
import { SendResetPasswordEmail } from './components/login/send_reset_password.jsx';
import ResetToHome from './components/homepage/resetToHome.jsx';
import { ShowRequestDetails } from './components/homepage/showRequestDetailsPage.jsx';
import PaymentDetailsForm from './components/agent_homepage/payment_detail_form.jsx';



function App() {
  return (
      <Routes>
        {/* <Route path="/" element={<Homepage/>} /> */}
         <Route path="/" element={<Navigate to= "/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/submitotp/:email" element={<Otp />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/resetpassword/:email/:token" element={<ResetPassword />} />
        <Route path="/homepage" element={<Homepage/>}/>
        <Route path="/sendotp" element={<SendOtp/>}/>
        <Route path="/sendresetpassword" element={<SendResetPasswordEmail/>}/>
        <Route path="/reset_to_home" element={<ResetToHome/>}/>
        <Route path="/requestdetails/:data" element={<ShowRequestDetails/>}/>
        <Route path="/payment_request_form" element={<PaymentDetailsForm/>}/>
      </Routes>
    
  );
}

export default App;
