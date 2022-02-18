import React, {useContext, useState} from 'react'
import { Context } from '../..'
import { login } from '../../http/userApi'
import MyButton from '../myButton/MyButton'
import "./loginForm.css"

const LoginForm = ({active, setActive}) => {
    const {user} = useContext(Context)
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')

    const userLogIn = async () => {
      login(email, password).then(data => {
        console.log(data);
        if(data.statusCode === 200){
          user.setUser(user)
          user.setIsAuth(true)
          setActive(false)
        }else{
          alert(data.message)
        }}
      )
    }

  return (
    <div className={active ? "login-form" : "login-form-unvisible"} style={{height:`${window.innerHeight}px`}} onClick={(e)=>{setActive(false); e.stopPropagation()}}>
      <div className="login-form__content" onClick={(e)=>e.stopPropagation()}>
        <div className="login-form-close" onClick={()=>{setActive(false)}}>
            <div className="form-close-button"></div>
        </div>
        <p className="login-form__title"> Авторизация</p>
        <div className="label">E-mail</div>
        <input value={email} placeholder="e-mail" type="email" className="input" onChange={e=>setEmail(e.target.value)}></input>
        <div className="label">Пароль</div>
        <input value={password} type="password" placeholder="password" className="input" onChange={e=>setPassword(e.target.value)}></input>
        <MyButton variant ="blue" onClick={userLogIn}>Войти</MyButton>
      </div>
    </div>
  )
}

export default LoginForm