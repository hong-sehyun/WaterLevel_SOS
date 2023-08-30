import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AdminBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwtToken']);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('jwtToken', { path: '/' });
    navigate('/')
  }

  return (
    <nav aria-label="breadcrumb">
      <ul>
      <li>
      {cookies.jwtToken ? (
          <a onClick={handleLogout}>관리자 모드 로그아웃</a>
      ) : (
        <Link to='/login'>관리자 모드 로그인</Link>
      )}
      </li>
      </ul>
      {cookies.jwtToken && (
        <>
          <Link to='/register'>등록하기</Link>
          <Link to='/regiInfo'>등록된 정보</Link>
        </>
      )

      }
    </nav>
  )
}

export default AdminBar