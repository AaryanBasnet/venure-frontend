import instance from "./api";

export const fetchAllTestimonials = async () => {
  return await instance.get("/testimonials/admin");
};
