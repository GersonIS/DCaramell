"use client";
import { useState, useContext, useMemo } from "react";
import Link from "next/link";
import { ProductCard } from "../components/ProductCard";
import { Product, products } from "@/lib/data/products";
import { UiContextCarrito } from "@/context/UiProvideCarrito";

const DecoracionPage = () => {
  const allDecor = useMemo(() => products.filter((p) => p.category === "decoracion"), []);

  const cartContext = useContext(UiContextCarrito);
  if (!cartContext) {
    throw new Error("UiContextCarrito debe ser usado dentro de UiProviderCarrito");
  }
  const [cart, setCart] = cartContext;

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc" | "name">("default");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let res = allDecor.filter((p) => p.name.toLowerCase().includes(q));
    const min = minPrice === "" ? 0 : parseFloat(minPrice);
    const max = maxPrice === "" ? Infinity : parseFloat(maxPrice);
    res = res.filter((p) => p.price >= min && p.price <= max);
    if (sort === "price-asc") res.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") res.sort((a, b) => b.price - a.price);
    if (sort === "name") res.sort((a, b) => a.name.localeCompare(b.name));
    return res;
  }, [allDecor, search, minPrice, maxPrice, sort]);

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev: Product[]) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) return prev.map((p) => (p.id === product.id ? { ...p, quantity: (p.quantity || 0) + quantity } : p));
      return [...prev, { ...product, quantity }];
    });
  };

  return (
    <main className="max-w-7xl mx-auto p-6">
      <header className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-extrabold">Decoraciones</h1>
          <p className="text-gray-600 mt-2">Adornos, manteles, centros de mesa y más para tu celebración.</p>
        </div>
        <div className="flex gap-3 justify-end">
          <Link href="/pedido" className="bg-pink-500 text-white px-4 py-2 rounded">Hacer pedido</Link>
        </div>
      </header>

      <section className="bg-white rounded p-4 shadow mb-6">
        <div className="flex flex-col lg:flex-row gap-3 items-center">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre..." className="border rounded px-3 py-2 flex-1" />
          <div className="flex gap-2 items-center">
            <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min" className="border rounded px-2 py-2 w-20" />
            <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max" className="border rounded px-2 py-2 w-20" />
            <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="border rounded px-2 py-2">
              <option value="default">Recomendado</option>
              <option value="price-asc">Precio ↑</option>
              <option value="price-desc">Precio ↓</option>
              <option value="name">Nombre</option>
            </select>
            <button
              onClick={() => {
                setSearch("");
                setMinPrice("");
                setMaxPrice("");
                setSort("default");
              }}
              className="ml-2 px-3 py-2 border rounded bg-white hover:bg-gray-50"
            >
              Limpiar
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">No hay productos que coincidan.</div>
          ) : (
            filtered.map((p) => (
              <div key={p.id}>
                <ProductCard product={p} onAddToCart={addToCart} />
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default DecoracionPage;
