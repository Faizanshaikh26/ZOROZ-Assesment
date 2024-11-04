import React from "react";
import Home from "./Home";
import {Route, Routes } from "react-router-dom";
import ProductDetailPage from "./components/ProductDetailPage";
import CartPage from "./components/Cart";
import CheckoutPage from "./components/CheckoutPage";


function App() {
 
  return (
    <div className="bg-gray-100 min-h-screen">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/checkout" element={<CheckoutPage/>} />
      
      </Routes>
     

  
    </div>
  );
}

export default App;
