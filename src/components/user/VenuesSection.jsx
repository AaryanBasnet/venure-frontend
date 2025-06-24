import { motion } from "framer-motion";
import React from "react";

// This would ideally come from your backend API
const venues = [
  {
    name: "Mountain View Hall",
    location: {
      address: "123 Mountain Rd",
      city: "Kathmandu",
      state: "Bagmati",
      country: "Nepal",
    },
    venueImages: [
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    ],
    description:
      "A serene and spacious hall nestled amidst the mountains, offering breathtaking views and a tranquil atmosphere perfect for grand celebrations.",
    capacity: 300,
    pricePerHour: 150,
    amenities: ["WiFi", "Parking", "AC", "Projector", "Sound System"],
  },
  {
    name: "Riverside Palace",
    location: {
      address: "456 Riverbank St",
      city: "Pokhara",
      state: "Gandaki",
      country: "Nepal",
    },
    venueImages: [
      { url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6" },
    ],
    description:
      "An enchanting palace situated by the calm riverside, providing a luxurious and romantic setting ideal for intimate weddings and elegant receptions.",
    capacity: 200,
    pricePerHour: 120,
    amenities: ["WiFi", "Garden Access", "Catering Services", "Private Entrance"],
  },
  {
    name: "Skyline Terrace",
    location: {
      address: "789 City View Ave",
      city: "Lalitpur",
      state: "Bagmati",
      country: "Nepal",
    },
    venueImages: [
      { url: "https://images.unsplash.com/photo-1589927986089-35812388d1ac" },
    ],
    description:
      "A chic rooftop terrace with mesmerizing city skyline views, perfect for exclusive gatherings, cocktail parties, and memorable corporate events.",
    capacity: 100,
    pricePerHour: 90,
    amenities: ["WiFi", "Rooftop Access", "Bar Service", "Heaters"],
  },
];

export default function VenuesSection() {
  return (
    <section className="py-20 px-6 md:px-16 bg-gradient-to-b from-rose-50 to-white">
      <motion.h2
        className="text-5xl md:text-6xl font-serif text-center mb-16 tracking-wide text-gray-800"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Discover Our Top Venues
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 max-w-7xl mx-auto">
        {venues.map((venue, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 ease-in-out transform hover:-translate-y-3 border border-gray-100"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.18, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative h-64">
              <img
                src={venue.venueImages[0]?.url || "https://via.placeholder.com/400x250?text=Elegant+Venue"}
                alt={venue.name}
                className="w-full h-full object-cover rounded-t-3xl"
              />
              <div className="absolute top-5 right-5 bg-white text-gray-800 text-base font-semibold px-4 py-2 rounded-full shadow-md backdrop-blur-sm bg-opacity-80">
                ${venue.pricePerHour}/hour
              </div>
            </div>
            <div className="p-7">
              <h3 className="text-3xl font-serif text-gray-800 mb-2 leading-tight">
                {venue.name}
              </h3>
              <p className="text-gray-500 text-sm mb-4 flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-rose-400"></i>
                {venue.location.city}, {venue.location.state},{" "}
                {venue.location.country}
              </p>
              {/* <p className="text-gray-600 mb-5 text-base leading-relaxed line-clamp-3">
                {venue.description}
              </p> */}

              <div className="flex items-center text-gray-600 text-base mb-5">
                <i className="fas fa-users mr-2 text-rose-400"></i>
                Capacity: <span className="font-medium ml-1">{venue.capacity}</span> guests
              </div>

              {venue.amenities.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-700 mb-3">Key Amenities:</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {venue.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-rose-50 text-rose-700 text-sm px-4 py-1.5 rounded-full flex items-center shadow-sm"
                      >
                        <i className="fas fa-check-circle mr-2 text-rose-500"></i>
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(240, 99, 116, 0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full border  text-black font-medium py-3.5 rounded-full shadow-lg hover:shadow-xl transition duration-400 ease-in-out text-lg"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}