import React, { useEffect,useRef,useState} from 'react';
import SwiperCore, { Navigation,EffectCoverflow,Swiper,Autoplay, } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import '../style/SliderStyle.css'
import Card from './Card'
import axios from 'axios'
SwiperCore.use([Navigation,EffectCoverflow,Autoplay]);
function S() {
  const swiper = useRef(null)
  const [data,setData] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8080/on-air-mvc/AllOffer')
    .then(response =>{
      setData(response.data)
      swiper.current=new Swiper('.swiper-container',{
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop:true,
        coverflowEffect: {
          rotate:15,
          stretch:0,
          depth: 400,
          modifier: 1,
          slideShadows: true,
        },
        autoplay:{
          delay: 1500,
          disableOnInteraction: false,
          
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        
      })
    })
    .catch(error =>{
        console.log(error)
    })
  },[])
  
  let id=0
  return (
    <div className="slider">
      <div className="swiper-container">
          <div className="swiper-wrapper">
            {
              data.map(el => 
              <div key={id++} className='swiper-slide'>
                <Card src={el.from_city} dest={el.to_city} 
                  original_cost={el.original_cost} 
                  offer_cost={el.offer_cost} off={el.offer} end={el.end} 
                  a_time = {el.a_time} d_time={el.d_time}
                /> 
              </div>
              )
            }  
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
      </div>
    </div>
  );
}
export default S