"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "/images/slider1.jpg",
  "/images/slider2.jpg",
  "/images/slider3.jpg",
  "/images/slider4.jpg",
];

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);
    }
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full mb-5" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <motion.div
        className="overflow-hidden rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          key={currentIndex}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Contenedor con altura fija para evitar salto entre imágenes */}
          <div className="relative w-full h-64 sm:h-72 md:h-96">
            <Image
              src={images[currentIndex]}
              alt={`Producto ${currentIndex + 1}`}
              className="object-cover"
              fill
              priority={true}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Botón Prev con animación */}
      <motion.button
        onClick={handlePrev}
        aria-label="Anterior"
        className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-black bg-opacity-50 text-white p-3 rounded-full focus:outline-none"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </motion.button>

      {/* Botón Next con animación */}
      <motion.button
        onClick={handleNext}
        aria-label="Siguiente"
        className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full focus:outline-none"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.button>

      {/* Indicadores con animación */}
      <motion.div
        className="flex justify-center mt-4 space-x-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {images.map((_, index) => (
          <span
            key={index}
            className={`block h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-pink-500" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </motion.div>
    </div>
  );
};
