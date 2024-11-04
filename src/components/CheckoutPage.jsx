import React, { useState } from "react";
import { usecart } from "../context/CartContext";
import Modal from "../components/ModalCompo";

const CheckoutPage = () => {
  const { cartItems } = usecart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    items: [],
    total: 0,
  });

  const handleCheckout = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.fullName.value;
    const address = form.address.value;
    const city = form.city.value;
    const postalCode = form.postalCode.value;
    const country = form.country.value;
    const cardNumber = form.cardNumber.value;
    const expirationDate = form.expirationDate.value;
    const cvc = form.cvc.value;

    const total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    setOrderDetails({
      name,
      address,
      city,
      postalCode,
      country,
      cardNumber,
      expirationDate,
      cvc,
      items: cartItems,
      total,
    });

    setIsModalOpen(true);
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty. Add some products to proceed.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleCheckout}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            name="city"
            type="text"
            placeholder="City"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            name="postalCode"
            type="text"
            placeholder="Postal Code"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            name="country"
            type="text"
            placeholder="Country"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
          <input
            name="cardNumber"
            type="text"
            placeholder="Credit Card Number"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            name="expirationDate"
            type="text"
            placeholder="Expiration Date (MM/YY)"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            name="cvc"
            type="text"
            placeholder="CVC"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-amazon_blue text-white rounded-md"
        >
          Complete Purchase
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default CheckoutPage;
