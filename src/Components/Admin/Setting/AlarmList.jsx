import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'
import '../admin.css';
import axios from 'axios';

const AlarmList = () => {

    const [alarm, setAlarm] = useState([])
    const [cookies] = useCookies(['jwtToken']);
    const [selectedAlarm, setSelectedAlarm] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const token = cookies.jwtToken;
            try {
                const resp = await axios.get(`http://${process.env.REACT_APP_API_BASE_URL}/alarm`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(resp.data);
                setAlarm(resp.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])


    const content = (idcriteria, wlDt) => {
        const level = (idcriteria) => {
            return idcriteria === 1 ? '홍수 주의보' : '홍수 경보'
        }
        const dtTime = (wlDt) => {
            const date = new Date(wlDt);
            const month = date.getMonth() + 1; // 월은 0부터 시작하기 때문에 1 더함
            const day = date.getDate();
            const hour = date.getHours();

            return `${month}월 ${day}일 ${hour}시`;

        }
        const text = `${dtTime(wlDt)} 가탄교에 ${level(idcriteria)} 발령 예정, 아래 url을 클릭해 대피소 위치를 확인하세요. 홍수통제소 담당자 연락처: 000-000-0000`
        return text
    }

    const newDt = (alarmDt) => {
        const date = new Date(alarmDt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`

    }


    const getUniqueAlarms = () => {
        let uniqueObj = {};
        alarm.forEach((data) => {
            const key = `${content(data.idcriteria, data.wlDt)}/${newDt(data.alarmDt)}`;
            if (!uniqueObj[key]) {
                uniqueObj[key] = [];
            }
            uniqueObj[key].push(data);
        });
        return uniqueObj;
    };

    const showDetail = (key) => {
        setSelectedAlarm(getUniqueAlarms()[key]);
    };

    return (
        <>
            <div className='nav-main'>
                <div className='admin-nav'>
                    <h4>알림 발송 내역</h4>
                </div>
            </div>
            {/* <div className='setting-main'>
                <table>
                    <tr>
                        <th>#</th>
                        <th>이름</th>
                        <th>번호</th>
                        <th>내용</th>
                        <th>날짜</th>
                    </tr>
                    {alarm.map((data,idx) => (
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{data.name}</td>
                            <td>{data.contact}</td>
                            <td>{content(data.idcriteria, data.wlDt)}</td>
                            <td>{newDt(data.alarmDt)}</td>
                        </tr>
                    ))}
                </table>
            </div> */}
            <div className='setting-main'>
                <div className='admin-comment'>※ 각 항목을 클릭하면 알림 수신인 목록을 보실 수 있습니다.</div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>발송 내용</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(getUniqueAlarms()).map((key, idx) => {
                            const [contentValue, dateValue] = key.split('/');
                            return (
                                <tr key={idx} onClick={() => showDetail(key)}>
                                    <td><a>{idx + 1}</a></td>
                                    <td><a>{contentValue}</a></td>
                                    <td><a>{dateValue}</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='listLink'>
                    <Link to='/setting'>목록으로</Link>
                </div>

            </div>
            {selectedAlarm && (
                <dialog open>
                    <article>
                        <header>
                            <a onClick={() => setSelectedAlarm(null)} aria-label="Close" class="close"></a>
                            알림 수신인 목록
                        </header>
                        <table>
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>번호</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedAlarm.map((data) => (
                                    <tr key={data.contact}>
                                        <td>{data.name}</td>
                                        <td>{data.contact}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </article>
                </dialog>
            )}

        </>
    )
}

export default AlarmList