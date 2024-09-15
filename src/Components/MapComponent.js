import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent() {
  const [position, setPosition] = useState([37.2284, -80.4234]); // Default location

  const handleRefreshLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setPosition([lat, lon]);
        },
        (err) => {
          console.error(err);
          alert('Unable to retrieve your location');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <div>
      <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}></Marker>
      </MapContainer>
      <button className="refresh-location-btn" onClick={handleRefreshLocation}>
        Refresh Location
      </button>
      <div className="map-text">Current Location: Lat {position[0].toFixed(2)}, Lon {position[1].toFixed(2)}</div>
    </div>
  );
}

export default MapComponent;
