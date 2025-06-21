import { createVenue, uploadVenueImages, getVenuesByOwner, updateVenue } from "../../api/owner/venueApi";

export const addVenueService = async ({ form, amenities, images, ownerId }) => {
  // Step 1: Prepare venue data without images
  const venueData = {
    ...form,
    ownerId,
    amenities,
  };

  // Create venue (without images)
  const createResponse = await createVenue(venueData);
  const newVenue = createResponse.data.data;

  if (!newVenue._id) {
    throw new Error("Venue creation failed, no venue ID returned");
  }

  // Step 2: If images are provided, upload them
  if (images && images.length > 0) {
    const formData = new FormData();
    images.forEach((file) => formData.append("venueImages", file));

    // Upload images with venue ID
    await uploadVenueImages(newVenue._id, formData);

    // Optionally, you might want to fetch updated venue data here
  }

  return createResponse.data;
};

export const fetchVenuesByOwnerService = async (ownerId) => {
  if (!ownerId) throw new Error("Owner ID is required");

  const response = await getVenuesByOwner(ownerId);
  // Backend returns { success, data: venuesArray }
  return response.data.data;
};


export const updateVenueService = async ({ venueId, updatedData, newImages }) => {
  const formData = new FormData();

  // Append updated fields (like name, price, location, etc.)
  Object.entries(updatedData).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });

  // Append new images if any
  if (newImages && newImages.length > 0) {
    newImages.forEach((file) => formData.append("venueImages", file));
  }

  const response = await updateVenue(venueId, formData);
  return response.data;
};
