"use client";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.footer
      className="bg-pink-400 text-white py-6 text-center"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <p>&copy; 2024 D&apos; Caramell.</p>
    </motion.footer>
  );
};
