import React from 'react';
import { useState } from 'react/cjs/react.development';
import "./modalVideo.css"

const ModalVideo = ({active, setActive, slides, current}) => {
  const [currentInModal, setCurrentInModal] = useState(current)
  const [fullScreenClass, setFullScreenClass] = useState(false)
  const [leftSide, setLeftSide] = useState(false)
  const length = slides.length
  function youtube_parser(image){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = image.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }
  const nextSlide = ()=>{
    setCurrentInModal(currentInModal === length-1 ? 0 : currentInModal+1)
    setLeftSide(false)
  }
  const prevSlide = ()=>{
    setCurrentInModal(currentInModal === 0 ? length -1 : currentInModal-1)
    setLeftSide(true)
  }
  if(active){
    document.getElementById('nav').classList.add("navbar__none")
    document.getElementById('topNav').classList.add("navbar__none")
  }
  return (
  <div className="modal-video"  onClick={(e)=>{setActive(false); e.stopPropagation(); document.getElementById('nav').classList.remove("navbar__none")}}>
    <div className="modal__nav-control">{currentInModal+1}/{length}</div>
      <div className="slider__control" onClick={(e)=>{e.stopPropagation();prevSlide(); }}></div>
        {slides.map((slide, index) => 
          <div className={index===currentInModal ? 'modal-slide modal-slide__active' : 'modal-slide modal-slide-right'} key = {index}>
            {slide.url ? 
              <img src={"https://turkestan.panama.kz" + slide.url} alt="travel" className="modal-slide-img"
              onClick={(e)=>{e.stopPropagation(); setFullScreenClass(!fullScreenClass)}}/> 
              :
              <div className="modal-video__content">
                <iframe width="100%" height="100%" 
                        src={"https://www.youtube.com/embed/" + youtube_parser(slide)}
                        title="YouTube video player" frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                    </iframe>
              </div>
            }
          </div>
        )}
      <div className="slider__control slider__control-right" onClick={(e)=>{e.stopPropagation(); nextSlide();}}></div>
  </div>)
};

export default ModalVideo;
