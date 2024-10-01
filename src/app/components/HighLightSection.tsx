"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HighlightSection = () => {
  return (
    <section className="bg-gray-950 text-white py-16 px-8 md:px-16">
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        {/* Texto destacado */}
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¡Haz que tus celebraciones sean memorables!
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Descubre nuestra amplia gama de productos, desde decoraciones
            vibrantes hasta exquisitas tortas personalizadas. ¡Todo lo que
            necesitas para hacer de tu fiesta un evento inolvidable!
          </p>
          <Link
            href="/decoraciones"
            className="bg-pink-600 px-6 py-2 text-white font-semibold transition duration-300 hover:bg-pink-500"
          >
            Explorar Productos
          </Link>
        </div>

        {/* Imagen */}
        <motion.div
          className="md:w-1/2"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/highsection.jpg"
            alt="Fiesta inolvidable"
            className="rounded-lg shadow-lg"
            width={400}
            height={400}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
