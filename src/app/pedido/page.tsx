"use client";
import { useContext } from "react";
import { UiContextCarrito } from "@/context/UiProvideCarrito";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Product } from "@/lib/data/products";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useCustomerContext } from "@/context/UiProvideUser";

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
      prevCart.map((item) =>
        item.id === product.id && item.quantity! > 1
          ? { ...item, quantity: item.quantity! - 1 }
          : item
      )
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
      <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Detalle del Pedido
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay productos en el carrito.
          </p>
        ) : (
          <div className="space-y-4">
            {cart.map((product: Product) => (
              <div
                key={product.id}
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
                    <span className="text-gray-500">${product.price}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Total: ${(product.price * product.quantity!).toFixed(2)}
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
                      <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Subtotales y total */}
            <div className="bg-white p-4 rounded-lg shadow mt-4">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Impuestos (18%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xl font-bold">Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Botón para realizar el pedido */}
            <div className="text-center mt-6">
              <button
                className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-400 transition duration-300"
                onClick={handleOrder}
              >
                Realizar Pedido
              </button>
            </div>
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
