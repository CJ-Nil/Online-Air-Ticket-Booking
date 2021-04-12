import React,{useEffect,useRef} from 'react'
import '../style/horizontalSlider.css'
import { isMobile} from 'react-device-detect'
function HorizontalSlider(props) {
    let isDown = false;
    let startX;
    let scrollLeft;
    const scrollRef=useRef(null);
    const leftArrow=useRef(null);
    const rightArrow=useRef(null);
   
   const mouseDownHandler = (e,slider) =>{
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
   }

   const mouseLeaveHandler = (e,slider) =>{
    isDown = false;
   }

   const mouseUpHandler = (e,slider) => {
    isDown = false;
   }

   const mouseMoveHandler = (e,slider) =>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    console.log(walk);
   }

    useEffect(()=>{
        const slider=scrollRef.current
        slider.addEventListener('mousedown',(e) => mouseDownHandler(e,slider));
        slider.addEventListener('mouseleave', (e) => mouseLeaveHandler(e,slider));
        slider.addEventListener('mouseup', (e) => mouseUpHandler(e,slider));
        slider.addEventListener('mousemove', (e) => mouseMoveHandler(e,slider));
    })

    useEffect(() => {
        const slider=scrollRef.current
        leftArrow.current.addEventListener('click',(e) => {
            slider.scrollLeft += -300;
            console.log('Hello');
        })
        rightArrow.current.addEventListener('click',(e) => {
            slider.scrollLeft += +300;
        })
        if(isMobile){
        
        }
    },[])
    return (
        <div className='h-container'>
            <div ref={leftArrow} className='leftArrow'><span>{'<'}</span></div>
            <div ref={scrollRef}  className="scrolling-wrapper" >
                {props.children}
                <div className='card-end'> </div>
            </div>
            <div ref={rightArrow} className='rightArrow'><span>{'>'}</span></div>
        </div>
    )
}

export default HorizontalSlider
