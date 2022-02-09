import React, { useState } from 'react';
import ModalVideo from '../modalVideo/ModalVideo';

const Player = ({url}) => {
    const [active, setActive] = useState(false)

    // преобразую пришедшую мне ссылку под стандарт для отображения ютуб видео
    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    return <div className="player-video" onClick={()=>{setActive(true)}}>
       <iframe width="100%" height="100%" style={{position:"relative", zIndex:"-1"}}
            src={"https://www.youtube.com/embed/" + youtube_parser(url)} frameBorder="0">
        </iframe>
        {active ? <ModalVideo active={active} setActive={setActive} url={"https://www.youtube.com/embed/" + youtube_parser(url)}> </ModalVideo>
        :<></>}
    </div>
};

export default Player;
