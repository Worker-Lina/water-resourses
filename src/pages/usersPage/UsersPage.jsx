import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../components/loading/Loading'
import MyButton from '../../components/myButton/MyButton'
import Pagination from '../../components/pagination/Pagination'
import UserItem from '../../components/userItem/UserItem'
import { fetchUsers } from '../../http/reservoirApp'
import { USER_CREATE_ROUTE } from '../../utils/consts'
import "./usersPage.css"

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{
        fetchUsers(currentPage).then(data => {setUsers(data.content.items); setTotalPages(data.content.total_pages); 
            setCurrentPage(data.content.current_page);})
    }, [currentPage])

  return (
    <div className="users__page">
        <div className="page__item">
            <div className="page__subtitle">Пользователи</div>
            <Link to={USER_CREATE_ROUTE}> <MyButton variant="green"> <span className="users__page__icon">+</span> Добавить</MyButton> </Link>
        </div>
        <div className="page__content">
            <div className="page__content__item">
                <p className="content__item__text">ID</p>
                <p className="content__item__text">Название</p>
                <p className="content__item__text">E-mail</p>
                <p className="content__item__text">Действия</p>
            </div>
            <div className="line"></div>
            {users.length ? users.map(user =>
                <UserItem key={user.id} item={user} users={users} setUsers={setUsers}></UserItem>
            ) : <Loading></Loading>} 
            <Pagination totalPages={totalPages} page={currentPage} changePage={setCurrentPage}></Pagination>
            
        </div>
    </div>
  )
}

export default UsersPage