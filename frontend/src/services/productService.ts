import apiClient from "./api"
import type { ProductCardBase } from "@/types/products/product-card-base"

export function fetchNewArrivals() {
  return apiClient.get<ProductCardBase[]>("/products/new-arrivals")
}
