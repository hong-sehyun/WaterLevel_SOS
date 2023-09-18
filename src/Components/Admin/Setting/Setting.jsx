import React from 'react'
import { MdSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'
import '../admin.css'

const Setting = () => {
  return (
    <>
      <div className='nav-main'>
        <div className='admin-nav'>
          <MdSettings /><h4>관리</h4>
        </div>
      </div>
      <div className="setting-main">
        <ul>
          <li>
            <Link to='/setting/shelterList'>대피소 목록</Link>
          </li>
          <li>
            <Link to='/setting/memberList'>알림 등록 이용자 목록</Link>
          </li>
          <li>
            <Link to='/setting/alarmList'>알림 발송 내역</Link>
          </li>

        </ul>
      </div>
    </>
  )
}

export default Setting