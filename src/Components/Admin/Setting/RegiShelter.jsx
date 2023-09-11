import React, { useRef } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';

import { useCookies } from 'react-cookie';

import axios from 'axios';


const RegiShelter = () => {
    const address = useRef(null);
    const name = useRef(null);
    const navigate = useNavigate();
    const [cookies] = useCookies(['jwtToken']);


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

    const open = useDaumPostcodePopup(onComplete);

    const handleClick = () => {
        // 주소검색 후 주소 클릭 시 해당 함수 수행
        open({ onComplete: onComplete });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = cookies.jwtToken;


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

        <form onSubmit={handleSubmit}>
            <div className="grid">

                <input
                    type="text"
                    ref={address}
                    placeholder="주소 검색"
                    onClick={handleClick}
                    readOnly
                />
                <button class="secondary outline" onClick={handleClick}>주소 검색</button>
            </div>
            <input type='text' ref={name} placeholder="대피소명 입력" />
            <button type='submit'>등록하기</button>
        </form>

    );
}

export default RegiShelter