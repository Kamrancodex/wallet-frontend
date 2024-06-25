import React, { useState } from "react";
import Modal from "react-modal";
import { kycVerification } from "../api"; // Import the submitKyc function

const KycModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [addressProof, setAddressProof] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const kycInfo = { documentType, documentNumber, addressProof };
    try {
      await kycVerification(kycInfo);
      onSubmit(kycInfo);
      onRequestClose();
    } catch (error) {
      console.error("Error submitting KYC:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="p-4">
        <button onClick={onRequestClose} className="text-right text-red-500">
          X
        </button>
        <h2 className="text-lg font-bold mb-4">KYC Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Document Type</label>
            <input
              type="text"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Document Number</label>
            <input
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Address Proof</label>
            <input
              type="text"
              value={addressProof}
              onChange={(e) => setAddressProof(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onRequestClose}
              className="mr-4 px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default KycModal;
