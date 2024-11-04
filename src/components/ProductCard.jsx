// ProductCard.js
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-md font-bold truncate">{product.title}</h3>
        <p className="text-lg font-semibold text-gray-800 mt-2">${product.price}</p>
        <button className="mt-4 w-full bg-amazon_yellow text-black py-2 rounded-md font-bold">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
