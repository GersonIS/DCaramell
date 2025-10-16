"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/data/products";
import Image from "next/image";
import { createPortal } from "react-dom";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenDetails,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Focus management: focus close button when modal opens
  useEffect(() => {
    if (showModal) {
      // small timeout to ensure element is in DOM
      setTimeout(() => {
        try {
          closeBtnRef.current?.focus();
        } catch (e) {}
      }, 50);
    }
  }, [showModal]);

  const [showToast, setShowToast] = useState(false);

  // Evitar que múltiples modales se abran a la vez: usar un indicador global en window
  const openModalForThis = () => {
    try {
      (window as any).__openProductModalId = product.id;
    } catch (e) {}
    setShowModal(true);
  };

  const closeModalForThis = () => {
    try {
      if ((window as any).__openProductModalId === product.id) {
        (window as any).__openProductModalId = null;
      }
    } catch (e) {}
    setShowModal(false);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1400);
    closeModalForThis(); // Cierra el modal después de agregar al carrito
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
    <motion.div className="border rounded-md p-4 shadow-md bg-white">
      <Image
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
        width={192}
        height={192}
        loading="lazy"
      />
      <h2 className="text-lg font-semibold mt-2 text-gray-950">
        {product.name}
      </h2>
      <p className="text-gray-500">${product.price.toFixed(2)}</p>
      <button
        className="bg-pink-500 text-white px-4 py-2 mt-2 hover:bg-pink-600 transition"
        onClick={() => (typeof onOpenDetails === "function" ? onOpenDetails(product) : openModalForThis())}
        aria-haspopup="dialog"
      >
        Ver detalles
      </button>

      {/* Modal: render in a portal to avoid being affected by parent transforms (which break fixed positioning) */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {showModal && (window as any).__openProductModalId === product.id && (
              <motion.div
                className="modal fixed inset-0 flex items-center text-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                aria-modal="true"
                role="dialog"
              >
                {/* Backdrop */}
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                />

                <motion.div
                  ref={modalRef}
                  className="bg-white p-6 shadow-lg max-w-md w-full relative rounded-lg z-10 mx-4"
                  initial={{ y: 20, opacity: 0, scale: 0.98 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 20, opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22 }}
                >
                  <button
                    ref={closeBtnRef}
                    onClick={closeModalForThis}
                    aria-label="Cerrar"
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition duration-200 bg-gray-100 hover:bg-gray-200 rounded-full p-1"
                  >
                    &times;
                  </button>

                  <h3 className="text-2xl font-semibold mb-4 text-center">{product.name}</h3>

                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                    width={600}
                    height={400}
                    loading="lazy"
                  />

                  <p className="text-lg font-bold text-gray-800 mt-2 text-center">Precio: ${product.price}</p>

                  <div className="flex items-center justify-center mt-4 space-x-4">
                    <button
                      onClick={decreaseQuantity}
                      className="bg-gray-100 px-3 py-2 hover:bg-gray-200 transition duration-200 rounded"
                      aria-label={`Disminuir cantidad de ${product.name}`}
                    >
                      -
                    </button>
                    <span className="mx-4 text-lg font-medium">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="bg-gray-100 px-3 py-2 hover:bg-gray-200 transition duration-200 rounded"
                      aria-label={`Aumentar cantidad de ${product.name}`}
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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* Toast */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          className="fixed right-4 bottom-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50"
        >
          Agregado al carrito
        </motion.div>
      )}
    </motion.div>
  );
};
