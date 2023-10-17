import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WebSocketComponent from './WebSocketComponent';
import './main.css';
import ShelterIcon from '../../Assets/shelter.svg'
import MainBT from './MainBT';
import AOS from "aos";
import "aos/dist/aos.css";


const Shelter = () => {
  const [shelters, setShelters] = useState([]);
  // 대피소 목록 클릭시 지도상에 마커 표시
  const [selectedShelter, setSelectedShelter] = useState(null);
  // 대피소 목록 클릭시 지도상에 content 표시
  const currentInfoWindow = useRef(null);
  const defaultPosition = new window.kakao.maps.LatLng(35.2, 127.6);
  const [mapCenter, setMapCenter] = useState(defaultPosition);
  useEffect(() => {
    AOS.init({ duration: 800 })
  }, [])

  const geocoder = new window.kakao.maps.services.Geocoder();



  const onShelterClick = (shelter) => {
    setSelectedShelter(shelter);
    geocoder.addressSearch(shelter.address, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        setMapCenter(new window.kakao.maps.LatLng(result[0].y, result[0].x));
      }
    });

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_BASE_URL}/shelter`);
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
            marker.setOpacity(0.6);

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
    <div data-aos="fade-up">
      <div className='icon-container'>
        <div className="icon-div">
          <img src={ShelterIcon} alt="Shelter" className='nav-icon' />
          <div className='nav-title'>대피소</div>
        </div>
        <div className="nav-txt">대피소의 위치를 안내해드립니다</div>
      </div>
      <div className="main-container">

        <WebSocketComponent />
        <div>
          <div id="map" style={{ width: '100%', height: '400px' }}></div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>대피소명</th>
                <th>주소</th>
              </tr>
            </thead>
            <tbody>
              {shelters.map((shelter, idx) => (
                <tr
                  key={shelter.idshelter}
                  onClick={() => onShelterClick(shelter)}
                >

                  <td className={selectedShelter && selectedShelter.idshelter === shelter.idshelter ? "selected-shelter" : ""}>{idx + 1}</td>
                  <td className={selectedShelter && selectedShelter.idshelter === shelter.idshelter ? "selected-shelter" : ""}>{shelter.name}</td>
                  <td className={selectedShelter && selectedShelter.idshelter === shelter.idshelter ? "selected-shelter" : ""}>{shelter.address}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        <MainBT />
      </div>
    </div>
  );
}

export default Shelter