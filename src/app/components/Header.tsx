"use client";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { motion } from "framer-motion";
import { useContext, useState, useEffect, useRef } from "react";
import { Product } from "@/lib/data/products";
import { UiContextCarrito } from "@/context/UiProvideCarrito";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "./ModalUser";
import { useCustomerContext } from "@/context/UiProvideUser";

export const Header = () => {
  const [cart, setCart] = useContext(UiContextCarrito) || [[], () => {}]; // Obtenemos el carrito del contexto
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Estado para controlar el montaje
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Obtener datos del cliente
  const [customerData] = useCustomerContext();
  const [initial, setInitial] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (customerData) {
      setInitial(customerData.nombre.charAt(0).toUpperCase());
    }
  }, [customerData]);

  // Cerrar dropdown al hacer click fuera o presionar Esc
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [dropdownOpen]);

  // Manejar el toggle del dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Calcular la cantidad de productos diferentes en el carrito
  const totalItems = cart.length;

  // Función para aumentar la cantidad del producto
  const increaseQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      )
    );
  };

  // Función para disminuir la cantidad del producto
  const decreaseQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id && item.quantity! > 1
          ? { ...item, quantity: item.quantity! - 1 }
          : item
      )
    );
  };

  // Función para eliminar un producto del carrito
  const removeProduct = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40"
    >
      <div className="bg-gradient-to-r from-pink-500 to-pink-300 border-b shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <Link href={"/"} className="text-xl font-extrabold text-white tracking-wide">
              D&apos; Caramell
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-label="Abrir carrito"
                className="relative p-2 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 text-white"
              >
                {/* Icono del carrito */}
                <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                {/* Mostrar cantidad de productos solo si el componente está montado */}
                {isMounted && totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    aria-live="polite"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
              {/* Dropdown de productos */}
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 ring-1 ring-black ring-opacity-5"
                >
                  <div className="p-4 max-h-80 overflow-y-auto">
                    {totalItems === 0 ? (
                      <p className="text-center text-gray-500">
                        No hay productos en el carrito.
                      </p>
                    ) : (
                      cart.map((product: Product) => (
                        <div
                          key={product.id}
                          className="flex my-2 items-center border-b last:border-b-0 pb-2"
                        >
                          {/* Imagen del producto a la izquierda */}
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-16 h-16 rounded object-cover"
                            width={80}
                            height={80}
                          />
                          {/* Detalles del producto a la derecha */}
                          <div className="flex flex-col flex-grow ml-4">
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-gray-800">
                                {product.name}
                              </span>
                              <span className="text-gray-600">
                                ${product.price}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              Total: $
                              {(product.price * (product.quantity || 0)).toFixed(2)}
                            </span>
                            <div className="flex items-center mt-2 space-x-2">
                              <button
                                onClick={() => decreaseQuantity(product)}
                                className="px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-pink-300"
                                aria-label={`Disminuir cantidad de ${product.name}`}
                              >
                                -
                              </button>
                              <span className="w-6 text-center">{product.quantity}</span>
                              <button
                                onClick={() => increaseQuantity(product)}
                                className="px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-pink-300"
                                aria-label={`Aumentar cantidad de ${product.name}`}
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeProduct(product.id)}
                                className="ml-auto bg-pink-500 hover:bg-pink-400 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                aria-label={`Eliminar ${product.name}`}
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="w-4 h-4"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    <Link
                      href="/pedido"
                      onClick={closeDropdown}
                      className="text-white hover:text-gray-100"
                    >
                      <div className="text-center mt-2 py-2 bg-pink-500 hover:bg-pink-400 rounded">
                        Ver carrito
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-white h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Abrir usuario"
            >
              {initial ? (
                <span className="font-semibold">{initial}</span>
              ) : (
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
      <Navbar />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.header>
  );
};
