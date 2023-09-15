import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';
import RNwarning from './RNwarning';
import AOS from "aos";
import "aos/dist/aos.css";


const WebSocketComponent = () => {

  useEffect(() => {
    AOS.init({duration: 800})
  }, [])
  
  const [time, setTime] = useState('');
  const [criteria, setCriteria] = useState(null);
  const [matchCriteria, setMatchCriteria] = useState(null);

  function formatTime(data) {
    const year = data.substring(0, 4);
    const month = data.substring(4, 6);
    const day = data.substring(6, 8);
    const hour = data.substring(8, 10);
    const minute = data.substring(10, 12);

    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  }

  useEffect(() => {
    const ws = new WebSocket('ws://10.125.121.184:8080/pushservice');

    ws.onopen = () => {
      console.log('연결됨');
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const reqTime = formatTime(data.reqTime);
      const predictedValue = data.list[data.list.length - 3];

      axios.get('http://10.125.121.184:8080/criteria')
        .then(resp => {
          const criteriaList = resp.data;
          const matched = criteriaList.find(item => predictedValue >= item.criteria);
          setMatchCriteria(matched); // 상태 업데이트
          if (matched) {
            setCriteria(matched.idcriteria);
          }
          console.log("Matched Criteria:", matched);
        })
        .catch(error => {
          console.log(error);
        });
      setTime(reqTime);

    };

    ws.onclose = () => {
      console.log('연결 끊어짐');
    };

    ws.onerror = (error) => {
      console.error(error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div data-aos="fade-up">
      <div className='time-div'>
        {time} 기준
      </div>
      <div className="level-div">

        <div className='level'>
          <span className={
            !matchCriteria ? 'level0' :
              matchCriteria.idcriteria === 1 ? 'level1' : 'level2'
          }>
            {!matchCriteria ? '홍수 특보 없음 (통제 없음)' :
              matchCriteria.idcriteria === 1 ? '홍수 주의보' : '홍수 경보'}
          </span>
        </div>
        <RNwarning />
      </div>
    </div>
  );
}

export default WebSocketComponent 