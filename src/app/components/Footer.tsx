"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

// Variantes para la animación del texto
const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Variantes para la animación de los iconos
const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <footer className="bg-pink-500 text-white py-8 px-4 md:px-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={textVariants}
        >
          {/* Información de la empresa */}
          <motion.div variants={textVariants}>
            <h3 className="text-xl font-bold mb-4 text-white">
              Nuestra Empresa
            </h3>
            <p className="text-pink-200">
              Dirección: Av. Egipto 123, La Esperanza
            </p>
            <p className="text-pink-200">Teléfono: +123 456 789</p>
            <p className="text-pink-200">Email: dcaramel@gmail.com</p>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div variants={textVariants}>
            <h3 className="text-xl font-bold mb-4 text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tortas"
                  className="hover:text-pink-300 transition text-pink-200"
                >
                  Tortas
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="hover:text-pink-300 transition text-pink-200"
                >
                  Nosotros
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Redes sociales */}
          <motion.div variants={iconVariants}>
            <h3 className="text-xl font-bold mb-4 text-white">Síguenos</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.instagram.com"
                className="text-white hover:text-pink-200 transition"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
              >
                <FaInstagram size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com"
                className="text-white hover:text-pink-200 transition"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a
                href="https://wa.me/123456789"
                className="text-white hover:text-pink-200 transition"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
              >
                <FaWhatsapp size={24} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Derechos reservados */}
        <motion.div
          className="mt-8 text-center text-gray-200"
          initial="hidden"
          whileInView="visible"
          variants={textVariants}
        >
          <p>&copy; 2024 D&apos; Caramell.</p>
        </motion.div>
      </footer>
    </motion.div>
  );
};
