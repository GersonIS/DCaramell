"use client";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { motion } from "framer-motion";
import { useContext, useState, useEffect } from "react";
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

  // Obtener datos del cliente
  const [customerData] = useCustomerContext();
  const [initial, setInitial] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (customerData) {
      setInitial(customerData.nombre.charAt(0).toUpperCase());
    }
  }, [customerData]);

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
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-gradient-to-r from-pink-400 to-pink-50 border-b shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <Link href={"/"} className="text-lg font-bold text-white">
              D&apos; Caramell
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button onClick={toggleDropdown} className="relative">
                {/* Icono del carrito */}
                <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
                {/* Mostrar cantidad de productos solo si el componente está montado */}
                {isMounted && totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </button>
              {/* Dropdown de productos */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10">
                  <div className="p-4 max-h-80 overflow-y-auto">
                    {totalItems === 0 ? (
                      <p className="text-center text-gray-500">
                        No hay productos en el carrito.
                      </p>
                    ) : (
                      cart.map((product: Product) => (
                        <div
                          key={product.id}
                          className="flex my-2 items-center"
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
                            <div className="flex justify-between">
                              <span className="font-semibold">
                                {product.name}
                              </span>
                              <span className="text-gray-500">
                                ${product.price}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              Total: $
                              {(product.price * product.quantity!).toFixed(2)}
                            </span>
                            <div className="flex items-center mt-2 space-x-2">
                              <button
                                onClick={() => decreaseQuantity(product)}
                                className="px-2 py-1 bg-gray-200 text-red-600 hover:bg-red-200 rounded"
                              >
                                -
                              </button>
                              <span>{product.quantity}</span>
                              <button
                                onClick={() => increaseQuantity(product)}
                                className="px-2 py-1 bg-gray-200 text-green-600 hover:bg-green-200 rounded"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeProduct(product.id)}
                                className="ml-auto bg-pink-400 hover:bg-red-200 rounded p-2"
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
                      <div className="text-center mt-2 py-1 bg-pink-400 hover:bg-pink-300">
                        Ver carrito
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-white h-10"
            >
              {initial ? (
                initial
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
