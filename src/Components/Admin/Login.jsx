import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './admin.css'

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['jwtToken']);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(`http://${process.env.REACT_APP_API_BASE_URL}/login`, {
        id,
        password
      });

      const token = resp.headers['authorization'];
      // const token = resp.data.token;

      if (!token) {
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        return;
      }

      console.log(token);

      setCookie('jwtToken', token, { path: '/' });
      navigate('/');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='nav-main'>
        <div className='admin-nav'>
          <h4>관리자 로그인</h4>
        </div>
      </div>

      <div className="setting-main">
        <article className='login-article'>

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
        </article>
      </div>
    </>
  );
}

export default Login;
