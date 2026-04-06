import axios from "axios";
import type { Product, BasketItem } from "./types";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

function resolveImage(imagePath: string): string {
  if (imagePath.startsWith("http")) return imagePath;
  return `${BASE}${imagePath}`;
}

export const fetchProducts = () =>
  axios.get<Product[]>(`${BASE}/products`).then(r =>
    r.data.map(p => ({ ...p, image: resolveImage(p.image) }))
  );

export const fetchBasket = () =>
  axios.get<BasketItem[]>(`${BASE}/basket`).then(r =>
    r.data.map(p => ({ ...p, image: resolveImage(p.image) }))
  );

export const addToBasket = (product_id: number, quantity = 1) =>
  axios.post(`${BASE}/basket`, { product_id, quantity });

export const removeFromBasket = (product_id: number) =>
  axios.delete(`${BASE}/basket/${product_id}`);

export const clearBasket = () =>
  axios.delete(`${BASE}/basket`);