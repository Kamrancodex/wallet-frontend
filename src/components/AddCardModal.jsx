import Modal from "react-modal";
import InputField from "../components/InputField";
import Button from "../components/Button";

const AddCardModal = ({ isOpen, onRequestClose, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Feature comming Soon</h2>
    </Modal>
  );
};

export default AddCardModal;
