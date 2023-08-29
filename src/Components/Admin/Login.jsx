import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
    <h2>관리자 모드 로그인</h2>
    <input type='text' placeholder='아이디'></input>
    <input type='text' placeholder='비밀번호'></input>
    <button>로그인</button>
    <Link to='/join'>관리자 모드 회원가입</Link>
    </>

  )
}

export default Login