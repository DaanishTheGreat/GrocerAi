import React from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../Components/MapComponent';
import './Page3.css';

function Page3() {
  const navigate = useNavigate();

  const handleSearch = () => {
    // Get the search input value
    const searchInput = document.getElementById('search').value;

    // Prepare the request body, you can modify this structure as needed
    const requestBody = {
      query: searchInput,
    };

    // Make the POST request
    fetch('http://20.0.136.197/api/getlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Redirect to /item-selection with the data
        navigate('/item-selection', { state: { data } });
      })
      .catch((error) => {
        console.error('Error:', error);
        // You may want to handle the error by showing a message to the user
      });
  };

  return (
    <div className="page">
      <div className="dropdown">
        <label>Select Store</label>
        <select id="store">
          <option value="Kroger">Walmart</option>
          <option value="walmart">Walmart</option>
          <option value="cvs">CVS Pharmacy</option>
          <option value="home-depot">Home Depot</option>
        </select>
      </div>
      <div className="location">
        <label>Your Location</label>
        <MapComponent />
      </div>
      <div className="search">
        <label>What are you looking for?</label>
        <input type="text" id="search" placeholder="I want to make spaghetti but need to lose weight" />
        
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default Page3;
