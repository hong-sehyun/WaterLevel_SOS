import React from 'react'
import './footer.css';
import logo from '../../Assets/기상청로고.svg'
const Footer = () => {
  return (
    <div className='footer-div'>
      <img src={logo} alt='logo'/>
      <div className="contact">
        <div>(46241) 부산시 금정구 부산대학로63번길2 과학기술연구동 401호</div>
        {/* <a href='https://elastic-game-f85.notion.site/f2dc1ffe37f64470b9ee28c620044968'><img src={notionIcon}/> 팀노션</a> */}
      </div>
    </div>
  )
}

export default Footer