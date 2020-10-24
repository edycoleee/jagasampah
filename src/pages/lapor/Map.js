import React, { useContext, useEffect } from "react";
import { Map, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { DataContext } from "./ContextData";

const LeafletMap = () => {
  const { mapPoints, setMapPoints } = useContext(DataContext);

  // const getClientLocation = useCallback(async () => {
  //   if (!navigator.geolocation) {
  //     alert.show("Your browser does not support geolocation.");
  //   } else {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const {
  //         coords: { latitude, longitude },
  //       } = position;
  //       const mapPoints1 = [...mapPoints];
  //       //mapPoints1[0] = [latitude, longitude];
  //       mapPoints1[0] = [-6.9837621, 110.469170799];
  //       setMapPoints(mapPoints1);
  //       setMapPoints(mapPoints1);
  //     });
  //   }
  // }, [mapPoints]);

  const addMarker = (mapClickInfo) => {
    let updatedArray = [...mapPoints];
    updatedArray[1] = [mapClickInfo.latlng.lat, mapClickInfo.latlng.lng];
    updatedArray[0] = [mapClickInfo.latlng.lat, mapClickInfo.latlng.lng];

    setMapPoints(updatedArray);
  };

  const getMapPoints = (markerPositions) => {
    //console.log(markerPositions);
    //this line successfully reflects the current state of mapPoints when the application runs
    if (markerPositions.length >= 1) return markerPositions;
    else
      return [
        [0, 0],
        [0, 0],
      ];
  };

  useEffect(() => {

    if (!navigator.geolocation) {
      alert.show("Your browser does not support geolocation.");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const {
          coords: { latitude, longitude },
        } = position;
        const mapPoints1 = [...mapPoints];
        mapPoints1[0] = [latitude, longitude];
        setMapPoints(mapPoints1);
        //mapPoints1[0] = [-6.9837621, 110.469170799];
        //setMapPoints(mapPoints1);

      });
    }
    //getClientLocation()
  }, [setMapPoints]);
  
  console.log(mapPoints[0]);

  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });

  
  return (
    <Map
      center={mapPoints[0]}
      zoom={13}
      style={{ height: "100vh" }}
      onClick={addMarker}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {mapPoints.map((point, i) => (
        <Marker
          key={`markers-${i}`}
          position={[point[0], point[1]]}
          icon={icon}
        >
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      ))}
      <Polyline color="red" positions={getMapPoints(mapPoints)} />
    </Map>
  );
};

export default LeafletMap;
