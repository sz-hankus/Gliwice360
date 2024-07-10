import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "./PointMarker.css";

// TODO: probably copy this over to the public folder - huge chunks of base64
// inside the JS bundle seem undesirable
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// react-leaflet somehow doesn't include the default icon, so it has to be done
// manually
let DefaultIcon = L.icon({
		iconUrl:       icon,
		iconRetinaUrl: iconRetina,
		shadowUrl:      iconShadow,
		iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize:  [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export interface PointMarkerProps {
  point: Point;
}


export const PointMarker = ({ point }: PointMarkerProps) => {
  const navigate = useNavigate();
  return (
    <Marker
      key={point.name}
      position={[point.coordinates.lat, point.coordinates.lng]}
      riseOnHover={true}
      eventHandlers={{
        mouseover: (e) => e.target.openPopup(),
        mouseout: (e) => e.target.closePopup(),
        mousedown: () => {console.log(point); navigate(`/panoview/${point.id}`);},
      }}
    >
      <Popup closeOnEscapeKey={true} closeButton={false} maxWidth={1000} >
        <div className="popup-container">
          <div id="text">
            <div id="name">{point.name}</div>
            <div id="description">{point.description}</div>
          </div>
          <div id="image">
            <img alt="loading" src={`/thumbnails/${point.thumbnailId}.jpg`} />
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
