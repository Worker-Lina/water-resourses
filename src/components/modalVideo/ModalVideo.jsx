import React from 'react';
import "./modalVideo.css"

const ModalVideo = ({active, setActive, url}) => {
  return <div className={active ? "modal-video active" : "modal-video" } onClick={(e)=>{setActive(false); e.stopPropagation()}}>
      <div className="modal-video__content">
        <iframe width="700px" height="410" 
                src={url}
                title="YouTube video player" frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
            </iframe>;
      </div>
  </div>;
};

export default ModalVideo;
