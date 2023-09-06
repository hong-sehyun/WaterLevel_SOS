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
      {cookies.jwtToken ? (
      <li>
          <a onClick={handleLogout}>관리자 모드 로그아웃</a>
      </li>
      ) : (
        <li>
          <Link to='/login'>관리자 모드 로그인</Link>
        </li>
      )}
      {cookies.jwtToken && (
        <>
          <li>
          <Link to='/register'>등록하기</Link>          
          </li>
          <li>
          <Link to='/regilist'>등록된 정보</Link>
          </li>
        </>
      )
      
    }
    </ul>
    </nav>
  )
}

export default AdminBar