import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import MyButton from '../../components/myButton/MyButton'
import ResponseRequets from '../../components/responseRequest/ResponseRequets'
import { updatePassword, updateProfile, updateUser } from '../../http/userApi'
import { emailValidation, passwordValidate } from '../../utils/validate'
import "./settingsPage.css"

const SettingsPage = () => {
    const [active, setActive]=useState(false)
    const [success, setSuccess] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [isCorrectEmail, setIsCorrectEmail] = useState(true)
    const [isCorrectPassword, setIsCorrectPassword] = useState(true)
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true)

    const updateMyProfile = async () =>{
        if(!emailValidation(email)){
            setIsCorrectEmail(false)
            return
        }
        try{
            updateProfile(fullName, email).then(data=>{console.log(data); setEmail(''); setFullName('');
            setSuccess(true); setActive(true)})
        }catch(e){
            setSuccess(false); setActive(true)
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
            updatePassword(password, confirmedPassword).then(data=>{console.log(data); setPassword(''); setConfirmedPassword('');
            setSuccess(true); setActive(true)})
        }catch(e){
            setSuccess(false); setActive(true)
            console.log(e)
        }
    }

  return (
    <div className="setting__page">
        {active ? <ResponseRequets success={success} active={active} setActive={setActive}></ResponseRequets> : <></>}
        <div className="page__item">
            <Link to={"/"}><MyButton variant="blue"> <span className="button__left"></span> Назад</MyButton></Link>
            <div className="page__subtitle">Настройки</div>
        </div>
        <div className="page__form">
            <p className="setting__page__subtitle">Персональные данные</p>
            <div className="label">ФИО *</div>
            <input className="input" type="text" placeholder="ФИО" value={fullName} onChange={e=>setFullName(e.target.value)}></input>
            <div className="label">E-mail *</div>
            <input className={isCorrectEmail ? "input" : "input input-error"} placeholder="e-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)}></input>
            {isCorrectEmail ? <></> : <div className="label error-label">Введен некорректный E-mail</div>}
            <div className="line"></div>
            <div className="page__buttons">
                <MyButton variant="border red">Отмена</MyButton>
                <MyButton variant="green" onClick={updateMyProfile}>Сохранить</MyButton>
            </div>
        </div>
        <div className="page__form">
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