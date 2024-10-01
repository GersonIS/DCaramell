"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Variantes de animación para las tarjetas
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const ProductCategories = () => {
  const sections = [
    {
      title: "Decoración",
      link: "/decoraciones",
      imgSrc: "/images/slider3.jpg",
    },
    { title: "Bebidas", link: "/bebidas", imgSrc: "/images/slider4.jpg" },
    { title: "Postres", link: "/postres", imgSrc: "/images/slider2.jpg" },
    { title: "Tortas", link: "/tortas", imgSrc: "/images/slider1.jpg" },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {sections.map((section) => (
          <motion.div
            key={section.title}
            className="relative group rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Image
              src={section.imgSrc}
              alt={section.title}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
              width={224}
              height={224}
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-60 transition-opacity duration-500 group-hover:bg-opacity-70">
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-pink-300">
                {section.title}
              </h3>
              <Link href={section.link}>
                <button className="bg-pink-600 px-4 py-2 rounded-md text-white text-sm font-semibold transition duration-300 hover:bg-pink-500 shadow-md">
                  Ver más
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
