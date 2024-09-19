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
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    onFilter(name, parseFloat(minPrice) || 0, parseFloat(maxPrice) || Infinity);
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
        className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition mr-2"
      >
        Filtrar
      </button>
      <button
        onClick={onClear}
        className="bg-gray-300 text-black px-4 py-2 rounded-md mt-2 hover:bg-gray-400 transition"
      >
        Limpiar Filtros
      </button>
    </div>
  );
};
