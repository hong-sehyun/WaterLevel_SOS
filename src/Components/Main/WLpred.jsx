import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import WebSocketComponent from './WebSocketComponent';
import './main.css';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, registerables } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, ...registerables);


const WLpred = () => {
  const [wl, setWl] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://10.125.121.184:8080/pushservice');

    ws.onopen = () => {
      console.log('연결됨');
    }

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
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
      backgroundColor: wl.list.map((_, idx) => idx < wl.list.length - 3 ? 'rgba(75, 192, 192, 0.5)' : 'rgba(255, 99, 132, 0.5)'),
      borderColor: wl.list.map((_, idx) => idx < wl.list.length - 3 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'),
      borderWidth: 1
    }]
  };

  return (
    <div className='WLpred-article'>
      <WebSocketComponent />
      <h1>수위예측</h1>
      <div className='legend-div'>
        <div className="legend">
          <div className='past'></div> <span>과거 수위(EL.m)</span>
        </div>
        <div className="legend">
        <div className='pred'></div> <span>예측 수위(EL.m)</span>
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
                    text: '수위 (EL.m)'
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
      <Link to='/'>범람알림 받으러 가기 </Link>
    </div>
  );
}

export default WLpred;
