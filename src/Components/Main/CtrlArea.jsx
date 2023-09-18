// /* global kakao */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WebSocketComponent from './WebSocketComponent';
import CtrlAreaIcon from '../../Assets/Ctrl.svg';
import MainBT from './MainBT';
import './main.css';
import AOS from "aos";
import "aos/dist/aos.css";


const CtrlArea = () => {
    const mapRef = useRef(null);
    // const LEVEL = 2;
    const { kakao } = window;
    const [criteria, setCriteria] = useState(null)
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
    });




    // useEffect(() => {
    //     axios.get('http://10.125.121.184:8080/criteria')
    //         .then(resp => {
    //             const criteriaValue = resp.data.idcriteria;
    //             setCriteria(criteriaValue);
    //             // console.log('Server Response:', resp.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })

    // }, []);

    useEffect(() => {
        const container = mapRef.current;
        const options = {
            center: new kakao.maps.LatLng(35.18768475612574, 127.62328828379697),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);

        if (criteria !== null) {
            axios.get('http://10.125.121.184:8080/ctrlarea')
                .then(response => {
                    const areas = response.data.filter(item => item.idcriteria === criteria);

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
                    const points = response.data.filter(item => item.idcriteria === criteria);

                    points.forEach(point => {
                        const markerPosition = new kakao.maps.LatLng(point.latitude, point.longtitude);
                        const marker = new kakao.maps.Marker({
                            position: markerPosition
                        });
                        marker.setMap(map);
                    });
                    console.log(points);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [criteria]);

    return (
        <div data-aos="fade-up">
            <div className='icon-container'>
                <div className="icon-div">
                    <img src={CtrlAreaIcon} alt="Shelter" className='nav-icon' />
                    <div className='nav-title'>통제(예정) 현황</div>
                </div>
                <div className="nav-txt">통제(예정) 현황을 보여드립니다</div>
            </div>
            <div className="main-container">
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

                <div id="map" ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
                <MainBT />
            </div>
        </div>

    );
}

export default CtrlArea;
