import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './main.css'
import AOS from "aos";
import "aos/dist/aos.css";


const Main = () => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({duration: 1500})
      }, [])

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleContact = (e) => {
        setContact(e.target.value);
    };

    const handleSubmit = async () => {

        if (contact.length !=11 || contact.includes('-') || isNaN(Number(contact))) {
            alert("잘못된 휴대폰 번호 입니다.");
            return;
        }
        try {
            const data = {
                name: name,
                contact: contact
            };

            await axios.post('http://10.125.121.184:8080/contact', data);
            alert("등록 되었습니다!");
            navigate('/')
        } catch (error) {
            console.error(error);
            alert("등록에 실패하였습니다.");
        }
    };

    return (
        <div className="componentContainer">

            <div className="inputBox" data-aos="fade-up">
                <div className="div1">
                    <h2 id='h2title'>집중 호우로 인한 사망·실종 연평균 40명!</h2>
                    <div id='txt'>
                        급변하는 기후 조건 아래,인명과 재산의 피해는 계속해서 증가하고 있습니다. 지금 바로 정보에 귀 기울이고, 사랑하는 이들과 자신을 지키세요.
                    </div>
                </div>
                <div className="div2">
                    <h4 id='h3title'>실시간 범람 알림을 받고 침수에 대비하세요!</h4>

                    <div id='inputDiv'>
                        <input type='text' value={name} onChange={handleName} placeholder='이름' className='inputDiv' />
                        <input type='text' value={contact} onChange={handleContact} placeholder='휴대폰 번호(- 없이 숫자만 입력)' className='inputDiv' />
                        <button onClick={handleSubmit}>알림 받기</button>
                        <a id='katalk'>카카오톡 알림 받기</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;
