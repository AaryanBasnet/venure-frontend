import React from "react";
import { FiX } from "react-icons/fi";
import OwnerRegisterForm from "../auth/OwnerRegisterForm";

const AddOwnerModal = ({ isOpen, onClose, onOwnerAdded }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <h3 className="text-xl font-semibold text-gray-800">
            Add New Venue Owner
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="p-6">
          <OwnerRegisterForm onSuccess={onOwnerAdded} />
        </div>
      </div>
    </div>
  );
};

export default AddOwnerModal;
