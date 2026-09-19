// Mock data layer.
// Later this file's exports can be replaced with functions that call the
// Laravel REST API via axios, e.g.:
//   export async function getProducts() {
//     const { data } = await axios.get("/api/products");
//     return data;
//   }
// Every page consumes data through props / these named exports only, so the
// swap requires no changes to components themselves.

export const categories = [
  { id: "electronics", name: "Electronics", count: 24, image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80" },
  { id: "fashion", name: "Fashion", count: 18, image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80" },
  { id: "shoes", name: "Shoes", count: 12, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80" },
  { id: "accessories", name: "Accessories", count: 15, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80" },
  { id: "audio", name: "Audio", count: 9, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { id: "home", name: "Home", count: 21, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80" },
];

export const products = [
  {
    id: "p1",
    name: "iPhone 15 Pro",
    category: "Electronics",
    price: 999.0,
    originalPrice: null,
    rating: 4.8,
    reviews: 342,
    stock: 18,
    image: "https://images.unsplash.com/photo-1697284959520-a1e8ad2dfc6a?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1697284959520-a1e8ad2dfc6a?w=800&q=80",
      "https://images.unsplash.com/photo-1695048065969-2ffea5cc75f0?w=800&q=80",
    ],
    description: "Titanium design, A17 Pro chip, and the most advanced iPhone camera system yet.",
  },
  {
    id: "p2",
    name: "MacBook Air",
    category: "Electronics",
    price: 1099.0,
    originalPrice: 1299.0,
    rating: 4.9,
    reviews: 512,
    stock: 24,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"],
    description: "Strikingly thin design powered by the M-series chip, with all-day battery life.",
  },
  {
    id: "p3",
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 890,
    stock: 40,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80"],
    description: "Industry-leading noise cancellation with exceptional sound quality.",
  },
  {
    id: "p4",
    name: "Nike Air Max",
    category: "Shoes",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviews: 213,
    stock: 65,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"],
    description: "Iconic cushioning and a breathable knit upper built for everyday wear.",
  },
  {
    id: "p5",
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 89.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 156,
    stock: 32,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80"],
    description: "Hot-swappable switches with per-key RGB and a solid aluminum frame.",
  },
  {
    id: "p6",
    name: "Smart Watch",
    category: "Electronics",
    price: 249.0,
    originalPrice: 279.0,
    rating: 4.4,
    reviews: 401,
    stock: 27,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"],
    description: "Track workouts, sleep, and heart rate with a always-on display.",
  },
  {
    id: "p7",
    name: "Leather Backpack",
    category: "Accessories",
    price: 119.0,
    originalPrice: null,
    rating: 4.7,
    reviews: 98,
    stock: 15,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"],
    description: "Full-grain leather with a padded laptop sleeve and brass hardware.",
  },
  {
    id: "p8",
    name: "Wireless Mouse",
    category: "Electronics",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.3,
    reviews: 267,
    stock: 80,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80"],
    description: "Silent clicks, 2.4GHz + Bluetooth, and a 3-month battery life.",
  },
];

export const orders = [
  { id: "#1001", customer: "John Doe", date: "Aug 20, 2026", total: 120.0, status: "Pending", items: 2 },
  { id: "#1002", customer: "Anna Lee", date: "Aug 15, 2026", total: 250.0, status: "Completed", items: 4 },
  { id: "#1003", customer: "Marco Rossi", date: "Aug 12, 2026", total: 89.99, status: "Cancelled", items: 1 },
  { id: "#1004", customer: "Sopheap Kim", date: "Aug 9, 2026", total: 349.99, status: "Completed", items: 1 },
  { id: "#1005", customer: "Priya Nair", date: "Aug 3, 2026", total: 540.0, status: "Pending", items: 3 },
];

export const stats = {
  revenue: 24580,
  orders: 184,
  products: 126,
  customers: 1240,
};

export const salesOverview = [
  { month: "Mar", value: 12400 },
  { month: "Apr", value: 15200 },
  { month: "May", value: 14100 },
  { month: "Jun", value: 18900 },
  { month: "Jul", value: 21300 },
  { month: "Aug", value: 24580 },
];
