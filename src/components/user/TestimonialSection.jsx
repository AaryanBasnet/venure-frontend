import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Anjali Sharma",
    event: "Wedding at Mountain View Hall",
    rating: 5,
    comment:
      "Everything was perfect—from the decor to the hospitality. Couldn't have asked for a better venue!",
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Ramesh Koirala",
    event: "Corporate Retreat at Riverside Palace",
    rating: 4,
    comment:
      "Our team had a fantastic time. The ambiance was professional yet relaxing.",
    image:
      "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Thapa",
    event: "Birthday at Skyline Terrace",
    rating: 5,
    comment:
      "The city view was breathtaking and the service was top-notch. Highly recommended!",
    image:
      "https://randomuser.me/api/portraits/women/43.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 py-24 px-6 md:px-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-amber-700 font-medium text-sm tracking-wide uppercase">
              Client Testimonials
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-serif text-slate-800 font-light mb-6 leading-tight">
            What Our{" "}
            <span className="bg-gradient-to-r from-amber-600 via-rose-500 to-violet-600 bg-clip-text text-transparent font-medium">
              Distinguished Guests
            </span>{" "}
            Say
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 group-hover:-translate-y-2">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200 via-rose-200 to-violet-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm scale-105"></div>
                
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                    <FaQuoteLeft className="text-white text-xs" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-6 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-lg transition-colors duration-300 ${
                        i < testimonial.rating
                          ? "text-amber-400 group-hover:text-amber-500"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full animate-pulse opacity-75 scale-110"></div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-800 mb-1">
                    {testimonial.name}
                  </h3>
                  
                  <p className="text-sm text-slate-500 font-medium tracking-wide">
                    {testimonial.event}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-slate-600 text-lg mb-6">
            Join hundreds of satisfied clients who chose excellence
          </p>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden">
            <span className="relative z-10">Share Your Experience</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}