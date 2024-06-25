import React from "react";
import Modal from "react-modal";

const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  formData,
  handleConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Transaction"
      className="bg-white rounded-lg p-4 lg:p-6 shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="p-6">
        <button onClick={onRequestClose} className="text-right text-red-500">
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Confirm Transaction</h2>
        <div className="mb-4">
          <p>
            <strong>Amount:</strong> {formData.amount}
          </p>
          <p>
            <strong>Recipient:</strong> {formData.recipient}
          </p>
          <p>
            <strong>Currency:</strong> {formData.currency}
          </p>
          <p>
            <strong>Method:</strong> {formData.method}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleConfirm}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
