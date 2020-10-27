import React, { useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Develop } from "../util/firebase";

const GetMapLocation = ({ mapPoints, setMapPoints }) => {
  useEffect(() => {
    if (!navigator.geolocation) {
      alert.show("Your browser does not support geolocation.");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const {
          coords: { latitude, longitude },
        } = position;
        const mapPoints1 = [latitude, longitude];
        setMapPoints(mapPoints1);
      });
    }
    if (Develop) {
      console.log("EFFECT : ", mapPoints);
    }
  }, []);

  const zoom = 14;

  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  const onHandleClick = (e) => {
    setMapPoints([e.latlng.lat, e.latlng.lng]);
  };
  return (
    <Map center={mapPoints} zoom={zoom} onClick={onHandleClick}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={mapPoints} icon={icon}>
        <Popup>
          apakah benar lokasi ini? <br /> OK.
        </Popup>
      </Marker>
    </Map>
  );
};

export default GetMapLocation;
