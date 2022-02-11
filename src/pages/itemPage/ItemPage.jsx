import React, { useEffect, useState } from 'react';
import Slider from '../../components/slider/Slider';
import "./itemPage.css"
import "../../components/modal/modal.css"
import MyButton from '../../components/myButton/MyButton';
import { useParams } from 'react-router';
import { fetchOneObject } from '../../http/reservoirApp';
import Loading from '../../components/loading/Loading';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';

const ItemPage = () => {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
  const [ t, i18n ] = useTranslation();
  let slides = []

  useEffect(() => {
    try{
      fetchOneObject(id).then(data => {setItem(data.content); setLoading(true);})
    }catch(e){
      console.log(e)
    }
  }, [id, i18n.language])

  // проверка приходящих массивов изображений и видео, соединение в один массив
  const getCorrectSlides = ()=>{
    {item.photos && item.video ? 
      slides = [].concat(item.photos, item.video) :
      item.photos && !item.video ?
        slides =  item.photos :
      item.video && !item.photos ?
        slides = item.video :
      slides = null
    }
    slides = slides.filter((el) =>{
      return (el != null && el != "")
    })
    console.log(slides)
    return slides
  }


  return <div className="item__page">
    {loading ? <>
      <Helmet>
          <title>{item.name}</title>
          <meta name="keywords" content={item.name + "," +item.type.name }></meta>
          <meta name="description" content={item.name + ",", item.goal}></meta>
      </Helmet>
      <ul className="page-transition">
          <li><Link to="/" > {t("ItemPage.main")}</Link></li>
          <div className="vertical-line"></div>
          <li><a href="#" className="active"> {item.name}</a></li>
      </ul>
      <p className="item__page-text">{item.type.name}</p>
      <h1 className="title">{item.name}</h1>
      <Slider images={getCorrectSlides()}></Slider>
      <p className="text__title"> {item.type.id === 1 ? "Объем, водоотдача" : "Протяженность, пропускная способность"}</p>
      {item.volume === ""  || item.volume == null ? 
      <p> - </p> :
      <p className="text__description">{item.volume}</p>}
      <p className="text__title"> Задачи объекта</p>
      {item.goal === ""  || item.goal == null ? 
        <p> - </p> :
      <p className="text__description" dangerouslySetInnerHTML={{ __html: item.goal }} />}

      <p className="text__title">Ожидаем результат</p>
      {item.expectation === ""  || item.expectation == null ? 
        <p> - </p> :
      <p className="text__description text-size" dangerouslySetInnerHTML={{ __html: item.expectation }} />}

      <p className="text__title">Наличие воды в объекте</p>
      {item.water_presence === ""  || item.water_presence == null ? 
        <p> - </p> :
      <p className="text__description text-size" dangerouslySetInnerHTML={{ __html: item.water_presence }} />}
      
      <p className="text__title">Источник воды</p>
      {item.water_spring === ""  || item.water_spring == null ? 
        <p> - </p> :
      <p className="text__description text-size"  dangerouslySetInnerHTML={{ __html: item.water_spring }} /> }

      <p className="text__title">Водоотведение</p>
      {item.water_disposal === ""  || item.water_disposal == null ? 
        <p> - </p> :
      <p className="text__description text-size"  dangerouslySetInnerHTML={{ __html: item.water_disposal }} /> }

      <p className="text__title">Вид работ и этап</p>
      {item.work_type === ""  || item.work_type == null ? 
        <p> - </p> :
      <p className="text__description text-size" dangerouslySetInnerHTML={{ __html: item.work_type }} />}

      <p className="text__title">Техническое решение</p>
      {item.technical_solution === ""  || item.technical_solution == null ? 
        <p> - </p> :
      <p className="text__description text-size" dangerouslySetInnerHTML={{ __html: item.technical_solution }} />}
      <h1 className="title">Заказчик</h1>
      <p className="text__title">Ответственное лицо</p>
      {item.responsible_person === ""  || item.responsible_person == null ? 
        <p> - </p> :
      <p className="text__description text-size" dangerouslySetInnerHTML={{ __html: item.responsible_person }} /> }
      <p className="text__title">Объем финансирования</p>
      {item.total_funding === ""  || item.total_funding == null ? 
        <p> - </p> :
      <p className="text__description text-size" dangerouslySetInnerHTML={{ __html: item.total_funding }} /> }

      <p className="text__title">Проектировщик</p>
      {item.planner === ""  || item.planner == null ? 
        <p> - </p> :
      <p className="text__description text-size" dangerouslySetInnerHTML={{ __html: item.planner }} />}

      <p className="text__title">Застройщик</p>
      {item.developer === ""  || item.developer == null ? 
        <p> - </p> :
      <p className="text__description text-size" dangerouslySetInnerHTML={{ __html: item.developer }} />}

      <p className="text__title">Эскизный проект</p>
      <Slider images={item.project_draft}></Slider>
      <div className="line"></div>
    <MyButton variant="orange">{t("button")}
      <svg className="modal-svg" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.21977 4.53027C4.92652 4.23702 4.92652 3.76298 5.21977 3.46973C5.51302 3.17648 5.98698 3.17648 6.28023 3.46973L7.25 4.43954V1C7.25 0.58525 7.586 0.25 8 0.25C8.414 0.25 8.75 0.58525 8.75 1V4.43954L9.71977 3.46973C10.013 3.17648 10.487 3.17648 10.7802 3.46973C11.0735 3.76298 11.0735 4.23702 10.7802 4.53027L8.53023 6.78027C8.38398 6.92652 8.192 7 8 7C7.808 7 7.61602 6.92652 7.46977 6.78027L5.21977 4.53027ZM11.75 5.5C11.336 5.5 11 5.83525 11 6.25C11 6.66475 11.336 7 11.75 7C12.9905 7 14 8.0095 14 9.25V10C14 11.2405 12.9905 12.25 11.75 12.25H4.25C3.0095 12.25 2 11.2405 2 10V9.25C2 8.0095 3.0095 7 4.25 7C4.664 7 5 6.66475 5 6.25C5 5.83525 4.664 5.5 4.25 5.5C2.18225 5.5 0.5 7.18225 0.5 9.25V10C0.5 12.0677 2.18225 13.75 4.25 13.75H11.75C13.8177 13.75 15.5 12.0677 15.5 10V9.25C15.5 7.18225 13.8177 5.5 11.75 5.5ZM12.5 9.25C12.5 8.836 12.164 8.5 11.75 8.5C11.336 8.5 11 8.836 11 9.25C11 9.664 11.336 10 11.75 10C12.164 10 12.5 9.664 12.5 9.25Z" fill="white"/>
          </svg></MyButton> </> 
    : 
    <Loading></Loading>}
  </div>;
};

export default ItemPage;
