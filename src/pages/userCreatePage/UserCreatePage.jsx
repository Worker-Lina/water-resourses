import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import MyButton from '../../components/myButton/MyButton'
import { createUser, fecthOneUser, resetPassword, updateUser } from '../../http/userApi'
import { USERS_ROUTE } from '../../utils/consts'
import "./userCreatePage.css"
import { useParams } from 'react-router';
import ResponseRequets from '../../components/responseRequest/ResponseRequets'
import { emailValidation, nameValidate } from '../../utils/validate'
import Loading from '../../components/loading/Loading'
import Helmet from 'react-helmet'
import PreLoader from '../../components/loading/PreLoader'

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
    const [isCorrectFullName, setIsCorrectFullName] = useState(true)
    const [preLoader, setPreLoader] = useState(false)

    useEffect(()=>{
        if(id){
            setPreLoader(true)
            fecthOneUser(id).then(data => {console.log(data); setEmail(data.content.email); setFullName(data.content.name); setUserId(data.content.id);
            setPreLoader(false)})
        }
    },[id])

    const userCreate = async () => {
        if(!nameValidate(fullName)){
            setIsCorrectFullName(false)
            return
        }
        setIsCorrectFullName(true)
        if(!emailValidation(email)){
            setIsCorrectEmail(false)
            return
        }
        setIsCorrectEmail(true)
        if(id){
            setPreLoader(true);
            try{
                updateUser(id, fullName, email).then(data => {setSuccess(true);
                    setSuccessRequest(true); setActive(true); setPreLoader(false) })
            }catch(e){
                console.log(e);
                setPreLoader(false);setActive(true);setSuccess(false);
            }
        }else{
            setPreLoader(true);
            try{
                createUser(fullName, email).then(data=>{console.log(data); setSuccess(true); setUserId(data.content.id);
                    setSuccessRequest(true); setActive(true); setPreLoader(false)});
            }catch(e){
                console.log(e);setPreLoader(false);setActive(true);setSuccess(false);
            }
        }
    }

    const resetMyPassword = async () =>{
        setPreLoader(true);
        resetPassword(userId).then(data => {console.log(data); setPassword(data.content.password); setVisible(true);
        setPreLoader(false)})
    }

  return (
    <div className="userCreatePage">
        {active ? <ResponseRequets active={active} setActive={setActive} success={successRequest}/> : <></>}
        <Helmet>
          <title>{id ? "Редактирование " : "Создание " }пользователя</title>
        </Helmet>
        <div className="page__item">
            <Link to={USERS_ROUTE}><MyButton variant="blue"><span className="button__left"> </span>Назад</MyButton></Link>
            <div className="page__subtitle">{id ? "Редактирование " : "Создание " }пользователя</div>
        </div>
        <div className="page__form">
            {preLoader ? <PreLoader/> : <></>}
            <div className="label">ФИО *</div>
            <input className={isCorrectFullName ? "input" : "input input-error"} type="text" placeholder="ФИО" value={fullName} onChange={e=>setFullName(e.target.value)}></input>
            {isCorrectFullName ? <></> : <div className="label error-label">Введено некорректное имя</div>}
            <div className="label">E-mail *</div>
            <input className={isCorrectEmail ? "input" : "input input-error"} placeholder="e-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)}></input>
            {isCorrectEmail ? <></> : <div className="label error-label">Введен некорректный E-mail</div>}
            {visible ? <div className="userCreatePage__newPassword">Новый пароль: {password}</div> : <></>}
            <div className="line"></div>
            <div className="page__buttons">
                <Link to={USERS_ROUTE}><MyButton variant="border red">Отмена</MyButton></Link>
                {success ? <MyButton variant="orange" onClick={resetMyPassword}>Сбросить пароль</MyButton> :<></>}
                <MyButton variant="green" onClick={userCreate}>Сохранить</MyButton>
            </div>
        </div>
    </div>
  )
}

export default UserCreatePage