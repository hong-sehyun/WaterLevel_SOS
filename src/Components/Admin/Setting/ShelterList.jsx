import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ShelterList = () => {

    const [shelters, setShelters] = useState([]);
    const navigate = useNavigate();
    const [cookies] = useCookies(['jwtToken']);

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


    const handleDelete = async (id) => {
        const token = cookies.jwtToken;
        
        try {
            await axios.delete(`http://10.125.121.184:8080/shelter/${id}`, {
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            });
            setShelters(prevShelters => prevShelters.filter(shelter => shelter.idshelter !== id));
            alert('정말로 삭제하시겠습니까?')
            navigate('/setting/shelterList');
        } catch (error) {
            console.error(error);
        }
        } 
    return (
        <div>
            <h1>Shelter List</h1>
            <table>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>장소</th>
                    <th scope='col'>주소</th>
                    <th></th>
                </tr>
                {shelters.map(shelter => (
                    <tr key={shelter.idshelter}>
                        <td>{shelter.idshelter}</td>
                        <td>{shelter.name}</td>
                        <td>{shelter.address}</td>
                        <td><a onClick={() => handleDelete(shelter.idshelter)}>삭제</a></td>
                    </tr>
                ))}
            </table>
            <Link to='/setting/regiShelter' > 등록하기</Link>
        </div>
    )
}

export default ShelterList