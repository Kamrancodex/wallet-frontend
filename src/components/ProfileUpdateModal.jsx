import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ProfileUpdateModel = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        {children}
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          &times;
        </button>
      </div>
    </Modal>
  );
};

export default ProfileUpdateModel;
