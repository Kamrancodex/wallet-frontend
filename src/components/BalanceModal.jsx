import React, { useState } from "react";
import Modal from "react-modal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading icon
import FullscreenLoader from "./FullScreenLoader";
import { getUserDetails } from "../api"; // Import the function to get user details

Modal.setAppElement("#root");

const BalanceModal = ({
  isOpen,
  onRequestClose,
  title,
  onSubmit,
  userBalance,
}) => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [method, setMethod] = useState("email");
  const [scanMode, setScanMode] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [resultModalIsOpen, setResultModalIsOpen] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleRecipientChange = (e) => setRecipient(e.target.value);
  const handleCurrencyChange = (e) => setCurrency(e.target.value);
  const handleMethodChange = (e) => setMethod(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    // Validation checks
    if (!amount || !recipient || !currency || !method) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (Number(amount) > userBalance) {
      setErrorMessage("Amount exceeds available balance.");
      return;
    }

    // Check if the recipient exists in the database
    try {
      const response = await getUserDetails(recipient); // Adjust this function to check recipient details
      if (!response.data) {
        setErrorMessage("Recipient not found.");
        return;
      }
    } catch (error) {
      setErrorMessage("Error checking recipient details. Please try again.");
      return;
    }

    setConfirmModalIsOpen(true);
  };

  const handleConfirm = async () => {
    setConfirmModalIsOpen(false);
    setLoading(true);
    try {
      await onSubmit({ amount: Number(amount), recipient, currency, method });
      setTransactionStatus("success");
    } catch (error) {
      setTransactionStatus("failure");
    }
    setLoading(false);
    setResultModalIsOpen(true);
  };

  const closeResultModal = () => {
    setResultModalIsOpen(false);
    onRequestClose();
  };

  const handleScan = () => {
    setScanMode(true);
    // Implement scan functionality here
  };

  const handleScanResult = (result) => {
    setRecipient(result);
    setScanMode(false);
  };

  return (
    <>
      <FullscreenLoader loading={loading} />{" "}
      {/* Include the FullscreenLoader */}
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={title}
        className="bg-white rounded-lg p-4 lg:p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="p-6">
          <button onClick={onRequestClose} className="text-right text-red-500">
            X
          </button>
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Recipient Email/Number
              </label>
              <input
                type="text"
                value={recipient}
                onChange={handleRecipientChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Currency
              </label>
              <select
                value={currency}
                onChange={handleCurrencyChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Method
              </label>
              <select
                value={method}
                onChange={handleMethodChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                {title === "Send Money" && <option value="qr">QR</option>}
              </select>
            </div>
            <div className="flex items-center justify-between">
              {title === "Send Money" && (
                <button
                  type="button"
                  onClick={handleScan}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Scan and Pay
                </button>
              )}
              <button
                type="submit"
                className={`${
                  title === "Send Money"
                    ? "bg-green-500 hover:bg-green-700"
                    : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              >
                {title === "Send Money" ? "Send Money" : "Request Money"}
              </button>
            </div>
          </form>
          {scanMode && (
            <div className="mt-4">
              {/* Implement the scanning component here */}
              <p>Scan your QR code...</p>
            </div>
          )}
        </div>
      </Modal>
      <Modal
        isOpen={confirmModalIsOpen}
        onRequestClose={() => setConfirmModalIsOpen(false)}
        contentLabel="Confirm Transaction"
        className="bg-white rounded-lg p-4 lg:p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Confirm Transaction</h2>
          <p>Recipient: {recipient}</p>
          <p>Amount: {amount}</p>
          <p>Currency: {currency}</p>
          <p>Method: {method}</p>
          <button
            onClick={handleConfirm}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Confirm
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={resultModalIsOpen}
        onRequestClose={closeResultModal}
        contentLabel="Transaction Result"
        className="bg-white rounded-lg p-4 lg:p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="p-6 text-center">
          {loading ? (
            <AiOutlineLoading3Quarters className="text-5xl animate-spin mx-auto text-blue-500" />
          ) : transactionStatus === "success" ? (
            <>
              <FaCheckCircle className="text-green-500 text-4xl mb-4" />
              <h2 className="text-xl font-bold mb-4">
                {title === "Send Money"
                  ? "Transaction Successful"
                  : "Request Sent Successfully"}
              </h2>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-500 text-4xl mb-4" />
              <h2 className="text-xl font-bold mb-4">
                {title === "Send Money"
                  ? "Transaction Failed"
                  : "Request Failed"}
              </h2>
            </>
          )}
          <button
            onClick={closeResultModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BalanceModal;
