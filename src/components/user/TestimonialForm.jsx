import React from "react";
import { useFormik } from "formik";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import instance from "../../api/api";

// Fetch booked venues
const fetchMyBookedVenues = async () => {
  const res = await instance.get("/testimonials/my-venues");
  return res.data.data;
};

// Submit testimonial
const submitTestimonial = async (data) => {
  const res = await instance.post("/testimonials", data);
  return res.data;
};

export default function TestimonialForm() {
  const { data: venues = [], isLoading } = useQuery({
    queryKey: ["booked_venues_for_testimonial"],
    queryFn: fetchMyBookedVenues,
  });

  const mutation = useMutation({
    mutationFn: submitTestimonial,
    onSuccess: () => {
      toast.success("Thank you for your feedback!");
      formik.resetForm();
    },
    onError: () => {
      toast.error("Failed to submit testimonial");
    },
  });

  const formik = useFormik({
    initialValues: {
      venue: "",
      rating: "",
      comment: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.venue) errors.venue = "Venue is required";
      if (!values.rating) errors.rating = "Rating is required";
      if (!values.comment) errors.comment = "Comment is required";
      return errors;
    },
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });


  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl p-8 rounded-xl border">
      <h2 className="text-2xl font-semibold mb-6 text-slate-700">
        Share Your Experience
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Venue Dropdown */}
        <div>
          <label className="block mb-1 font-medium text-slate-600">Venue</label>
          <select
            name="venue"
            value={formik.values.venue}
            onChange={formik.handleChange}
            className="w-full border rounded-lg px-4 py-2"
            disabled={isLoading}
          >
            <option value="">Select a venue</option>
            {venues.map((v) => (
              <option key={v._id} value={v._id}>
                {v.venueName}
              </option>
            ))}
          </select>
          {formik.errors.venue && (
            <p className="text-red-500 text-sm">{formik.errors.venue}</p>
          )}
        </div>

        {/* Rating Dropdown */}
        <div>
          <label className="block mb-1 font-medium text-slate-600">
            Rating
          </label>
          <select
            name="rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select a rating</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && "s"}
              </option>
            ))}
          </select>
          {formik.errors.rating && (
            <p className="text-red-500 text-sm">{formik.errors.rating}</p>
          )}
        </div>

        {/* Comment Box */}
        <div>
          <label className="block mb-1 font-medium text-slate-600">
            Comment
          </label>
          <textarea
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            rows="4"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Write your experience here..."
          ></textarea>
          {formik.errors.comment && (
            <p className="text-red-500 text-sm">{formik.errors.comment}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:shadow-lg transition"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Submitting..." : "Submit Testimonial"}
        </button>
      </form>
    </div>
  );
}
