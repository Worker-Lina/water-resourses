import React, { useRef, useState } from 'react';
import "./mapComponent.css"
import { MapContainer, Marker, Polygon, Polyline, TileLayer } from 'react-leaflet';
import {  animPolylines, polygones, polylines, titles } from './MapData';
import Modal from '../modal/Modal';
import { divIcon, polyline} from 'leaflet';
import {antPath} from "leaflet-ant-path";
import { useEffect } from 'react/cjs/react.development';
import { fetchObjects } from '../../http/reservoirApp';
import vector from "../../imgs/Vector.svg"
import orange from "../../imgs/orange.svg"
import green from "../../imgs/green.svg"
import { Icon } from 'leaflet';

const MapComponent = ({textVisible, setTextVisible}) => {
  const [active, setActive]=useState(false)
  const [center, setCenter]=useState([42.97045762155687,68.94681841702852])
  const [idItem, setIdItem] = useState(41)
  const [zoom, setZoom] = useState(9)
  const [loading, setLoading] = useState(false)
  const maxBounds = [[41.51686545959234,64.83128339062499],[44.75806942902366,74.2081144453125]]
  const mapRef = useRef()
  const [markers, setMarkers]=useState()
  const [width] = useState(window.screen.width)

  useEffect(()=>{
    if(window.screen.width < 640 && zoom !== 7){
      setZoom(7)
    }
  }, [width])

  var LeafIcon = Icon.extend({
      options: {
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
      }
  });
  const blueIcon = new LeafIcon({iconUrl: vector})
  const orangeIcon = new LeafIcon({iconUrl: orange})
  const greenIcon = new LeafIcon({iconUrl: green})
  const limeOptions = { color: '#0FB7E6' }

  useEffect(()=>{
      fetchObjects().then(data => {setMarkers(data.content); setLoading(true);})
  }, [])

  //функция для приближения карты к выделенному объекту
  function handleOnFlyTo(position) {
    const map  = mapRef.current;
    map.flyTo([position.lat, position.lng + 0.2], 10, {
      duration: 1
    });
  }
  //функция для добавления на карту анимированных линий
  function addPolylinesToMap(){
    const map  = mapRef.current;
    for(let i=0;i<animPolylines.length;i++){
      const antPolyline = antPath(animPolylines[i].positions,  { use: polyline, delay: 500, color: animPolylines[i].color, 
      pulseColor: animPolylines[i].pulseColor, weight:3, dashArray: [5,12], reverse: true});
      antPolyline.addTo(map)
    }
  }

  const mapToFullScreen = ()=>{
    setTextVisible(!textVisible)
    let height = window.screen.width < 640 ? window.screen.height - 50 : window.screen.height - 80
    if(textVisible){
      document.getElementsByClassName('myMap')[0].style.height = height + "px";
      document.getElementById('footer').classList.add('footer-hidden');
    }else{
      document.getElementsByClassName('myMap')[0].classList.remove('myMap-full');
      document.getElementById('footer').classList.remove('footer-hidden');
    }
  }

  return(<div className="map__container">
     <MapContainer whenCreated={ mapInstance => { mapRef.current = mapInstance; addPolylinesToMap() } } className="myMap" center={center} zoom={zoom} scrollWheelZoom={false} zoomControl={false} doubleClickZoom={false} maxBounds={maxBounds}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=Orq9UsgNWFD0JZUL2f7X" minZoom={8}
      />
      {loading ?
      markers.map(marker => 
        <Marker key={marker.id} position={marker.location} icon={marker.type.id === 1 ? blueIcon : marker.type.id === 2 ? greenIcon : orangeIcon} title={marker.name} eventHandlers={{click:()=>{
          setIdItem(marker.id); 
          setActive(true);
          handleOnFlyTo(marker.location);
        }}}> </Marker>
      ) : <></>}
      {polylines.map(poly => 
        <Polyline key={poly.id} positions={poly.positions} pathOptions = {{color: poly.color}} ></Polyline>
      )}
      {polygones.map(polygone => <Polygon key={polygone.id} pathOptions={limeOptions} positions={polygone.positions}></Polygon> )}
      {titles.map(title => <Marker key={title.id} position={title.position} icon ={divIcon({html: title.html, className:title.className})}></Marker>)}
      <div className="full-screen" onClick={mapToFullScreen}><svg className="full-screen-svg"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.9524 14.6667H17.8095C16.976 14.6667 16.1766 14.9978 15.5872 15.5872C14.9978 16.1766 14.6667 16.976 14.6667 17.8095V20.9524C14.6667 21.2302 14.7771 21.4967 14.9735 21.6932C15.17 21.8896 15.4365 22 15.7143 22C15.9922 22 16.2586 21.8896 16.4551 21.6932C16.6516 21.4967 16.7619 21.2302 16.7619 20.9524V17.8095C16.7619 17.5317 16.8723 17.2652 17.0688 17.0688C17.2652 16.8723 17.5317 16.7619 17.8095 16.7619H20.9524C21.2302 16.7619 21.4967 16.6516 21.6932 16.4551C21.8896 16.2586 22 15.9922 22 15.7143C22 15.4365 21.8896 15.17 21.6932 14.9735C21.4967 14.7771 21.2302 14.6667 20.9524 14.6667Z" fill="#5584AC"/>
      <path d="M8.28571 22C8.56356 22 8.83003 21.8896 9.02649 21.6932C9.22296 21.4967 9.33333 21.2302 9.33333 20.9524V17.8095C9.33333 16.976 9.00221 16.1766 8.41281 15.5872C7.82341 14.9978 7.02401 14.6667 6.19048 14.6667H3.04762C2.76977 14.6667 2.50331 14.7771 2.30684 14.9735C2.11037 15.17 2 15.4365 2 15.7143C2 15.9922 2.11037 16.2586 2.30684 16.4551C2.50331 16.6516 2.76977 16.7619 3.04762 16.7619H6.19048C6.46832 16.7619 6.73479 16.8723 6.93125 17.0688C7.12772 17.2652 7.23809 17.5317 7.23809 17.8095V20.9524C7.23809 21.2302 7.34847 21.4967 7.54494 21.6932C7.7414 21.8896 8.00787 22 8.28571 22Z" fill="#5584AC"/>
      <path d="M20.9524 7.23809H17.8095C17.5317 7.23809 17.2652 7.12772 17.0688 6.93125C16.8723 6.73479 16.7619 6.46832 16.7619 6.19048V3.04762C16.7619 2.76977 16.6516 2.50331 16.4551 2.30684C16.2586 2.11037 15.9922 2 15.7143 2C15.4365 2 15.17 2.11037 14.9735 2.30684C14.7771 2.50331 14.6667 2.76977 14.6667 3.04762V6.19048C14.6667 7.02401 14.9978 7.82341 15.5872 8.41281C16.1766 9.00221 16.976 9.33333 17.8095 9.33333H20.9524C21.2302 9.33333 21.4967 9.22296 21.6932 9.02649C21.8896 8.83003 22 8.56356 22 8.28571C22 8.00787 21.8896 7.7414 21.6932 7.54494C21.4967 7.34847 21.2302 7.23809 20.9524 7.23809Z" fill="#5584AC"/>
      <path d="M9.33333 3.04762C9.33333 2.76977 9.22296 2.50331 9.02649 2.30684C8.83003 2.11037 8.56356 2 8.28571 2C8.00787 2 7.7414 2.11037 7.54494 2.30684C7.34847 2.50331 7.23809 2.76977 7.23809 3.04762V6.19048C7.23809 6.46832 7.12772 6.73479 6.93125 6.93125C6.73479 7.12772 6.46832 7.23809 6.19048 7.23809H3.04762C2.76977 7.23809 2.50331 7.34847 2.30684 7.54494C2.11037 7.7414 2 8.00787 2 8.28571C2 8.56356 2.11037 8.83003 2.30684 9.02649C2.50331 9.22296 2.76977 9.33333 3.04762 9.33333H6.19048C7.02401 9.33333 7.82341 9.00221 8.41281 8.41281C9.00221 7.82341 9.33333 7.02401 9.33333 6.19048V3.04762Z" fill="#5584AC"/>
      </svg></div>

    </MapContainer> 
      {active ? <Modal id={idItem} active={active} setActive={setActive} mapRef={mapRef} zoom={zoom} center={center}></Modal>: <></>}
    </div>
  )
};

export default MapComponent;
