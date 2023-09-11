import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import axios from 'axios';


const RegiShelter = () => {
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');



    const onComplete = (data) => {
        console.log('onComplete data:', data);
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

        setAddress(fullAddress);
    }

    const open = useDaumPostcodePopup(onComplete);

    const handleClick = () => {
        // 주소검색 후 주소 클릭 시 해당 함수 수행
        open({ onComplete: onComplete });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handleSubmit - sending data:', { address, name });

        try {
            const response = await axios.post('http://10.125.121.184:8080/shelter', {
                address,
                name
            });


            console.log('Response from server:', response);

            alert('등록되었습니다!')
        } catch (error) {
            console.log(error);

        }

    }



    return (
        <div>
            <details>
                <summary role="button" class="secondary">대피소 등록</summary>
                <form onSubmit={handleSubmit}>
                    <div className="grid">

                        <input
                            type="text"
                            value={address}
                            placeholder="주소 검색"
                            onClick={handleClick}
                            readOnly
                        />
                        <button class="secondary outline" onClick={handleClick}>주소 검색</button>
                    </div>
                    <input type='text' value={name} placeholder="대피소명 입력" />
                    <button type='suubmit'>등록하기</button>
                </form>
            </details>
        </div>
    );
}

export default RegiShelter