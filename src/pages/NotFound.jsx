import React from 'react'
import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
const navigate = useNavigate();

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
  }

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
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30 overflow-hidden flex items-center justify-center">
      {/* Background patterns matching hero */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-200/20 to-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-indigo-300/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="relative max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 py-16 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <h1 className="text-8xl sm:text-9xl font-serif font-bold text-transparent bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700 bg-clip-text leading-none">
            404
          </h1>
          <div className="relative mt-4">
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-light max-w-lg mx-auto">
            The venue you're looking for seems to have moved to a different location. 
            Let's help you find your way back to our exquisite collection.
          </p>
        </motion.div>

        {/* Decorative Icon */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center border border-rose-200/50 shadow-lg">
              <MapPin size={32} className="text-rose-600" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-full blur-sm -z-10"></div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <motion.button
          onClick={()=> navigate("/")}
            className="group relative px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex items-center gap-3"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-700 to-pink-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Home size={20} className="relative z-10" />
            <span className="relative z-10">Return Home</span>
          </motion.button>

      
        </motion.div>

        

        {/* Go Back Button */}
        <motion.div
          variants={itemVariants}
          className="mt-12"
        >
          <motion.button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 text-slate-500 hover:text-rose-600 transition-colors duration-300 mx-auto"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-light">Go back to previous page</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating particles for luxury effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full opacity-20"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
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
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}