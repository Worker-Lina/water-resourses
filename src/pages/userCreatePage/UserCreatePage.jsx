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
import Helmet from 'react-helmet'
import PreLoader from '../../components/loading/PreLoader'
import { useForm } from "react-hook-form";

const UserCreatePage = () => {
    const {id} = useParams()
    const [success, setSuccess] = useState(false)
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [userId, setUserId] = useState()
    const [active, setActive] = useState(false) 
    const [successRequest, setSuccessRequest] = useState(false) 
    const [preLoader, setPreLoader] = useState(false)
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    useEffect(()=>{
        if(id){
            setPreLoader(true)
            fecthOneUser(id).then(data => {console.log(data); setValue("email",data.content.email); setValue("fullName", data.content.name); setUserId(data.content.id);
            setPreLoader(false)})
        }
    },[id])

    const resetMyPassword = async () =>{
        setPreLoader(true);
        resetPassword(userId).then(data => {console.log(data); setPassword(data.content.password); setVisible(true);
        setPreLoader(false)})
    }

    const onSubmit = async (data) => {
        if(id){
            setPreLoader(true);
            try{
                updateUser(id, data.fullName, data.email).then(data => {setSuccess(true);
                    setSuccessRequest(true); setActive(true); setPreLoader(false) })
            }catch(e){
                console.log(e);
                setPreLoader(false);setActive(true);setSuccess(false);
            }
        }else{
            setPreLoader(true);
            try{
                createUser(data.fullName, data.email).then(data=>{console.log(data); setSuccess(true); setUserId(data.content.id);
                    setSuccessRequest(true); setActive(true); setPreLoader(false)});
            }catch(e){
                console.log(e);setPreLoader(false);setActive(true);setSuccess(false);
            }
        }
    }

  return (
    <div className="user-create-page">
        {active ? <ResponseRequets active={active} setActive={setActive} success={successRequest}/> : <></>}
        <Helmet>
          <title>{id ? "Редактирование " : "Создание " }пользователя</title>
        </Helmet>
        <div className="page__item">
            <Link to={USERS_ROUTE}><MyButton variant="blue"><span className="button__left"> </span>Назад</MyButton></Link>
            <div className="page__subtitle">{id ? "Редактирование " : "Создание " }пользователя</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="page__form">
            {preLoader ? <PreLoader/> : <></>}
            <div className="label">ФИО *</div>
            <input {...register("fullName", {required: true, minLength: 4})} className={errors?.fullName ? "input input-error" : "input"} type="text" placeholder="ФИО"></input>
            {errors?.fullName && <div className="label error-label">Введено некорректное имя</div>}
            <div className="label">E-mail *</div>
            <input {...register("email", {required: true, pattern: /^\S+@\S+$/i})} className={errors?.email ? "input input-error" : "input"} placeholder="e-mail" type="email"></input>
            {errors?.email && <div className="label error-label">Введен некорректный E-mail</div>}
            {visible ? <div className="user__new-password">Новый пароль: {password}</div> : <></>}
            <div className="line"></div>
            <div className="page__buttons">
                <Link to={USERS_ROUTE}><MyButton variant="border red">Отмена</MyButton></Link>
                {success ? <MyButton variant="orange" onClick={resetMyPassword}>Сбросить пароль</MyButton> :<></>}
                <MyButton variant="green" onClick={()=>onSubmit}>Сохранить</MyButton>
            </div>
        </form>
    </div>
  )
}

export default UserCreatePage