/* global kakao */
import React, { useEffect, useState } from 'react';

const RegiLoc = () => {



    //통제구역 등록
    const initialCoordinates = { lat: 35.193298746054666, lng: 127.62529657735537 };
    const [clickedCoordinates, setClickedCoordinates] = useState([]);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=627febc1693dbff48776490bf4ef5a93&autoload=false';
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new kakao.maps.LatLng(initialCoordinates.lat, initialCoordinates.lng),
                    level: 3
                };

                const map = new kakao.maps.Map(container, options);

                kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                    const latlng = mouseEvent.latLng;
                    addMarker(latlng);
                    setClickedCoordinates(prev => [...prev, { lat: latlng.getLat(), lng: latlng.getLng() }]);
                });

                function addMarker(position) {
                    const marker = new kakao.maps.Marker({ position });
                    marker.setMap(map);

                    kakao.maps.event.addListener(marker, 'click', function() {
                        marker.setMap(null);
                        setClickedCoordinates(coords => coords.filter(coord => coord.lat !== position.getLat() && coord.lng !== position.getLng()));
                    });

                    setMarkers(prev => [...prev, marker]);
                }
            });
        };
    }, []);

    return (
        <div>
            <div id="map" style={{ width: '1000px', height: '500px' }}></div>
            <div>
                {clickedCoordinates.map((coord, index) => (
                    <div key={index}>
                        위도: {coord.lat}<br />
                        경도: {coord.lng}<br /><br />
                    </div>
                ))}
            </div>
            <button type='submit'>등록</button>
        </div>
    );
}

export default RegiLoc;
