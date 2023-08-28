import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/main1">Main 1</Link>
      <Link to="/main2">Main 2</Link>  {/* Add these lines */}
      <Link to="/main3">Main 3</Link>  {/* Add these lines */}
    </nav>
  );
}

export default Navbar;