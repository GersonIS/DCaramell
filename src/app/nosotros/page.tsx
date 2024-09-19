"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const NosotrosPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = form;
    window.open(
      `https://wa.me/948765692?text=Nombre:%20${name}%0ACorreo:%20${email}%0AMensaje:%20${message}`
    );
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="p-8 bg-gray-100 rounded-lg shadow-lg"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-pink-600">
        Nosotros
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Información de la Empresa */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="md:w-1/2"
        >
          <div className="p-6 bg-white border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-pink-500">
              Nuestra Ubicación
            </h2>
            <div className="relative w-full h-80 rounded-lg overflow-hidden shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.275527566053!2d-79.05637712613647!3d-8.073355591954638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3e7805deb329%3A0x672ec21c44cb36f2!2sD'caramell%20Pasteleria%20Fina!5e0!3m2!1spt-BR!2spe!4v1726725186653!5m2!1spt-BR!2spe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </motion.div>

        {/* Formulario de Contacto */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="md:w-1/2"
        >
          <h2 className="text-xl font-semibold mb-6 text-pink-500">Contacto</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-base mb-1">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-pink-300"
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base mb-1">
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-pink-300"
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-base mb-1">
                Mensaje:
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-pink-300"
                rows={4}
                required
                autoComplete="off"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition-shadow hover:shadow-lg"
            >
              Enviar
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NosotrosPage;
