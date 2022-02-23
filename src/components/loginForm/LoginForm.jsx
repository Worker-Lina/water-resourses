import React, {useContext, useState} from 'react'
import { Context } from '../..'
import { login } from '../../http/userApi'
import Loading from '../loading/Loading'
import MyButton from '../myButton/MyButton'
import ResponseRequets from '../responseRequest/ResponseRequets'
import "./loginForm.css"
import { useForm } from "react-hook-form";

const LoginForm = ({active, setActive}) => {
  const {user} = useContext(Context)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [preLoader, setPreLoader] =useState(false);
  const [responseActive, setResponseActive] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async(item) => {
    setPreLoader(true);
    login(item.Email, item.Password).then(data => {
      console.log(data)
      user.setUser(user);user.setIsAuth(true);
      setActive(false);setPreLoader(false);
      setResponseActive(true);setSuccess(true)
    })
  }

  return (
  <>
    {preLoader && <Loading/>}
    {responseActive && <ResponseRequets success={success} setActive={setResponseActive}/>}
    {active ?
    <div className="login-form" onClick={(e)=>{setActive(false); e.stopPropagation()}}>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form__content" onClick={(e)=>e.stopPropagation()}>
        <div className="login-form-close" onClick={()=>{setActive(false)}}>
            <div className="form-close-button"></div>
        </div>
        <p className="login-form__title"> Авторизация</p>
        <div className="label">E-mail</div>
          <input className={errors?.Email ? "input input-error" : "input"} 
            type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} 
          />
        {errors?.Email && <div className="label error-label">Введен некорректный E-mail</div>}
        <div className="label">Пароль</div>
          <input className={errors?.Password ? "input input-error" : "input"} type="password" placeholder="Password" {...register("Password", 
            {required: true})} 
          />
        {errors?.Password && <div className="label error-label">Поле "Пароль" обязательно для заполнения</div>}
        <input className="btn btn-blue" type="submit" />
      </form>      
    </div> : <></> } </>
  )
}

export default LoginForm