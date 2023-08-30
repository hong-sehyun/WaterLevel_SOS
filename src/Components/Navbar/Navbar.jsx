import React from 'react';
import { Link } from 'react-router-dom';
import { MdNightShelter, MdOutlineWater } from 'react-icons/md'
import { LuNavigationOff } from 'react-icons/lu'
import './navbar.css';
function Navbar() {
  return (
    // <nav>
    //   <ul>
    //     <li><strong>하천 범람 SOS</strong></li>
    //   </ul>
    //   <ul>
    //     <li><Link to="/main1"><LuNavigationOff /> 통제(예정) 현황</Link></li>
    //     <li><Link to="/main2"><MdOutlineWater /> 수위 예측</Link></li>
    //     <li><Link to="/main3"><MdNightShelter/> 대피소</Link></li>
    //   </ul>      
    // </nav>
    <>
      <div className="nav">
      <h2 className='title'>
        <strong><Link to="/">하천 범람 SOS</Link></strong>
        </h2>
        <div className="navContainer">
          <div className='navDiv'>
            <Link to="/main1">
              <div className='navIcon'><LuNavigationOff /></div>
              <div className='navName'>
                통제(예정) 현황
              </div>
            </Link>
          </div>
          <div className='navDiv'>
            <Link to="/main2">
              <div className='navIcon'><MdOutlineWater /></div>
              <div className='navName'>
              수위 예측
              </div>
            </Link>
          </div>
          <div className='navDiv'>
            <Link to="/main3">
              <div className='navIcon'><MdNightShelter /></div>
              <div className='navName'>
              대피소
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;