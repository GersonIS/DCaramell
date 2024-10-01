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
    <motion.div className="border rounded-md p-4 shadow-md">
      <Image
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
        width={192}
        height={192}
      />
      <h2 className="text-lg font-semibold mt-2 text-gray-950">
        {product.name}
      </h2>
      <p className="text-gray-500">${product.price.toFixed(2)}</p>
      <button
        className="bg-pink-500 text-white px-4 py-2 mt-2 hover:bg-pink-600 transition"
        onClick={() => setShowModal(true)}
      >
        Ver detalles
      </button>

      {showModal && (
        <div className="modal fixed inset-0 flex items-center text-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-8 shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition duration-200 bg-gray-300 hover:bg-gray-200"
            >
              &times; {/* Ícono de cerrar */}
            </button>

            <h3 className="text-2xl font-semibold mb-4 text-center">
              {product.name}
            </h3>
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
              width={192}
              height={192}
            />
            <p className="text-lg font-bold text-gray-800 mt-2 text-center">
              Precio: ${product.price}
            </p>

            <div className="flex items-center justify-center mt-4">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-300 px-3 py-2 hover:bg-gray-400 transition duration-200"
              >
                -
              </button>
              <span className="mx-4 text-lg font-medium min-w-6">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="bg-gray-300 px-3 py-2 hover:bg-gray-400 transition duration-200"
              >
                +
              </button>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
