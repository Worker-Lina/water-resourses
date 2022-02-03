import React from 'react';
import { observer } from 'mobx-react-lite'
import "./App.css"
import './fonts/Segoe.ttf';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import MapComponent from './components/mapComponent/MapComponent';
import MainPage from './pages/mainPage/MainPage';

const App = observer(() => {
  return (
    <BrowserRouter >
      <NavBar></NavBar>
      <AppRouter></AppRouter>
      <Footer></Footer>
    </BrowserRouter>
  )
});

export default App;

