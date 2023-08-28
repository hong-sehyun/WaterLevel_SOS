import React, { useState } from 'react';
import axios from 'axios';

const Main = () => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleContact = (e) => {
        setContact(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const data = {
                name: name,
                contact: contact
            };

            await axios.post('http://10.125.121.184:8080/contact', data);
            alert("등록 되었습니다!");
        } catch (error) {
            console.error(error);
            alert("등록에 실패하였습니다.");
        }
    };

    return (
        <>
            <input type='text' value={name} onChange={handleName} placeholder='이름' />
            <input type='text' value={contact} onChange={handleContact} placeholder='휴대폰 번호(- 없이 숫자만 입력)' />
            <button onClick={handleSubmit}>알림 받기</button>
            <a>카카오톡 알림 받기</a>
        </>
    )
}

export default Main;
