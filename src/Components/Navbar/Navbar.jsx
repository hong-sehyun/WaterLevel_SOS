import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdSettings } from 'react-icons/md'
import { BiLogOut, BiLogIn } from 'react-icons/bi'
import { LuNavigationOff } from 'react-icons/lu'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { IoIosHelpBuoy } from 'react-icons/io'
import { FiMenu } from 'react-icons/fi'
import './navbar.css';
import 'animate.css';
import { useCookies } from 'react-cookie';


function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(['jwtToken']);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showAdminMode, setShowAdminMode] = useState(false);

  const handleLogout = () => {
    removeCookie('jwtToken', { path: '/' });
    navigate('/')
  }

  return (
    <>
      <nav className={showModal ? 'blurred' : 'navContainer'}>
        <ul>
          <li className='title'><strong><Link to="/">하천 범람 SOS</Link></strong> </li>
        </ul>
        <ul className='category'>
          <li id="more-icon" onClick={() => setShowModal(true)}><FiMenu /></li>
          <div className='c'>
            {/* <li><a href='#section2' data-replace="소개"><span>소개</span></a></li> */}
            <li><Link to="/ctrlarea" data-replace="통제(예정) 현황"><span>통제(예정) 현황</span></Link></li>
            <li><Link to="/wlpred" data-replace="수위 예측"><span>수위 예측</span></Link></li>
            <li><Link to="/shelter" data-replace="대피소"><span>대피소</span></Link></li>
          </div>
          <li>
            <details role="list" dir="rtl">
              <summary aria-haspopup="listbox" >관리자모드</summary>
              <ul role="listbox">
                {cookies.jwtToken ? (
                  <li onClick={handleLogout}><a>로그아웃 <BiLogOut /></a></li>
                ) : (
                  <li><Link to='/login'>로그인 <BiLogIn /></Link></li>
                )}
                {cookies.jwtToken && (
                  <>
                    <li><Link to='/setting'>관리 <MdSettings /></Link></li>
                    {/* <li><Link to='/register'>등록하기</Link></li> */}
                    {/* <li><Link to='/regilist'>등록된 정보</Link></li> */}
                  </>
                )}
              </ul>
            </details>
          </li>
        </ul>
      </nav>

      {showModal && (
        <dialog className="animate__animated animate__fadeInDownBig" open>
          <article className='modalContainer'>
            <div className='linkDiv' onClick={() => { setShowAdminMode(!showAdminMode); setShowModal(false); }}><Link to="/ctrlarea">통제(예정) 현황</Link></div>
            <div className='linkDiv' onClick={() => setShowModal(false)}><Link to="/wlpred">수위 예측</Link></div>
            <div className='linkDiv' onClick={() => setShowModal(false)}><Link to="/shelter">대피소</Link></div>
            <div className='linkDiv' onClick={() => setShowAdminMode(!showAdminMode)}> <a>관리자 모드</a></div>
            {showAdminMode && (
              <>
                {cookies.jwtToken ? (

                  <div className='linkDiv1' onClick={() => { handleLogout(); setShowAdminMode(!showAdminMode); setShowModal(false); }}><a><BiLogOut /> 로그아웃</a></div>
                ) : (

                  <div className='linkDiv1' onClick={() => { setShowAdminMode(!showAdminMode); setShowModal(false); }}><Link to='/login'>로그인</Link></div>
                )}
                {cookies.jwtToken && (
                  <>
                    <div className='linkDiv1' onClick={() => { setShowAdminMode(!showAdminMode); setShowModal(false); }}><Link to='/setting'><MdSettings /> 관리</Link></div>

                    {/* <div className='linkDiv1' onClick={() => { setShowAdminMode(!showAdminMode); setShowModal(false); }}><Link to='/register'>등록하기</Link></div>
                    <div className='linkDiv1' onClick={() => { setShowAdminMode(!showAdminMode); setShowModal(false); }}><Link to='/regilist'>등록된 정보</Link></div> */}
                  </>

                )}
              </>

            )}

            {/* <details className='linkDiv1'>
              <summary className='linkDiv1'>Accordion 1</summary>
              <div className='linkDiv'>…</div>
              <div className='linkDiv'>…</div>
            </details> */}

            <a onClick={() => { setShowAdminMode(!showAdminMode); setShowModal(false); }} id='closeIcon'><AiOutlineCloseCircle /></a>
          </article>
        </dialog>
      )}
    </>
  );
}

export default Navbar;