import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTopTestimonial } from "../../hooks/useTopTestimonial";

export default function TestimonialsSection() {
  const navigate = useNavigate();
  const { data: testimonial, isLoading } = useTopTestimonial();
  const avatarBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 py-24 px-6 md:px-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full">
            <span className="text-amber-700 font-medium text-sm uppercase">
              Client Testimonials
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-slate-800 font-light mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-amber-600 via-rose-500 to-violet-600 bg-clip-text text-transparent font-medium">
              Top Guest
            </span>{" "}
            Says
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Single Top Testimonial */}
        {!testimonial || isLoading ? (
          <p className="text-slate-500 text-lg">Loading testimonial...</p>
        ) : (
          <motion.div
            className="group relative max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200 via-rose-200 to-violet-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm scale-105" />

              {/* Quote */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                  <FaQuoteLeft className="text-white text-xs" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-6 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < testimonial.rating
                        ? "text-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <blockquote className="text-slate-700 text-lg leading-relaxed font-light italic text-center mb-8 min-h-[4rem]">
                "{testimonial.comment}"
              </blockquote>

              {/* Profile */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 p-1 shadow-2xl">
                    <img
                      src={`${avatarBaseUrl}${testimonial.user.avatar}`}
                      alt={`${testimonial.user.name}'s avatar`}
                      className="w-full h-full rounded-full object-cover bg-white"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNzUiIGN5PSI3NSIgcj0iNzUiIGZpbGw9IiNmM2Y0ZjYiLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjY1IiByPSIyNSIgZmlsbD0iIzY2NzI4MCIvPjxwYXRoIGQ9Ik0yNSAxMjVjMC0yNy42MTMgMjIuMzg3LTUwIDUwLTUwczUwIDIyLjM4NyA1MCA1MHYyNUgyNXYtMjV6IiBmaWxsPSIjNjY3MjgwIi8+PC9zdmc+";
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-1">
                  {testimonial.customerName}
                </h3>
                <p className="text-sm text-slate-500 font-medium tracking-wide">
                 Venue Booked at {testimonial.venue?.venueName}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-slate-600 text-lg mb-6">
            Join hundreds of satisfied clients who chose excellence
          </p>
          <button
            onClick={() => navigate("/testimonial")}
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">Share Your Experience</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
