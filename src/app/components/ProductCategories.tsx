"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Decoración",
    image: "/images/producto2.jpg",
    link: "#decoracion",
  },
  {
    name: "Bebidas",
    image: "/images/producto2.jpg",
    link: "#bebidas",
  },
  {
    name: "Postres",
    image: "/images/producto2.jpg",
    link: "#postres",
  },
  {
    name: "Tortas",
    image: "/images/producto2.jpg",
    link: "#tortas",
  },
];

export const ProductCategories = () => {
  return (
    <section className="py-10">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover"
              width={200}
              height={200}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={category.link}
                className="text-white bg-pink-500 px-4 py-2 rounded-lg"
              >
                Ver {category.name}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
