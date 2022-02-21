import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import MyButton from '../../components/myButton/MyButton'
import { createUser, fecthOneUser, resetPassword, updateUser } from '../../http/userApi'
import { USERS_ROUTE } from '../../utils/consts'
import "./userCreatePage.css"
import { useParams } from 'react-router';
import ResponseRequets from '../../components/responseRequest/ResponseRequets'

const UserCreatePage = () => {
    const {id} = useParams()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [userId, setUserId] = useState()
    const [active, setActive] = useState(false) 
    const [successRequest, setSuccessRequest] = useState(false) 
    const [isCorrectEmail, setIsCorrectEmail] = useState(true)

    useEffect(()=>{
        if(id){
            fecthOneUser(id).then(data => {console.log(data); setEmail(data.content.email); setFullName(data.content.name); setUserId(data.content.id)})
        }
    },[id])

    function emailValidation(value) {
        let txt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return txt.test(value);
    }

    const userCreate = async () => {
        if(!emailValidation(email)){
            setIsCorrectEmail(false)
            return
        }
        setIsCorrectEmail(true)
        if(id){
            updateUser(id, fullName, email).then(data => {setEmail(''); setFullName('');
            setSuccessRequest(true); setActive(true) })
        }else{
            createUser(fullName, email).then(data=>{console.log(data); setSuccess(true); setUserId(data.content.id);
            setSuccessRequest(true); setActive(true)});
        }
    }

    const resetMyPassword = async () =>{
        resetPassword(userId).then(data => {console.log(data); setPassword(data.content.password); setVisible(true)})
    }

  return (
    <div className="userCreatePage">
        {active ? <ResponseRequets active={active} setActive={setActive} success={successRequest}/> : <></>}
        <div className="page__item">
            <Link to={USERS_ROUTE}><MyButton variant="blue"><span className="button__left"> </span>Назад</MyButton></Link>
            <div className="page__subtitle">Создание пользователя</div>
        </div>
        <div className="page__form">
            <div className="label">ФИО *</div>
            <input className="input" type="text" placeholder="ФИО" value={fullName} onChange={e=>setFullName(e.target.value)}></input>
            <div className="label">E-mail *</div>
            {isCorrectEmail ? <></> : <div className="label error-label">Введен некорректный E-mail</div>}
            <input className={isCorrectEmail ? "input" : "input input-error"}placeholder="e-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)}></input>
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