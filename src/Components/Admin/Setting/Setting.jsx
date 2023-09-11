import React from 'react'
import { Link } from 'react-router-dom'
const Setting = () => {
  return (
    <>
    <h2>관리</h2>
    <Link to='/setting/shelterList'>대피소 목록</Link><p/>
    <Link to='/setting/memberList'>멤버 리스트</Link>
    </>
  )
}

export default Setting