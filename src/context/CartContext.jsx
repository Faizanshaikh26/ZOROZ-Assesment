import React, { createContext, useContext, useState, useEffect } from "react";

// Create the CartContext
const CartContext = createContext();

// Custom hook to use the CartContext
export const usecart = () => useContext(CartContext);

// CartProvider component that provides cart state and functions to its children
export const CartProvider = ({ children }) => {
  // State to store cart items, initializing from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // Effect to update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // State to manage the cart total (you can calculate this if needed)
  const [cartTotal, setCartTotal] = useState(0);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const isProductInCart = currentItems.find((item) => item.id === product.id);
      if (isProductInCart) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) } // Increment quantity or default to 1
            : item
        );
      }
      return [...currentItems, { ...product, quantity: product.quantity || 1 }]; // Add new product with default quantity
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  // Function to update the quantity of a product in the cart
  const updateItemQuantity = (productId, quantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  // Function to calculate the total price of items in the cart (optional)
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCartTotal(total);
  }, [cartItems]);

  // Return the CartContext.Provider with the value to be accessed by children
  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        setCartTotal,
        addToCart,
        removeFromCart,
        updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
