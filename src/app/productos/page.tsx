// app/productos/page.tsx
import { ProductCard } from "../components/ProductCard";

const productos = [
  { id: 1, name: "Torta de Chocolate", price: 50 },
  { id: 2, name: "Gaseosa", price: 5 },
  // más productos...
];

export default function Productos() {
  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Nuestros Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <ProductCard key={producto.id} product={producto} />
        ))}
      </div>
    </div>
  );
}
