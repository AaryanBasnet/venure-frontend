import { addReview, deleteReview, getOwnerVenueReviews, getReviews } from "../api/reviews";

export const addReviewService = async (venueId, reviewData) => {
  try {
    const response = await addReview(venueId, reviewData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getReviewsService = async (venueId) => {
  try {
    const response = await getReviews(venueId);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteReviewService = async (venueId, reviewId) => {
  try {
    const response = await deleteReview(venueId, reviewId);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const getOwnerVenueReviewsService = async () => {
  const res = await getOwnerVenueReviews();
  console.log("getOwnerVenueReviewsService", res.data)
    return res.data.data;
}