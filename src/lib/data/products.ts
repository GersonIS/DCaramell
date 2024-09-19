// data/products.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: "decoracion" | "bebidas" | "postres" | "tortas";
  quantity?: number;
}

export const products: Product[] = [
  // Productos de decoración
  {
    id: 1,
    name: "Globo de Cumpleaños",
    price: 10,
    imageUrl: "/images/producto2.jpg",
    category: "decoracion",
  },
  {
    id: 2,
    name: "Cinta Decorativa",
    price: 5,
    imageUrl: "/images/producto2.jpg",
    category: "decoracion",
  },
  {
    id: 3,
    name: "Globo de Cumpleaños",
    price: 10,
    imageUrl: "/images/producto2.jpg",
    category: "decoracion",
  },
  {
    id: 4,
    name: "Cinta Decorativa",
    price: 5,
    imageUrl: "/images/producto2.jpg",
    category: "decoracion",
  },
  {
    id: 5,
    name: "Globo de Cumpleaños",
    price: 10,
    imageUrl: "/images/producto2.jpg",
    category: "decoracion",
  },
  {
    id: 6,
    name: "Cinta Decorativa",
    price: 5,
    imageUrl: "/images/producto2.jpg",
    category: "decoracion",
  },
  // Productos de bebidas
  {
    id: 7,
    name: "Gaseosa 500ml",
    price: 2.5,
    imageUrl: "/images/producto2.jpg",
    category: "bebidas",
  },
  {
    id: 8,
    name: "Agua Mineral 1L",
    price: 1.5,
    imageUrl: "/images/producto2.jpg",
    category: "bebidas",
  },
  {
    id: 7,
    name: "Gaseosa 500ml",
    price: 2.5,
    imageUrl: "/images/producto2.jpg",
    category: "bebidas",
  },
  {
    id: 8,
    name: "Agua Mineral 1L",
    price: 1.5,
    imageUrl: "/images/producto2.jpg",
    category: "bebidas",
  },
  {
    id: 9,
    name: "Gaseosa 500ml",
    price: 2.5,
    imageUrl: "/images/producto2.jpg",
    category: "bebidas",
  },
  {
    id: 10,
    name: "Agua Mineral 1L",
    price: 1.5,
    imageUrl: "/images/producto2.jpg",
    category: "bebidas",
  },
  {
    id: 11,
    name: "Gaseosa 500ml",
    price: 2.5,
    imageUrl: "/images/producto2.jpg",
    category: "bebidas",
  },
  {
    id: 12,
    name: "Agua Mineral 1L",
    price: 1.5,
    imageUrl: "/images/producto2.jpg",
    category: "bebidas",
  },
  // Productos de postres
  {
    id: 13,
    name: "Pastel de Manzana",
    price: 15,
    imageUrl: "/images/producto2.jpg",
    category: "postres",
  },
  {
    id: 14,
    name: "Empanada de Pollo",
    price: 8,
    imageUrl: "/images/producto2.jpg",
    category: "postres",
  },
  {
    id: 15,
    name: "Pastel de Manzana",
    price: 15,
    imageUrl: "/images/producto2.jpg",
    category: "postres",
  },
  {
    id: 16,
    name: "Empanada de Pollo",
    price: 8,
    imageUrl: "/images/producto2.jpg",
    category: "postres",
  },
  {
    id: 17,
    name: "Pastel de Manzana",
    price: 15,
    imageUrl: "/images/producto2.jpg",
    category: "postres",
  },
  {
    id: 18,
    name: "Empanada de Pollo",
    price: 8,
    imageUrl: "/images/producto2.jpg",
    category: "postres",
  },
  // Productos de tortas
  {
    id: 19,
    name: "Torta de Chocolate",
    price: 35,
    imageUrl: "/images/producto2.jpg",
    category: "tortas",
  },
  {
    id: 20,
    name: "Torta de Vainilla",
    price: 30,
    imageUrl: "/images/producto2.jpg",
    category: "tortas",
  },
  {
    id: 21,
    name: "Torta de Chocolate",
    price: 35,
    imageUrl: "/images/producto2.jpg",
    category: "tortas",
  },
  {
    id: 22,
    name: "Torta de Vainilla",
    price: 30,
    imageUrl: "/images/producto2.jpg",
    category: "tortas",
  },
  {
    id: 23,
    name: "Torta de Chocolate",
    price: 35,
    imageUrl: "/images/producto2.jpg",
    category: "tortas",
  },
  {
    id: 24,
    name: "Torta de Vainilla",
    price: 30,
    imageUrl: "/images/producto2.jpg",
    category: "tortas",
  },
];
