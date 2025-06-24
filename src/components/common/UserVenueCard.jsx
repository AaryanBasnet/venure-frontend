import React from "react";
import { motion } from "framer-motion";

export default function UserVenueCard({ venue, index }) {
  return (
    <motion.div
      key={index}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-700 ease-in-out transform hover:-translate-y-2 border border-gray-100"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.18, duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative h-64">
        <img
          src={venue.venueImages[0]?.url || "https://via.placeholder.com/400x250?text=Elegant+Venue"}
          alt={venue.name}
          className="w-full h-full object-cover rounded-t-2xl"
        />
        <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-md text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-full shadow">
          ${venue.pricePerHour}/hour
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif text-gray-800 mb-1 leading-snug">
          {venue.name}
        </h3>
        <p className="text-gray-500 text-sm mb-3 flex items-center">
          <i className="fas fa-map-marker-alt mr-2 text-rose-400"></i>
          {venue.location.city}, {venue.location.state}, {venue.location.country}
        </p>

        <div className="flex items-center text-gray-600 text-sm mb-4">
          <i className="fas fa-users mr-2 text-rose-400"></i>
          Capacity: <span className="font-medium ml-1">{venue.capacity}</span> guests
        </div>

        {venue.amenities.length > 0 && (
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

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full border border-rose-400 text-rose-500 font-medium py-3 rounded-full shadow hover:bg-rose-50 transition duration-300 ease-in-out text-sm"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}
