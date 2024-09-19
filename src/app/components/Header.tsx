"use client";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-gradient-to-r from-pink-400 to-pink-50 border-b shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <Link href={"/"} className="text-lg font-bold text-white">
              D&apos; Caramell
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative">
              {/* Icono del carrito */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H4m3 8v9m10-9v9m-6-9h6"
                />
              </svg>
            </button>
            <button className="text-sm text-white">Login</button>
          </div>
        </div>
      </div>
      <Navbar />
    </motion.header>
  );
};
