import React, { useEffect, useState } from 'react';

const WebSocketComponent  = () => {
    const [time, setTime] = useState('');

    function formatTime(data) {
      const year = data.slice(1, 5);
      const month = data.slice(5, 7);
      const day = data.slice(7, 9);
      const hour = data.slice(9, 11);
      const minute = data.slice(11, 13);
    
      return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
    }
  
    useEffect(() => {
      const ws = new WebSocket('ws://10.125.121.184:8080/pushservice');
  
      ws.onopen = () => {
        console.log('연결됨');
      };
  
      ws.onmessage = (msg) => {
        console.log(msg.data);
        const formattedTime = formatTime(msg.data);
        setTime(formattedTime);
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
      <div>
        {time} 기준
      </div>
    );
}

export default WebSocketComponent 