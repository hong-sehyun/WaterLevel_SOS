import React, { useEffect, useState  } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Shelter = () => {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.125.121.184:8080/shelter');
        if (response.data) {
          setShelters(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map'); 
      const options = {
        center: new window.kakao.maps.LatLng(35.2, 127.6), 
        level: 7
      };

      const map = new window.kakao.maps.Map(container, options);

      shelters.forEach(shelter => {
        const markerPosition = new window.kakao.maps.LatLng(shelter.latitude, shelter.longtitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });

        marker.setMap(map);
      });
    }
  }, [shelters]);

  return (
    <>
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <ul>
        {shelters.map(shelter => (
          <li key={shelter.idshelter}>
            {shelter.name} - {shelter.address}
          </li>
        ))}
      </ul>
    </div>
    <Link to='/'>범람알림 받으러 가기</Link>
    </>
  );
}

export default Shelter