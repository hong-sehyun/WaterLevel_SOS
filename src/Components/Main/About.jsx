import React, { useEffect } from 'react';
import hongsooImg1 from '../../Assets/홍수피해1.png';
import hongsooImg2 from '../../Assets/홍수피해2.jpg';
import hongsooImg3 from '../../Assets/홍수피해3.jpg';
import predImg from '../../Assets/예측1.png'
import './main.css';
import AOS from "aos";
import "aos/dist/aos.css";




const About = () => {

  useEffect(() => {
    AOS.init({ duration: 800 })
  }, [])



  return (
    <div className="main-container">

      <div id='about'>
        <div className="about1" >
          <div className="about1-img" data-aos="fade-up">
            <img src={hongsooImg1} />
          </div>
          <div className="about1-txt" data-aos="fade-up">
            지난 몇 주간 대한민국 일부 지역은 예기치 못한 홍수에 휘말려 일상이 찰나의 순간에 크게 흔들렸습니다.<p/>
            지난 밤부터 이어진 폭우는 단순한 비가 아니라 우리의 생활을 크게 위협하는 홍수로 이어졌습니다. <p/>이런 홍수는 우리에게 그 위력을 알려주며, 대비의 중요성은 더더욱 강조되고 있습니다.
          </div>
        </div>
{/* 
        <div className="about2" >
          <div className="about2-txt" data-aos="fade-up">
            지난 몇 주간 대한민국 일부 지역은 예기치 못한 홍수에 휘말려 일상이 찰나의 순간에 크게 흔들렸습니다.
            지난 밤부터 이어진 폭우는 단순한 비가 아니라 우리의 생활을 크게 위협하는 홍수로 이어졌습니다. 이런 홍수는 우리에게 그 위력을 알려주며, 대비의 중요성은 더더욱 강조되고 있습니다.
          </div>
          <div className="about2-img" data-aos="fade-up">
            <img src={hongsooImg2} />
          </div>
        </div> */}

        <div className="about3" >
          <div className="about3-txt" data-aos="fade-up">
            <h3>
              저희는 수위 예측하고, 예측 데이터를 기반으로 홍수 피해를 미리 알려드립니다.
            </h3>
          </div>
          <div className="about3-img" data-aos="fade-up">
            <img src={predImg} />
          </div>
        </div>
        {/* <div className="aboutImg">
          <img src={hongsooImg1} />
          <img src={hongsooImg2} />
          <img src={hongsooImg3} />
        </div> */}

      </div>
    </div>
  )
}

export default About