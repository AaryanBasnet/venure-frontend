import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function NepalExperienceSection() {
  return (
    <section className="bg-cream py-20 px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-10">
      <motion.img
        src="https://images.pexels.com/photos/14716281/pexels-photo-14716281.jpeg"
        alt="Traditional setup"
        className="w-[250px] rounded-xl shadow-xl object-cover"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      />

      <div className="flex-1 text-center max-w-3xl">
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-semibold text-secondary mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Experience timeless celebrations in the heart of Nepal.
        </motion.h2>

        <motion.p
          className="text-gray-700 text-lg font-light leading-relaxed mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          From the Himalayan backdrop to centuries-old heritage,
          our venues offer a uniquely Nepali blend of warmth, culture,
          and elegance. Celebrate where tradition meets breathtaking views.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="border border-secondary text-secondary font-medium px-6 py-2 rounded-md flex items-center justify-center gap-2 mx-auto"
        >
          Explore Venues <FaArrowRight className="text-sm" />
        </motion.button>
      </div>

      <motion.img
        src="https://images.pexels.com/photos/7666505/pexels-photo-7666505.jpeg"
        alt="Nepali gate"
        className="w-[250px] rounded-xl shadow-xl object-cover"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      />
    </section>
  );
}
