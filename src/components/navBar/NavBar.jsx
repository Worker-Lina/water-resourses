import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import {Link } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { Context } from '../..';
import { OBJECTS_ROUTE, SETTINGS_ROUTE, USERS_ROUTE } from '../../utils/consts';
import LoginForm from '../loginForm/LoginForm';
import Menu from '../menu/Menu';
import MyButton from '../myButton/MyButton';
import "./navbar.css"

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const [active, setActive] = useState(false)
    const [hover, setHover] = useState(false)
    const [ruButton, setRuButton] = useState(false)
    const [kzButton, setKzButton] = useState(false)
    const [enButton, setEnButton] = useState(false)
    const [loginFormActive, setLoginFormActive]=useState(false)
    const [ t, i18n ] = useTranslation();
    const menuItems = [{id:1, title: "Настройки", url: ""},
    {id:2, title: "Пользователи", url: ""},
    {id:3, title: "Объекты", url: ""},
    {id:4, title: "Выйти"}]


    useEffect(()=>{
      i18n.language === "ru" ? setRuButton(true)
      : i18n.language === "en" ? setEnButton(true)
      : i18n.language === "kk" ? setKzButton(true) :
      setRuButton(true)
    }, [])

    const changeLanguage = (language) => {
      i18n.changeLanguage(language);
    };

    if(active || loginFormActive){
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }

    const logout = () => {
      localStorage.removeItem('token');
      user.setUser({})
      user.setIsAuth(false)
    }
    
  return (<>
        <div id="topNav" className="navbar">
          <div className="navbar__right">
                <div className="navbar__menu-div" onClick={()=>{setActive(!active)}}>
                  <div className="navbar__menu"></div>
                </div>
                <Link to="/" className="navbar__title" onClick={()=>setActive(false)}> {t("title")} </Link>      
            </div>
            <div className="navbar__right"> 
                <button className={kzButton ? "navbar__lang active" : "navbar__lang"} onClick={() => {changeLanguage("kk"); setKzButton(true); setRuButton(false);setEnButton(false);}}>ҚАЗ</button>
                <button className={ruButton ? "navbar__lang active" : "navbar__lang"} onClick={() => {changeLanguage("ru"); setKzButton(false); setRuButton(true);setEnButton(false)}}>РУС</button>
                <button className={enButton ? "navbar__lang active" : "navbar__lang"} onClick={() => {changeLanguage("en"); setKzButton(false); setRuButton(false);setEnButton(true)}}>ENG</button>
                <div className="btn-hover" onMouseLeave={()=>setHover(false)} >
                  {user.isAuth ? 
                    <MyButton variant="border" onMouseEnter={()=>setHover(true)}>
                      <svg className="btn-icon" width="14" height="16" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 11C11.533 11 14 8.532 14 5.5C14 2.468 11.533 0 8.5 0C5.467 0 3 2.468 3 5.5C3 8.532 5.467 11 8.5 11ZM8.5 2C10.43 2 12 3.57 12 5.5C12 7.43 10.43 9 8.5 9C6.57 9 5 7.43 5 5.5C5 3.57 6.57 2 8.5 2ZM16.5 15.967V16.978C16.5 17.974 16.136 18.929 15.475 19.667C15.277 19.888 15.004 20 14.729 20C14.492 20 14.253 19.916 14.062 19.745C13.65 19.377 13.616 18.744 13.984 18.333C14.316 17.962 14.499 17.48 14.499 16.978V15.967C14.499 14.568 13.572 13.358 12.246 13.025C12.054 12.977 11.849 13.001 11.685 13.095C9.704 14.197 7.28597 14.191 5.32397 13.101C5.15097 13.002 4.947 12.977 4.755 13.025C3.426 13.358 2.5 14.568 2.5 15.967V16.978C2.5 17.481 2.68301 17.962 3.01501 18.333C3.38301 18.744 3.34801 19.377 2.93701 19.745C2.52501 20.114 1.89302 20.078 1.52502 19.667C0.864024 18.929 0.5 17.974 0.5 16.978V15.967C0.5 13.65 2.04903 11.642 4.26703 11.085C4.95403 10.91 5.69803 11.011 6.30603 11.358C7.65503 12.106 9.33598 12.1121 10.704 11.3521C11.303 11.0091 12.047 10.909 12.735 11.084C14.951 11.642 16.5 13.649 16.5 15.967Z" fill="#5584AC"/>
                      </svg>
                      Кабинет
                    </MyButton>
                    :
                    <MyButton variant="border" onClick={()=>setLoginFormActive(!loginFormActive)} onMouseEnter={()=>setHover(true)}>
                      <svg className="btn-icon" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.75 4.25V11.75C13.75 13.8177 12.0677 15.5 10 15.5H7C6.586 15.5 6.25 15.1647 6.25 14.75C6.25 14.3353 6.586 14 7 14H10C11.2405 14 12.25 12.9905 12.25 11.75V4.25C12.25 3.0095 11.2405 2 10 2H7C6.586 2 6.25 1.66475 6.25 1.25C6.25 0.83525 6.586 0.5 7 0.5H10C12.0677 0.5 13.75 2.18225 13.75 4.25ZM9.19225 8.28647C9.268 8.10347 9.268 7.89653 9.19225 7.71353C9.154 7.62128 9.09925 7.53874 9.0295 7.46899L6.03025 4.46973C5.737 4.17648 5.263 4.17648 4.96975 4.46973C4.6765 4.76298 4.6765 5.23702 4.96975 5.53027L6.6895 7.25H1C0.586 7.25 0.25 7.58525 0.25 8C0.25 8.41475 0.586 8.75 1 8.75H6.6895L4.96975 10.4697C4.6765 10.763 4.6765 11.237 4.96975 11.5303C5.116 11.6765 5.308 11.75 5.5 11.75C5.692 11.75 5.884 11.6765 6.03025 11.5303L9.0295 8.53101C9.09925 8.46126 9.154 8.37872 9.19225 8.28647Z" fill="#5584AC"/>
                      </svg>
                      Войти
                    </MyButton>
                  }
                  {user.isAuth && hover ? <div className="popupMenu">
                      <Link to={SETTINGS_ROUTE}>Настройки</Link>
                      <div className="popupMenu__line"></div>
                      <Link to={USERS_ROUTE}>Пользователи</Link>
                      <div className="popupMenu__line"></div>
                      <Link to={OBJECTS_ROUTE}>Объекты</Link>
                      <div className="popupMenu__line"></div>
                      <p onClick={() => logout()} className="navbar-click">Выйти
                      </p>
                    </div> : <></>}
                </div>
            </div>
        </div>
        <LoginForm active={loginFormActive} setActive={setLoginFormActive}></LoginForm>
        <Menu active={active} setActive={setActive}></Menu>
        </>
  )
});

export default NavBar;
