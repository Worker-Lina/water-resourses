import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import Loading from '../../components/loading/Loading'
import MyButton from '../../components/myButton/MyButton'
import Pagination from '../../components/pagination/Pagination'
import ResponseRequets from '../../components/responseRequest/ResponseRequets'
import UserItem from '../../components/userItem/UserItem'
import { fetchUsers } from '../../http/reservoirApp'
import { USER_CREATE_ROUTE } from '../../utils/consts'
import "./usersPage.css"

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [responseActive, setResponseActive] = useState(false)
    const [success, setSuccess] = useState(false)
    const [preLoader, setPreLoader] = useState(false)

    useEffect(()=>{
        setPreLoader(true);
        fetchUsers(currentPage).then(data => {setUsers(data.content.items); setTotalPages(data.content.total_pages); 
            setCurrentPage(data.content.current_page); setPreLoader(false);})
    }, [currentPage])

  return (
    <div className="users__page">
        <Helmet>
          <title>Пользователи</title>
        </Helmet>
        {preLoader ? <Loading/> : <></>}
        {preLoader ? <div className="preLoader"/> : <></>}
        {responseActive ? <ResponseRequets active={responseActive} setActive={setResponseActive} success={success}/> : <></>}
        <div className="page__item">
            <div className="page__subtitle">Пользователи</div>
            <Link to={USER_CREATE_ROUTE}> <MyButton variant="green"> <span className="users__page__icon">+</span> Добавить</MyButton> </Link>
        </div>
        <div className="page__content">
            <div className="page__content__item user-item-page">
                <p className="content__item__text">ID</p>
                <p className="content__item__text">Название</p>
                <p className="content__item__text">E-mail</p>
                <p className="content__item__text text-actions">Действия</p>
            </div>
            <div className="line"></div>
            {users.length ? users.map(user =>
                <UserItem key={user.id} item={user} users={users}
                preLoader = {preLoader} setPreLoader = {setPreLoader}
                setUsers={setUsers} setSuccess={setSuccess} setResponseActive = {setResponseActive}></UserItem>
            ) : <></>} 
            <Pagination totalPages={totalPages} page={currentPage} changePage={setCurrentPage}></Pagination>
            
        </div>
    </div>
  )
}

export default UsersPage