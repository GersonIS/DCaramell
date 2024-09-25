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
    imageUrl: "/images/product1.jpg",
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
    name: "Centro de Mesa",
    price: 20,
    imageUrl: "/images/product1.jpg",
    category: "decoracion",
  },
  {
    id: 4,
    name: "Guirnalda de Flores",
    price: 15,
    imageUrl: "/images/producto2.jpg",
    category: "decoracion",
  },
  {
    id: 5,
    name: "Adorno de Mesa",
    price: 12,
    imageUrl: "/images/product1.jpg",
    category: "decoracion",
  },
  {
    id: 6,
    name: "Cartel Personalizado",
    price: 25,
    imageUrl: "/images/producto2.jpg",
    category: "decoracion",
  },
  {
    id: 7,
    name: "Velas Decorativas",
    price: 8,
    imageUrl: "/images/product1.jpg",
    category: "decoracion",
  },
  {
    id: 8,
    name: "Mantel Colorido",
    price: 18,
    imageUrl: "/images/producto2.jpg",
    category: "decoracion",
  },

  // Productos de bebidas
  {
    id: 9,
    name: "Gaseosa 500ml",
    price: 2.5,
    imageUrl: "/images/product1.jpg",
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
    name: "Jugo Natural 1L",
    price: 3,
    imageUrl: "/images/product1.jpg",
    category: "bebidas",
  },
  {
    id: 12,
    name: "Cerveza Artesanal 330ml",
    price: 4,
    imageUrl: "/images/producto2.jpg",
    category: "bebidas",
  },
  {
    id: 13,
    name: "Limonada 1L",
    price: 3.5,
    imageUrl: "/images/product1.jpg",
    category: "bebidas",
  },
  {
    id: 14,
    name: "Té Helado 500ml",
    price: 2.8,
    imageUrl: "/images/producto2.jpg",
    category: "bebidas",
  },
  {
    id: 15,
    name: "Smoothie de Frutas",
    price: 4.5,
    imageUrl: "/images/product1.jpg",
    category: "bebidas",
  },
  {
    id: 16,
    name: "Batido de Plátano",
    price: 3,
    imageUrl: "/images/producto2.jpg",
    category: "bebidas",
  },

  // Productos de postres
  {
    id: 17,
    name: "Pastel de Manzana",
    price: 15,
    imageUrl: "/images/product1.jpg",
    category: "postres",
  },
  {
    id: 18,
    name: "Empanada de Pollo",
    price: 8,
    imageUrl: "/images/producto2.jpg",
    category: "postres",
  },
  {
    id: 19,
    name: "Brownie con Nueces",
    price: 10,
    imageUrl: "/images/product1.jpg",
    category: "postres",
  },
  {
    id: 20,
    name: "Cheesecake de Fresa",
    price: 12,
    imageUrl: "/images/producto2.jpg",
    category: "postres",
  },
  {
    id: 21,
    name: "Tarta de Limón",
    price: 14,
    imageUrl: "/images/product1.jpg",
    category: "postres",
  },
  {
    id: 22,
    name: "Galletas de Chispas de Chocolate",
    price: 6,
    imageUrl: "/images/producto2.jpg",
    category: "postres",
  },
  {
    id: 23,
    name: "Mousse de Chocolate",
    price: 9,
    imageUrl: "/images/product1.jpg",
    category: "postres",
  },
  {
    id: 24,
    name: "Pudin de Pan",
    price: 7,
    imageUrl: "/images/producto2.jpg",
    category: "postres",
  },

  // Productos de tortas
  {
    id: 25,
    name: "Torta de Chocolate",
    price: 35,
    imageUrl: "/images/product1.jpg",
    category: "tortas",
  },
  {
    id: 26,
    name: "Torta de Vainilla",
    price: 30,
    imageUrl: "/images/producto2.jpg",
    category: "tortas",
  },
  {
    id: 27,
    name: "Torta de Frutas",
    price: 40,
    imageUrl: "/images/product1.jpg",
    category: "tortas",
  },
  {
    id: 28,
    name: "Torta 3 Leches",
    price: 35,
    imageUrl: "/images/producto2.jpg",
    category: "tortas",
  },
  {
    id: 29,
    name: "Torta de Zanahoria",
    price: 30,
    imageUrl: "/images/product1.jpg",
    category: "tortas",
  },
  {
    id: 30,
    name: "Torta Selva Negra",
    price: 38,
    imageUrl: "/images/producto2.jpg",
    category: "tortas",
  },
  {
    id: 31,
    name: "Torta Helada",
    price: 30,
    imageUrl: "/images/product1.jpg",
    category: "tortas",
  },
  {
    id: 32,
    name: "Torta de Coco",
    price: 34,
    imageUrl: "/images/producto2.jpg",
    category: "tortas",
  },
];
