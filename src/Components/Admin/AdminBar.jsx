import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './admin.css';
import AOS from "aos";
import "aos/dist/aos.css";


const AdminBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwtToken']);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({duration: 1500})
  }, [])

  const handleLogout = () => {
    removeCookie('jwtToken', { path: '/' });
    navigate('/')
  }

  const toLogin = () => {
    navigate('/login');
  }

  const toRegister = () => {
    navigate('/register')
  }

  const toRegiList = () => {
    navigate('/regilist')
  }
  return (
    // <nav aria-label="breadcrumb">
    //   <ul>
    //   {cookies.jwtToken ? (
    //   <li>
    //       <a onClick={handleLogout}>관리자 모드 로그아웃</a>
    //   </li>
    //   ) : (
    //     <li>
    //       <Link to='/login'>관리자 모드 로그인</Link>
    //     </li>
    //   )}
    //   {cookies.jwtToken && (
    //     <>
    //       <li><Link to='/register'>등록하기</Link></li>
    //       <li><Link to='/regilist'>등록된 정보</Link></li>
    //     </>
    //   )

    // }
    // </ul>
    // </nav>
    <>
      <div className='adminNav' data-aos="fade-down">
        {cookies.jwtToken ? (
          <button onClick={handleLogout}>관리자 모드 로그아웃</button>
        ) : (
          <button onClick={toLogin}>관리자 모드 로그인</button>
        )}
        {cookies.jwtToken && (
          <>
            <button onClick={toRegister}>등록하기</button>
            <button onClick={toRegiList}>등록된 정보</button>
          </>
        )

        }
      </div>
    </>
  )
}

export default AdminBar