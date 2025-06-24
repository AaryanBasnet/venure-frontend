import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const events = [
  {
    title: "Weddings",
    description: "Celebrate your special day with timeless elegance and unforgettable moments.",
  },
  {
    title: "Corporate events",
    description: "Host productive and inspiring business events in a refined atmosphere.",
  },
  {
    title: "Family functions",
    description: "Make memories with your loved ones in a comfortable and beautiful setting.",
  },
  {
    title: "Anniversaries",
    description: "Toast to milestones in a romantic and intimate environment tailored for you.",
  },
];

export default function EventListSection() {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="flex flex-col md:flex-row bg-cream min-h-screen items-stretch">
      {/* Left Image */}
      <div className="w-full md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          alt="Event venue"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 px-6 md:px-12 py-12 flex flex-col justify-center bg-[#FAF8F3]">
        {events.map((event, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div key={index} className="border-b border-gray-300 py-6">
              {/* Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <div>
                  <p className="text-xs text-gray-500 font-mono">00{index + 1}</p>
                  <h3 className="text-xl text-secondary font-medium">{event.title}</h3>
                </div>
                {isOpen ? (
                  <FiMinus className="text-primary transition" />
                ) : (
                  <FiPlus className="text-gray-400 hover:text-primary transition" />
                )}
              </div>

              {/* Animated Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-sm text-gray-700">{event.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
