import React, { useState } from "react";
import { usecart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Spinner from "./Spinner"; 

const CartPage = () => {
  const { cartItems, removeFromCart, updateItemQuantity } = usecart();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      setLoading(true); 
      updateItemQuantity(productId, quantity);
      setLoading(false);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setLoading(true); 
    removeFromCart(productId);
    setLoading(false); 
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        {loading ? (  
          <div className="flex justify-center items-center min-h-screen">
            <Spinner />
          </div>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Items in Your Cart</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain rounded"
                    />
                    <div>
                      <h2 className="font-bold">{item.title}</h2>
                      <p className="text-gray-500">Price: ${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                      className="w-16 text-center border rounded-md"
                    />
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="text-lg mb-2">
                <p>Subtotal ({cartItems.length} items):</p>
                <p className="font-bold">${calculateSubtotal()}</p>
              </div>
              <button 
                onClick={handleProceedToCheckout}
                className="w-full mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
