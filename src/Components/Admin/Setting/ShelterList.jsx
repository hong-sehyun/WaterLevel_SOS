import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShelterList = () => {

    const [shelters, setShelters] = useState([]);

    useEffect(() => {
        const fetchShelters = async () => {
            try {
                const resp = await axios.get('http://10.125.121.184:8080/shelter');
                setShelters(resp.data);
            } catch (error) {
                console.log(error);
            }

        }

        fetchShelters();
    },[])

    return (
        <div>
            <h1>Shelter List</h1>
            <table>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>장소</th>
                    <th scope='col'>주소</th>
                    <th scope='col'>위도</th>
                    <th scope='col'>경도</th>
                    <th></th>
                </tr>
                {shelters.map(shelter => (
                    <tr key={shelter.idshelter}>
                        <td>{shelter.idshelter}</td>
                        <td>{shelter.name}</td>
                        <td>{shelter.address}</td>
                        <td>{shelter.latitude}</td>
                        <td>{shelter.longtitude}</td>
                        <td><a>삭제</a></td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default ShelterList