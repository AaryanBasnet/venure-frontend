import { useQuery } from "@tanstack/react-query"
import { getOwnerVenueReviewsService } from "../../services/reviewService"



export const useOwnerVenueReviews  = () => {
    return useQuery({
        queryKey: ["owner-venue-reviews"],
        queryFn: getOwnerVenueReviewsService
    })
}