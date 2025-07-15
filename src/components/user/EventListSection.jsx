import React, { useState } from "react";
import {
  Plus,
  Minus,
  Sparkles,
  Heart,
  Users,
  Calendar,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const events = [
  {
    title: "Weddings",
    description:
      "Celebrate your special day with timeless elegance and unforgettable moments in our enchanting venues designed for love stories.",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    accent: "rose",
    features: [
      "Bridal Suite",
      "Photography Areas",
      "Dance Floor",
      "Catering Service",
    ],
  },
  {
    title: "Corporate Events",
    description:
      "Host productive and inspiring business events in a refined atmosphere with state-of-the-art facilities and professional service.",
    icon: Users,
    color: "from-blue-500 to-indigo-600",
    accent: "blue",
    features: [
      "AV Equipment",
      "Conference Rooms",
      "Networking Spaces",
      "Catering Options",
    ],
  },
  {
    title: "Family Functions",
    description:
      "Make memories with your loved ones in a comfortable and beautiful setting that brings generations together in harmony.",
    icon: Users,
    color: "from-amber-500 to-orange-600",
    accent: "amber",
    features: [
      "Kid-Friendly Areas",
      "Traditional Setup",
      "Family Dining",
      "Entertainment Zone",
    ],
  },
  {
    title: "Anniversaries",
    description:
      "Toast to milestones in a romantic and intimate environment tailored for you, where every detail reflects your journey together.",
    icon: Calendar,
    color: "from-purple-500 to-violet-600",
    accent: "purple",
    features: [
      "Romantic Lighting",
      "Intimate Setting",
      "Custom Decor",
      "Special Menus",
    ],
  },
];

export default function EventListSection() {
  const [openIndices, setOpenIndices] = useState([0]);

  const toggleAccordion = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="flex flex-col lg:flex-row bg-gradient-to-br from-stone-50 via-amber-50 to-rose-50 min-h-screen items-stretch relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-amber-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-rose-300 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-300 rounded-full blur-xl"></div>
      </div>

      {/* Left Image Section */}
      <motion.div
        className="w-full lg:w-1/2 relative group"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-4 bg-gradient-to-br from-amber-400/20 to-rose-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          alt="Elegant event venue"
          className="w-full h-full object-cover relative z-10 rounded-r-3xl lg:rounded-r-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 z-20"></div>

        {/* Floating Stats */}
        <motion.div
          className="absolute top-8 left-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 z-30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-white">
            <Star className="w-5 h-5 text-amber-400 fill-current" />
            <span className="font-semibold">4.9</span>
            <span className="text-sm opacity-80">Rating</span>
          </div>
          <p className="text-white/80 text-sm mt-1">500+ Events</p>
        </motion.div>
      </motion.div>

      {/* Right Content Section */}
      <div className="w-full lg:w-1/2 px-8 md:px-16 py-16 flex flex-col justify-center relative">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 text-amber-600 mr-3" />
            <span className="text-amber-700 text-sm font-medium tracking-wide uppercase">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mb-4">
            Exceptional{" "}
            <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent font-medium">
              Events
            </span>
          </h2>
          <p className="text-stone-600 text-lg font-light leading-relaxed">
            Every celebration deserves perfection. Discover our curated event
            experiences.
          </p>
        </motion.div>

        {/* Events Accordion */}
        <div className="space-y-4">
          {events.map((event, index) => {
            const isOpen = openIndices.includes(index);
            const IconComponent = event.icon;

            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    event.color
                  } opacity-0 ${
                    isOpen ? "opacity-5" : "group-hover:opacity-5"
                  } rounded-2xl transition-all duration-500`}
                ></div>

                <div className="relative bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Header */}
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleAccordion(index)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`p-3 bg-gradient-to-r ${event.color} rounded-xl shadow-lg`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs text-stone-500 font-mono bg-stone-100 px-3 py-1 rounded-full">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="text-2xl font-serif font-medium text-stone-800 group-hover:text-stone-900 transition-colors">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    {/* Toggle Button */}
                    <motion.div
                      className={`p-3 rounded-full transition-all duration-300 ${
                        isOpen
                          ? `bg-gradient-to-r ${event.color} shadow-lg`
                          : "bg-stone-200 hover:bg-stone-300"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-white" />
                      ) : (
                        <Plus className="w-5 h-5 text-stone-600" />
                      )}
                    </motion.div>
                  </div>

                  {/* Animated Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 pl-16">
                          <p className="text-stone-700 text-lg font-light leading-relaxed mb-6">
                            {event.description}
                          </p>

                          {/* Features */}
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {event.features.map((feature, idx) => (
                              <motion.div
                                key={idx}
                                className="flex items-center gap-2"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <div
                                  className={`w-2 h-2 bg-gradient-to-r ${event.color} rounded-full`}
                                ></div>
                                <span className="text-stone-600 text-sm">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
}
