import React, { useEffect } from 'react';
import "./modal.css"
import Slider from '../slider/Slider';
import MyButton from '../myButton/MyButton';
import { fetchOneObject } from '../../http/reservoirApp';
import { useState } from 'react/cjs/react.development';
import { Link } from 'react-router-dom';
import i18n from '../../i18n';

const Modal = ({id, active, setActive, mapRef, center, zoom}) => {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(false)
  let slides = []


  useEffect(() => {
    fetchOneObject(id).then(data => {setItem(data.content); setLoading(true)})
  }, [i18n.language, id])
// функция которая проверяет корректность слайдов в массиве
  const getCorrectSlides = ()=>{
    {item.photos && item.video ? 
      slides = [].concat(item.photos, item.video) :
      item.photos && !item.video ?
        slides =  item.photos :
      item.video && !item.photos ?
        slides = item.video :
      slides = null
    }
    if(slides){
      slides = slides.filter((el) =>{
        return (el != null && el != "")
      })
    }
    return slides
  }

  return <>
    {loading ? 
      <div className={active ? "modal active" : "modal"}>
        <div className="modal__top">
            <p>{item.type.name}</p>
            <div className="close__button" onClick={()=>{setActive(false); 
                const map = mapRef.current
                map.flyTo(center, zoom, {
                  duration: 1
                })
              }}>
                <div className="menu__close"></div>
            </div>
        </div>

        <h2 className="modal__title">{item.name}</h2>
        <Slider images={getCorrectSlides()}></Slider>

        <p className="text__title" > {item.type.id === 1 ? "Объем, водоотдача" : "Протяженность, пропускная способность"}</p>
        {item.volume === ""  || item.volume == null ? 
        <p> - </p> :
        <p className="text__description"> {item.volume}</p>}

        <p className="text__title"> Задача объекта</p>
        {item.goal === ""  || item.goal == null ? 
        <p> - </p> :
        <p className="text__description" dangerouslySetInnerHTML={{ __html: item.goal }} />}
        
        <p className="text__title">Ожидаемый результат</p>
        {item.expectation === ""  || item.expectation == null ? 
        <p> - </p> :
        <p className="text__description" dangerouslySetInnerHTML={{ __html: item.expectation }} />}

        <p className="text__title">Наличие воды в объекте</p>
        {item.water_presence === ""  || item.water_presence == null ? 
        <p> - </p> : <p className="text__description" dangerouslySetInnerHTML={{ __html: item.water_presence }}/> 
        }

        <div className="line"></div>
        <div className="modal__buttons">
            <MyButton variant="orange">Скачать отчет
            <svg className="modal-svg" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.21977 4.53027C4.92652 4.23702 4.92652 3.76298 5.21977 3.46973C5.51302 3.17648 5.98698 3.17648 6.28023 3.46973L7.25 4.43954V1C7.25 0.58525 7.586 0.25 8 0.25C8.414 0.25 8.75 0.58525 8.75 1V4.43954L9.71977 3.46973C10.013 3.17648 10.487 3.17648 10.7802 3.46973C11.0735 3.76298 11.0735 4.23702 10.7802 4.53027L8.53023 6.78027C8.38398 6.92652 8.192 7 8 7C7.808 7 7.61602 6.92652 7.46977 6.78027L5.21977 4.53027ZM11.75 5.5C11.336 5.5 11 5.83525 11 6.25C11 6.66475 11.336 7 11.75 7C12.9905 7 14 8.0095 14 9.25V10C14 11.2405 12.9905 12.25 11.75 12.25H4.25C3.0095 12.25 2 11.2405 2 10V9.25C2 8.0095 3.0095 7 4.25 7C4.664 7 5 6.66475 5 6.25C5 5.83525 4.664 5.5 4.25 5.5C2.18225 5.5 0.5 7.18225 0.5 9.25V10C0.5 12.0677 2.18225 13.75 4.25 13.75H11.75C13.8177 13.75 15.5 12.0677 15.5 10V9.25C15.5 7.18225 13.8177 5.5 11.75 5.5ZM12.5 9.25C12.5 8.836 12.164 8.5 11.75 8.5C11.336 8.5 11 8.836 11 9.25C11 9.664 11.336 10 11.75 10C12.164 10 12.5 9.664 12.5 9.25Z" fill="white"/>
              </svg>
            </MyButton>
            <MyButton variant="blue">
              <Link to={"/objects/"+id}>Подробнее об объекте</Link>
            </MyButton>
        </div>
    </div> 
    :
    <></>}
  </>
};

export default Modal;
