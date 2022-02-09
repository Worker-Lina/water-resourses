import React from 'react';
import { observer } from 'mobx-react-lite'
import "./App.css"
import './fonts/Segoe.ttf';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Spoiler from './components/spoiler/Spoiler';
import MyReport from './pages/reportPage/MyReport';

const App = observer(() => {
  const [ t, i18n ] = useTranslation();
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

