import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import WebSocketComponent from './WebSocketComponent';
import RNwarning from './RNwarning';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import './main.css';
import WLpredIcon from '../../Assets/WLpred.svg'
import MainBT from './MainBT';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, registerables } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, ...registerables);


const WLpred = () => {
  const [wl, setWl] = useState(null);
  const [criteria, setCriteria] = useState(null);

  const [matchCriteria, setMatchCriteria] = useState(null);

  useEffect(() => {
    AOS.init({duration: 800})
  }, [])

  useEffect(() => {
    const ws = new WebSocket('ws://10.125.121.184:8080/pushservice');

    ws.onopen = () => {
      console.log('연결됨');
    }

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      // const predictedValue = data.list[data.list.length - 3];

      // axios.get('http://10.125.121.184:8080/criteria')
      //   .then(resp => {
      //     const criteriaList = resp.data;
      //     const matched = criteriaList.find(item => predictedValue >= item.criteria);
      //     setMatchCriteria(matched); // 상태 업데이트
      //     if (matched) {
      //       setCriteria(matched.idcriteria);
      //     }
      //     console.log("Matched Criteria:", matched);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      console.log(data);
      setWl(data);
    }

    ws.onclose = () => {
      console.log('연결 끊어짐');
    };

    ws.onerror = (error) => {
      console.error(error);
    };

    return () => {
      ws.close();
    };
  }, [])


  const generateTimeLabels = (start, count) => {
    let timeLabels = [];
    let currentHour = parseInt(start.slice(-4, -2), 10);
    // let currentDay = parseInt(start.slice(0, 8), 10);

    for (let i = 0; i < count; i++) {
      timeLabels.push(`${String(currentHour).padStart(2, '0')}시`);
      currentHour += 1;

      if (currentHour === 24) {
        currentHour = 0;
        // currentDay += 1;
      }
    }

    return timeLabels;
  };

  const data = wl && {
    labels: [
      ...generateTimeLabels(wl.pastStart, wl.list.length - 3),
      ...generateTimeLabels(wl.predStart, 3)
    ],
    datasets: [{
      data: wl.list,
      backgroundColor: wl.list.map((_, idx) => idx < wl.list.length - 3 ? 'rgba(88, 135, 179, 0.5)' : 'rgba(218, 73, 73, 0.5)'),
      borderColor: wl.list.map((_, idx) => idx < wl.list.length - 3 ? 'rgba(88, 135, 179, 1)' : 'rgba(218, 73, 73, 01)'),
      borderWidth: 1
    }]
  };

  return (
    <div data-aos="fade-up">
      <div className='icon-container'>
        <div className="icon-div">
          <img src={WLpredIcon} alt="Shelter" className='nav-icon' />
          <div className='nav-title'>수위 예측</div>
        </div>
        <div className="nav-txt">예측된 유량 데이터를 보여드립니다</div>
      </div>
      <div className='main-container'>
        <WebSocketComponent />
        {/* <div className='level'>
          <span className={
            !matchCriteria ? 'level0' :
              matchCriteria.idcriteria === 1 ? 'level1' : 'level2'
          }>
            {!matchCriteria ? '통제 없음' :
              matchCriteria.idcriteria === 1 ? '홍수 주의보' : '홍수 경보'}
          </span>
        </div> */}
        {/* <RNwarning /> */}
        <div className='legend-div'>
          <div className="legend">
            <div className='past'></div> <span>과거 수위(m)</span>
          </div>
          <div className="legend">
            <div className='pred'></div> <span>예측 수위(m)</span>
          </div>
        </div>
        {/* <div>
        {wl && (
          <>
            <h2>Past Start: {wl.pastStart}</h2>
            <h2>Pred Start: {wl.predStart}</h2>
            <ul>
              {wl.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </div> */}
        {wl && (
          <>
            <Bar
              data={data}
              options={{
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: '수위 (m)'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: '시간'
                    }
                  }
                }
              }}
            />
          </>
        )}
        <MainBT />
      </div>
    </div>
  );
}

export default WLpred;
