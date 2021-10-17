import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'

interface Props {
  carParks: CarParkEntry[];
}

const CarParkMap = ({ carParks }: Props) => {

  const icon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor:  [1, -25],
  })

  return (
    <MapContainer
      zoom={13}
      center={[65.01201845, 25.47747895]}
      scrollWheelZoom={true}
      >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {carParks.map((carPark:CarParkEntry) => {
        if (carPark.lat === undefined || carPark.lon === undefined) return null

        return <Marker
          key={carPark.carParkId}
          position={[Number(carPark.lat), Number(carPark.lon)]}
          icon={icon}
          >
          <Popup>
            <div className="text-center">
              <strong className="text-blue-500">{carPark.name}</strong>
              <br />
              <strong>{carPark.spacesAvailable}</strong> <span className="text-gray-400">/ {carPark.maxCapacity || '?'}</span>
            </div>
          </Popup>
        </Marker>
      })}
    </MapContainer>
  )
}

export default CarParkMap;
