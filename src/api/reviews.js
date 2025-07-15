// services/reviewService.js
import instance from "./api";

// Add a review for a venue
export const addReview = async (venueId, reviewData) => {
  // reviewData = { rating, comment, title }
  return await instance.post(`/${venueId}/reviews`, reviewData);
};

// Get all reviews for a venue
export const getReviews = async (venueId) => {
  return await instance.get(`/${venueId}/reviews`);
};

// Delete a review by reviewId for a venue
export const deleteReview = async (venueId, reviewId) => {
  return await instance.delete(`/${venueId}/reviews/${reviewId}`);
};

export const getOwnerVenueReviews = async () => {
  return await instance.get("/owner/reviews");
};
