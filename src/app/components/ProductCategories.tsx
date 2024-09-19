"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Variantes de animación para las tarjetas
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
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
      imgSrc: "/images/producto2.jpg",
    },
    { title: "Bebidas", link: "/bebidas", imgSrc: "/images/producto2.jpg" },
    { title: "Postres", link: "/postres", imgSrc: "/images/producto2.jpg" },
    { title: "Tortas", link: "/tortas", imgSrc: "/images/producto2.jpg" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {sections.map((section) => (
          <motion.div
            key={section.title}
            className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Image
              src={section.imgSrc}
              alt={section.title}
              className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-105"
              width={224}
              height={224}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white transition-opacity duration-500 group-hover:bg-opacity-60">
              <h3 className="text-2xl font-bold mb-4 text-white">
                {section.title}
              </h3>
              <Link href={section.link}>
                <button className="bg-pink-500 px-6 py-2 rounded-full text-white transition-transform transform group-hover:scale-110">
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
