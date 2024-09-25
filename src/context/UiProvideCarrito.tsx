"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/lib/data/products";

// Definir el tipo para el contexto
type UiContextType = [
  Product[],
  React.Dispatch<React.SetStateAction<Product[]>>
];

export const UiContextCarrito = createContext<UiContextType | undefined>(
  undefined
);

export const UiProviderCarrito = ({ children }: { children: ReactNode }) => {
  // Cargar el carrito desde localStorage
  const [carrito, setCarrito] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("carrito");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return []; // Retornar un arreglo vacío si no hay acceso al window
  });

  // Guardar el carrito en localStorage cada vez que se actualice
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }, [carrito]);

  return (
    <UiContextCarrito.Provider value={[carrito, setCarrito]}>
      {children}
    </UiContextCarrito.Provider>
  );
};
