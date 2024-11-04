// Home.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import { fetchProductsByCategory } from "./services/api"; // Ensure this is correctly imported

const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Load products based on the selected category
  useEffect(() => {
    const loadProducts = async () => {
      if (selectedCategory === "all") {
        const allProducts = await Promise.all(
          categories.slice(1).map((category) => fetchProductsByCategory(category))
        );
        const combinedProducts = allProducts.flat();
        setProducts(combinedProducts);
        setFilteredProducts(combinedProducts);
      } else {
        const categoryProducts = await fetchProductsByCategory(selectedCategory);
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts);
      }
    };
    loadProducts();
  }, [selectedCategory]);

  // Define handleSearch function
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      {/* Pass handleSearch to Navbar for search functionality */}
      <Navbar onSearch={handleSearch} />
      {/* Pass filteredProducts and setSelectedCategory to LandingPage */}
      <LandingPage
        products={filteredProducts}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

export default Home;
