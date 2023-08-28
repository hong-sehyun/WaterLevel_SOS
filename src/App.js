import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Main from './Components/Main/Main';

import Main1 from './Components/Main/Main1';
import Main2 from './Components/Main/Main2';  
import Main3 from './Components/Main/Main3';  
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/main1" element={<Main1 />} />
          <Route path="/main2" element={<Main2 />} />
          <Route path="/main3" element={<Main3 />} />
          <Route path="/" element={<Main />} />  
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
