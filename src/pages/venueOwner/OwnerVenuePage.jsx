import React, { useState, useContext, useCallback } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import AddVenueModal from "../../components/modal/AddVenueModal";
import VenueCard from "../../components/common/VenueCard";
import VenueRegisterForm from "../../components/owner/venueRegistrationForm";
import { useVenuesByOwner } from "../../hooks/owner/useVenuesByOwner";
import { deleteVenue } from "../../api/owner/venueApi";
import { sanitizeVenue } from "../../utils/sanitizeVenue";

const OwnerVenuePage = () => {
  const { user } = useContext(AuthContext);
  const {
    data: venues = [],
    isLoading,
    error,
    refetch,
  } = useVenuesByOwner(user?._id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVenue, setEditVenue] = useState(null);
  const [deletingVenueId, setDeletingVenueId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAddVenueSuccess = useCallback(async () => {
    console.log("Add venue success: closing modal & refetching");
    setIsModalOpen(false);
    setEditVenue(null);
    await refetch();
  }, [refetch]);
  const handleUpdateVenueSuccess = useCallback(async () => {
    setIsUpdating(true);
    try {
      console.log("Update venue success: closing modal first");
      setIsModalOpen(false);
      setEditVenue(null);
      await refetch();
      console.log("Refetch complete");
    } catch (e) {
      console.error("Error on update success:", e);
    } finally {
      setIsUpdating(false);
    }
  }, [refetch]);

  const handleDeleteVenue = useCallback(
    async (venueId) => {
      setDeletingVenueId(venueId);
      try {
        await deleteVenue(venueId);
        await refetch();
      } catch (e) {
        console.error("Failed to delete venue:", e);
        alert("Failed to delete venue. Please try again.");
      } finally {
        setDeletingVenueId(null);
      }
    },
    [refetch]
  );

  const handleModalClose = useCallback(() => {
    if (!isUpdating) {
      setIsModalOpen(false);
      setEditVenue(null);
    }
  }, [isUpdating]);

  const handleAddVenueClick = useCallback(() => {
    setEditVenue(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((venue) => {
    setEditVenue(venue);
    setIsModalOpen(true);
  }, []);

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
          onClick={handleAddVenueClick}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
          disabled={isUpdating}
        >
          Add Venue
        </button>
      </div>

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
                onDelete={() => handleDeleteVenue(venue._id)}
                isDeleting={deletingVenueId === venue._id}
              />
            );
          })}
        </div>
      )}

      <AddVenueModal isOpen={isModalOpen} onClose={handleModalClose}>
        {/* key prop forces remount on mode change */}
        <VenueRegisterForm
          key={editVenue ? `edit-${editVenue._id}` : "create"}
          onSuccess={
            editVenue ? handleUpdateVenueSuccess : handleAddVenueSuccess
          }
          mode={editVenue ? "edit" : "create"}
          initialData={editVenue}
        />
      </AddVenueModal>
    </div>
  );
};

export default OwnerVenuePage;
