import React from 'react'
import './footer.css';
import logo from '../../Assets/기상청로고.svg'
const Footer = () => {
  return (
    <div className='footer-div'>
      <img src={logo} alt='logo'/>
      <div className="contact">
        <div>(46241) 부산시 금정구 부산대학로63번길2 과학기술연구동 401호</div>
      </div>
    </div>
  )
}

export default Footer