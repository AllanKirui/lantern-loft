import apiClient from "./api"
import type { LaravelApiResponse } from "@/types/api/laravel-api-response"
import type { ProductCardBase } from "@/types/products/product-card-base"
import type { ProductCardExtended } from "@/types/products/product-card-extended"

export async function fetchNewArrivals() {
  const res = await apiClient.get<LaravelApiResponse<ProductCardBase[]>>(
    "/products/new-arrivals"
  )
  return res.data.data
}

export async function fetchFeatured() {
  const res = await apiClient.get<LaravelApiResponse<ProductCardExtended[]>>(
    "/products/featured"
  )
  return res.data.data
}
