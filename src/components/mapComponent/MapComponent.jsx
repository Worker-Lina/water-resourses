import React, { useState } from 'react';
import "./mapComponent.css"
import { ImageOverlay, MapContainer, Marker, Polygon, Polyline, Popup, TileLayer, useMapEvents, ZoomControl } from 'react-leaflet';
import river from "../../imgs/river.svg"
import {  imageBounds, limeOptions, markers, polygones, polylines, titles } from './MapData';
import Modal from '../modal/Modal';
import { divIcon } from 'leaflet';

const MapComponent = () => {
  const [active, setActive]=useState(false)
  const [idItem, setIdItem] = useState(41)



  return(<div className="map__container">
    <MapContainer className="myMap" center={[42.97045762155687,68.94681841702852]} zoom={9} scrollWheelZoom={false}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Orq9UsgNWFD0JZUL2f7X"
      />
      
      {markers.map(marker => 
        <Marker key={marker.id} position={marker.position} icon={marker.icon} title={marker.title} eventHandlers={{click:()=>{
          setIdItem(marker.id)
          setActive(!active)
        }}}> </Marker>
      )}

      {polygones.map(polygone => 
        <Polygon key={polygone.id} pathOptions={limeOptions} positions={polygone.positions}></Polygon>  
      )}

      {polylines.map(polyline => 
        <Polyline className={polyline.color === "white" ? "myPolyline" : ""} key={polyline.id} pathOptions={polyline.color} positions={polyline.positions}></Polyline>  
      )}
      <ImageOverlay bounds={imageBounds} url={river}></ImageOverlay>


      {titles.map(title => 
        <Marker key={title.id} position={title.position} icon ={divIcon({html: title.html, className:title.className})}></Marker>
      )}

    </MapContainer>
      {active ? <Modal id={idItem} active={active} setActive={setActive}></Modal>: <></>}
    </div>
  )
};

export default MapComponent;
