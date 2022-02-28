import React from 'react'
import Helmet from 'react-helmet'
import { Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import PreLoader from '../../components/loading/PreLoader'
import MyButton from '../../components/myButton/MyButton'
import ResponseRequets from '../../components/responseRequest/ResponseRequets'
import { check, updatePassword, updateProfile, updateUser } from '../../http/userApi'
import { Label, LabelError, Line, Page, PageForm, PageHeader, PageSubtitle } from '../../utils/styles'
import { emailValidation, passwordValidate, nameValidate } from '../../utils/validate'
import "./settingsPage.css"
import { useForm } from "react-hook-form";

const SettingsPage = () => {
    const navigate = useNavigate();
    const [active, setActive]=useState(false)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading]  =useState(false)
    const [loadingPassword, setLoadingPassword]  =useState(false)
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    useEffect(()=>{
        setLoading(true);
        check().then(data=> {setValue("email",data.content.email); setValue("name",data.content.name); setLoading(false)})
    }, [])

    const updateMyPassword = async (data) =>{
        try{
            setLoadingPassword(true);
            updatePassword(data.password, data.confirmedPassword).then(data=>{console.log("pas ",data);setLoadingPassword(false);
            setSuccess(true); setActive(true)});
        }catch(e){
            setSuccess(false); setActive(true);
            console.log(e);
        }
    }

    const onSubmit = async (data) => {
        try{
            setLoading(true);
            updateProfile(data.name, data.email).then(data=>{setSuccess(true); setActive(true); setLoading(false);});
        }catch(e){
            setSuccess(false); setActive(true); setLoading(false);
            console.log(e);
        }
    }

  return (
    <Page>
        <Helmet> <title>Настройки</title> </Helmet>
        {active ? <ResponseRequets success={success} active={active} setActive={setActive}></ResponseRequets> : <></>}
        <PageHeader>
            <MyButton variant="blue" onClick={() => navigate(-1)}> <span className="button__left"></span> Назад</MyButton>
            <div className="page__subtitle">Настройки</div>
        </PageHeader>
        <PageForm onSubmit={handleSubmit(onSubmit)}>
            {loading ? <PreLoader/> : <></>}
            <PageSubtitle>Персональные данные</PageSubtitle>
            <Label>ФИО *</Label>
            <input {...register("name", {required: true, minLength: 4})} className={errors?.name ? "input input-error" : "input"} type="text" placeholder="ФИО" />
            {errors?.name && <LabelError>Введено некорректное имя</LabelError>}
            <Label>E-mail *</Label>
            <input {...register("email", {required: true, pattern: /^\S+@\S+$/i})} className={errors?.email ? "input input-error" : "input"} placeholder="e-mail" type="email" ></input>
            {errors?.email && <LabelError>Введен некорректный E-mail</LabelError>}
            <Line/>
            <div className="page__buttons">
                <MyButton variant="border red" onClick={() => navigate(-1)}>Отмена</MyButton>
                <MyButton variant="green" onClick={()=>onSubmit}>Сохранить</MyButton>
            </div>
        </PageForm>
        <PageForm onSubmit={handleSubmit(updateMyPassword)}>
            {loadingPassword ? <PreLoader/> : <></>}
            <PageSubtitle>Изменение пароля</PageSubtitle>
            <Label>Новый пароль *</Label>
            <input {...register("password", {required: true, minLength: 4})} className={errors?.password ? "input input-error" : "input"} type="password" placeholder="новый пароль" ></input>
            {errors?.password && <LabelError>Введен некорректный Пароль</LabelError>}
            <Label>Подтверждение пароля *</Label>
            <input {...register("confirmedPassword", {validate: value => value === getValues("password")})} className={errors?.confirmedPassword ? "input input-error" : "input"} type="password" placeholder="подтвердите пароль"></input>
            {errors?.confirmedPassword && <LabelError>Пароли не совпадают</LabelError>}
            <Line/>
            <div className="page__buttons">
                <MyButton variant="green" onClick={()=>updateMyPassword}>Изменить пароль</MyButton>
            </div>
        </PageForm>
    </Page>
  )
}

export default SettingsPage