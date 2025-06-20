// components/modal/AddVenueModal.jsx
import React from "react";

const AddVenueModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-lg"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Create New Venue</h2>
        {children}
      </div>
    </div>
  );
};

export default AddVenueModal;
