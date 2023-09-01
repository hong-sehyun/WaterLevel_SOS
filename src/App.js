import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import WebSocketComponent from './Components/Main/WebSocketComponent';
import Main from './Components/Main/Main';
import CtrlArea from './Components/Main/CtrlArea';
import WLpred from './Components/Main/WLpred';  
import Shelter from './Components/Main/Shelter';  
import Footer from './Components/Footer/Footer';
import Login from './Components/Admin/Login';

import Register from './Components/Admin/Register';
import RegiLoc from './Components/Admin/RegiLoc';

import RegiInfo from './Components/Admin/RegiInfo';
import MemberList from './Components/Admin/MemberList';


import AdminBar from './Components/Admin/AdminBar';
import Join from './Components/Admin/Join';



function App() {
  return (
    <Router>
      <>
        <AdminBar />
        <Navbar />
        <WebSocketComponent  />
        <Routes>
          <Route path="/ctrlarea" element={<CtrlArea />} />
          <Route path="/wlpred" element={<WLpred />} />
          <Route path="/shelter" element={<Shelter />} />
          <Route path="/" element={<Main />} />  
          <Route path="/login" element={<Login />} />  

          <Route path="/register" element={<Register />} />  
          <Route path="/register/location" element={<RegiLoc />} /> 

          <Route path="/regiInfo" element={<RegiInfo />} />  
          <Route path="/regiInfo/memberList" element={<MemberList />} /> 

          <Route path="/join" element={<Join />} />  
          

        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
