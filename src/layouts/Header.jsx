import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className=" top-0 left-0 w-full z-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-6 bg-[#eeeeea]  ">
        <h1 className="text-xl font-bold">Venure</h1>
        <div className="flex items-center gap-4">
          <button className="border p-2 rounded-full">↗</button>
          <motion.button
            onClick={toggleMenu}
            className="border p-2 rounded-full text-xl"
            whileTap={{ rotate: 90, scale: 0.9 }}
          >
            {menuOpen ? <IoClose size={22} /> : <RxHamburgerMenu size={22} />}
          </motion.button>
        </div>
      </div>

      {/* Dropdown nav menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="absolute top-[72px] left-0 w-full max-h-[60vh] bg-[#eeeeea] shadow-md z-40 flex flex-col items-center py-6 px-8"
          >
            <div className="grid grid-cols-2 gap-y-6 gap-x-16 text-2xl text-center">
              <button className="hover:text-primary transition">Home</button>
              <button className="hover:text-primary transition">Venues</button>
              <button className="hover:text-primary transition">Services</button>
              <button className="hover:text-primary transition">About</button>
              <button className="hover:text-primary transition col-span-2">Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
