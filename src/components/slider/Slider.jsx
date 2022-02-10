import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import ModalVideo from '../modalVideo/ModalVideo'
import "./slider.css"

const Slider = ({images}) => {
    const [current, setCurrent] = useState(0)
    const [active, setActive] = useState(false)
    const {id} = useParams()

    useEffect(()=>{
        setCurrent(0)
    }, [id])
    
    if(!Array.isArray(images) || images.length<=0){
        return "-"
    }
    const getLegth = ()=>{
        let length = 0
        images.map(image=>{
            if(image && image != ""){
                length+=1;
            }
        })
        return length
    }
    const length = getLegth()
    const nextSlide = ()=>{
        setCurrent(current === length-1 ? 0 : current+1)
    }
    const prevSlide = ()=>{
        setCurrent(current === 0 ? length -1 : current-1)
    }
    function youtube_parser(image){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = image.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }
    if(active){
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "scroll";
    }
    const checkurl= (url) => {
        return url.replace("http://","").replace("https://","").replace("www.","").replace("youtu.be/","youtube.com?v=").slice(0,14)==="youtube.com?v=" || 
        url.replace("http://","").replace("https://","").replace("www.","").replace("youtu.be/","youtube.com?v=").slice(0,14)==="youtube.com/wa";
    }
    

    return (
            <div className="slider">
                {images.map((image, index) => 
                    <div className={index===current ? 'slide active' : 'slide'} key = {index}>
                        {index ===current && (
                            <div className="player-video" onClick={()=>{setActive(true)}}>
                                {image.url && image !==null && image.url !==" " ? 
                                    <img  src={"https://turkestan.panama.kz" + image.url} alt="travel" className="slider-img"/> :
                                    checkurl(image) ? 
                                    <iframe width="100%" height="100%" style={{position:"relative", zIndex:"-1"}}
                                            src={"https://www.youtube.com/embed/" + youtube_parser(image)} frameBorder="0">
                                    </iframe> : <></>
                                }
                                {active ? <ModalVideo active={active} setActive={setActive} slides={images} current={current}> </ModalVideo>
                                :<></>}
                            </div>
                            )
                        }
                    </div>) 
                }
                <div id="nav" className="slider__nav">
                    <div className="icon" onClick={prevSlide}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 7.70703L9.414 10L11.707 12.293C12.098 12.684 12.098 13.316 11.707 13.707C11.512 13.902 11.256 14 11 14C10.744 14 10.488 13.902 10.293 13.707L7.29303 10.707C6.90203 10.316 6.90203 9.68397 7.29303 9.29297L10.293 6.29297C10.684 5.90197 11.316 5.90197 11.707 6.29297C12.098 6.68397 12.098 7.31603 11.707 7.70703ZM20 10C20 15.514 15.514 20 10 20C4.486 20 0 15.514 0 10C0 4.486 4.486 0 10 0C15.514 0 20 4.486 20 10ZM18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18C14.411 18 18 14.411 18 10Z" fill="#5584AC"/>
                        </svg>
                    </div>
                    <p className="slider__nav-text">{current+1}/{length}</p>
                    <div className="icon" onClick={nextSlide}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18ZM12.707 9.29297C13.098 9.68397 13.098 10.316 12.707 10.707L9.70697 13.707C9.51197 13.902 9.256 14 9 14C8.744 14 8.48803 13.902 8.29303 13.707C7.90203 13.316 7.90203 12.684 8.29303 12.293L10.586 10L8.29303 7.70703C7.90203 7.31603 7.90203 6.68397 8.29303 6.29297C8.68403 5.90197 9.31597 5.90197 9.70697 6.29297L12.707 9.29297Z" fill="#5584AC"/>
                        </svg>
                    </div>
                </div>
            </div>
    )
}

export default Slider
