"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/decoraciones", label: "Decoración" },
    { href: "/bebidas", label: "Bebidas" },
    { href: "/postres", label: "Postres" },
    { href: "/tortas", label: "Tortas" },
    { href: "/nosotros", label: "Nosotros" },
  ];

  return (
    <nav className="bg-white border-b shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Menú de navegación para pantallas grandes */}
        <div className="hidden md:flex space-x-8 text-black items-center">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative px-2 py-1 rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-300 ${
                path === href
                  ? "text-pink-600 after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-pink-400"
                  : "text-gray-700 hover:text-pink-500"
              }`}
            >
              <motion.span whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                {label}
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Botón de menú hamburguesa para pantallas pequeñas */}
        <div className="md:hidden flex items-center">
          <button
            className="p-2 rounded-md bg-pink-500 text-white focus:outline-none focus:ring-2 focus:ring-pink-300"
            onClick={toggleMenu}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className="w-6 h-6 flex items-center justify-center"
            >
              {!isOpen ? (
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
              ) : (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Menú desplegable en pantallas pequeñas con backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <motion.div
              ref={menuRef}
              className="fixed top-16 left-4 right-4 z-40 bg-white rounded-lg p-4 shadow-lg"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex flex-col space-y-2">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-center transition-colors duration-150 ${
                      path === href
                        ? "bg-pink-50 text-pink-600 font-semibold"
                        : "text-gray-700 hover:bg-pink-50"
                    }`}
                  >
                    <motion.span whileTap={{ scale: 0.97 }}>{label}</motion.span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
