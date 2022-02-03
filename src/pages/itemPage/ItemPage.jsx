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

const ItemPage = () => {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
  const [ t, i18n ] = useTranslation();

  useEffect(() => {
    try{
      fetchOneObject(id).then(data => {setItem(data.content); setLoading(true)})
    }catch(e){
      console.log(e)
    }
  }, [id, i18n.language])

  return <div className="item__page">
    {loading ? <>
      <ul className="page-transition">
          <li><Link to="/" > {t("ItemPage.main")}</Link></li>
          <div className="vertical-line"></div>
          <li><a href="#" className="active"> {item.name}</a></li>
      </ul>
      <p className="item__page-text">{item.type.name}</p>
      <h1 className="title">{item.name}</h1>
      <Slider images={item.photos}></Slider>
      <p className="text__title"> {item.type.id === 1 ? "Объем, водоотдача" : "Протяженность, пропускная способность"}</p>
      <p className="text__description text-size"> {item.volume}</p>

      <p className="text__title"> Задачи объекта</p>
      <p className="text__description text-size"> {item.goal}</p>

      <p className="text__title">Ожидаем результат</p>
      <p className="text__description text-size"> {item.expectation}</p>

      <p className="text__title">Наличие воды в объекте</p>
      <p className="text__description text-size"> {item.water_presence}</p>
        
      <p className="text__title">Источник воды</p>
      <p className="text__description text-size"> {item.water_spring}</p>

      <p className="text__title">Водоотведение</p>
      <p className="text__description text-size"> {item.water_disposal}</p>

      <p className="text__title">Вид работ и этап</p>
      <p className="text__description text-size"> {item.work_type}</p>

      <p className="text__title">Техническое решение</p>
      <p className="text__description text-size"> {item.technical_solution}</p>

      <h1 className="title">Заказчик</h1>

      <p className="text__title">Ответственное лицо</p>
      <p className="text__description text-size"> {item.responsible_person}</p>

      <p className="text__title">Объем финансирования</p>
      <p className="text__description text-size"> {item.total_funding}</p>

      <p className="text__title">Проектировщик</p>
      <p className="text__description text-size"> {item.planner}</p>

      <p className="text__title">Застройщик</p>
      <p className="text__description text-size"> {item.developer}</p>

      <p className="text__title">Эскизный проект</p>

      <div className="line"></div>
    <MyButton variant="orange">{t("button")}</MyButton> </> 
    : 
    <Loading></Loading>}
  </div>;
};

export default ItemPage;
