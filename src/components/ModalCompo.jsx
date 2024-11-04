import React from "react";

const Modal = ({ isOpen, onClose, orderDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Shipping Address:</h3>
          <p>{orderDetails.name}</p>
          <p>{orderDetails.address}</p>
          <p>{orderDetails.city}</p>
          <p>{orderDetails.postalCode}</p>
          <p>{orderDetails.country}</p>
        </div>
        <h3 className="text-lg font-semibold">Items:</h3>
        <ul className="mb-4">
          {orderDetails.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.title} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold mb-4">
          <span>Total:</span>
          <span>${orderDetails.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert("Payment Successful! Thank you for your order.");
              onClose();
              window.location.href="/";
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
