import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Shelter = () => {
  const [shelters, setShelters] = useState([]);
  // 대피소 목록 클릭시 지도상에 마커 표시
  const [selectedShelter, setSelectedShelter] = useState(null);
  // 대피소 목록 클릭시 지도상에 content 표시
  const currentInfoWindow = useRef(null);
  const defaultPosition = new window.kakao.maps.LatLng(35.2, 127.6);
  const [mapCenter, setMapCenter] = useState(defaultPosition);

  
  const geocoder = new window.kakao.maps.services.Geocoder();



  const onShelterClick = (shelter) => {
    setSelectedShelter(shelter);
    // if (window.kakao && window.kakao.maps) {
    //   const mapContainer = document.getElementById('map');
    //   const centerPosition = new window.kakao.maps.LatLng(shelter.latitude, shelter.longtitude);
    //   const map = new window.kakao.maps.Map(mapContainer, {
    //     center: centerPosition,
    //     level: 7
    //   });

    // }
    geocoder.addressSearch(shelter.address, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        setMapCenter(new window.kakao.maps.LatLng(result[0].y, result[0].x));
      }
    });


  };

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
        center: mapCenter,
        level: 7
      };
      const map = new window.kakao.maps.Map(container, options);


      shelters.forEach(shelter => {
        geocoder.addressSearch(shelter.address, function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new window.kakao.maps.Marker({
              position: coords
            });
            marker.setOpacity(0.5);

            // 마커 클릭 이벤트
            window.kakao.maps.event.addListener(marker, 'click', function () {
              setSelectedShelter(shelter);
            });

            //대피소 목록에서 대피소 선택시 opecity 변화, content 표시
            if (selectedShelter && selectedShelter.idshelter === shelter.idshelter) {
              marker.setOpacity(1);
              marker.setZIndex(10);

              const content = `<div style="
          padding: 7px;
          white-space: nowrap;
        ">${shelter.name}</div>`;
              const infoWindow = new window.kakao.maps.InfoWindow({
                content: content,
                zIndex: 10

              });

              if (currentInfoWindow.current) {
                currentInfoWindow.current.close();
              }

              infoWindow.open(map, marker);
              currentInfoWindow.current = infoWindow;
            }

            marker.setMap(map);
          }
        });
      });
    }
  }, [shelters, selectedShelter]);

  return (
    <>
      <div>
        <div id="map" style={{ width: '100%', height: '400px' }}></div>
        <ul>
          {shelters.map(shelter => (
            <li key={shelter.idshelter} onClick={() => onShelterClick(shelter)}
              style={selectedShelter && selectedShelter.idshelter === shelter.idshelter ? { color: "black", fontWeight: "bolder" } : {}}>
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