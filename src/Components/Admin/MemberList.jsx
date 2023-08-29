import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberList = () => {
 const [contactList, setContactList] = useState([]);

 useEffect(() => {
     const fetchContacts = async () => {
         try {
             const response = await axios.get('http://10.125.121.184:8080/contact/list');
             setContactList(response.data);  
         } catch (error) {
             console.error(error);
         }
     };

     fetchContacts();
 }, []);

  return (
    <table>
      <tr>
        <th>이름</th>
        <th>전화번호</th>
      </tr>

        {contactList.map((contact, index) => (
          <tr key={index}>

          <td>{contact.name}</td>
          <td>{contact.contact}</td>
          
          </tr>
        ))}
    </table>
  )
}

export default MemberList