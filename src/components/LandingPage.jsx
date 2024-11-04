import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner"; // Import the Spinner component

const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

const LandingPage = ({ products, setSelectedCategory, selectedCategory, loading }) => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Category Buttons */}
      <div className="flex justify-center space-x-4 mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md font-semibold transition duration-300 ${
              selectedCategory === category ? "bg-amazon_blue text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (  // Check if loading is true
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-600">No products found. <Spinner/></p>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
