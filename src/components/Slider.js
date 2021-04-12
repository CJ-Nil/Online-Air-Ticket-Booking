import React,{useState,useEffect} from 'react'
import SwiperCore, { Navigation,EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import '../style/SliderStyle.css'
import Card from './Card'
import axios from 'axios'
SwiperCore.use([Navigation,EffectCoverflow]);
function Slider() {
    const [data,setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/on-air-mvc/AllOffer')
            .then(response =>{
                setData(response.data)
            })
            .catch(error =>{
                console.log(error)
            })
    },[])
    const slides = []
    let id=0
    data.forEach(el => {
        slides.push(
        <SwiperSlide key={`slide-${id++}`} >
            <Card src={el.from_city} dest={el.to_city} 
            original_cost={el.original_cost} 
            offer_cost={el.offer_cost} off={el.offer} /> 
        </SwiperSlide>)
    });
    return (
        <React.Fragment>
            <Swiper 
                spaceBetween={20}
                slidesPerView={3}
                navigation
                effect="coverflow"

            >
                {slides}
            </Swiper>
        </React.Fragment>
    )
}

export default Slider
