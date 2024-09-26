"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/decoraciones", label: "Decoración" },
    { href: "/bebidas", label: "Bebidas" },
    { href: "/postres", label: "Postres" },
    { href: "/tortas", label: "Tortas" },
    { href: "/nosotros", label: "Nosotros" },
  ];

  return (
    <nav className="bg-white border-b shadow-md min-h-14">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center items-center text-center">
        {/* Menú de navegación para pantallas grandes */}
        <div className="hidden md:flex space-x-8 text-black">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-pink-500 transition ${
                path === href ? "text-pink-500 border-b-2 border-pink-500" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Botón de menú hamburguesa para pantallas pequeñas */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú desplegable en pantallas pequeñas */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-pink-400 text-white px-4 pt-4 pb-6 text-center overflow-hidden min-h-[290px]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block py-2 hover:bg-pink-500 rounded-sm ${
                  path === href ? "bg-pink-500 text-white" : " text-pink-100"
                }`}
                onClick={toggleMenu}
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
