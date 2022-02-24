import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Loading from '../../components/loading/Loading'
import MyButton from '../../components/myButton/MyButton'
import ObjectItem from '../../components/objectItem/ObjectItem'
import Pagination from '../../components/pagination/Pagination'
import ResponseRequets from '../../components/responseRequest/ResponseRequets'
import { fetchObjectsByAuth } from '../../http/reservoirApp'
import { CREATE_OBJECT_ROUTE } from '../../utils/consts'
import "./objectsPage.css"

const ObjectsPage = () => {
    const [objects, setObjects] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [ t, i18n ] = useTranslation();
    const [responseActive, setResponseActive] = useState(false);
    const [success, setSuccess] = useState(false);
    const [preLoader, setPreLoader] = useState(false)

    useEffect(()=>{
        setPreLoader(true);
        fetchObjectsByAuth(currentPage).then(data => {setObjects(data.content.items); setTotalPages(data.content.total_pages); 
            setCurrentPage(data.content.current_page); setLoading(true); setPreLoader(false)})
    }, [currentPage, i18n.language ])


  return (
    <div className="objects__page">
        <Helmet>
          <title>Объекты</title>
        </Helmet>
        {preLoader ? <div className="preLoader"/> : <></>}
        {responseActive ? <ResponseRequets active={responseActive} setActive={setResponseActive} success={success}/> : <></>}
        <div className="page__item">
            <div className="page__subtitle">Объекты</div>
            <Link to={CREATE_OBJECT_ROUTE}> <MyButton variant="green"> <span className="users__page__icon">+</span> Добавить</MyButton> </Link>
        </div>
        <div className="page__content">
            <div className="page__content__item">
                <p className="content__item__text">ID</p>
                <p className="content__item__text">Название</p>
                <p className="content__item__text">Статус</p>
                <p className="content__item__text text-actions">Действия</p>
            </div>
            <div className="line"></div>
            {objects.length ? objects.map(object =>
                <ObjectItem key={object.id} item={object} objects={objects} setObjects={setObjects} 
                preLoader={preLoader} setPreLoader={setPreLoader} setSuccess={setSuccess} setResponseActive={setResponseActive}></ObjectItem>
            ) : <Loading></Loading>} 
            <Pagination totalPages={totalPages} page={currentPage} changePage={setCurrentPage}></Pagination>
        </div>
    </div>
  )
}

export default ObjectsPage