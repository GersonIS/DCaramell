"use client";
import { motion } from "framer-motion";

export const ProductCard = ({
  product,
}: {
  product: { id: number; name: string; price: number };
}) => {
  return (
    <motion.div
      className="p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-700">Precio: S/ {product.price}</p>
      <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
        Ver Detalles
      </button>
    </motion.div>
  );
};
