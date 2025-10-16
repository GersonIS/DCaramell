"use client";
import { useContext } from "react";
import { UiContextCarrito } from "@/context/UiProvideCarrito";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Product } from "@/lib/data/products";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { useCustomerContext } from "@/context/UiProvideUser";

// Helper para formatear montos en moneda local
const formatCurrency = (value: number) => {
  try {
    return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(value);
  } catch (e) {
    return `$${value.toFixed(2)}`;
  }
};

const PedidoDetalle = () => {
  const [cart, setCart] = useContext(UiContextCarrito) || [[], () => {}]; // Obtenemos el carrito del contexto
  const [customerData] = useCustomerContext();

  // Calcular el subtotal y el total del pedido
  const subtotal = cart.reduce(
    (acc, product) => acc + product.price * product.quantity!,
    0
  );
  const tax = subtotal * 0.18; // Simulamos un 18% de impuestos (puedes ajustarlo)
  const total = subtotal + tax;

  // Funciones para modificar el carrito
  const increaseQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 0) }
            : item
        )
        .filter((item) => (item.quantity || 0) > 0)
    );
  };

  const removeProduct = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleOrder = () => {
    if (!customerData) {
      Swal.fire({
        title: "Error",
        text: "Debes registrar tus datos para realizar el pedido.",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500, // Establecer el tiempo en milisegundos para cerrar automáticamente el mensaje
      });
      return;
    }

    const pedido = cart
      .map(
        (item) =>
          `${item.name} - Cantidad: ${item.quantity} - Precio ${
            item.price
          }, Subtotal: $${item.price * item.quantity!}`
      )
      .join("\n");

    const subTotalPedido = `Subtotal: $${subtotal}`;
    const igvPedido = `IGV: $${tax}`;
    const totalPedido = `Total: $${total}`;

    const mensaje = `Hola, me gustaría realizar el siguiente pedido:\n\n${pedido}\n\n${subTotalPedido}\n\n${igvPedido}\n\n${totalPedido}\n\Dni/Ruc: ${customerData.dniRuc}\nNombre: ${customerData.nombre}\nDireccion: ${customerData.direccion}\nCelular: ${customerData.celular}`;
    const numeroWhatsApp = "948765692"; // Reemplaza con tu número de WhatsApp (incluye el código de país, sin el símbolo '+')

    // Crear el enlace de WhatsApp
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(enlaceWhatsApp, "_blank");

    Swal.fire({
      text: "Pedido realizado con éxito! c:",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Detalle del Pedido</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-center text-gray-500 mb-6">No hay productos en el carrito.</p>
            <Link href="/decoraciones" className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600">
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((product: Product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    layout
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-20 h-20 rounded object-cover"
                      width={80}
                      height={80}
                    />
                    <div className="flex flex-col flex-grow ml-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{product.name}</span>
                        <span className="text-gray-500">{formatCurrency(product.price)}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        Total: {formatCurrency(product.price * (product.quantity || 1))}
                      </span>
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() => decreaseQuantity(product)}
                          aria-label={`Disminuir cantidad de ${product.name}`}
                          className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span aria-live="polite" className="px-2">{product.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(product)}
                          aria-label={`Aumentar cantidad de ${product.name}`}
                          className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeProduct(product.id)}
                          aria-label={`Eliminar ${product.name}`}
                          className="ml-auto bg-red-100 hover:bg-red-200 rounded p-2 text-red-600"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <aside className="md:col-span-1">
              <div className="bg-white p-4 rounded-lg shadow sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Resumen</h2>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600">Impuestos (18%)</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between mt-4 border-t pt-4">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-xl font-bold">{formatCurrency(total)}</span>
                </div>

                <div className="mt-6">
                  <button
                    className="w-full px-4 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-400 transition duration-300 disabled:opacity-60"
                    onClick={handleOrder}
                    disabled={cart.length === 0}
                    aria-disabled={cart.length === 0}
                  >
                    Realizar Pedido
                  </button>
                  {!customerData && (
                    <p className="text-xs text-yellow-700 mt-2">Registra tus datos en la sección de usuario antes de realizar el pedido.</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Link para volver */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-pink-500 hover:underline">
            Seguir comprando
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PedidoDetalle;
