import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import WebSocketComponent from './Components/Main/WebSocketComponent';
import Main from './Components/Main/Main';
import Main1 from './Components/Main/Main1';
import Main2 from './Components/Main/Main2';  
import Main3 from './Components/Main/Main3';  
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
          <Route path="/main1" element={<Main1 />} />
          <Route path="/main2" element={<Main2 />} />
          <Route path="/main3" element={<Main3 />} />
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
