import React from "react";

const AddVenueModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      data-testid="modal-backdrop"
      className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative" data-testid="modal-content">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-lg"
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default AddVenueModal;
