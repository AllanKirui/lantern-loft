import apiClient from "./api"
import type {
  LaravelApiResponse,
  LaravelPaginatedResponse
} from "@/types/api/laravel"

import type {
  ProductCardBase,
  ProductCardExtended,
  ProductFilters,
  Product
} from "@/types/products"

export const productService = {
  async fetchAll(params: Record<string, any>) {
    const res = await apiClient.get<
      LaravelPaginatedResponse<ProductCardExtended>
    >("/products", { params })
    return res.data
  },

  async fetchNewArrivals() {
    const res = await apiClient.get<LaravelApiResponse<ProductCardBase>>(
      "/products/new-arrivals"
    )
    return res.data.data
  },

  async fetchFeatured() {
    const res = await apiClient.get<LaravelApiResponse<ProductCardExtended>>(
      "/products/featured"
    )
    return res.data.data
  },

  async fetchFilters() {
    const res = await apiClient.get<ProductFilters>("/products/filters")
    return res.data
  }
}
