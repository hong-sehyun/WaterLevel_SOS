import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../admin.css';

const ShelterList = () => {

    const [shelters, setShelters] = useState([]);
    const navigate = useNavigate();
    const [cookies] = useCookies(['jwtToken']);

    useEffect(() => {
        const fetchShelters = async () => {
            try {
                const resp = await axios.get(`http://${process.env.REACT_APP_API_BASE_URL}/shelter`);
                setShelters(resp.data);
            } catch (error) {
                console.log(error);
            }

        }

        fetchShelters();
    }, [])


    const handleDelete = async (id) => {
        const token = cookies.jwtToken;
        const userConfirmed = window.confirm('정말로 삭제하시겠습니까?');

        if (!userConfirmed) {
            return;
          }

        try {
            await axios.delete(`http://${process.env.REACT_APP_API_BASE_URL}/shelter/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setShelters(prevShelters => prevShelters.filter(shelter => shelter.idshelter !== id));
            navigate('/setting/shelterList');
        } catch (error) {
            console.error(error);
        }
    }

    const handleRegi = () => {
        navigate('/setting/regiShelter')
    }
    return (
        <>
            <div className='nav-main'>
                <div className='admin-nav'>
                    <h4>대피소 목록</h4>
                </div>
            </div>
            <div className='setting-main'>
                <div className='table-div'>
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
                    {/* <Link to='/setting/regiShelter' > 등록하기</Link> */}
                </div>
                <div className="shleterList-footer">
                    <div className='listLink'>
                        <Link to='/setting'>목록으로</Link>
                    </div>
                    <div className='bt-div'>
                        <button onClick={handleRegi}>등록하기</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShelterList