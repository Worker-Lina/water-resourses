import React from 'react'
import Helmet from 'react-helmet'
import { Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import Loading from '../../components/loading/Loading'
import PreLoader from '../../components/loading/PreLoader'
import MyButton from '../../components/myButton/MyButton'
import ResponseRequets from '../../components/responseRequest/ResponseRequets'
import { check, updatePassword, updateProfile, updateUser } from '../../http/userApi'
import { Label, LabelError, Line, Page, PageForm, PageHeader, PageSubtitle } from '../../utils/styles'
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
            setIsCorrectFullName(false);
            return
        }
        setIsCorrectFullName(true)
        if(!emailValidation(email)){
            setIsCorrectEmail(false);
            return
        }
        setIsCorrectEmail(true)
        try{
            setLoading(true);
            updateProfile(fullName, email).then(data=>{setSuccess(true); setActive(true); setLoading(false);});
        }catch(e){
            setSuccess(false); setActive(true); setLoading(false);
            console.log(e);
        }
    }

    const updateMyPassword = async () =>{
        if(!passwordValidate(password)){
            setIsCorrectPassword(false);
            return
        }
        setIsCorrectEmail(true)
        if(password !== confirmedPassword){
            setIsPasswordConfirmed(false);
            return
        }
        setIsPasswordConfirmed(true);
        try{
            setLoadingPassword(true);
            updatePassword(password, confirmedPassword).then(data=>{ setPassword(''); setConfirmedPassword('');setLoadingPassword(false);
            setSuccess(true); setActive(true)});
        }catch(e){
            setSuccess(false); setActive(true);
            console.log(e);
        }
    }

  return (
    <Page>
        <Helmet>
          <title>Настройки</title>
        </Helmet>
        {active ? <ResponseRequets success={success} active={active} setActive={setActive}></ResponseRequets> : <></>}
        <PageHeader>
            <MyButton variant="blue" onClick={() => navigate(-1)}> <span className="button__left"></span> Назад</MyButton>
            <div className="page__subtitle">Настройки</div>
        </PageHeader>
        <PageForm>
            {loading ? <PreLoader/> : <></>}
            <PageSubtitle>Персональные данные</PageSubtitle>
            <Label>ФИО *</Label>
            <input className={isCorrectFullName ? "input" : "input input-error"} type="text" placeholder="ФИО" value={fullName} onChange={e=>setFullName(e.target.value)}></input>
            {isCorrectFullName ? <></> : <LabelError>Введено некорректное имя</LabelError>}
            <Label>E-mail *</Label>
            <input className={isCorrectEmail ? "input" : "input input-error"} placeholder="e-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)}></input>
            {isCorrectEmail ? <></> : <LabelError>Введен некорректный E-mail</LabelError>}
            <Line/>
            <div className="page__buttons">
                <MyButton variant="border red" onClick={() => navigate(-1)}>Отмена</MyButton>
                <MyButton variant="green" onClick={updateMyProfile}>Сохранить</MyButton>
            </div>
        </PageForm>
        <PageForm>
            {loadingPassword ? <PreLoader/> : <></>}
            <PageSubtitle>Изменение пароля</PageSubtitle>
            <Label>Новый пароль *</Label>
            <input className={isCorrectPassword ? "input" : "input input-error"} type="password" placeholder="новый пароль" value={password} onChange={e=>setPassword(e.target.value)}></input>
            {isCorrectPassword ? <></> : <LabelError>Введен некорректный Пароль</LabelError>}
            <Label>Подтверждение пароля *</Label>
            <input className={isPasswordConfirmed ? "input" : "input input-error"} type="password" placeholder="подтвердите пароль" value={confirmedPassword} onChange={e=>setConfirmedPassword(e.target.value)}></input>
            {isPasswordConfirmed ? <></> : <LabelError>Пароли не совпадают</LabelError>}
            <Line/>
            <div className="page__buttons">
                <MyButton variant="green" onClick={updateMyPassword}>Изменить пароль</MyButton>
            </div>
        </PageForm>
    </Page>
  )
}

export default SettingsPage