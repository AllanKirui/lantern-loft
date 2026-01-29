import apiClient from "./api"
import type { LaravelApiResponse } from "@/types/api/laravel-api-response"
import type { ProductCardBase } from "@/types/products/product-card-base"

export async function fetchNewArrivals() {
  const res = await apiClient.get<LaravelApiResponse<ProductCardBase[]>>(
    "/products/new-arrivals"
  )
  return res.data.data
}
