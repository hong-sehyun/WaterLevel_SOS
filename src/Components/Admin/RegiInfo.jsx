import React from 'react'
import { Link } from 'react-router-dom';

const RegiInfo = () => {
  return (
    <>
    <h2>등록된 정보</h2>
    <Link to='/regiInfo/memberList'>멤버 리스트</Link>
    </>
  )
}

export default RegiInfo