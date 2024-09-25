"use client";
import { useState } from "react";

interface ProductFilterProps {
  onFilter: (name: string, minPrice: number, maxPrice: number) => void;
  onClear: () => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  onFilter,
  onClear,
}) => {
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const handleFilter = () => {
    // Verifica si los campos de precio son válidos o establece valores predeterminados
    const min = minPrice === "" ? 0 : parseFloat(minPrice);
    const max = maxPrice === "" ? Infinity : parseFloat(maxPrice);

    // Llama la función de filtro
    onFilter(name, min, max);
  };

  const handleClear = () => {
    // Limpia los campos de entrada
    setName("");
    setMinPrice("");
    setMaxPrice("");
    // Llama la función de limpiar filtros
    onClear();
  };

  return (
    <div className="p-4 bg-white border rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Filtros</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Buscar por nombre"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Precio mínimo
        </label>
        <input
          type="text"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Ej. 10"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Precio máximo
        </label>
        <input
          type="text"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Ej. 100"
        />
      </div>
      <button
        onClick={handleFilter}
        className="bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-300 transition mr-2"
      >
        Filtrar
      </button>
      <button
        onClick={handleClear}
        className="bg-gray-400 text-white px-4 py-2 rounded-md mt-2 hover:bg-gray-300 transition"
      >
        Sin Filtros
      </button>
    </div>
  );
};
