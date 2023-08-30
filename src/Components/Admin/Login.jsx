import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['jwtToken']);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://10.125.121.184:8080/login', {
        id,
        password
      });

      const token = resp.headers['authorization'];
      // const token = resp.data.token;

      console.log(token);

      setCookie('jwtToken', token, { path: '/' });
      navigate('/');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>관리자 모드 로그인</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          placeholder='아이디'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input 
          type='password' 
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>로그인</button>
      </form>
      <Link to='/join'>관리자 모드 회원가입</Link>
    </>
  );
}

export default Login;
