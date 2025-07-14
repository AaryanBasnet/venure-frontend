import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReviewsService,
  addReviewService,
  deleteReviewService,
} from "../services/reviewService";

export function useReviews(venueId) {
  const queryClient = useQueryClient();

  // Fetch reviews with object syntax
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reviews", venueId],
    queryFn: () => getReviewsService(venueId),
    enabled: !!venueId,
    select: (res) => res.data, // assumes response shape { success, data }
  });

  // Add review mutation with object syntax
  const addReviewMutation = useMutation({
    mutationFn: (reviewData) => addReviewService(venueId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", venueId] });
    },
  });

  // Delete review mutation with object syntax
  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId) => deleteReviewService(venueId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", venueId] });
    },
  });

  return {
    reviews: data || [],
    isLoading,
    error,
    refetch,
    addReview: addReviewMutation.mutateAsync,
    deleteReview: deleteReviewMutation.mutateAsync,
    isAdding: addReviewMutation.isLoading,
    isDeleting: deleteReviewMutation.isLoading,
  };
}
