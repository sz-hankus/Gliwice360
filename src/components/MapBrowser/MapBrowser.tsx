import { MapContainer, TileLayer, ZoomControl, GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { useRef } from "react";
import { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { PointMarker } from "../PointMarker/PointMarker";
import { Navbar } from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./MapBrowser.css";

import _points from "../../data/points.json";
const pointsData: Point[] = _points;

import _gliwiceBorder from "../../data/gliwice_border.json";
// @ts-ignore
const gliwiceBorder: GeoJsonObject = _gliwiceBorder;

export const MapBrowser = () => {
  const mapRef = useRef<Map>(null);
  const navigate = useNavigate();

  // const zoom = () => {
  //   mapRef.current?.zoomIn(1);
  //   console.log(`zoom: ${mapRef.current?.getZoom()}`);
  // };

  const goToPanoview = (point: Point) =>
    navigate(`/panoview/${point.id}`);

  const flyToPoint = (point: Point) =>
    mapRef.current?.flyTo(point.coordinates, 18, {duration: 0.8});

  return (
    <>
      <Navbar onResultPanoClick={goToPanoview} onResultPinClick={flyToPoint} />
      <div id="mapcontainer">
        <MapContainer
          center={[50.2941356, 18.6654254]}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
          ref={mapRef}
          maxBounds={[[50.3772, 18.5147], [50.2158, 18.7708]]}
        >
          <GeoJSON data={gliwiceBorder} pathOptions={{fillColor: "transparent"}} />
          {pointsData.map((point) => (
            <PointMarker point={point} key={point.name} />
          ))}
          
          <ZoomControl position="bottomright" zoomInText="+" zoomOutText="-" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </>
  );
};
