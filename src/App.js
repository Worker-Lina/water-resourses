import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite'
import "./App.css"
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Context } from '.';
import { check, resetPassword } from './http/userApi';
import CreateObject from './pages/createObject/CreateObject';
import ObjectsPage from './pages/objectsPage/ObjectsPage';
import MainPage from './pages/mainPage/MainPage';
import Loading from './components/loading/Loading';

const App = observer(() => {
  const [ t, i18n ] = useTranslation();
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      check().then(data => {
        console.log(data)
          user.setUser(true)
          user.setIsAuth(true)
      }).finally(() => setLoading(false))
  }, [])

  if (loading) {
      return <Loading />
  }

  return (
    <BrowserRouter >
      <Helmet>
        <html lang={i18n.language}/>
      </Helmet>

      <NavBar/>
      <AppRouter/>
      <Footer/>

    </BrowserRouter>
  )
});

export default App;

