import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import MyButton from '../../components/myButton/MyButton'
import { createUser, resetPassword } from '../../http/userApi'
import { USERS_ROUTE } from '../../utils/consts'
import "./userCreatePage.css"

const UserCreatePage = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [id, setId] = useState()

    const userCreate = async () => {
        try{
            createUser(fullName, email).then(data=>{console.log(data); setSuccess(true); setId(data.content.id)});
        }catch(e){
            console.log(e)
        }
    }

    const resetMyPassword = async () =>{
        resetPassword(id).then(data => {console.log(data); setPassword(data.content.password); setVisible(true)})
    }

  return (
    <div className="userCreatePage">
        <div className="page__item">
            <Link to={USERS_ROUTE}><MyButton variant="blue"><span className="button__left"> </span>Назад</MyButton></Link>
            <div className="page__subtitle">Создание пользователя</div>
        </div>
        <div className="page__form">
            <div className="label">ФИО *</div>
            <input className="input" type="text" placeholder="ФИО" onChange={e=>setFullName(e.target.value)}></input>
            <div className="label">E-mail *</div>
            <input className="input" placeholder="e-mail" type="email" onChange={e=>setEmail(e.target.value)}></input>
            {visible ? <div className="userCreatePage__newPassword">Новый пароль: {password}</div> : <></>}
            <div className="line"></div>
            <div className="page__buttons">
                <MyButton variant="border red">Отмена</MyButton>
                {success ? <MyButton variant="orange" onClick={resetMyPassword}>Сбросить пароль</MyButton> :<></>}
                <MyButton variant="green" onClick={userCreate}>Сохранить</MyButton>
            </div>
        </div>
    </div>
  )
}

export default UserCreatePage