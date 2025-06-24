import React, { useRef } from "react";
import { motion } from "framer-motion";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

export default function VenueGallery() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 300;
      scrollRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 300;
      scrollRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  const images = [
    "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg",
    "https://images.pexels.com/photos/32632283/pexels-photo-32632283.jpeg",
    "https://images.pexels.com/photos/14716281/pexels-photo-14716281.jpeg",
    "https://images.pexels.com/photos/5039363/pexels-photo-5039363.jpeg",
    "https://images.pexels.com/photos/28613084/pexels-photo-28613084.jpeg",
    "https://images.pexels.com/photos/7666505/pexels-photo-7666505.jpeg",
    "https://images.pexels.com/photos/12876497/pexels-photo-12876497.jpeg",
  ];

  return (
    <div className="relative w-full overflow-hidden max-h-screen">
      {/* Left Scroll Button */}
      <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2">
        <button
          onClick={scrollLeft}
          className="bg-white rounded-full p-2 shadow hover:bg-blue-600 hover:text-white transition"
        >
          <CgChevronLeft size={24} />
        </button>
      </div>

      {/* Right Scroll Button */}
      <div className="absolute right-2 top-1/2 z-20 -translate-y-1/2">
        <button
          onClick={scrollRight}
          className="bg-white rounded-full p-2 shadow hover:bg-blue-600 hover:text-white transition"
        >
          <CgChevronRight size={24} />
        </button>
      </div>

      {/* Image Slider */}
      <motion.div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-proximity space-x-4 px-4 pb-4 scroll-smooth touch-pan-x"
      >
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            className="relative snap-start rounded-xl shadow-lg min-w-[85vw] sm:min-w-[45vw] md:min-w-[33vw] h-[300px] md:h-[400px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            style={{ willChange: "transform" }}
          >
            <img
              src={img}
              alt={`Venue ${idx + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Full Section Centered Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="pointer-events-auto text-white text-sm uppercase tracking-wide border border-white px-5 py-1 mb-3 hover:bg-white hover:text-black transition"
          >
            Explore
          </motion.button>
          <motion.h2
            className="text-white text-5xl font-serif"
            whileHover={{ scale: 1.02 }}
          >
            Our venues
          </motion.h2>
        </div>
      </div>
    </div>
  );
}
