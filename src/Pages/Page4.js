import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Page4.css';

function Page4() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const items = state ? state.data : {}; // Get the passed data from the location state

  // State to track selected items (default to all selected)
  const [selectedItems, setSelectedItems] = useState(
    Object.keys(items).reduce((acc, itemName, itemIndex) => {
      const key = `${itemName}-${itemIndex}`;
      acc[key] = true; // Default all items to selected (green)
      return acc;
    }, {})
  );

  // State to hold total calories and total price
  const [totals, setTotals] = useState({ totalCalories: 0, totalPrice: 0 });

  // Calculate totals whenever selectedItems or items change
  useEffect(() => {
    let totalCalories = 0;
    let totalPrice = 0;

    Object.entries(items).forEach(([itemName, itemDetails], itemIndex) => {
      const key = `${itemName}-${itemIndex}`;
      if (selectedItems[key]) {
        // **Extract Calories from itemName**
        const parts = itemName.split(',');
        if (parts.length > 1) {
          const calorieStr = parts[1].trim();
          const calories = parseInt(calorieStr, 10);
          if (!isNaN(calories)) {
            totalCalories += calories;
          } else {
            console.warn(`Invalid calorie value for itemName: ${itemName}`);
          }
        } else {
          console.warn(`itemName does not contain calorie info: ${itemName}`);
        }

        // **Handle Price**
        itemDetails.forEach(item => {
          if (item.price && item.price !== "N/A") {
            let priceNumber = 0;
            if (typeof item.price === 'string') {
              // Remove any non-numeric characters (e.g., "$")
              priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            } else if (typeof item.price === 'number') {
              priceNumber = item.price;
            } else {
              console.warn(`Unexpected price format for item: ${itemName}`, item.price);
            }

            if (!isNaN(priceNumber)) {
              totalPrice += priceNumber;
            } else {
              console.warn(`Invalid price value for item: ${itemName}`, item.price);
            }
          }
        });
      }
    });

    setTotals({ totalCalories, totalPrice });
  }, [selectedItems, items]);

  // Toggle item selection
  const toggleItemSelection = (itemName, itemIndex) => {
    const key = `${itemName}-${itemIndex}`;
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [key]: !prevSelectedItems[key], // Toggle the selected state
    }));
  };

  // Function to send a POST request with selected items to /api/getpath
  const sendPostRequest = () => {
    // Collect descriptions of selected items
    const selectedDescriptions = Object.entries(items).reduce((acc, [itemName, itemDetails], itemIndex) => {
      const key = `${itemName}-${itemIndex}`;
      if (selectedItems[key]) {
        itemDetails.forEach(item => acc.push(item.description)); // Collect all descriptions
      }
      return acc;
    }, []);

    // Create the JSON object to send to the server
    const dataToSend = {
      descriptions: selectedDescriptions
    };

    // Make the POST request to /api/getpath
    fetch('http://20.0.136.197/api/getpath', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend), // Send the descriptions array as JSON
    })
      .then(response => response.blob()) // Get the image as a blob
      .then(imageBlob => {
        // Create a local URL for the image blob
        const imageUrl = URL.createObjectURL(imageBlob);
        // Navigate to the CartReview component to display the image
        navigate('/cart-review', { 
          state: { 
            imageUrl, 
            totalCalories: totals.totalCalories, 
            totalPrice: totals.totalPrice 
          } 
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const goToCartReview = () => {
    // Trigger the POST request when navigating
    sendPostRequest();
  };

  // Helper function to render item details
  const renderItemDetails = (itemDetails, itemName, itemIndex) => {
    return itemDetails.map((item, index) => (
      <div key={index} className="item-details">
        <p><strong>Categories:</strong> {item.categories.join(', ')}</p>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Price:</strong> {item.price !== "N/A" ? `$${item.price}` : 'N/A'}</p>
        {/* **Optional**: Remove or update the following line if not needed */}
        {/* {item.calories && <p><strong>Calories:</strong> {item.calories} kcal</p>} */}
        {item.image_url && (
          <div className="item-image">
            <img src={item.image_url} alt={item.description} className="standardized-image" />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="page">
      <h2>Item Selection</h2>
      {/* Item List */}
      <div id="item-list">
        {Object.entries(items).map(([itemName, itemDetails], itemIndex) => {
          const isSelected = selectedItems[`${itemName}-${itemIndex}`];
          return (
            <div
              key={itemName}
              className={`item ${isSelected ? 'selected' : 'unselected'}`} // Apply class based on selection
              onClick={() => toggleItemSelection(itemName, itemIndex)} // Toggle selection on click
            >
              <h3>{itemName}</h3>
              <div className="item-content">
                {renderItemDetails(itemDetails, itemName, itemIndex)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Totals Section */}
      <div className="totals-section">
        <p><strong>Total Calories:</strong> {totals.totalCalories} kcal</p>
        <p><strong>Total Price:</strong> ${totals.totalPrice.toFixed(2)}</p>
      </div>

      {/* Submit Button */}
      <button onClick={goToCartReview}>Submit</button>
    </div>
  );
}

export default Page4;
