import React, { useContext } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { DataContext } from "./ContextData";
import { Develop } from "../../util/firebase";

const LeafletMapAll = () => {
  const { semuaData } = useContext(DataContext);

  const zoom = 14;

  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });

  // const MarkerAll = [
  //   {
  //     mapPoints: [-6.9136460318349275, 110.64210891723634],
  //     info: "lap tgl bla bla",
  //   },
  //   {
  //     mapPoints: [-6.8955818902249515, 110.63627243041994],
  //     info: "lap tgl blu blu",
  //   },
  // ];

  const centerPoin = [-6.8955818902249515, 110.63627243041994];

  let ArrNewMarker = [];
  semuaData.map((data, index) => {
    const { c_lat, c_lon, c_tanggal, c_lokasi, c_ket } = data;
    const newMarker = {
      mapPoints: [c_lat, c_lon],
      info: `${c_tanggal} ${c_lokasi} ${c_ket}`,
    };
    return ArrNewMarker.push(newMarker);
  });
  if (Develop) {
    console.log("STEP GET LOC :", ArrNewMarker);
  }

  return (
    <Map center={centerPoin} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {ArrNewMarker.map((mark, index) => (
        <Marker position={mark.mapPoints} icon={icon} key={index}>
          <Popup>{mark.info}</Popup>
        </Marker>
      ))}
    </Map>
  );
};

export default LeafletMapAll;
