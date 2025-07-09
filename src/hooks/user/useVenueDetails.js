import { useQuery } from "@tanstack/react-query"
import { getVenueById } from "../../services/user/venueService"


export const useVenueDetails = (id) => {
    return useQuery({
        queryKey: ["venue_detail", id],
        queryFn: () => getVenueById(id),
        enabled: !!id,
    })
}