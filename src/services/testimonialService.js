import { fetchAllTestimonials } from "../api/testimonial";

export const fetchAllTestimonialsService = async () => {
    const res = await fetchAllTestimonials();
    return res.data.data;
};
