import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import Home from './components/Home';
import CreateAccount from './CreateAccount';
import SignIn from './Login';
import Register from './Register';
import ForgotUserName from './ForgotUsername';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import AddPayee from './AddPayee';
import React from 'react';
import DisplaySuccess from "./pages/TransferSuccesful";


function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
            <Route path="/createAccount" element={<CreateAccount/>}/>
            <Route path="/login" element={<SignIn/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/forgotUserName" element={<ForgotUserName/>}/>
            <Route path="/forgotPassword" element={<ForgotPassword/>}/> 
            <Route path="/success" element={<DisplaySuccess/>}/>
            <Route path="/resetpassword" element ={<ResetPassword/>}/>
            <Route path="/addpayee" element={<AddPayee/>}/> 
            <Route path="/dashboard" element={<MainLayout />}>
          {routes}
          <Route path="/dashboard/success" element={<DisplaySuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
