import React from "react";
import { motion } from "framer-motion";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

export default function UserVenueCard({ venue, index }) {
  const imageUrl =
    venue.venueImages?.length > 0
      ? `${BASE_URL}/${venue.venueImages[0].url}`
      : "https://via.placeholder.com/400x250?text=Elegant+Venue";

  return (
    <motion.div
      key={venue._id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-700 ease-in-out transform border border-gray-100"
    >
      <div className="relative h-64">
        <img
          src={imageUrl}
          alt={venue.venueName}
          className="w-full h-full object-cover rounded-t-2xl"
        />
        <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-md text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-full shadow">
          ${venue.pricePerHour}/hour
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif text-gray-800 mb-1 leading-snug">
          {venue.venueName}
        </h3>
        <p className="text-gray-500 text-sm mb-3 flex items-center">
          <i className="fas fa-map-marker-alt mr-2 text-rose-400"></i>
          {venue.location?.city}, {venue.location?.state}, {venue.location?.country}
        </p>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <i className="fas fa-users mr-2 text-rose-400"></i>
          Capacity: <span className="font-medium ml-1">{venue.capacity}</span> guests
        </div>
        {venue.amenities?.length > 0 && (
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Amenities:</h4>
            <div className="flex flex-wrap gap-2">
              {venue.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="bg-rose-50 text-rose-700 text-xs px-3 py-1 rounded-full flex items-center shadow-sm"
                >
                  <i className="fas fa-check-circle mr-1 text-rose-500"></i>
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
        <button className="w-full border border-rose-400 text-rose-500 font-medium py-3 rounded-full shadow hover:bg-rose-50 transition duration-300 ease-in-out text-sm">
          View Details
        </button>
      </div>
    </motion.div>
  );
}
