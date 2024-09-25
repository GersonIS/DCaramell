"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/lib/data/products";
import Image from "next/image";
import Swal from "sweetalert2";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    Swal.fire({
      text: "Se agrego al carrito exitosamente! c:",
      icon: "success",
      showConfirmButton: false,
      timer: 1500, // Establecer el tiempo en milisegundos para cerrar automáticamente el mensaje
    }).then((result: any) => {
      // Acción a realizar después de que se cierra el modal
    });
    setShowModal(false); // Cierra el modal después de agregar al carrito
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <motion.div className="border p-4 rounded-md shadow-md">
      <Image
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
        width={192}
        height={192}
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-pink-500">${product.price.toFixed(2)}</p>
      <button
        className="bg-pink-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-pink-600 transition"
        onClick={() => setShowModal(true)}
      >
        Ver detalles
      </button>

      {showModal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-xl mb-4">{product.name}</h3>
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
              width={192}
              height={192}
            />
            <p className="text-lg mt-2">Precio: ${product.price}</p>

            <div className="flex items-center mt-4">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400 transition"
              >
                -
              </button>
              <span className="mx-4">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400 transition"
              >
                +
              </button>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Agregar al carrito
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
