import React, { useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider"; // import AuthContext
import AddVenueModal from "../../components/modal/AddVenueModal";
import VenueCard from "../../components/common/VenueCard";
import VenueRegisterForm from "../../components/owner/venueRegistrationForm";
import { useVenuesByOwner } from "../../hooks/owner/useVenuesByOwner";

import { sanitizeVenue } from "../../utils/sanitizeVenue";

const SearchAndFilter = ({ onSearchChange, onStatusChange, onCityChange }) => {
  // ... your SearchAndFilter code here
};

const OwnerVenuePage = () => {
  const { user } = useContext(AuthContext); // get user from context

  console.log("User from AuthContext:", user);

  const {
    data: venues = [],
    isLoading,
    error,
    refetch,
  } = useVenuesByOwner(user?._id);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVenue, setEditVenue] = useState(null); // New

  const handleAddVenueSuccess = (newVenue) => {
    setIsModalOpen(false);
    refetch();
  };

  const openEditModal = (venue) => {
    setEditVenue(venue);
    setIsModalOpen(true);
  };

  // For now, skip filtering logic and just show venues
  if (isLoading) return <p>Loading venues...</p>;
  if (error) return <p>Error loading venues: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Venues</h1>
          <p className="text-gray-600 mt-1">
            Manage your venue listings and track their performance
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
        >
          Add Venue
        </button>
      </div>

      <SearchAndFilter
        onSearchChange={setSearchTerm}
        onStatusChange={setFilterStatus}
        onCityChange={setFilterCity}
      />

      {venues.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">
          No venues found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((rawVenue) => {
            const venue = sanitizeVenue(rawVenue);
            return (
              <VenueCard
                key={venue._id}
                venue={venue}
                onEdit={openEditModal}
              />
            );
          })}
        </div>
      )}
      <AddVenueModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditVenue(null);
        }}
      >
        <VenueRegisterForm
          onSuccess={handleAddVenueSuccess}
          mode={editVenue ? "edit" : "create"} // <-- THIS MUST BE CORRECT
          initialData={editVenue}
        />
      </AddVenueModal>
    </div>
  );
};

export default OwnerVenuePage;
