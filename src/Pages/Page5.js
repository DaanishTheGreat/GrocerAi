// Page5.js
import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { GlobalContext } from '../GlobalState';
import './Page5.css';

function Page5() {
  const navigate = useNavigate();
  const { state } = useLocation(); // Get the state from navigation
  const { cartItems } = useContext(GlobalContext);

  // Retrieve totals from navigation state
  const { totalCalories, totalPrice, imageUrl } = state || {};

  // If totals are not passed via state, calculate them from cartItems
  const calculatedTotalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
  const calculatedTotalCalories = cartItems.reduce((sum, item) => sum + parseInt(item.calories || 0, 10), 0);

  // Determine which totals to display
  const displayTotalPrice = totalPrice !== undefined ? totalPrice.toFixed(2) : calculatedTotalPrice;
  const displayTotalCalories = totalCalories !== undefined ? totalCalories : calculatedTotalCalories;

  const proceedToCheckout = () => {
    navigate('/analysis');
  };

  const goBack = () => {
    navigate('/item-selection');
  };

  return (
    <div className="page">
      <h2>Your Cart</h2>
      <ul id="cart-review-list">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${parseFloat(item.price).toFixed(2)}
            </li>
          ))
        )}
      </ul>
      
      {/* Display Totals */}
      <div className="totals-section">
        <p><strong>Total Calories:</strong> {displayTotalCalories} kcal</p>
        <p><strong>Total Price:</strong> ${displayTotalPrice}</p>
      </div>

      {/* Display the Image if it exists */}
      {imageUrl && (
        <div className="path-image-container">
          <h3>Generated Path Image</h3>
          <img src={imageUrl} alt="Generated Path" />
        </div>
      )}

      <button onClick={proceedToCheckout}>Proceed to Checkout</button>
      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default Page5;