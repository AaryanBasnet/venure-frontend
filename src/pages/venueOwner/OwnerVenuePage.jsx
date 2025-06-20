import React, { useState } from "react";
import AddVenueModal from "../../components/modal/AddVenueModal";

function OwnerVenuePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddVenue = (venueData) => {
    console.log("Venue data to be added (no backend yet):", venueData);
    // In a real application, you'd send this data to your backend
    handleCloseModal();
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen font-poppins">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">

      
      <p className="text-lg text-gray-600 mb-6">Manage your venues here.</p>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out shadow-md"
        onClick={handleOpenModal}
      >
        + Add New Venue
      </button>

      {/* Your existing venue listings would go here */}
      <div className="mt-8 p-6 border border-dashed border-gray-300 rounded-lg text-center text-gray-500 bg-white">
        <p>Your venues will be displayed here once added.</p>
      </div>

      <AddVenueModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddVenue}
      />
    </div>
    </div>
  );
}

export default OwnerVenuePage;
