"use client";
import { useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Carousel } from "./components/Carousel";
import { HighlightSection } from "./components/HighLightSection";
import { ProductCategories } from "./components/ProductCategories";
import { ProductCard } from "./components/ProductCard";
import { products as allProducts, Product } from "@/lib/data/products";
import { UiContextCarrito } from "@/context/UiProvideCarrito";

export default function Home() {
  const [cart, setCart] = useContext(UiContextCarrito) || [[], () => {}];

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev: Product[]) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: (p.quantity || 0) + quantity }
            : p
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // Seleccionar productos populares: tomamos hasta 2 por categoría si existen
  const groupByCategory: Record<string, Product[]> = allProducts.reduce(
    (acc: Record<string, Product[]>, p) => {
      acc[p.category] = acc[p.category] || [];
      acc[p.category].push(p);
      return acc;
    },
    {}
  );

  const popularCandidates: Product[] = [];
  (Object.keys(groupByCategory) as (keyof typeof groupByCategory)[]).forEach(
    (cat) => {
      const list = groupByCategory[cat] || [];
      // tomar los primeros 2 de cada categoría (si existen)
      popularCandidates.push(...list.slice(0, 2));
    }
  );

  // Limitar a 8 productos y mezclar ligeramente
  const popular = popularCandidates.slice(0, 8);

  return (
    <main>
      {/* Hero + Carousel */}
      <section className="bg-gradient-to-r from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
              Endulza tus momentos con D&apos; Caramell
            </h1>
            <p className="text-gray-700 text-lg md:text-xl">
              Pasteles, postres y decoración para cada celebración. Envíos y pedidos personalizados.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Link href="/decoraciones" className="bg-pink-500 text-white px-5 py-2 rounded-md shadow hover:bg-pink-400 transition">
                Explorar productos
              </Link>
            </div>
          </div>

          <div>
            <Carousel />
          </div>
        </div>
      </section>

      {/* Categorías */}
      <ProductCategories />

      {/* Productos populares: mezcla de categorías con ProductCard (mismo modal) */}
      <section id="popular" className="max-w-7xl mx-auto px-4 py-12">
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Productos populares
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popular.map((p) => (
            <motion.div key={p.id} whileHover={{ y: -6 }}>
              <ProductCard product={p} onAddToCart={addToCart} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Nota: se removió la sección de "Productos destacados" por solicitud del usuario */}

      <HighlightSection />
    </main>
  );
}
