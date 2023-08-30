import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

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



  const handleDelete = async (idcontact) => {
    const userConfirmed = window.confirm('정말로 삭제하시겠습니까?');

    if (!userConfirmed) {
        return; 
    }
    try {
      const resp = await axios.delete(`http://10.125.121.184:8080/contact/${idcontact}`, {
        headers: {
          'Authorization': cookies.jwtToken
        }
      })
      setContactList(prevContacts => prevContacts.filter(contact => contact.idcontact !== idcontact));

    } catch (error) {
      console.error(error);
    }

  }

  return (
    <table>
      <tr>
        <th>index</th>
        <th>이름</th>
        <th>전화번호</th>
        <th></th>
      </tr>

      {contactList.map((contact, index) => (
        <tr key={index}>
          <td>{contact.idcontact}</td>
          <td>{contact.name}</td>
          <td>{contact.contact}</td>
          <td><a onClick={() => handleDelete(contact.idcontact)}>삭제</a></td>

        </tr>
      ))}
    </table>
  )
}

export default MemberList