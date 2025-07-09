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
  if (!ownerId) {
    console.warn("getApprovedVenueCountByOwnerService called without ownerId");
    return 0; // Or null, or throw an error
  }
  try {
    const res = await getActiveVenues(ownerId);
    return res.data.count;
  } catch (err) {
    console.error("Failed to fetch approved venue count:", err);
    throw err;
  }
};
// GET Venues by Owner
export const fetchVenuesByOwnerService = async (ownerId) => {
  if (!ownerId) throw new Error("Owner ID is required");
  const response = await getVenuesByOwner(ownerId);
  return response.data.data;
};

// UPDATE Venue
export const updateVenueService = async ({
  venueId,
  updatedData,
  newImages,
}) => {
  const formData = new FormData(); // Convert location to JSON string

  formData.append(
    "location",
    JSON.stringify({
      address: updatedData.address || "",
      city: updatedData.city || "",
      state: updatedData.state || "",
      country: updatedData.country || "",
    })
  );

  Object.entries(updatedData).forEach(([key, value]) => {
    if (!["address", "city", "state", "country", "location"].includes(key)) {
      formData.append(
        key,
        typeof value === "object" ? JSON.stringify(value) : value
      );
    }
  });

  if (newImages?.length > 0) {
    newImages.forEach((file) => formData.append("venueImages", file));
  }

  const response = await updateVenue(venueId, formData);
  return response.data;
};
