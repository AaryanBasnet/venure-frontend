// hooks/useTopTestimonial.js
import { useQuery } from "@tanstack/react-query";
import instance from "../api/api";

export const useTopTestimonial = () => {
  return useQuery({
    queryKey: ["top_testimonial"],
    queryFn: async () => {
      const res = await instance.get("/testimonials/highest-rated");
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
