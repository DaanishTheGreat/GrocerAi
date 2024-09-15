import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalState';
import './Page7.css';

function Page7() {
  const navigate = useNavigate();
  const { preferredFoods, cartItems } = useContext(GlobalContext);

  const goBack = () => {
    navigate('/store-selection');
  };

  return (
    <div className="page">
      <h2>Your Profile</h2>
      <h3>Preferred Foods</h3>
      <ul id="preferred-foods-list">
        {preferredFoods.length === 0 ? (
          <p>You have no preferred foods yet.</p>
        ) : (
          preferredFoods.map((item) => (
            <li key={item.id}>
              {item.name} - {item.calories} kcal
            </li>
          ))
        )}
      </ul>
      <h3>Your Cart</h3>
      <ul id="cart-items-list">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)}
            </li>
          ))
        )}
      </ul>
      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default Page7;
