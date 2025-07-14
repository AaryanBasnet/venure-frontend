import { useQuery } from "@tanstack/react-query";
import { fetchAllTestimonialsService } from "../../services/testimonialService";

export const useFetchAllTestimonial = () => {
  return useQuery({
    queryKey: ["all_testimonials"],
    queryFn: fetchAllTestimonialsService,
  });
};
