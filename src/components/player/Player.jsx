import React, { useState } from 'react';
import ModalVideo from '../modalVideo/ModalVideo';

const Player = ({url}) => {
    const [active, setActive] = useState(false)

    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    return <div onClick={()=>{setActive(true)}}>
       <iframe width="700px" height="500" style={{position:"relative", zIndex:"-1"}}
            src={"https://www.youtube.com/embed/" + youtube_parser(url)} frameBorder="0">
        </iframe>;
        <ModalVideo active={active} setActive={setActive} url={"https://www.youtube.com/embed/" + youtube_parser(url)}> </ModalVideo>
    </div>
};

export default Player;
