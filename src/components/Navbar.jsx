import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { usecart } from "../context/CartContext";

const Navbar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems } = usecart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="bg-amazon_blue text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.3xWUQ3_6zHxQFu-TfY5_iwHaCg&pid=Api&P=0&h=220"
            alt="Amazon"
            className="w-20 sm:w-24"
          />
          <div className="sm:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </div>
        </div>
        <div className="hidden sm:flex flex-grow mx-4">
          <form onSubmit={handleSearch} className="flex bg-white rounded-md overflow-hidden w-full">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-2 text-black focus:outline-none"
            />
            <button type="submit" className="bg-amazon_yellow px-4 flex items-center">
              <span className="text-black font-bold">Search</span>
            </button>
          </form>
        </div>
        <div className="hidden sm:flex items-center space-x-4 text-sm">
          <div className="cursor-pointer hover:underline">
            <p className="hidden lg:block">Hello, Sign in</p>
            <p className="font-bold">Account & Lists</p>
          </div>
          <div className="cursor-pointer hover:underline">
            <p className="hidden lg:block">Returns</p>
            <p className="font-bold">& Orders</p>
          </div>
          <div className="cursor-pointer hover:underline">
            <p className="hidden lg:block">Your</p>
            <p className="font-bold">Prime</p>
          </div>
        </div>
        <Link to="/cart" className="relative flex items-center cursor-pointer">
          <FaShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-amazon_yellow text-black font-bold rounded-full px-2 text-xs">
            {cartItems.length}
          </span>
          <p className="hidden sm:inline ml-2 font-bold">Cart</p>
        </Link>
      </div>
      <div className="flex sm:hidden p-2">
        <form onSubmit={handleSearch} className="flex bg-white rounded-md overflow-hidden w-full">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 text-black focus:outline-none"
          />
          <button type="submit" className="bg-amazon_yellow px-4 flex items-center">
            <span className="text-black font-bold">Search</span>
          </button>
        </form>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden bg-amazon_blue text-white p-4">
          <div className="border-t border-gray-700 pt-4">
            <p className="cursor-pointer py-2 hover:underline">Account & Lists</p>
            <p className="cursor-pointer py-2 hover:underline">Returns & Orders</p>
            <p className="cursor-pointer py-2 hover:underline">Your Prime</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
