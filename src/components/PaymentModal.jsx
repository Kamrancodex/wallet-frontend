import React, { useState } from "react";
import Modal from "react-modal";

const PaymentModal = ({ isOpen, onRequestClose, creditBalance }) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = () => {
    // Handle the payment logic
    console.log(`Paying ${amount} using ${paymentMethod}`);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white rounded-lg p-8 shadow-xl w-96 mx-auto mt-24"
    >
      <h2 className="text-2xl font-bold mb-4">Pay Credit Balance</h2>
      <p className="mb-4">{`Credit Balance: $${creditBalance}`}</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="bg-gray-100 p-2 rounded mb-4 w-full"
      />
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="bg-gray-100 p-2 rounded mb-4 w-full"
      >
        <option value="" disabled>
          Select Payment Method
        </option>
        <option value="wallet">Wallet Balance</option>
        <option value="checking">Checking Account</option>
        <option value="savings">Savings Account</option>
        <option value="creditCard">External Credit Card</option>
        <option value="upi">UPI</option>
        <option value="paypal">PayPal</option>
        <option value="crypto">Crypto</option>
      </select>
      {paymentMethod === "creditCard" && (
        <div>
          <input
            type="text"
            placeholder="Card Number"
            className="bg-gray-100 p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            placeholder="Expiry Date"
            className="bg-gray-100 p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            placeholder="CVV"
            className="bg-gray-100 p-2 rounded mb-4 w-full"
          />
        </div>
      )}
      <button
        onClick={handlePayment}
        className="bg-blue-700 px-4 py-2 rounded text-white w-full"
      >
        Pay Now
      </button>
    </Modal>
  );
};

export default PaymentModal;
