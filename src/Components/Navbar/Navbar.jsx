import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdNightShelter, MdOutlineWater } from 'react-icons/md'
import { LuNavigationOff } from 'react-icons/lu'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FiMenu } from 'react-icons/fi'
import './navbar.css';
import 'animate.css';

function Navbar() {

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <nav className={showModal ? 'blurred' : ''}>
        <ul>
          <li className='title'><strong><Link to="/">하천 범람 SOS</Link></strong></li>
        </ul>
        <ul className='category'>
          <li id="more-icon" onClick={() => setShowModal(true)}><FiMenu /></li>
          <li><Link to="/ctrlarea">통제(예정) 현황</Link></li>
          <li><Link to="/wlpred">수위 예측</Link></li>
          <li><Link to="/shelter">대피소</Link></li>
        </ul>
      </nav>

      {showModal && (
        <dialog className="animate__animated animate__fadeInDownBig" open>
          <article className='modalContainer'>
              <div className='linkDiv' onClick={() => setShowModal(false)}><Link to="/ctrlarea">통제(예정) 현황</Link></div>
              <div className='linkDiv' onClick={() => setShowModal(false)}><Link to="/wlpred">수위 예측</Link></div>
              <div className='linkDiv' onClick={() => setShowModal(false)}><Link to="/shelter">대피소</Link></div>
            <a onClick={() => setShowModal(false)} id='closeIcon'><AiOutlineCloseCircle /></a>
          </article>
        </dialog>
      )}
    </>
  );
}

export default Navbar;