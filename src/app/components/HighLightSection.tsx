"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export const HighlightSection = () => {
  return (
    <section className="bg-black text-white py-16 px-8 md:px-16">
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
          <h2 className="text-4xl md:text-3xl font-bold mb-4">
            Productos que harán tus fiestas inolvidables
          </h2>
          <p className="text-lg">
            Desde decoraciones hasta deliciosas tortas personalizadas, tenemos
            todo lo que necesitas para celebrar cualquier ocasión especial.
          </p>
        </div>

        {/* Imagen */}
        <motion.div
          className="md:w-1/2"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/producto2.jpg"
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
