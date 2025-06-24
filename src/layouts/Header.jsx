import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useNavigate, useNavigation } from "react-router-dom";

const dropdownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 22, mass: 0.6 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const menuItemsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, delay: 0.15 }, // slower fade-in
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

function Header() {
    const navigate  = useNavigate();

    const handleLandingRedirect = () => {
      navigate("/");
    }

    const handleLoginRedirect = () => {
      navigate("/login")
    }

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="top-0 left-0 w-full z-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-6 bg-[#eeeeea]">
        <h1
        
        onClick={handleLandingRedirect}
        
        className="text-xl font-bold cursor-pointer">Venure</h1>
        <div className="flex items-center gap-4">
          <button 
          onClick={handleLoginRedirect}

          
          className="border p-2 rounded-full ">Login ↗</button>
          <motion.button
            onClick={toggleMenu}
            className="border p-2 rounded-full text-xl"
            whileTap={{ rotate: 90, scale: 0.9 }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <IoClose size={22} /> : <RxHamburgerMenu size={22} />}
          </motion.button>
        </div>
      </div>

      {/* Dropdown nav menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-[72px] left-0 w-full max-h-[60vh] bg-[#eeeeea] shadow-md z-40 flex flex-col items-center py-6 px-8"
          >
            <motion.div
              variants={menuItemsVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 gap-y-6 gap-x-16 text-center w-full max-w-md"
            >
              {["Home", "Venues", "Services", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  className={`hover:text-primary transition col-span-1 text-3xl font-serif ${
                    item === "Contact" ? "col-span-2" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
