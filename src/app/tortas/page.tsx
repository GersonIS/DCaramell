"use client";
import { useContext, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { ProductFilter } from "../components/ProductFilter";
import { Product, products } from "@/lib/data/products";
import { motion } from "framer-motion";
import { UiContextCarrito } from "@/context/UiProvideCarrito";

const pageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const TortasPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    products.filter((product) => product.category === "tortas")
  );

  const [showFilter, setShowFilter] = useState(false);

  // Consumir el contexto del carrito
  const cartContext = useContext(UiContextCarrito);

  // Verificar si el contexto es undefined
  if (!cartContext) {
    throw new Error(
      "UiContextCarrito debe ser usado dentro de UiProviderCarrito"
    );
  }

  const [cart, setCart] = cartContext;

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prevCart: Product[]) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };
  const handleFilter = (name: string, minPrice: number, maxPrice: number) => {
    const filtered = products
      .filter((product) => product.category === "tortas")
      .filter(
        (product) =>
          product.name.toLowerCase().includes(name.toLowerCase()) &&
          product.price >= minPrice &&
          product.price <= maxPrice
      );
    setFilteredProducts(filtered);
  };

  const handleClearFilters = () => {
    setFilteredProducts(
      products.filter((product) => product.category === "tortas")
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Tortas</h1>
      {/* Botón para mostrar/ocultar filtro en modo mobile */}
      <div className="mb-4 text-center md:hidden">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="px-4 py-2 bg-pink-400 text-white rounded-md"
        >
          {showFilter ? "Ocultar Filtros" : "Mostrar Filtros"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtro, visible en pantallas grandes y en mobile si showFilter es true */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`md:w-1/4 ${showFilter ? "block" : "hidden md:block"}`}
        >
          <ProductFilter onFilter={handleFilter} onClear={handleClearFilters} />
        </motion.div>
        {/* Siempre visible en pantallas grandes */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="md:w-3/4"
        >
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TortasPage;
