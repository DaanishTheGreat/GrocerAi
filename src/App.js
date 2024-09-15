import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import Page3 from './Pages/Page3';
import Page4 from './Pages/Page4';
import Page5 from './Pages/Page5';
import Page6 from './Pages/Page6';
import Page7 from './Pages/Page7';
import Header from './Components/Header';
import GridWormAnimation from './Components/GridWormAnimation';
import './App.css';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <GridWormAnimation />
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Page3 />} />
            <Route path="/item-selection" element={<Page4 />} />
            <Route path="/cart-review" element={<Page5 />} />
            <Route path="/analysis" element={<Page6 />} />
            <Route path="/profile" element={<Page7 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
