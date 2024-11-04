import React, { useEffect, useState } from "react";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import ProductDetailPage from "./components/ProductDetailPage";
import CartPage from "./components/Cart";
import CheckoutPage from "./components/CheckoutPage";
import Spinner from "./components/Spinner"; 

function App() {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadApp = async () => {
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    loadApp();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
