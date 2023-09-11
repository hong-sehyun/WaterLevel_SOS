import React from 'react'
import { Link } from 'react-router-dom';

const RegiList = () => {
  return (
    <>
    <h2>등록된 정보</h2>
    <Link to='/regilist/memberList'>멤버 리스트</Link>
    <Link to="/regilist/shelterList">대피소 리스트</Link>
    </>
  )
}

export default RegiList