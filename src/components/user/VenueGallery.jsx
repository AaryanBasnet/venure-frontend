import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";

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

  const venues = [
    {
      image: "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg",
      title: "Heritage Palace",
      location: "Kathmandu Valley",
      rating: 4.9
    },
    {
      image: "https://images.pexels.com/photos/32632283/pexels-photo-32632283.jpeg",
      title: "Mountain Vista Resort",
      location: "Pokhara Hills",
      rating: 4.8
    },
    {
      image: "https://images.pexels.com/photos/14716281/pexels-photo-14716281.jpeg",
      title: "Traditional Gardens",
      location: "Bhaktapur",
      rating: 4.9
    },
    {
      image: "https://images.pexels.com/photos/5039363/pexels-photo-5039363.jpeg",
      title: "Royal Courtyard",
      location: "Patan Durbar",
      rating: 5.0
    },
    {
      image: "https://images.pexels.com/photos/28613084/pexels-photo-28613084.jpeg",
      title: "Himalayan Retreat",
      location: "Nagarkot",
      rating: 4.7
    },
    {
      image: "https://images.pexels.com/photos/7666505/pexels-photo-7666505.jpeg",
      title: "Ancient Temple Grounds",
      location: "Swayambhunath",
      rating: 4.8
    },
    {
      image: "https://images.pexels.com/photos/12876497/pexels-photo-12876497.jpeg",
      title: "Lakeside Pavilion",
      location: "Phewa Lake",
      rating: 4.9
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Elegant background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500 rounded-full blur-[100px]"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500 rounded-full blur-[80px]"></div>
      </div>

      {/* Navigation Buttons */}
      <motion.div 
        className="absolute left-6 top-1/2 z-30 -translate-y-1/2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={scrollLeft}
          className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 shadow-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:text-amber-300 transition-colors" />
        </button>
      </motion.div>

      <motion.div 
        className="absolute right-6 top-1/2 z-30 -translate-y-1/2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={scrollRight}
          className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 shadow-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:text-amber-300 transition-colors" />
        </button>
      </motion.div>

      {/* Central Title Overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Decorative elements */}
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-amber-400 mr-3" />
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <span className="text-amber-300 text-sm font-light tracking-[0.3em] mx-4 uppercase">
              Explore
            </span>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <Sparkles className="w-6 h-6 text-amber-400 ml-3" />
          </div>

          <motion.h2
            className="text-white text-6xl md:text-7xl font-serif font-light mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Our{" "}
            <span className="bg-gradient-to-r from-amber-300 to-rose-300 bg-clip-text text-transparent font-medium">
              venues
            </span>
          </motion.h2>

          <p className="text-white/70 text-lg font-light max-w-md mx-auto leading-relaxed">
            Discover extraordinary spaces where every celebration becomes an unforgettable masterpiece
          </p>
        </motion.div>
      </div>

      {/* Gallery Slider */}
      <motion.div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-proximity space-x-8 px-8 py-12 scroll-smooth touch-pan-x h-screen items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {venues.map((venue, idx) => (
          <motion.div
            key={idx}
            className="group relative snap-start rounded-3xl overflow-hidden min-w-[85vw] sm:min-w-[45vw] md:min-w-[400px] h-[500px] md:h-[600px] shadow-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              duration: 0.8,
              delay: idx * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ y: -10, scale: 1.02 }}
            style={{ willChange: "transform" }}
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-rose-500/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Image */}
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={venue.image}
                alt={venue.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              {/* Rating */}
              <motion.div 
                className="flex items-center mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                  <span className="text-white text-sm font-medium">{venue.rating}</span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h3
                className="text-white text-2xl md:text-3xl font-serif font-medium mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                {venue.title}
              </motion.h3>

              {/* Location */}
              <motion.p
                className="text-white/80 text-lg font-light mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                {venue.location}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                className="group/btn bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
              >
                View Details
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="h-px w-64 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </motion.div>
    </div>
  );
}