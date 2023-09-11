import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import WebSocketComponent from './WebSocketComponent';
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
    let currentHour = parseInt(start.slice(-4, -2), 10);


    for (let i = 0; i < count; i++) {
      timeLabels.push(`${String(currentHour).padStart(2, '0')}시`);
      currentHour += 1;

      if (currentHour === 24) {
        currentHour = 0;
        currentDay += 1;
      }
    }

    return timeLabels;
  };

  const data = wl && {
    labels: [
      ...generateTimeLabels(wl.pastStart, 6),
      ...generateTimeLabels(wl.predStart, wl.list.length - 6)
    ],
    datasets: [{
      label: 'Water Level (EL.m)',
      data: wl.list,
      backgroundColor: wl.list.map((_, idx) => idx < 6 ? 'rgba(75, 192, 192, 0.5)' : 'rgba(255, 99, 132, 0.5)'),
      borderColor: wl.list.map((_, idx) => idx < 6 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'),
      borderWidth: 1
    }]
  };

  return (
    <>
      <WebSocketComponent />
      <h1>수위예측</h1>
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
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Water Level (EL.m)'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Time'
                  }
                }
              }
            }}
          />
        </>
      )}
      <Link to='/'>범람알림 받으러 가기 </Link>
    </>
  );
}

export default WLpred;
