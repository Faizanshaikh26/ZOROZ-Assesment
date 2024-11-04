// ProductDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usecart } from "../context/CartContext"; // Ensure correct path to CartContext
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = usecart();
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await fetch(`https://fakestoreapi.com/products/${id}`);
        const productData = await productResponse.json();
        setProduct(productData);

        const recommendationsResponse = await fetch("https://fakestoreapi.com/products");
        const recommendationsData = await recommendationsResponse.json();
        const recommendations = recommendationsData
          .filter((p) => p.category === productData.category && p.id !== productData.id)
          .slice(0, 4);

        setRecommendedProducts(recommendations);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 }); // Adding product with initial quantity of 1
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
   <>
   <Navbar/>
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto max-w-sm object-contain"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-500">${product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <button
            className="mt-6 px-4 py-2 bg-amazon_blue text-white rounded-md"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">People also like this product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((recommendedProduct) => (
            <ProductCard key={recommendedProduct.id} product={recommendedProduct} />
          ))}
        </div>
      </div>
    </div>
   </>
  );
};

export default ProductDetailPage;
