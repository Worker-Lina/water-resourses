import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchChannels, fetchCitySystems, fetchEnvironmentals, fetchReservoirs } from '../../http/reservoirApp';
import i18n from '../../i18n';
import "./menu.css"

const Menu = ({active, setActive}) => {
    const [reservoirs, setReservoirs] = useState([])
    const [channels, setChannels] = useState([])
    const [citySystems, setCitySystems] = useState([])
    const [environmentals, setEnvironmentals] = useState([])

    //притягиваю все пункты меню
    useEffect(() => {
        fetchReservoirs().then(data => {setReservoirs(data.content);})
        fetchChannels().then(data => {setChannels(data.content);})
        fetchCitySystems().then(data => {setCitySystems(data.content);})
        fetchEnvironmentals().then(data => {setEnvironmentals(data.content);})
    }, [i18n.language])

  return (
    <div className={active ? "main__menu active" : "main__menu"}>
        <div className="close__button" onClick={()=>{setActive(false)}}>
            <div className="menu__close"></div>
        </div>
        <nav className="menu">
            <ul>
                <li className="menu__title">Водохранилище</li>
                {reservoirs.map(reservoir => 
                    <li key={reservoir.id} onClick={()=>setActive(false)}> 
                        <Link to={"/objects/"+ reservoir.id} className="menu__item">{reservoir.name}</Link>
                    </li>
                )}
            </ul>
            <ul>
                <li className="menu__title">Каналы</li>
                {channels.map(channel => 
                    <li key={channel.id} onClick={()=>setActive(false)}>
                        <Link to={"/objects/"+ channel.id} className="menu__item">{channel.name}</Link>
                    </li>
                )}
            </ul>
            <ul>
                <li className="menu__title">Городская система</li>
                {citySystems.map(citySystem => 
                    <li key={citySystem.id} onClick={()=>setActive(false)}>
                        <Link to={"/objects/"+ citySystem.id} className="menu__item">{citySystem.name}</Link>
                    </li>
                )}
            </ul>
            <ul>
                <li className="menu__title">Природоохранные объекты</li>
                {environmentals.map(environmental => 
                    <li key={environmental.id} onClick={()=>setActive(false)}>
                        <Link to={"/objects/"+ environmental.id} className="menu__item">{environmental.name}</Link>
                    </li>
                )}
            </ul>
        </nav>
    </div>
  )
};

export default Menu;
