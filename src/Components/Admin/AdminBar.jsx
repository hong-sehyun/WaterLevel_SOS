import React from 'react'
import { Link } from 'react-router-dom';

const AdminBar = () => {
  return (
    <nav>
    <Link to='/login'>관리자 모드 로그인</Link>
    <Link to='/register'>등록하기</Link>
    <Link to='/regiInfo'>등록된 정보</Link>
    </nav>
  )
}

export default AdminBar