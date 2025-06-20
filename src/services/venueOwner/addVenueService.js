import { createVenue, uploadVenueImages } from "../../api/owner/venueApi";

export const addVenueService = async ({ form, amenities, images, ownerId }) => {
  // Step 1: Prepare venue data without images
  const venueData = {
    ...form,
    ownerId,
    amenities,
  };

  // Create venue (without images)
  const createResponse = await createVenue(venueData);
  const newVenue = createResponse.data;

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
