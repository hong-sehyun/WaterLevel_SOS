import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Main from './Components/Main/Main';
import CtrlArea from './Components/Main/CtrlArea';
import WLpred from './Components/Main/WLpred';  
import Shelter from './Components/Main/Shelter';  
import Footer from './Components/Footer/Footer';
import Login from './Components/Admin/Login';

import Register from './Components/Admin/Setting/Register';
import RegiLoc from './Components/Admin/Setting/RegiLoc';
import RegiList from './Components/Admin/Setting/RegiList';
import MemberList from './Components/Admin/Setting/MemberList';
import ShelterList from './Components/Admin/Setting/ShelterList';
import Setting from './Components/Admin/Setting/Setting';
import RegiShelter from './Components/Admin/Setting/RegiShelter';


import Join from './Components/Admin/Join';



function App() {
  return (
    
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/ctrlarea" element={<CtrlArea />} />
          <Route path="/wlpred" element={<WLpred />} />
          <Route path="/shelter" element={<Shelter />} />
          <Route path="/" element={<Main />} />  
          <Route path="/login" element={<Login />} />  

          <Route path="/register" element={<Register />} />  
          <Route path="/register/location" element={<RegiLoc />} /> 

          {/* <Route path="/regilist" element={<RegiList />} />  
          <Route path="/regilist/memberList" element={<MemberList />} /> 
          <Route path="/regilist/shelterList" element={<ShelterList />} />  */}


          <Route path='/setting' element={<Setting/>} />
          <Route path="/setting/memberList" element={<MemberList />} /> 
          <Route path="/setting/shelterList" element={<ShelterList />} /> 
          <Route path="/setting/regiShelter" element={<RegiShelter />} /> 


          <Route path="/join" element={<Join />} />  
          

        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
