import instance from "../api"; // your base Axios instance

// 1. Create venue WITHOUT images (basic data only)
export const createVenue = (venueData) => {
  return instance.post("/api/venues", venueData);
};

// 2. Upload images after venue creation using venueId
export const uploadVenueImages = (venueId, formData) => {
  return instance.post(`/api/venues/${venueId}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 3. Update venue info (optionally with new images)
export const updateVenue = (venueId, formData) => {
  return instance.put(`/api/venues/${venueId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 4. Delete venue by ID
export const deleteVenue = (venueId) => {
  return instance.delete(`/api/venues/${venueId}`);
};

// 5. Get venues by owner ID (query param)
export const getVenuesByOwner = (ownerId) => {
  return instance.get(`/api/venues`, { params: { ownerId } });
};
