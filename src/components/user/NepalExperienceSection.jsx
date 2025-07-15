import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NepalExperienceSection() {
  const navigate = useNavigate();
  const handleVenueNavigation = () => {
    navigate("/venues");
  };

  return (
    <section className="relative bg-gradient-to-br from-stone-50 via-amber-50 to-rose-50 py-24 px-6 md:px-16 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-rose-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-stone-300 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Image */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-200 to-rose-200 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <img
              src="https://images.pexels.com/photos/14716281/pexels-photo-14716281.jpeg"
              alt="Traditional Nepali setup"
              className="relative w-[280px] h-[400px] rounded-2xl shadow-2xl object-cover border border-white/20 backdrop-blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
          </motion.div>

          {/* Center Content */}
          <div className="flex-1 text-center max-w-4xl px-4">
            {/* Decorative element */}
            <motion.div
              className="flex items-center justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-8 h-8 text-amber-600 mr-2" />
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
              <Sparkles className="w-8 h-8 text-amber-600 ml-2" />
            </motion.div>

            <motion.h2
              className="text-4xl md:text-6xl font-serif font-light text-stone-800 mb-8 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Experience{" "}
              <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent font-medium">
                timeless celebrations
              </span>{" "}
              in the heart of Nepal
            </motion.h2>

            <motion.p
              className="text-stone-600 text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              From the majestic Himalayan backdrop to centuries-old heritage,
              our curated venues offer an exquisite blend of{" "}
              <em className="text-amber-700">Nepali warmth</em>, rich culture,
              and unparalleled elegance. Where tradition meets luxury.
            </motion.p>

            <motion.button
              onClick={handleVenueNavigation}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-rose-600 text-white font-medium px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-700 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Explore Venues</span>
              <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>

          {/* Right Image */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-rose-200 to-amber-200 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <img
              src="https://images.pexels.com/photos/7666505/pexels-photo-7666505.jpeg"
              alt="Traditional Nepali architecture"
              className="relative w-[280px] h-[400px] rounded-2xl shadow-2xl object-cover border border-white/20 backdrop-blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
          </motion.div>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
}
