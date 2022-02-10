import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Context } from '../..';
import MyButton from '../../components/myButton/MyButton';
import { registration } from '../../http/userApi';
import { LOGIN_ROUTE, MAINPAGE_ROUTE } from '../../utils/consts';
import "./loginForm.css"


const LoginForm = () => {
  const {user} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [login, setLogin] =useState('')
  const [password, setPassword] =useState('')

  const click = async () => {
    try {
        let data;
        if (isLogin) {
            data = await login(login, password);
        } else {
            data = await registration(login, password);
        }
        user.setUser(user)
        user.setIsAuth(true)
        navigate.push(MAINPAGE_ROUTE)
    } catch (e) {
        alert(e.response.data.message)
    }

  }

  return <div className="login-form">
      <form className="login-form__content">
        <p className="login-form__title"> {isLogin ? "Войти" : "Регистрация"}</p>
        <input value={login} placeholder="login" className="input" onChange={e=>setLogin(e.target.value)}></input>
        <input value={password} type="password" placeholder="password" className="input" onChange={e=>setPassword(e.target.value)}></input>
        {isLogin 
          ? <div>Нет аккаунта? <Link to={LOGIN_ROUTE}>Зарегистрируйся!</Link> </div>
          :<div>Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите!</Link></div>}
        <MyButton variant="blue" onClick={click} >
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </MyButton>
      </form>
  </div>;
};

export default LoginForm;
