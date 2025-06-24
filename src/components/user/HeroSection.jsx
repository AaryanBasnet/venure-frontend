import venueImg from "../../assets/venueInterior.jpg";
import vineyardImg from "../../assets/vineyard.jpg";
import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div
      className="flex flex-col md:flex-row w-full h-full "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Left Image */}
      <motion.div
        className="md:w-1/2 w-full h-[50vh] md:h-full"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <img
          src={venueImg}
          alt="Elegant Venue"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Right Content */}
      <motion.div
        className="md:w-1/2 w-full p-8 md:p-12 flex flex-col justify-center bg-cream"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <div className="flex justify-between items-start">
          <motion.h1
            className="text-[2.5rem] md:text-[3rem] font-serif leading-tight text-secondary"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
           Find the top <br />
            <span className="text-primary">Venues in Nepal</span>
          </motion.h1>

          {/* Top Right Icons */}
          {/* <div className="hidden md:flex space-x-3">
            <button className="border p-2 rounded-full">↗</button>
            <button className="border p-2 rounded-full">≡</button>
          </div> */}
        </div>

        {/* Bottom Image */}
        <motion.div
          className="mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <img
            src={vineyardImg}
            alt="Napa Valley"
            className="w-full md:w-[80%] rounded-xl shadow-lg"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
