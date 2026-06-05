// services/venueService.js

import {
  createVenue,
  uploadVenueImages,
  getVenuesByOwner,
  updateVenue,
  getActiveVenues,
} from "../../api/owner/venueApi";

// CREATE Venue
export const addVenueService = async ({ form, amenities, images, ownerId }) => {
  const venueData = {
    ...form,
    ownerId,
    amenities,
    location: {
      address: form.address,
      city: form.city,
      state: form.state,
      country: form.country,
    },
  };

  const createResponse = await createVenue(venueData);
  const newVenue = createResponse.data.data;

  if (!newVenue._id) {
    throw new Error("Venue creation failed, no venue ID returned");
  }

  if (images?.length > 0) {
    const formData = new FormData();
    images.forEach((file) => formData.append("venueImages", file));
    await uploadVenueImages(newVenue._id, formData);
  }

  return createResponse.data;
};

export const getActiveVenuesService = async (ownerId) => {
  if (!ownerId) return 0;
  try {
    const res = await getActiveVenues(ownerId);
    return res.data.count;
  } catch (err) {
    throw err;
  }
};
// GET Venues by Owner
export const fetchVenuesByOwnerService = async (ownerId) => {
  if (!ownerId) throw new Error("Owner ID is required");
  const response = await getVenuesByOwner(ownerId);
  return response.data.data;
};
export const updateVenueService = async ({ venueId, updatedData }) => {
  // `updatedData` is already a FormData created in the React component
  const response = await updateVenue(venueId, updatedData);
  return response.data;
};
