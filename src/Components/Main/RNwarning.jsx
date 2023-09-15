import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RNwarning = () => {
    const [criteria, setCriteria] = useState(null);
    const [matchCriteria, setMatchCriteria] = useState(null);
    useEffect(() => {
        const getRecentBaseTime = () => {
            const date = new Date();
            const hour = date.getHours();
            const minute = date.getMinutes();
            let recentBaseHour = hour;

            if (minute < 30) {
                recentBaseHour = hour - 1;
            }

            if (recentBaseHour < 10) {
                return `0${recentBaseHour}30`;
            } else {
                return `${recentBaseHour}30`;
            }


        };

        const fetchRainfallData = async () => {
            const baseTime = getRecentBaseTime();
            const baseURL =
                'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';
            const serviceKey = decodeURIComponent(process.env.REACT_APP_WEATHER_SERVICE_KEY);
            const params = {
                serviceKey: serviceKey,
                pageNo: 1,
                numOfRows: 1000,
                dataType: 'JSON',
                base_date: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
                base_time: baseTime,
                nx: 72,
                ny: 75,
            };

            const fullURL = `${baseURL}?${new URLSearchParams(params).toString()}`;
            console.log("API 요청 URL:", fullURL);


            const response = await axios.get(baseURL, { params });
            console.log(response.data);
            const data = response.data.response.body.items.item;
            const rainfallData = data.filter((item) => item.category === 'RN1');

            const totalRainfall = rainfallData.slice(0, 3).reduce((acc, curr) => {
                return acc + (curr.fcstValue !== '강수없음' ? parseFloat(curr.fcstValue) : 0);
            }, 0);
            console.log('Match Criteria2:', totalRainfall);
            setMatchCriteria(totalRainfall);
        };

        fetchRainfallData();
    }, []);

    return (
        <div className='level'>
            <span className={
                matchCriteria > 90 ? 'level2' :
                    matchCriteria > 60 ? 'level1' : 'level0'
            }>
                {matchCriteria > 90 ? '호우 경보' :
                    matchCriteria > 60 ? '호우 주의보' : '호우 특보 없음'}
            </span>
        </div>
    )
}

export default RNwarning