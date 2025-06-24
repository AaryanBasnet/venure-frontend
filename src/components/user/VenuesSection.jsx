import React from "react";
import { motion } from "framer-motion";
import UserVenueCard from "../common/UserVenueCard"; // adjust path if needed

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
      <div className="flex items-center justify-between max-w-7xl mx-auto mb-10">
        <motion.h2
          className="text-5xl md:text-6xl font-serif tracking-wide text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Discover Our Top Venues
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="text-rose-600 font-semibold text-lg px-5 py-2 border border-rose-500 rounded-full hover:bg-rose-100 transition"
        >
          Explore All
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 max-w-7xl mx-auto">
        {venues.map((venue, index) => (
          <UserVenueCard key={index} venue={venue} index={index} />
        ))}
      </div>
    </section>
  );
}

