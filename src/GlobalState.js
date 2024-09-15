import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [preferredFoods, setPreferredFoods] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        items,
        setItems,
        selectedItems,
        setSelectedItems,
        preferredFoods,
        setPreferredFoods,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
