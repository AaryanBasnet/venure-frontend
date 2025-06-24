import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

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
    <section className="bg-cream py-16 px-6 md:px-12">
      <motion.h2
        className="text-4xl md:text-5xl font-serif text-center font-semibold text-secondary mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        What Our Guests Say
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-primary"
            />
            <h3 className="text-lg font-semibold text-secondary">{t.name}</h3>
            <p className="text-sm text-gray-500 italic">{t.event}</p>
            <div className="flex justify-center mt-2 mb-4 text-primary">
              {[...Array(t.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text-gray-700 text-sm">{`"${t.comment}"`}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
