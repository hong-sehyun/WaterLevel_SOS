import React, { useRef } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import '../admin.css';


const RegiShelter = () => {
    const address = useRef(null);
    const name = useRef(null);
    const navigate = useNavigate();
    const [cookies] = useCookies(['jwtToken']);
    const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");


    const onComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        address.current.value = fullAddress;
    }


    const handleClick = () => {
        // 주소검색 후 주소 클릭 시 해당 함수 수행
        open({ onComplete: onComplete });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = cookies.jwtToken;

        // 주소 or 대피소명이 null일 때
        if (!address.current.value.trim() || !name.current.value.trim()) {
            alert('주소와 대피소명을 입력하세요.');
            return;
        }


        try {
            await axios.post('http://10.125.121.184:8080/shelter', {
                address: address.current.value,
                name: name.current.value
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('등록되었습니다!');
            navigate('/setting/shelterList');
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <article className='regiShelter-article'>
            <form onSubmit={handleSubmit}>
                <div className="grid">
                    <input
                        type="text"
                        ref={address}
                        placeholder="주소 입력"
                        onClick={handleClick}
                        readOnly
                    />
                </div>
                <input type='text' ref={name} placeholder="대피소명 입력" />
                <button type='submit'>등록하기</button>
            </form>
            <Link to='/setting/shelterList'>목록으로</Link>
        </article>
    );
}

export default RegiShelter