import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalState';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import './Page6.css';

function Page6() {
  const navigate = useNavigate();
  
  // for some reason when i click start over it's not going back to the first page but just going blank 
  const { selectedItems } = useContext(GlobalContext); 

  // Calculate analysis data
  const totalCost = selectedItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  const totalCalories = selectedItems.reduce((sum, item) => sum + item.calories, 0);
  const pathLength = 500; // Placeholder
  const estimatedTime = 15; // Placeholder

  const defaultLocation = [37.2284, -80.4234];

  // Placeholder path coordinates
  const pathCoordinates = [
    defaultLocation,
    [37.2294, -80.4244],
    [37.2304, -80.4254],
  ];

  const startOver = () => {
    navigate('/store-selection');
  };

  const logout = () => {
    // Implement logout logic if necessary
    navigate('/');
  };

  return (
    <div className="page">
      <h2>Analysis</h2>
      <div id="analysis-data">
        <p>Cost: ${totalCost}</p>
        <p>Path Length: {pathLength} meters</p>
        <p>Estimated Time: {estimatedTime} minutes</p>
        <p>Total Calories: {totalCalories} kcal</p>
      </div>
      <div id="path-map">
        <MapContainer center={defaultLocation} zoom={13} style={{ height: '300px', width: '100%' }}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline positions={pathCoordinates} color="blue" />
        </MapContainer>
      </div>
      <button onClick={startOver}>Start Over</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Page6;
