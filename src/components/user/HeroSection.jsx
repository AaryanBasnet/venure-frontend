import venueImg from "../../assets/venueInterior.jpg";
import vineyardImg from "../../assets/vineyard.jpg";
import cutleryImg from "../../assets/cutleryImg.png";
import beautifulImg from "../../assets/beautifuImg.jpg";
import one from "../../assets/one.jpg";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Crown, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-rose-50/30 ">
      {" "}
      {/* Elegant background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300 to-indigo-400 rounded-full blur-3xl"></div>
      </div>
      <motion.div
        className="relative flex flex-col lg:flex-row w-full min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Left Image Section - Enhanced */}
        <motion.div
          className="relative lg:w-3/5 w-full h-[60vh] lg:h-screen overflow-hidden group"
          variants={itemVariants}
        >
          {/* Gradient overlays for luxury effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent z-10"></div>

          <motion.img
            src={one}
            alt="Luxury Venue"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: "brightness(1.1) contrast(1.15) saturate(1.2)",
            }}
          />

          {/* Floating luxury badges */}
          <motion.div
            className="absolute top-8 left-8 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-white/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Crown size={16} className="text-yellow-600" />
              <span>Premium Venues</span>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-8 z-20 bg-gradient-to-r from-rose-500/90 to-pink-600/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MapPin size={14} />
              <span>Nepal's Finest</span>
            </div>
          </motion.div>

          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/20 to-transparent z-10"></div>
        </motion.div>

        {/* Right Content Section - Luxurious */}
        <motion.div
          className="relative lg:w-2/5 w-full px-8 lg:px-16 py-12 lg:py-20 flex flex-col justify-center bg-gradient-to-br from-white via-slate-50/50 to-rose-50/30 backdrop-blur-sm"
          variants={itemVariants}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-300/30 to-transparent"></div>

          {/* Premium badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-gradient-to-r from-rose-100/80 to-pink-100/80 rounded-full border border-rose-200/50 shadow-sm w-fit"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.6,
              type: "spring",
              stiffness: 300,
            }}
          >
            <Sparkles size={16} className="text-rose-500" />
            <span className="text-sm font-semibold text-rose-700 tracking-wide">
              DISCOVER LUXURY
            </span>
          </motion.div>

          {/* Main heading with sophisticated typography */}
          <motion.div className="mb-8" variants={itemVariants}>
            <motion.h1
              className="text-4xl lg:text-6xl xl:text-7xl font-serif leading-[0.9] text-slate-800 mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              Find the most
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700 bg-clip-text text-transparent font-bold">
                  Exquisite Venues
                </span>
                <motion.div
                  className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-rose-200/50 to-pink-200/50 -z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                />
              </span>
              <br />
              <span className="text-slate-600 font-light">in Nepal</span>
            </motion.h1>

            <motion.p
              className="text-lg text-slate-600 leading-relaxed font-light max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Discover handpicked, luxury venues that transform your special
              moments into unforgettable experiences.
            </motion.p>
          </motion.div>

          {/* Stats section */}
          <motion.div
            className="flex gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-slate-800">500+</span>
              <span className="text-sm text-slate-600 font-medium">
                Premium Venues
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-3xl font-bold text-slate-800">4.9</span>
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
              </div>
              <span className="text-sm text-slate-600 font-medium">
                Average Rating
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <motion.button
            onClick={() => navigate('/venues')}
              className="group relative px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-700 to-pink-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Explore Venues</span>
              
            </motion.button>
          </motion.div>

          {/* Bottom decorative image - Enhanced */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 30, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: 1.8,
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/50">
              <img
                src={cutleryImg}
                alt="Luxury Dining Experience"
                className="w-full md:w-[85%] h-48 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{
                  filter: "brightness(1.1) contrast(1.1) saturate(1.15)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

              {/* Floating caption */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-lg border border-white/30">
                <span className="text-sm font-semibold text-slate-800">
                  Exquisite Dining
                </span>
              </div>
            </div>

            {/* Decorative border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-2xl blur-sm -z-10"></div>
          </motion.div>

          {/* Subtle decorative elements */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-rose-100/30 to-transparent rounded-full blur-2xl"></div>
        </motion.div>
      </motion.div>
      {/* Floating particles for luxury effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              y: [null, -20, 0, -10, 0],
              scale: [0, 1, 0.5, 1, 0],
              opacity: [0, 0.3, 0.1, 0.2, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 2,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
