/* global kakao */
import React, { useEffect, useRef  } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Main1 = () => {
  const mapRef = useRef(null);
  const LEVEL = 2; 

  useEffect(() => {
      const container = mapRef.current;
      const options = {
          center: new kakao.maps.LatLng(35.18768475612574, 127.62328828379697),
          level: 3
      };
      const map = new kakao.maps.Map(container, options);

      axios.get('http://10.125.121.184:8080/ctrlarea')
          .then(response => {
              const areas = response.data.filter(item => item.level === LEVEL);
              
            const path = areas.map(area => new kakao.maps.LatLng(area.latitude, area.longtitude));
            
            const polygon = new kakao.maps.Polygon({
                map: map,
                path: path,
                strokeWeight: 3,
                strokeColor: '#EF3636',
                strokeOpacity: 0.7,
                fillColor: '#EF3636',
                fillOpacity: 0.3

              });
          })
          .catch(error => {
              console.error(error);
          });

      axios.get('http://10.125.121.184:8080/ctrlpoint')
          .then(response => {
              const points = response.data.filter(item => item.level === LEVEL);
              
              points.forEach(point => {
                  const markerPosition = new kakao.maps.LatLng(point.latitude, point.longtitude);
                  const marker = new kakao.maps.Marker({
                      position: markerPosition
                  });
                  marker.setMap(map);
              });
          })
          .catch(error => {
              console.error(error);
          });
  }, []);

  return (
    <>
      <div id="map" ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
      <Link to='/'>범람알림 받으러 가기</Link>
    </>
      
  );
}

export default Main1;
