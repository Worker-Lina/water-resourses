import React from 'react'
import Helmet from 'react-helmet'
import { Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import Loading from '../../components/loading/Loading'
import PreLoader from '../../components/loading/PreLoader'
import MyButton from '../../components/myButton/MyButton'
import ResponseRequets from '../../components/responseRequest/ResponseRequets'
import { check, updatePassword, updateProfile, updateUser } from '../../http/userApi'
import { emailValidation, passwordValidate, nameValidate } from '../../utils/validate'
import "./settingsPage.css"

const SettingsPage = () => {
    const navigate = useNavigate();
    const [active, setActive]=useState(false)
    const [success, setSuccess] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [isCorrectFullName, setIsCorrectFullName] = useState(true)
    const [isCorrectEmail, setIsCorrectEmail] = useState(true)
    const [isCorrectPassword, setIsCorrectPassword] = useState(true)
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true)
    const [loading, setLoading]  =useState(false)
    const [loadingPassword, setLoadingPassword]  =useState(false)

    useEffect(()=>{
        setLoading(true);
        check().then(data=> {setEmail(data.content.email); setFullName(data.content.name); setLoading(false)})
    }, [])

    const updateMyProfile = async () =>{
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
        try{
            setLoading(true);
            updateProfile(fullName, email).then(data=>{setSuccess(true); setActive(true); setLoading(false);})
        }catch(e){
            setSuccess(false); setActive(true); setLoading(false)
            console.log(e)
        }
    }

    const updateMyPassword = async () =>{
        if(!passwordValidate(password)){
            setIsCorrectPassword(false)
            return
        }
        setIsCorrectEmail(true)
        if(password !== confirmedPassword){
            setIsPasswordConfirmed(false)
            return
        }
        setIsPasswordConfirmed(true)
        try{
            setLoadingPassword(true);
            updatePassword(password, confirmedPassword).then(data=>{ setPassword(''); setConfirmedPassword('');setLoadingPassword(false);
            setSuccess(true); setActive(true)})
        }catch(e){
            setSuccess(false); setActive(true)
            console.log(e)
        }
    }

  return (
    <div className="setting__page">
        <Helmet>
          <title>Настройки</title>
        </Helmet>
        {active ? <ResponseRequets success={success} active={active} setActive={setActive}></ResponseRequets> : <></>}
        <div className="page__item">
            <MyButton variant="blue" onClick={() => navigate(-1)}> <span className="button__left"></span> Назад</MyButton>
            <div className="page__subtitle">Настройки</div>
        </div>
        <div className="page__form">
            {loading ? <PreLoader/> : <></>}
            <p className="setting__page__subtitle">Персональные данные</p>
            <div className="label">ФИО *</div>
            <input className={isCorrectFullName ? "input" : "input input-error"} type="text" placeholder="ФИО" value={fullName} onChange={e=>setFullName(e.target.value)}></input>
            {isCorrectFullName ? <></> : <div className="label error-label">Введено некорректное имя</div>}
            <div className="label">E-mail *</div>
            <input className={isCorrectEmail ? "input" : "input input-error"} placeholder="e-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)}></input>
            {isCorrectEmail ? <></> : <div className="label error-label">Введен некорректный E-mail</div>}
            <div className="line"></div>
            <div className="page__buttons">
                <MyButton variant="border red" onClick={() => navigate(-1)}>Отмена</MyButton>
                <MyButton variant="green" onClick={updateMyProfile}>Сохранить</MyButton>
            </div>
        </div>
        <div className="page__form">
            {loadingPassword ? <PreLoader/> : <></>}
            <p className="setting__page__subtitle">Изменение пароля</p>
            <div className="label">Новый пароль *</div>
            <input className={isCorrectPassword ? "input" : "input input-error"} type="password" placeholder="новый пароль" value={password} onChange={e=>setPassword(e.target.value)}></input>
            {isCorrectPassword ? <></> : <div className="label error-label">Введен некорректный Пароль</div>}
            <div className="label">Подтверждение пароля *</div>
            <input className={isPasswordConfirmed ? "input" : "input input-error"} type="password" placeholder="подтвердите пароль" value={confirmedPassword} onChange={e=>setConfirmedPassword(e.target.value)}></input>
            {isPasswordConfirmed ? <></> : <div className="label error-label">Пароли не совпадают</div>}
            <div className="line"></div>
            <div className="page__buttons">
                <MyButton variant="green" onClick={updateMyPassword}>Изменить пароль</MyButton>
            </div>
        </div>
    </div>
  )
}

export default SettingsPage