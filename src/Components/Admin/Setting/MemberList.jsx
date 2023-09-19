import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'

const MemberList = () => {
  const [contactList, setContactList] = useState([]);
  const [cookies] = useCookies(['jwtToken']);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const resp = await axios.get('http://10.125.121.184:8080/contact/list', {
          headers: {
            'Authorization': cookies.jwtToken
          }
        });
        setContactList(resp.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, [cookies.jwtToken]);



  const handleDelete = async (idmember) => {
    const userConfirmed = window.confirm('정말로 삭제하시겠습니까?');

    if (!userConfirmed) {
      return;
    }
    try {
      const resp = await axios.delete(`http://10.125.121.184:8080/contact/${idmember}`, {
        headers: {
          'Authorization': cookies.jwtToken
        }
      })
      setContactList(prevContacts => prevContacts.filter(contact => contact.idmember !== idmember));

    } catch (error) {
      console.error(error);
    }

  }

  return (
    <>
      <div className='nav-main'>
        <div className='admin-nav'>
          <h4>알림 등록 이용자 목록</h4>
        </div>
      </div>
      <div className="setting-main">
        <table>
          <tr>
            <th>#</th>
            <th>이름</th>
            <th>전화번호</th>
            <th></th>
          </tr>

          {contactList.map((contact, index) => (
            <tr key={index}>
              <td>{contact.idmember}</td>
              <td>{contact.name}</td>
              <td>{contact.contact}</td>
              <td><a onClick={() => handleDelete(contact.idmember)}>삭제</a></td>

            </tr>
          ))}
        </table>
        <div className='listLink'>
          <Link to='/setting'>목록으로</Link>
        </div>

      </div>
    </>
  )
}

export default MemberList