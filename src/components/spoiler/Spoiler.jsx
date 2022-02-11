import React, { useState } from 'react';
import "./spoiler.css"

const Spoiler = ({text, children}) => {
    const [active, setActive]=useState(false)

    let mainText = text.split(' ', 3).join(' ')
    let hiddenText = text.slice(mainText.length)

    console.log(children)
  return <>
      <p className="text__description">{mainText}
      <span className={active ? "text__visible" : "text__unvisible"}>{hiddenText}</span>
      <span className="link" onClick={()=>setActive(!active)}>{active ? "Скрыть" :"Показать полностью..."}</span></p>

  </>;
};

export default Spoiler;
