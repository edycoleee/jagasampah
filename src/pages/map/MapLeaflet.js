import React, { useEffect, useState } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function MapLeaflet() {

  const [position, setPosition] = useState({
    lat: -6.8909,
    lng: 110.6396,
  });

useEffect(()=>{
    if (!navigator.geolocation) {
        alert.show("Your browser does not support geolocation.");
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          const {
            coords: { latitude, longitude },
          } = position;
          const mapPoints = [latitude, longitude];
          setPosition(mapPoints);
        });
      }
},[])

console.log(position);
  const zoom = 14;

  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });

const onHandleClick = (e) => {
    setPosition([e.latlng.lat, e.latlng.lng])
}

  return (
    <Map center={position} zoom={zoom} onClick={onHandleClick}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  );
}

export default MapLeaflet;
