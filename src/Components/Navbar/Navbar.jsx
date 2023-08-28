import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
function Navbar() {
  return (
    <nav>
      <Link to="/main1">Main 1</Link>
      <Link to="/main2">Main 2</Link>
      <Link to="/main3">Main 3</Link>
    </nav>
  );
}

export default Navbar;